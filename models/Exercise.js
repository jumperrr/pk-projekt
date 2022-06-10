const sql = require("./db");

// constructor
const Exercise = function (exercise) {
    this.name = exercise.name;
    this.categoryID = exercise.categoryID;
    this.unitID = exercise.unitID;
};

Exercise.create = (exercise, result) => {
    sql.query("INSERT INTO exercise SET ?", exercise, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created exercise: ", { id: res.insertId, ...exercise });
        result(null, { id: res.insertId, ...exercise });
    });
};

Exercise.findById = (exerciseId, result) => {
    sql.query(`SELECT * FROM exercise WHERE exerciseID = ${exerciseId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("found exercise: ", res[0]);
            result(null, res[0]);
            return;
        }
        // not found exercise with the id
        result({ kind: "not_found" }, null);
    });
};


Exercise.getAll = result => {
    sql.query("SELECT * FROM exercise", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        //console.log("exercise: ", res);
        result(null, res);
    });
};

Exercise.updateById = (id, exercise, result) => {
    sql.query(
        "UPDATE exercise SET name = ?, categoryID = ?, unitID = ? WHERE exerciseID = ?",
        [ exercise.name, exercise.categoryID, exercise.unitID, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            if (res.affectedRows == 0) {
                // not found Exercise with the id
                result({ kind: "not_found" }, null);
                return;
            }
            console.log("updated exercise: ", { id: id, ...exercise });
            result(null, { id: id, ...exercise });
        }
    );
};

Exercise.remove = (id, result) => {
    sql.query("DELETE FROM exercise WHERE exerciseID = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            // not found Exercise with the id
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("deleted exercise with id: ", id);
        result(null, res);
    });
};

Exercise.removeAll = result => {
    sql.query("DELETE FROM exercise", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        //console.log(`deleted ${res.affectedRows} exercises`);
        result(null, res);
    });
};

module.exports = Exercise;