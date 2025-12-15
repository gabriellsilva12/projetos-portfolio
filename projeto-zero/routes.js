const express = require('express');
const route = express.Router();
const path = require('path');

const loginControllers = require(path.resolve(__dirname, 'src', 'controllers', 'loginControllers'));
const contactController = require(path.resolve(__dirname, 'src', 'controllers', 'contactController'));

const { userSessionCheck } = require(path.resolve(__dirname, 'src', 'middlewares', 'middlewares'));

// rotas de login
route.get('/login',loginControllers.index); // pagina inicial
route.post('/login/register', loginControllers.register); // registrar dados
route.post('/login/login', loginControllers.login); // fazer login do usuario
route.get('/output', loginControllers.output); // botao sair

route.get('/agenda', loginControllers.agendaIndex); // pagina de entrada apos login

// routes contacts
route.get('/contact', userSessionCheck, contactController.indexcontact);
route.post('/contact/register', userSessionCheck, contactController.ContactRegister);


module.exports = route;