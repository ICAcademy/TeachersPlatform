require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const { createServer } = require('http');
const { Server } = require('socket.io');
const { socketConnection } = require('./listeners/Socket');
const Sentry = require('@sentry/node');
const Tracing = require('@sentry/tracing');

const app = express();
const server = createServer(app);

const port = process.env.PORT;

const io = new Server(server, {
  cors: {
    origin: ['http://localhost:3000', 'https://incredible-torte-ac738e.netlify.app'],
  },
});

// Middlewares
const authentication = require('./middlewares/authentication');
const cors = require('./middlewares/cors');
socketConnection(io);

// Routers
const appRouter = require('./routes/AppRouter');
const authRouter = require('./routes/AuthRouter');
const transactionRouter = require('./routes/TransactionRoutes');

Sentry.init({
  release: process.env.SENTRY_PROJECT,
  dsn: process.env.SENTRY_DSN,
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Tracing.Integrations.Express({ app }),
  ],

  tracesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler());

app.use(Sentry.Handlers.tracingHandler());

app.use(function onError(err, req, res, next) {
  res.statusCode = 500;
  res.end(res.sentry + '\n');
});

app.use(cors);
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());

app.use('/uploads', express.static(__dirname + '/uploads'));

app.use('/api', authentication, appRouter);
app.use('/auth', authRouter);
app.use('/transactions', transactionRouter);
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

async function main() {
  try {
    await mongoose.connect(process.env.DB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    server.listen(port, () => {
      console.log(`Server has been started on port ${port}`);
    });
  } catch (err) {
    Sentry.captureException(err);
  }
}

main();
