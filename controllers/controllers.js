const { Model } = require("../models/models.js");


exports.getUsers = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content cannot be empty",
    });
    return;
  }
  Model.getUsers((err, data) => {
    if (err) {
      return res.status(500).send({
        message: err.message || "Some error message",
      });
    }
    res.send(data);
  });
};

exports.getUserImage = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content cannot be empty",
    });
    return;
  }
  Model.getUserImage(req.params.id, (err, data) => {
    if (err) {
      return res.status(500).send({
        message: err.message || "Some error occured",
      });
    }
    res.send(data);
  });
};

exports.addUser = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content cannot be empty",
    });
  }
  
  // const { image, extra1 } = req.files;
  const { image } = req.files;
  // if (!image) {
  //   res.status(400).send({
  //     message: "Main image is needed",
  //   });
  //   return;
  // }

  const userDetails = new Model({
    name: req.body.name,
    username: req.body.username,
    password: req.body.password,
    role: req.body.role,
    image: image[0] ? image[0].buffer : null,
    // extra1: extra1[0] ? extra1[0].buffer : null,


  });

  Model.addUser(userDetails, (err, result) => {
    if (err) {
      res.status(500).send({
        message: err.message || 'Internal Server Error',
      });
      return;
    }

    res.status(201).send(result); 
  });
};

exports.getVideo = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content cannot be empty",
    });
    return;
  }
  Model.getVideo(req.params.id, (err, data) => {
    if (err) {
      return res.status(500).send({
        message: err.message || "Some error occured",
      });
    }
    res.send(data);
  });
};

exports.updateValueById = (req, res) => {
  if (!req.body || !req.params.id || !req.body.incrementBy) {
    res.status(400).send({
      message: "Invalid request. Please provide user ID and increment value.",
    });
    return;
  }
  
  const user_id = req.params.id;
  const incrementBy = req.body.incrementBy;

  Model.updateValueById(user_id, incrementBy, (err, result) => {
    if (err) {
      res.status(500).send({
        message: err.message || 'Internal Server Error',
      });
      return;
    }

    res.status(200).send(result); 
  });
};



