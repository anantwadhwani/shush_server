import jwt from "jsonwebtoken";

const fetchUserId = (req, res, next) => {
    let statusMessage = "fail";
    const secretKey = "Liechtenstein";
    const authToken = req.header("Auth-Token");
    if (!authToken) {
        return res.status(401).json({ statusMessage, msg: "Login Again" });
    }
    try {
        const tokenMatchPayload = jwt.verify(authToken, secretKey);
        if (!tokenMatchPayload) {
            return res.status(500).json({
                statusMessage,
                msg: "Could not match Credentials, Login again",
            });
        }
        req.userId = tokenMatchPayload.userId;
        next();
    } catch (error) {
        return res
            .status(401)
            .json({ statusMessage, msg: "Please authenticate using a valid token" });
    }
};

export default fetchUserId;
