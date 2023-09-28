import userDAO from "../services/userDAO.js"

const getUserInfo = async (req,res)=>{
    const { userEmail } = req.user

    if(!userEmail ){
        return res.status(400).json({
            status : false,
            message : "MISSING DATA",
        })
    }

    const result = await userDAO.getUserInfo(userEmail)

    if(result == null){
        return res.status(500).json({
            status : false,
            message : "Internal Server Error",
        })
    }

    if(result.length <= 0){
        return res.status(401).json({
            message : "USER DOES NOT EXIST",
            status : true,
        })
    }

    return res.status(200).json({
        message : "OK GET USER",
        status : true,
        data: result
    })
}

export {getUserInfo}