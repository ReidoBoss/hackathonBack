const sql = require("../config/config.js");

const Model = function (model){
  // //users
  // this.name = model.name;

  // this.username = model.username;
  // this.password = model.password;
  // this.email = model.email;
  // this.role = model.role;

  // //BLOBS
  //   //images
  // this.image = model.image;
  // this.image1 = model.image1;

  //   //video
  // this.video_id = model.video_id;
  // this.video = model.video;

  // //Incrementable or Edittable
  // this.value = model.value;
  // this.value1 = model.value1;
  // this.value2 = model.value2;
  
  //CANDIDATE
  this.candidate_id = model.candidate_id;
  this.first_name = model.first_name;
  this.middle_name = model.middle_name;
  this.last_name = model.last_name;
  this.email = model.email;
  this.birthdate = model.birthdate;
  this.gender = model.gender;
  this.school_grad = model.school_grad;
  this.experience = model.experience;
  this.username = model.username;
  this.password = model.password;
  this.skills = model.skills;
  this.objective = model.objective;
  this.position = model.position;
  this.achievements = model.achievements;
  this.picture = model.picture;

  //EMPLOYER
  this.employer_id = model.employer_id;
  this.company_name = model.company_name;
  this.employer_name = model.employer_name;
  this.jobs_posted = model.jobs_posted;
  this.email = model.email;
  this.image = model.image;

  //job
  this.job_id = model.job_id;
  this.salary = model.salary;
  this.position = model.position;
  this.likes = model.likes;
  this.job_type = model.job_type;
  this.experience = model.experience;
  this.job_title = model.job_title;
  this.job_description = model.job_description;
  this.step1 = model.step1;
  this.step2 = model.step2;
  this.step3 = model.step3;
  this.step4 = model.step4;
  this.step5 = model.step5;
  this.location = model.location;





}

Model.getUsers = (result) => {
  sql.query(
    "SELECT * FROM users",
    (err, res) => {
      if (err) {
        console.log("Error in executing users table query: ", err);
        result(err, null);
        return;
      }
      const data = res.map((row) => ({
        user_id: row.user_id,
        name: row.name,
        username: row.username,
        password: row.password,
        role: row.role,
      }));

      console.log(...data);
      result(null, data);
    }
  );
};

Model.getUserImage = (user_id, result) => {
  sql.query(
    "SELECT  * FROM users WHERE user_id= ? ",
    [user_id],
    (error, queryResult) => {
      if (error) {
        console.log("Error in executing table query", error);
        result(error, null);
        return;
      }
      const data = queryResult.map((row) => ({
        user_id: row.user_id,
        image: row.image,

      }));
      result(null, data);
    }
  );
};

Model.addUser = (newUser, result) => {
  sql.query(
    "INSERT INTO candidate SET ?",
    {
      first_name: newUser.first_name,
      middle_name: newUser.middle_name,
      last_name: newUser.last_name,
      email: newUser.email,
      birthdate: newUser.birthdate,
      gender: newUser.gender,
      school_grad: newUser.school_grad,
      experience: newUser.experience,
      username: newUser.username,
      password: newUser.password,
      skills: newUser.skills,
      objective: newUser.objective,
      position: newUser.position,
      achievements: newUser.achievements,
      picture: newUser.picture,

    },
    (error, results) => {
      if (error) {
        console.log("Error: ", error);
        result(error, null);
        return;
      }
      // const user_id = results.insertId;
      // sql.query(
      //   "INSERT INTO user_image SET ?",
      //   {
      //     user_id: user_id,
      //     text : newUser.text,
      //     image : newUser.image,
      //     extra1 : newUser.extra1,
      //   });
      result(null, { ...newUser });
    }
  );
};

Model.addEmployer = (newUser, result) => {
  sql.query(
    "INSERT INTO employer SET ?",
    {
      company_name: newUser.company_name,
      employer_name: newUser.employer_name,
      jobs_posted:0,
      email: newUser.email,

      image: newUser.image,

    },
    (error, results) => {
      if (error) {
        console.log("Error: ", error);
        result(error, null);
        return;
      }

      result(null, { ...newUser });
    }
  );
};

Model.addJob = (newUser, result) => {
  sql.query(
    "INSERT INTO job SET ?",
    {
      employer_id : newUser.employer_id,
      salary : newUser.salary,
      position : newUser.position,
      likes : '0',
      job_type : newUser.job_type,
      experience : newUser.experience,
      job_title : newUser.job_title,
      job_description : newUser.job_description,
      step1 : newUser.step1,
      step2 : newUser.step2,
      step3 : newUser.step3,
      step4 : newUser.step4,
      step5 : newUser.step5,
      location : newUser.location,
      image : newUser.image,


    },
    (error, results) => {
      if (error) {
        console.log("Error: ", error);
        result(error, null);
        return;
      }

      result(null, { ...newUser });
    }
  );
};


Model.getVideo = (video_id, result) => {
  sql.query(
    "SELECT  * FROM video WHERE video_id= ? ",
    [video_id],
    (error, queryResult) => {
      if (error) {
        console.log("Error in executing table query", error);
        result(error, null);
        return;
      }
      const data = queryResult.map((row) => ({
        video_id: row.video_id,
        video: row.video,
      }));
      result(null, data);
    }
  );
};

// value updater
Model.updateValueById = (id, incrementBy, result) => {
  sql.query(
    "UPDATE increment SET value = value + ? WHERE id = ?",
    [incrementBy, id],
    (error, queryResult) => {
      if (error) {
        console.log("Error in executing table query", error);
        result(error, null);
        return;
      }
      result(null, "Value updated successfully");
    }
  );
};











module.exports.Model = Model;
