const { StatusCode } = require('./http.enum');

const ErrorCode = {
    UNAUTHORIZED: 'UNAUTHORIZED',
    INTERNAL_SERVER_ERROR:  'INTERNAL_SERVER_ERROR',
    API_VALIDATION_ERROR: 'API_VALIDATION_ERROR',
    FORBIDDEN_ACCESS: 'FORBIDDEN_ACCESS',
}

const ErrorList = { 
    [ErrorCode.UNAUTHORIZED]: {
        statusCode: StatusCode.Unauthorized,
        message: 'User do not have permission to perform action'
    },
    [ErrorCode.INTERNAL_SERVER_ERROR]: {
        statusCode: StatusCode.Internal_Server_Error,
        message: 'Unknown Error occured while performing a particular action.'
    },
    [ErrorCode.API_VALIDATION_ERROR]: {
        statusCode: StatusCode.Bad_Request,
        message: 'Error while validating input payload'
    },
}

module.exports = {
    ErrorCode,
    ErrorList
}