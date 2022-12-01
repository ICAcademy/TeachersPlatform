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
const studentRouter = require('./routes/StudentRoutes');
const teacherRouter = require('./routes/TeacherRoutes');
const authUser = require('./routes/auth');

const app = express();
const port = process.env.PORT || 5000;

const upload = require('./services/Firebase');

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());

app.use('/uploads', express.static(__dirname + '/uploads'));

app.use('/auth', authUser);
app.use('/api/materials', materialRouter);
app.use('/api/materials-levels', materialLevelsRouter);
app.use('/api/students', studentRouter);
app.use('/api/questions', questionRouter);
app.use('/api/teachers', teacherRouter);
app.use('/api/upload-photo', upload);

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
