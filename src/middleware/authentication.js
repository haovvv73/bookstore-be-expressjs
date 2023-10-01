import jwt from 'jsonwebtoken'
import { decodeToken } from '../util/tokenTool.js';
import errorResponse from '../helpers/errorResponse.js';

const authenticate = (req, res, next) => {
    console.log(">>>>>>>>> authenticate");
    const authToken = req.headers.authorization;

    if (!authToken || !authToken?.startsWith("Bearer ")) {
        return errorResponse(res,'MISSING authentication token',401)
    }

    const accessToken = authToken.split(" ")[1]

    try {
        // DECODE
        const decodedToken = decodeToken(accessToken);
        const { userName, userEmail, status } = decodedToken

        if (userName && userEmail && status) {
            if(status == true){
                // attach data to req.user
                req.user = decodedToken;
                next();
            }
        }else{
            console.log("error");
            throw new Error('Invalid authentication token')
        }

    } catch (error) {
        // console.log(error);
        return errorResponse(res,'Invalid authentication token',403)
    }
};

export default authenticate