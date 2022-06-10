const sql = require("./db");

// constructor
const User = function (user) {
    this.name = user.name;
    this.email = user.email;
    this.password = user.password;
};

User.create = (user, result) => {
    sql.query("INSERT INTO user SET ?", user, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created user: ", { id: res.insertId, ...user });
        result(null, { id: res.insertId, ...user });
    });
};

User.findById = (userId, result) => {
    sql.query(`SELECT * FROM user WHERE userID = ${userId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("found user: ", res[0]);
            result(null, res[0]);
            return;
        }
        // not found user with the id
        result({ kind: "not_found" }, null);
    });
};

User.findByEmail = (user, result) => {
    sql.query(`SELECT * FROM user WHERE email = '${user.email}'`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("found user: ", res[0]);
            result(null, res[0]);
            return;
        }
        // not found user with the id
        result({ kind: "not_found" }, null);
    });
};

User.getAll = result => {
    sql.query("SELECT * FROM user", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        //console.log("user: ", res);
        result(null, res);
    });
};

User.updateById = (id, user, result) => {
    sql.query(
        "UPDATE user SET name = ?, email = ?, password = ? WHERE userID = ?",
        [user.name, user.email, user.password, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            if (res.affectedRows == 0) {
                // not found User with the id
                result({ kind: "not_found" }, null);
                return;
            }
            console.log("updated user: ", { id: id, ...user });
            result(null, { id: id, ...user });
        }
    );
};

User.remove = (id, result) => {
    sql.query("DELETE FROM user WHERE userID = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            // not found User with the id
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("deleted user with id: ", id);
        result(null, res);
    });
};

User.removeAll = result => {
    sql.query("DELETE FROM user", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        //console.log(`deleted ${res.affectedRows} users`);
        result(null, res);
    });
};

User.isValidPassword = async function(passwrodFromDB, password){
    //Hashes the password sent by the user for login and checks if the hashed password stored in the 
    //database matches the one sent. Returns true if it does else false.
    const compare = await bcrypt.compare(password, passwrodFromDB);
    return compare;
}

module.exports = User;