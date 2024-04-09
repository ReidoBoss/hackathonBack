const sql = require("../config/config.js");

const Users = function (users){
  this.username = users.username;
  this.password = users.password;
  this.role = users.role;
  
  this.text = users.text;
  this.image = users.image;
  this.extra1 = users.extra1;


}

//USERS AUTH

Users.getUsers = (result) => {
  sql.query(
    "SELECT user_id,username, password,role FROM users",
    (err, res) => {
      if (err) {
        console.log("Error in executing users table query: ", err);
        result(err, null);
        return;
      }
      const userDetails = res.map((row) => ({
        user_id: row.user_id,
        username: row.username,
        password: row.password,
        role: row.role,
      }));

      console.log(...userDetails);
      result(null, userDetails);
    }
  );
};
  //USER GETTER BY ID
Users.getUserImage = (user_id, result) => {
    sql.query(
      "SELECT  * FROM user_image WHERE user_id= ? ",
      [user_id],
      (error, queryResult) => {
        if (error) {
          console.log("Error in executing user table query", error);
          result(error, null);
          return;
        }
        const userDetails = queryResult.map((row) => ({
          user_id: row.user_id,
          image: row.image,

        }));
        result(null, userDetails);
      }
    );
};


  //USER POSTER
  Users.addUser = (newUser, result) => {
  sql.query(
    "INSERT INTO users SET ?",
    {
      username: newUser.username,
      password: newUser.password,
      role: newUser.role,

    },
    (error, results) => {
      if (error) {
        console.log("Error: ", error);
        result(error, null);
        return;
      }

      const user_id = results.insertId;
      console.log(user_id);
      sql.query(
        "INSERT INTO user_image SET ?",
        {
          user_id: user_id,
          text : newUser.text,
          image : newUser.image,
          extra1 : newUser.extra1,
        });



      result(null, { ...newUser });
    }
  );
};

//USER EDITTOR
// Update user method
Users.updateUser = (userId, updatedUser, result) => {
  sql.query(
    "UPDATE users SET username = ?, password = ?, role = ? WHERE user_id = ?",
    [updatedUser.username, updatedUser.password, updatedUser.role, userId],
    (error, res) => {
      if (error) {
        console.log("Error in updating user:", error);
        result(error, null);
        return;
      }
      if (res.affectedRows === 0) {
        result({ kind: "not_found" }, null);
        return;
      }
      console.log(`${updatedUser.password}`);
      result(null, { id: userId, ...updatedUser });
    }
  );
};


module.exports.Users = Users;
