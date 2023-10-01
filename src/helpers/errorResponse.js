
const errorResponse = (res,error,statusCode)=>{
    return res.status(statusCode).json({
        status : false,
        error
    })
}

export default errorResponse