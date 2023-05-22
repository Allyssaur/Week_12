const express = require('express');
const app = express();
const route = express.Router();

const services = require('../services/render');
const controller = require('../controller/controller');

/**
 * @description Root Route
 * @method GET/
 */
route.get('/', services.homeRoutes);

/**
 * @description add tasks
 * @method GET/add-task
 */
route.get('/add-task', services.add_task);

/**
 * @description update task
 * @method GET/update-task
 */
route.get('/update-task', services.update_task);

//API route
route.post('/api/tasks', controller.create);
route.get('/api/tasks', controller.find);
route.put('/api/tasks/:id', controller.update);
route.delete('/api/tasks/:id', controller.delete);



module.exports = route;