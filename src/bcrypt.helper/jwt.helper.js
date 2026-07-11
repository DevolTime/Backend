import jwt from "jsonwebtoken";

const generateToken = (payload) => {
    try {
        const token = jwt.sign(payload, 'Kanojo,Okarishimasu', { expiresIn: '1y' })
        return token
    } catch (error) {
        console.error(error)
        return null
    }
}

const verifyToken = (token) => {
    try {
        const payload = jwt.verify(token, 'Kanojo,Okarishimasu');
        return payload
    } catch (error) {
        console.error(error)
        return null
    }
}

export { generateToken, verifyToken };