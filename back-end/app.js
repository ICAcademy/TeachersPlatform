require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');

const teacherRouter = require('./routes/TeacherRoutes');
const materialRouter = require('./routes/MaterialRoutes');
const questionRouter = require('./routes/Questions');

const app = express();
const port = process.env.PORT || 5000;

const authUser = require('./routes/auth');
const cors = require('cors');
const bodyParser = require('body-parser');
const compression = require('compression');

const upload = require('./Firebase');

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());

app.use('/auth', authUser);
app.use('/api/materials', materialRouter);
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
