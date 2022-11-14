require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT;

app.get('/', (req, res) => {});

app.listen(port, () => {
  console.log(`Server has been started on port ${port}`);
});
