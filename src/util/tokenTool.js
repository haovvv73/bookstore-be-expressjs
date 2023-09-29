import jwt from 'jsonwebtoken';

const createToken = (user) => {
    const token = jwt.sign({
        userName: user.name,
        userEmail: user.email,
        status: true,
    }, process.env.SECRET_KEY, { expiresIn: '1h' });

    return token
}

const decodeToken = (encodeToken) => {
    return jwt.verify(encodeToken, process.env.SECRET_KEY);
}

const isTokenExpired = (token) => {
    try {
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

        if (!decodedToken.exp) {
            return false;
        }

        const expirationTime = decodedToken.exp;
        const currentTime = Math.floor(Date.now() / 1000); // => milt second -> second

        return expirationTime >= currentTime;
    } catch (error) {

        return false;
    }
}

export { createToken, decodeToken, isTokenExpired }