const taskModel = require('../models/taskModel');
const middleware_errors = require('../config/errors');

// aciona a model ou service para buscar com await as tasks
const getAll = async function (req, res) {
    try {
        await taskModel.getTask(req, res);
    } catch (error) {
        middleware_errors(error, req,res)
    }
}

const createTask = async function (req,res) {
    try {

        await taskModel.createTask(req, res);
        
    } catch (error) {
        middleware_errors(error, req,res)
    }
}

const delTask = async function (req,res) {
    try {
        await taskModel.deleteTask(req, res);
    } catch (error) {
        middleware_errors(error, req,res)
    }
}

module.exports = {
    getAll,
    createTask,
    delTask
}