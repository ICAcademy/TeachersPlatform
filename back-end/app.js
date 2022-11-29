require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const compression = require('compression');

const teacherRouter = require('./routes/TeacherRoutes');
const materialRouter = require('./routes/MaterialRoutes');
const materialLevelsRouter = require('./routes/MaterialLevelsRoutes');
const questionRouter = require('./routes/Questions');
const studentsRouter = require('./routes/StudentsRoutes');
const teacherRouter = require('./routes/TeacherRoutes');
const authUser = require('./routes/auth');

const app = express();
const port = process.env.PORT || 5000;

<<<<<<< HEAD
const authUser = require('./routes/auth');

const upload = require('./Firebase');

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());
=======
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(__dirname + '/uploads'));
>>>>>>> 2a89e5c13ecf92781beb910e6b721b5905bdbfb4

app.use('/auth', authUser);
app.use('/api/materials', materialRouter);
app.use('/api/materials-levels', materialLevelsRouter);
app.use('/api/students', studentsRouter);
app.use('/api/questions', questionRouter);
app.use('/api/teachers', teacherRouter);
app.use('/upload', upload);

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
