import errorResponse from "../helpers/errorResponse.js";

const errorHandle = (error,req,res,next)=>{
    //if(!error) next()
    console.log("<<<<<<<< " + error);
    return errorResponse(res,'Internal Server Error',500)
}

export default errorHandle