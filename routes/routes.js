module.exports = (app) => {
  
  const controller = require('../controllers/controllers.js');
  
  const router = require('express').Router();
  const multer = require('multer');
  const storage = multer.memoryStorage(); 
  const upload = multer({ storage: storage });


  // GETTERS
  router.get("/getUsers", controller.getUsers);

  router.get("/getUserImage/:id", controller.getUserImage);
  router.get("/getVideo/:id", controller.getVideo);
  // POSTER
  router.post('/addUser', upload.fields([
    { name: 'image', maxCount: 1 },
  ]), controller.addUser);
  // UPDATER
  router.put('/updateValueById/:id', controller.updateValueById);

  app.use('/', router);
};
