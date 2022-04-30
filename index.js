
const express = require('express');
const app = express();

const session = require('express-session');
var bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.use(express.static('static'));
app.use(express.urlencoded());
app.use(express.json());

/**
 * Session above all
 */
 app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: false
  }));


require('./routes/routes')(app);

app.use((err, req, res, next) => {
    res.end('Baj van...');
    console.log(err);
});

const server = app.listen(3000, function () {
    console.log("On :3000");
});