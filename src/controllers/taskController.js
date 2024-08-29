const taskModel = require('../models/taskModel');
const ApiError = require('../helpers/api-errors');


// aciona a model ou service para buscar com await as tasks
const getAll = async (req, res) => {

    // se quiser lancar tirar o async
    //throw new ApiError('Este erro foi lancado daqui do getAll', 400);

    const result = await taskModel.getTask(req, res);
    return (result ? 
        res.status(200).json(result): '');
        //res.status(404).json({ message: `Task not found !!!` }));
}

const createTask = async function (req, res) {
    const task = await taskModel.createTask(req.body);
    return res.status(201).json(task);
}

const delTask = async function (req, res) {
    const result = await taskModel.deleteTask(req.params);
    return res.status(200).json(result);  // ver padrao para este caso
}

const testTask = (req, res) => {
    //const result = await taskModel.getTask(req, res);
    throw new ApiError('Este erro foi lancado daqui d dentro do try', 400);
    return res.status(200).json(result);
}

module.exports = {
    getAll,
    createTask,
    delTask, 
    testTask
}