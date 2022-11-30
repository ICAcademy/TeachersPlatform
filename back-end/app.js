require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

const materialRouter = require('./routes/MaterialRoutes');
const materialLevelsRouter = require('./routes/MaterialLevelsRoutes');
const questionRouter = require('./routes/Questions');
const studentRouter = require('./routes/StudentRoutes');
const teacherRouter = require('./routes/TeacherRoutes');
const authUser = require('./routes/auth');

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(__dirname + '/uploads'));

app.use('/auth', authUser);
app.use('/api/materials', materialRouter);
app.use('/api/materials-levels', materialLevelsRouter);
app.use('/api/students', studentRouter);
app.use('/api/questions', questionRouter);
app.use('/api/teachers', teacherRouter);

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
