require('dotenv').config();

const express = require('express');

const cors = require('cors');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const { PORT, MONGO_IP } = require('./config/index');
const limiter = require('./middlewares/rate-limit');
const router = require('./routes/index');
const errorHandler = require('./middlewares/error-handler');
const { requestLogger, errorLogger } = require('./middlewares/logger');


const app = express();


mongoose.connect(MONGO_IP, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});
app.use(limiter);

app.use(requestLogger);

app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(router);

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(PORT);
