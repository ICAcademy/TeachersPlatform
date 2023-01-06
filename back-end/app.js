require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');

const app = express();
const port = process.env.PORT;

// Middlewares
const authentication = require('./middlewares/authentication');
const cors = require('./middlewares/cors');

// Routers
const appRouter = require('./routes/AppRouter');
const authRouter = require('./routes/AuthRouter');
const transactionRouter = require('./routes/TransactionRoutes');

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

    app.listen(port, () => {
      console.log(`Server has been started on port ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();
