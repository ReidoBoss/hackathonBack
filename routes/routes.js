module.exports = (app) => {

    const controller = require('../controllers/controllers.js');

    const router = require('express').Router();
    const multer = require('multer');
    const storage = multer.memoryStorage();
    const upload = multer({ storage: storage });


    // GETTERS
    router.get("/getUsers", controller.getUsers);
    router.get("/getJobs", controller.getJobs);

    router.get("/getUserImage/:id", controller.getUserImage);
    router.get("/getVideo/:id", controller.getVideo);
    // POSTER
    router.post('/addUser', upload.fields([
        { name: 'picture', maxCount: 1 },
    ]), controller.addUser);

    router.post('/addEmployer', upload.fields([
        { name: 'image', maxCount: 1 },
    ]), controller.addEmployer);
    router.post('/addJob', upload.fields([
        { name: 'image', maxCount: 1 },
    ]), controller.addJob);

    router.post('/sendMail', upload.fields([]), controller.sendMail);

    // UPDATER
    router.put('/updateValueById/:id', controller.updateValueById);

    app.use('/', router);
};