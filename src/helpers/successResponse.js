
const successResponse = (res,message,data, statusCode)=>{
    return res.status(statusCode).json({
        status : true,
        message,
        data
    })
}

export default successResponse