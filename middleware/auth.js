
const jwt = require("jsonwebtoken")
const {UnauthenticatedError} = require("../errors")


const authenticationMiddleware = async (req, res, next) => {
        const authHeader = req.headers.authorization;
        if(!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new UnauthenticatedError("no token provided")
        }
        const token = authHeader.split(" ")[1]
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            const id = decoded.id
            const username = decoded.username
            // const {id, username} = decoded
            req.user = {id, username}
            console.log("calling next....")
            req.decoded = decoded;
            next()
        } catch (error) {
            console.error(error)
            throw new UnauthenticatedError("not authorized to access this route")
        }
}

module.exports = authenticationMiddleware