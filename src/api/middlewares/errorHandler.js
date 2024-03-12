const { responseWrapper } =  require('../responseWrapper');

const errorHandler = (
    err,
    req,
    res,
    next
) => {
    let errorResponse = err;
    responseWrapper.error(res, errorResponse);
    next();
};

module.exports = {
    errorHandler
};
