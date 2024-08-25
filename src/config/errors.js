
// Middleware de erro
const middleware = ((err, req, res) => {
    if (!res.headersSent) {
        res.status(500).json({
            message: err.message,
            code: err.code
        })
    } 
});


module.exports = middleware;
