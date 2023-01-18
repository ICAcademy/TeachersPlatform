require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const { Server } = require('socket.io');
const { socketConnection } = require('./services/Socket'); //
const Sentry = require('@sentry/node');
const Tracing = require('@sentry/tracing');

const http = require('http');
const app = express();
const port = process.env.PORT;
const server = http.createServer(app);

// Middlewares
const authentication = require('./middlewares/authentication');
const cors = require('./middlewares/cors');
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:3000', 'https://incredible-torte-ac738e.netlify.app'],
  },
});
socketConnection(io);

// Routers
const appRouter = require('./routes/AppRouter');
const authRouter = require('./routes/AuthRouter');
const transactionRouter = require('./routes/TransactionRoutes');

Sentry.init({
  release: process.env.SENTRY_PROJECT,
  dsn: 'https://d4647e67db714ddd96cd9d1b92b93bf4@o4504524620103680.ingest.sentry.io/4504524623708160',
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Tracing.Integrations.Express({ app }),
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

// RequestHandler creates a separate execution context using domains, so that every
// transaction/span/breadcrumb is attached to its own Hub instance
app.use(Sentry.Handlers.requestHandler());
// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

app.use(function onError(err, req, res, next) {
  // The error id is attached to `res.sentry` to be returned
  // and optionally displayed to the user for support.
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
    console.log(err);
  }
}

main();
