const express = require('express');

const errorMiddleware = (error, req, res, next) => {
    if (error.statusCode === undefined) {
        error.statusCode = 500;
    }
    console.log(error.statusCode)
    return res.status(error.statusCode).json({
        message: error.message
    })
}

module.exports = errorMiddleware;