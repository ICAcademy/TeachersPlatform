require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const port = process.env.PORT;
const materialRouter = require('./routes/MaterialRoutes');

app.get('/', (req, res) => {});

//middleware
app.use(express.json());
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use('/api/materials', materialRouter);

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
