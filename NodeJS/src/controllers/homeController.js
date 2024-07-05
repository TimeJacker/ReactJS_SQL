import { Json } from "sequelize/lib/utils";
import db from "../models/index"
import bodyParser from "body-parser";
import CRUDservices from "../services/CRUDservices";
let getHomepage = async (req, res) => {
    try {
        let data = await db.User.findAll();

        return res.render('homepage.ejs', {
            data: JSON.stringify(data)
        });
    } catch (e) {
        console.log(e);
    }

}

let postCRUD = async (req, res) => {
    let message = await CRUDservices.createNewUser(req.body);
    console.log(message)
    return res.send('post crud from server');
}

let getCRUD = (req, res) => {
    return res.render('crud.ejs')
}

let displayGETCRUD = async (req, res) => {
    let data = await CRUDservices.getAllUSer();

    return res.render('displaycrud.ejs', {
        dataTable: data
    })
}
let getEditCRUD = async (req, res) => {
    let userID = req.query.id;

    if (userID) {
        let userData = await CRUDservices.getUserInfoById(userID);

        return res.render('editCRUD.ejs', {
            user: userData
        });
    }
    else {
        return res.send('User not found')
    }

}
let putCRUD = async (req, res) => {
    let data = req.body;
    await CRUDservices.updateUserData(data);
    return res.send('update done!')
}

let deleteCRUD = async (req, res) => {
    let id = req.query.id;
    if (id) {
        await CRUDservices.deleteUserById(id);
        return res.send('Delete user succeed!')
    }
    else {
        return res.send('User not found')
    }
}
module.exports = {
    getHomepage: getHomepage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGETCRUD: displayGETCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD,
}