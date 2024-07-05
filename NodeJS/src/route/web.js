import express from "express";
import homeController from "../controllers/homeController";
import usercontroller from "../controllers/usercontroller";
let router = express.Router();

let initWebRouters = (app) => {
    router.get('/', homeController.getHomepage);

    router.get('/crud', homeController.getCRUD);
    router.post('/post-crud', homeController.postCRUD);
    router.get('/get-crud', homeController.displayGETCRUD);
    router.get('/edit-crud', homeController.getEditCRUD);
    router.post('/put-crud', homeController.putCRUD);
    router.get('/delete-crud', homeController.deleteCRUD);

    router.post('/api/login', usercontroller.handleLogin)

    return app.use("/", router);
}

module.exports = initWebRouters