import jwt from 'jsonwebtoken';

const createToken = (user)=>{
    const token = jwt.sign({
        userName: user.name,
        userEmail: user.email,
        status:true,
    }, process.env.SECRET_KEY,{ expiresIn: '1h' });

    return token
}

export {createToken}