import errorResponse from "../helpers/errorResponse.js"
import successResponse from "../helpers/successResponse.js"
import userDAO from "../services/userDAO.js"

const getUserInfo = async (req,res,next)=>{
    
    const { userEmail } = req.user
    // validate 
    if(!userEmail ) return errorResponse(res,'missing data',400)

    try {
        const result = await userDAO.getUserInfo(userEmail)
        // invalid information client
        if(result.length <= 0) return errorResponse(res,'user does not exist',401)

        return successResponse(res,'OK get user',result,200)
    } catch (error) {
        next(error)
    }
}

export {getUserInfo}