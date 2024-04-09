const sql = require("../config/config.js");

const Model = function (model){
  //users
  this.name = model.name;

  this.username = model.username;
  this.password = model.password;
  this.role = model.role;

  //BLOBS
    //images
  this.image = model.image;
  this.image1 = model.image1;

    //video
  this.video_id = model.video_id;
  this.video = model.video;

  //Incrementable or Edittable
  this.value = model.value;
  this.value1 = model.value1;
  this.value2 = model.value2;





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
    "INSERT INTO users SET ?",
    {
      name: newUser.name,
      username: newUser.username,
      password: newUser.password,
      role: newUser.role,
      image : newUser.image,

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
