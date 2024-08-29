
// Middleware de erro
const baseError = ((error, req, res) => {
    //console.log(req.route.stack)
    if (!res.headersSent) {
        return res.status(500).json({
            code: error.code,
            message: error.message,
            //where: req.route.path,
            //meth: req.route.stack
            // preciso descobrir o que eu posso devolver 
        })
    } 
});


module.exports = baseError;
