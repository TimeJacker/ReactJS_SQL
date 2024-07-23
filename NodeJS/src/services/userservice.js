const e = require("express");
const { where } = require("sequelize");
import { raw } from "body-parser";
import db from "../models/index";
import bcrypt from 'bcryptjs'

const salt = bcrypt.genSaltSync(10);


let hashUserpassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }

    })
}

let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};

            let isExist = await checkUserEmail(email);
            if (isExist) {
                //user already exist
                let user = await db.User.findOne({
                    attributes: ['email', 'roleId', 'password'],
                    where: { email: email },
                    raw: true,
                });
                if (user) {
                    //compare password

                    let check = await bcrypt.compareSync(password, user.password);//false
                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = 'OK';
                        delete user.password;
                        userData.user = user;
                    } else {
                        userData.errCode = 3;
                        userData.errMessage = 'Wrong password';
                    }
                } else {
                    userData.errCode = 2;
                    userData.errMessage = 'User not found'
                }

            } else {
                //return error
                userData.errCode = 1;
                userData.errMessage = "You's email isn't exist in your system. Please try other email"

            }
            resolve(userData)
        } catch (e) {
            reject(e)
        }
    })
}
let checkUserEmail = (useremail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: useremail }
            })
            if (user) {
                resolve(true)
            } else {
                resolve(false)
            }
        } catch (e) {
            reject(e);
        }

    })
}

let GetAllUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {

            let user = '';
            if (userId == 'ALL') {
                user = await db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    }
                })
            } if (userId && userId != 'ALL') {
                user = await db.User.findOne({
                    where: { id: userId },
                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            resolve(user)
        } catch (e) {
            reject(e);
        }
    })
}
let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let check = await checkUserEmail(data.email);
            if (check == true) {
                resolve({
                    errCode: 1,
                    errMessage: 'Your email is already in used.Plz try another email!'
                })
            } else {
                let hashPasswordFromBcypt = await hashUserpassword(data.password);
                await db.User.create({
                    email: data.email,
                    password: hashPasswordFromBcypt,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    phonenumber: data.phonenumber,
                    gender: data.gender == '1' ? true : false,
                    roleId: data.roleId,

                })
            }

            resolve({
                errCode: 0,
                message: 'OK'
            })
        } catch (e) {
            reject(e);
        }
    })
}

let deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        let user = await db.User.findOne({
            where: { id: userId }
        })
        if (!user) {
            resolve({
                errCode: 2,
                errMessage: 'The user is not exist!'
            })
        }
        await db.User.destroy({
            where: { id: userId }
        });

        resolve({
            errCode: 0,
            message: 'The user is deleted'

        })
    })


}
let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    errMessage: 'Missing required parameter'
                })
            }
            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false
            })
            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                await user.save();
                // firstName: data.firstName,
                // lastName: data.lastName,
                // address: data.address,


                resolve({
                    errCode: 0,
                    message: 'update the user succeeds!'
                });
            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'User not found! '
                });
            }
        } catch (e) {
            reject(e);
        }
    })

}

let getALlcodeService = (typeInput) => {
    return new Promise(async (resolve, reject) => {
        try {

            if (!typeInput) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing require parameters! ',
                })

            } else {
                let res = {};
                let allcode = await db.Allcode.findAll({
                    where: { type: typeInput }
                });
                res.errCode = 0;
                res.data = allcode;
                resolve(res);
            }

        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    handleUserLogin: handleUserLogin,
    GetAllUser: GetAllUser,
    createNewUser: createNewUser,
    deleteUser: deleteUser,
    updateUserData: updateUserData,
    getALlcodeService: getALlcodeService,
}