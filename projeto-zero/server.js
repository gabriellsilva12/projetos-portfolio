require('dotenv').config();

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const session = require('express-session');
const flash = require('connect-flash')
const helmet = require('helmet');
const csurf = require('csurf');

const app = express();
const port = 3000;
const routes = require(path.resolve(__dirname, 'routes'));

mongoose.connect(process.env.database)
.then(() => {
    app.emit('ok')
    console.log('Conectado ao banco de dados!');
})

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(express.json())
app.use(helmet());

const sessionOptions = session({
    secret: process.env.secret,
    store: MongoStore.create({ mongoUrl: process.env.database }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    }
})
app.use(sessionOptions);
app.use(csurf());
app.use(flash());

const { middlewareGlobal, csrfToken } = require(path.resolve(__dirname, 'src', 'middlewares', 'middlewares'))

app.use(middlewareGlobal);
app.use(csrfToken);

app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.use(routes);
app.on('ok',() => {
    app.listen(port, () => {
        console.log('Server On');
        console.log('Acesse: http://localhost:' + port + '/login  ');
    });
});