const connection = require('../database/connection');
const middleware_errors = require('../config/errors');

const getTask = async function (req, res) {
    let taskFilter = '';
    if (req.query.id || req.query.title) {
        if (req.query.id && !req.query.title) { // ?id='algo'
            taskFilter = `WHERE id=${req.query.id}`;
        } else if (!req.query.id && req.query.title) { // ?title='algo'
            taskFilter = `WHERE title LIKE '%${req.query.title}%'`;
        } else if (req.query.id && req.query.title) { // ?id='algo' && title='algo'
            // eslint-disable-next-line no-unused-vars
            taskFilter = `WHERE id=${req.query.id} AND title LIKE '%${req.query.title}%'`
        }
    }

    const sqlSelect = `SELECT * FROM tasks ${taskFilter}`;
    try {
        const [tasks] = await connection.execute(sqlSelect); // array destruct [tasks, buffer]
        //console.log(taskList.length);
        if (tasks.length === 0) {
            res.status(404).json({
                message: `Task not found !!!`
            });
        } else {
            res.status(200).json(tasks);
        }
    } catch (error) {
        middleware_errors(error, req, res);
    } finally {
        connection.releaseConnection();
    }
};

const createTask = async (req, res) => {
    const { title } = req.body;

    console.log(title);

    const sqlCreate = `INSERT INTO tasks (title, status, create_at) VALUES ( ?, ?, ?)`;

    const dateUTC = new Date(Date.now()).toUTCString();

    console.log(sqlCreate);
    console.log(dateUTC);

    try {
        const  [ createdTask ]  = await connection.execute(sqlCreate, [title, 'pendente', dateUTC ])

        res.status(201).json({ 
            id: createdTask.insertId,
            title: title,
            status: "pendente",
            create_At: dateUTC 

        })

    } catch (error) {
        middleware_errors(error, req, res);
    } finally {
        connection.releaseConnection();
    }
};

const updateTask = () => {

};

const deleteTask = async function (req, res) {
    try {
        const id = req.params.id ? req.params.id : ``
        if (id) {
            const sqlDelete = `DELETE  FROM tasks WHERE id=${id}`;
            const result = await connection.execute(sqlDelete);

            if (result) {
                res.status(200).json({
                    message: `task ${id} excluido`
                })
            } else {
                res.status(404).json({
                    message: `task not found`
                })
            }
            console.log(result)
        }
    } catch (error) {
        middleware_errors(error, req, res);
    } finally {
        connection.releaseConnection();
    }
};



module.exports = {
    getTask,
    createTask,
    updateTask,
    deleteTask
};