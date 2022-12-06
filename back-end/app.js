require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');

const app = express();
const port = process.env.PORT || 5000;

// Middlewares
const authentication = require('./middlewares/authentication');
const cors = require('./middlewares/cors');

// Routers
const appRouter = require('./routes/AppRouter');
const authRouter = require('./routes/AuthRouter');

app.use(cors);
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());

app.use('/uploads', express.static(__dirname + '/uploads'));

app.use('/api', authentication, appRouter);
app.use('/auth', authRouter);

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
