
import { json } from "body-parser";
import userservice from "../services/userservice";

let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing inputs parameter!'
        })
    }
    let userData = await userservice.handleUserLogin(email, password);

    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {}
    })
}
let handleGetAllUser = async (req, res) => {
    let id = req.body.id;//all;id
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters ',
            user: []
        })
    }
    let user = await userservice.GetAllUser(id);
    console.log(user);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        user
    })
}
module.exports = {
    handleLogin: handleLogin,
    handleGetAllUser: handleGetAllUser,
}