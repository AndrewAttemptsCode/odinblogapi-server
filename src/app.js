const express = require('express');
const routes = require('./routes');
const cors = require('cors');

const app = express();

const corsOptions = {
  origin: [
    process.env.PUBLIC_CLIENT,
    process.env.ADMIN_CLIENT
  ],
};

app.use(cors(corsOptions));

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', routes.auth);
app.use('/users', routes.user);
app.use('/posts', routes.post);
app.use('/comments', routes.comment);

module.exports = app;