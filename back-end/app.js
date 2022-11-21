require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const port = process.env.PORT;
const materialRouter = require('./routes/MaterialRoutes');
const studentsRouter = require('./routes/StudentsRoutes');

app.get('/', (req, res) => {});

//middleware
app.use(express.json());
app.use('/api/materials', materialRouter);
app.use('/api/students', studentsRouter);

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
