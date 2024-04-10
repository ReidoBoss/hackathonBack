const { Model } = require("../models/models.js");
const { sendEmail } = require('../emailHelper/emailHelper'); // Adjust the path accordingly


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


exports.sendMail = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content cannot be empty",
    });
  }
  
  const newUserEmail = req.body.email;
  const welcomeSubject = req.body.subject;
  const welcomeMessage = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to Our App</title>
      <style>
          /* Reset styles */
          body, h1, p {
              margin: 0;
              padding: 0;
          }
  
          /* Container styles */
          .container {
              width: 100%;
              max-width: 600px;
              margin: 0 auto;
              font-family: Arial, sans-serif;
              background: linear-gradient(to bottom, #1a237e, #0d47a1);
              padding: 20px;
              border-radius: 20px;
              box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
              color: #fff;
              position: relative;
              overflow: hidden;
          }
  
          /* Header styles */
          .header {
              text-align: center;
          }
  
          /* Logo styles */
          .logo {
              width: 150px;
              height: auto;
              margin-bottom: 20px;
          }
  
          /* Content styles */
          .content {
              background-color: #fff;
              padding: 20px;
              border-radius: 15px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              color: #333;
          }
  
          /* Title styles */
          .title {
              font-size: 32px;
              margin-bottom: 20px;
              text-align: center;
              color: #0d47a1; /* Dark blue */
          }
  
          /* Message styles */
          .message {
              font-size: 18px;
              line-height: 1.6;
              color: #555;
              margin-bottom: 20px;
          }
  
          /* Button styles */
          .button {
              display: inline-block;
              background-color: #ff6600; /* Orange */
              color: #fff;
              text-decoration: none;
              padding: 15px 30px;
              border-radius: 10px;
              transition: background-color 0.3s ease;
              font-size: 20px;
          }
  
          .button:hover {
              background-color: #e65100; /* Darker orange */
          }
  
          /* Decorative styles */
          .decor {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background-image: url('https://i.ibb.co/N9h5kXt/stars.png');
              background-size: cover;
              background-position: center;
              z-index: -1;
              pointer-events: none;
              animation: twinkle 10s linear infinite;
          }
  
          @keyframes twinkle {
              0% { opacity: 1; }
              50% { opacity: 0.8; }
              100% { opacity: 1; }
          }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="decor"></div>
          <div class="header">
              <img src="https://upload.wikimedia.org/wikipedia/commons/e/e8/Tesla_logo.png" alt="Logo" class="logo">
          </div>
          <div class="content">
              <p class="title">Welcome to Our App</p>
             ${req.body.message}
              <a href="#" class="button">Get Started</a>
          </div>
      </div>
  </body>
  </html>
  
  
  
  `;

  sendEmail(newUserEmail, welcomeSubject, welcomeMessage);

  res.status(201).send(); 
};

exports.addUser = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content cannot be empty",
    });
  }
  
  // const { image, extra1 } = req.files;
  const { picture } = req.files;
  // if (!image) {
  //   res.status(400).send({
  //     message: "Main image is needed",
  //   });
  //   return;
  // }



  const details = new Model({
    first_name: req.body.first_name,
    middle_name: req.body.middle_name,
    last_name: req.body.last_name,
    email: req.body.email,
    birthdate: req.body.birthdate,
    gender: req.body.gender,
    school_grad: req.body.school_grad,
    experience: req.body.experience,
    username: req.body.username,
    password: req.body.password,
    skills: req.body.skills,
    objective: req.body.objective,
    position: req.body.position,
    achievements: req.body.achievements,

    picture: picture[0] ? picture[0].buffer : null,
    // extra1: extra1[0] ? extra1[0].buffer : null,


  });

  Model.addUser(details, (err, result) => {
    if (err) {
      res.status(500).send({
        message: err.message || 'Internal Server Error',
      });
      return;
    }

    res.status(201).send(result); 
  });
};

exports.addEmployer = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content cannot be empty",
    });
  }
  
  const { image } = req.files;

  const details = new Model({
    company_name: req.body.company_name,
    employer_name: req.body.employer_name,
    email: req.body.email,
    image: image[0] ? image[0].buffer : null,


  });

  Model.addEmployer(details, (err, result) => {
    if (err) {
      res.status(500).send({
        message: err.message || 'Internal Server Error',
      });
      return;
    }

    res.status(201).send(result); 
  });
};

exports.addJob = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content cannot be empty",
    });
  }
  console.log("yeah",req.body)
  
  const { image } = req.files;

  const details = new Model({
    employer_id : req.body.employer_id,
    salary : req.body.salary,
    position : req.body.position,
    job_type : req.body.job_type,
    experience : req.body.experience,
    job_title : req.body.job_title,
    job_description : req.body.job_description,
    step1 : req.body.step1,
    step2 : req.body.step2,
    step3 : req.body.step3,
    step4 : req.body.step4,
    step5 : req.body.step5,
    location : req.body.location,

    image: image[0] ? image[0].buffer : null,


  });

  Model.addJob(details, (err, result) => {
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



