const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const serviceController = require('./src/controllers/serviceController');
const contatoController = require('./src/controllers/contatoController');
const serviceServiceController = require('./src/controllers/serviceServiceController');
const { loginRequired } = require('./src/middlewares/middleware');


route.get('/', homeController.index);

// rotas de login
 route.get('/login', loginController.index);
 route.post('/login/register', loginController.register);
 route.post('/login/login', loginController.login);
 route.get('/login/logout', loginController.logout);



// rotas de contato 

route.get('/contato/index', loginRequired , contatoController.index);
route.post('/contato/register', loginRequired , contatoController.register);
route.get('/contato/index/:id', loginRequired , contatoController.editIndex);
route.post('/contato/edit/:id', loginRequired , contatoController.edit);
route.get('/contato/delete/:id', loginRequired , contatoController.delete);


// routes de serviços 

route.get('/Service/index', serviceController.index);
route.get('/Service/service/', serviceServiceController.index);


module.exports = route; 