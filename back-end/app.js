require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const { createServer } = require('http');
const { Server } = require('socket.io');
const { socketConnection } = require('./services/Socket');

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

const { registerLessonHandlers } = require('./ios/lessonSocket.io');

const onConnection = (socket) => {
  registerLessonHandlers(io, socket);
};

io.on('connection', onConnection);

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
