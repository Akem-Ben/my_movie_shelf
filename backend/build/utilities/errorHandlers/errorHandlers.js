"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createError = (message, statusCode) => ({
    message,
    statusCode,
    timestamp: new Date(),
    isOperational: true,
});
const createUnknownError = (error) => ({
    message: 'Something went wrong, please try again later.',
    statusCode: 500,
    timestamp: new Date(),
    // details: error,
    isOperational: false
});
const withErrorHandling = (fn) => async (...args) => {
    try {
        return await fn(...args);
    }
    catch (error) {
        console.log('err', error);
        if (error.isOperational) {
            return createError(error.message, error.statusCode);
        }
        console.log('err', error.message);
        return createUnknownError(error);
    }
};
const globalErrorHandler = (err, req, res, next) => {
    const errorResponse = err.isOperational ? err : createUnknownError(err);
    return res.status(errorResponse.statusCode).json({
        status: "error",
        message: errorResponse.message,
        timestamp: errorResponse.timestamp,
        details: !err.isOperational ? `${err.message}` : ""
    });
};
exports.default = {
    createError,
    createUnknownError,
    withErrorHandling,
    globalErrorHandler
};