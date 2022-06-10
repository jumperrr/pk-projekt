const sql = require("./db");

// constructor
const Workoutplan = function (workoutplan) {
    this.date = workoutplan.date;
    this.userID = workoutplan.userID;
    this.name = workoutplan.name;
};

Workoutplan.create = (workoutplan, result) => {
    sql.query("INSERT INTO workoutplan SET ?", workoutplan, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created workoutplan: ", { id: res.insertId, ...workoutplan });
        result(null, { id: res.insertId, ...workoutplan });
    });
};

/* Workoutplan.findById = (workoutplanId, result) => {
    sql.query(`SELECT * FROM workoutplan WHERE workoutplanId = ${workoutplanId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("found workoutplan: ", res[0]);
            result(null, res[0]);
            return;
        }
        // not found user with the id
        result({ kind: "not_found" }, null);
    });
}; */

Workoutplan.findByUserId = (userId, result) => {
    sql.query(`SELECT * FROM workoutplan WHERE userId = ${userId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        //console.log("workoutplan: ", res);
        result(null, res);
    });
};

 Workoutplan.getAll = result => {
    sql.query("SELECT * FROM workoutplan", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        //console.log("workoutplan: ", res);
        result(null, res);
    });
};

Workoutplan.updateById = (id, workoutplan, result) => {
    sql.query(
        "UPDATE workoutplan SET date = ?, userID = ?, name = ? WHERE workoutplanID = ?",
        [workoutplan.date, workoutplan.userID, workoutplan.name, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            if (res.affectedRows == 0) {
                // not found workoutplan with the id
                result({ kind: "not_found" }, null);
                return;
            }
            console.log("updated workoutplan: ", { id: id, ...workoutplan });
            result(null, { id: id, ...workoutplan });
        }
    );
};

Workoutplan.remove = (id, result) => {
    sql.query("DELETE FROM workoutplan WHERE workoutplanID = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            // not found workoutplan with the id
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("deleted workoutplan with id: ", id);
        result(null, res);
    });
};

Workoutplan.removeAll = result => {
    sql.query("DELETE FROM workoutplan", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        //console.log(`deleted ${res.affectedRows} workoutplans`);
        result(null, res);
    });
}; 

module.exports = Workoutplan;