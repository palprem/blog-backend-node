const { validateToken } = require("../services/authentication");

const checkForAuthenticationCookie = (cookieName) => {
    return (req, res, next) => {
        const tokenCookieValue = req.cookies[cookieName];
        if (!tokenCookieValue) {
            return res.status(401).json({
                success: false,
                message: "Authentication required"
            })
        }

        try {
            const userPayload = validateToken(tokenCookieValue);
            req.user = userPayload;
            next();
        } catch (error) {
            next(error);
        }
    }
}

module.exports = {
    checkForAuthenticationCookie,

}