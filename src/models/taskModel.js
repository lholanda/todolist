const connection = require('../database/connection');

//const connection = require('../database/db');
const baseError = require('../middlewares/customErrors');
/*
()=>{

    connection.connect((error) => {
        if (error) {
           console.log(error)
        }src/routes/routes.js
    })
} 
*/
const getTask = async (req, res) => {
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

        // tenho que tratar a exececao bando
        const  sqlTest = 'SELECT COUNT(*) AS qty FROM tasks';
        const [ qty ] = await connection.execute(sqlTest);
        console.log(qty)

        const [tasks] = await connection.execute(sqlSelect); // array destruct [tasks, buffer]
        return tasks;
    } catch (error) {
        baseError(error, req, res);
    } finally {
        //connection.releaseConnection();
    }
};

const createTask = async (task) => {
    const { title } = task;

    const sqlCreate = `INSERT INTO tasks (title, status, create_at) VALUES ( ?, ?, ?)`;
    const dateUTC = new Date(Date.now()).toUTCString();
 
    try {
        const [createdTask] = await connection.execute(sqlCreate, [title, 'pendente', dateUTC])
        return {
                    id: createdTask.insertId,
                    title: title,
                    status: "pendente",
                    create_at: dateUTC
                }
    } catch (error) {
        baseError(error);
    } finally {
        connection.releaseConnection();
    }
};

const updateTask = () => {

};

const deleteTask = async function (params_id) {
    try {
        const { id } = params_id;

        if (id) {
            const sqlDelete = `DELETE  FROM tasks WHERE id=${id}`;
            const result = await connection.execute(sqlDelete);
            
            console.log(typeof(result[0].affectedRows))
            console.log(result[0].affectedRows > 0)

            if (result[0].affectedRows > 0) {
                return { message: `task ${id} excluido` }
            } else {
                return { message: `task not found` }
            }
        }
    } catch (error) {
        baseError(error);
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