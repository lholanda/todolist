class ApiError extends Error{
    constructor(message, statusCode){
        super('ApiError - '+message)
        this.statusCode = statusCode 
    }
}

module.exports = ApiError