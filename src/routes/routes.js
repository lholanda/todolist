const express = require('express');
const taskController = require('../controllers/taskController');
//const { validateBody } = require('../middlewares/taskValidate');

const router = express.Router();

// Task Routes
router.get('/tasks', taskController.getAll);

router.post('/tasks', taskController.createTask);

router.delete('/tasks/:id', taskController.delTask);

router.get('/teste', taskController.testTask);


// User Routes
module.exports = router;