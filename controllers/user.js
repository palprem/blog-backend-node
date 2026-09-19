const User = require("../models/user");

const loginController = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const token = await User.matchPasswordAndGenerateToken(email, password);
        return res
            .cookie("token", token)
            .status(200)
            .json({
                success: true,
                message: "User logged successfully",
                data: {},
            })
    } catch (error) {
        next(error);
    }
}
const registerController = async (req, res) => {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "All filds are required"
        });
    }

    const entry = await User.create({
        fullName,
        email,
        password
    })

    res.status(200).json({
        success: true,
        message: "User registred successfully",
        data: {}
    })
}

const getCurrentUser = async (req, res) => {
    const user = req.user;
    res.status(200).json({
        success:true,
        data:user,
    }) 

}

module.exports = {
    loginController,
    registerController,
    getCurrentUser
}