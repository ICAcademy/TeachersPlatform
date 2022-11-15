require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const port = process.env.PORT;

app.get('/', (req, res) => {
  console.log(req, res);
});

async function main() {
  try {
    await mongoose.connect(process.env.DB_CONNECTION);

    app.listen(port, () => {
      console.log(`Server has been started on port ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();
