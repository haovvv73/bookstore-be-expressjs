
const errorHandle = (error,req,res,next)=>{

    //if(!error) next()
    console.log("<<<<<<<< " + error);
    return res.status(500).json({
        status : false,
        error : "Internal Server Error",
    })

}

export default errorHandle