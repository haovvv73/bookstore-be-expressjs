import jwt from 'jsonwebtoken'
import { decodeToken } from '../util/tokenTool.js';

const authenticate = (req, res, next) => {
    const authToken = req.headers.authorization;

    if (!authToken || !authToken?.startsWith("Bearer ")) {
        return res.status(401).json({
            message: 'MISSING authentication token',
            status: false
        });
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
        console.log(error);
        return res.status(403).json({
            message: 'Invalid authentication token',
            status: false
        });
    }
};

export default authenticate