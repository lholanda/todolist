const express = require('express');
const taskController = require('../controllers/taskController')

const router = express.Router();

// Task Routes
router.get('/tasks', taskController.getAll);

router.post('/tasks', taskController.createTask );

router.delete('/tasks/:id', middlewareValidar, taskController.delTask );



// User Routes
module.exports = router;

