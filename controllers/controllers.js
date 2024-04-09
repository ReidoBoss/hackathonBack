const { Users } = require("../models/models.js");


//USERS
exports.getUsers = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content cannot be empty",
    });
    return;
  }
  Users.getUsers((err, agents) => {
    if (err) {
      return res.status(500).send({
        message: err.message || "Some error message",
      });
    }
    res.send(agents);
  });
};

exports.getUserImage = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content cannot be empty",
    });
    return;
  }
  Users.getUserImage(req.params.id, (err, user) => {
    if (err) {
      return res.status(500).send({
        message: err.message || "Some error occured",
      });
    }
    res.send(user);
  });
};

  //POSTER
  exports.addUser = (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "Content cannot be empty",
      });
    }
    
    const { image, extra1 } = req.files;

    if (!image) {
      res.status(400).send({
        message: "Main image is needed",
      });
      return;
    }
  
    const userDetails = new Users({
      username: req.body.username,
      password: req.body.password,
      role: req.body.role,
      text: req.body.text,

      image: image[0] ? image[0].buffer : null,
      extra1: extra1[0] ? extra1[0].buffer : null,


    });

    Users.addUser(userDetails, (err, result) => {
      if (err) {
        res.status(500).send({
          message: err.message || 'Internal Server Error',
        });
        return;
      }
  
      res.status(201).send(result); 
    });
};

// Update user by ID
exports.updateUser = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content cannot be empty",
    });
    return;
  }

  const userId = req.params.id;
  const updatedUserData = {
    username: req.body.username,
    password: req.body.password,
    role: req.body.role
  };

  Users.updateUser(userId, updatedUserData, (err, updatedUser) => {
    if (err) {
      if (err.kind === "not_found") {
        return res.status(404).send({
          message: `User with ID ${userId} not found`,
        });
      }
      return res.status(500).send({
        message: `Error updating user with ID ${userId}`,
      });
    }
    res.send(updatedUser);
  });
};

//USER DELETER
exports.deleteUserByID = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content cannot be empty",
    });
    return;
  }

  Users.deleteUserByID(req.params.id, (err, affectedRows) => {
    if (err) {
      return res.status(500).send({
        message: err.message || "Some error occurred while deleting the user",
      });
    }

    if (affectedRows === 0) {
      return res.status(404).send({
        message: `User with ID ${req.params.id} not found`,
      });
    }

    res.send({
      message: "User deleted successfully",
    });
  });
};
 