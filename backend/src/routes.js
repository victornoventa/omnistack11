const express = require('express');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.post('/sessions', SessionController.create);

// routes.get('/ongs', OngController.list);
routes.post('/ongs', OngController.create);

routes.get('/profile', ProfileController.index);

routes.get('/Incidents', IncidentController.list);
routes.post('/Incidents', IncidentController.create);
routes.delete('/Incidents/:id', IncidentController.remove);

module.exports = routes;