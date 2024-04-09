module.exports = (app) => {
  
  const controller = require('../controllers/controllers.js');
  
  const router = require('express').Router();
  const multer = require('multer');
  const storage = multer.memoryStorage(); 
  const upload = multer({ storage: storage });


  //USER GETTERS
  router.get("/getUsers", controller.getUsers);
  router.get("/getUserImage/:id", controller.getUserImage);
  //USER POSTER
  router.post('/addUser', upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'extra1', maxCount: 1 },
  ]), controller.addUser);
  //USER UPDATER
  router.put('/updateUser/:id', controller.updateUser); // Route for updating user
  //USER DELETER
  router.delete('/deleteUserByID/:id', controller.deleteUserByID); 

  app.use('/', router);
};
