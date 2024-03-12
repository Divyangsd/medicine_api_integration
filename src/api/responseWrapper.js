const { StatusCode } =  require('./common/http.enum');
const { ErrorList, ErrorCode } = require('./common/error');

const success = (res, result) => {
    const statusCode = result.statusCode || StatusCode.OK;
    return res.status(statusCode).json({
        message: result.message || 'SUCCESS',
        data: result.data
    });
}

const error = (res, errorRes) => {
    const defaultError = ErrorList[ErrorCode.INTERNAL_SERVER_ERROR];
    const statusCode = errorRes.statusCode || defaultError.statusCode;
    return res.status(statusCode).json({
        code: errorRes.errorCode || ErrorCode.INTERNAL_SERVER_ERROR,
        message: errorRes.message || defaultError.message,
        errors: errorRes.errors
    });
}

module.exports = {
    success,
    error
}