require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');


mongoose.connect(process.env.CONNECTIONSTRING)
.then(() => {
    console.log("Conectei a base de dados.")
    app.emit('pronto');
})
.catch(e=> console.log(e));

const routes = require('./Routes');
const path = require('path');
const csrf = require('csurf');
const { middlewareGlobal, chekCsrfError, csrfMiddleware} = require('./src/middlewares/middleware');



app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.use(express.static(path.resolve(__dirname, 'public')));

const sessionOptions = session({
        secret: 'texto q ninguem vai saber',
    //store: new MongoStore({mongooseConnection: mongoose.connection}),
    resave:false,
    saveUninitialized: false,
    cookie:{
        maxAge:1000 *60*60*24*7, //tempo q vai durar o cookie (7dias)
        httpOnly:true
    },
        store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING}),
    })

  app.use(sessionOptions);
  app.use(flash());

app.set('views', path.resolve(__dirname, 'src', 'views'));


app.set('views engine', 'ejs');
app.use(csrf());
//Nosso próprios middleware
app.use(middlewareGlobal);
app.use(csrfMiddleware);
app.use(chekCsrfError);
app.use(routes);
app.on('pronto',() => {
        app.listen(3002, () => {
        console.log('Acessar http://localhost:3002')
        console.log('Servidor executando na porta 3002');
    }); 

});