require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');
const app = express();
const port = process.env.PORT;

// Middlewares
const cors = require('./middlewares/cors');
const authentication = require('./middlewares/authentication');

// Routers
const appRouter = require('./routes/AppRouter');
const authRouter = require('./routes/AuthRouter');

app.use(cors);
app.use(express.json());

app.get('/', (req, res) => {});

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
