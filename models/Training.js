const sql = require("./db");

// constructor
const Training = function (training) {
    this.reps = training.reps;
    this.value = training.value;
    this.exerciseID = training.exerciseID;
    this.workoutplanID = training.workoutplanID;
    this.done = training.done;
};

Training.create = (newTraining, result) => {
    sql.query("INSERT INTO training SET ?", newTraining, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created training: ", { id: res.insertId, ...newTraining });
        result(null, { id: res.insertId, ...newTraining });
    });
};

Training.findById = (workoutplanID, result) => {
    sql.query(`SELECT t.*, t.reps, t.value, e.name as exercise_name, u.name as unit_name, c.name as category_name
    FROM training t 
    LEFT JOIN exercise e ON t.exerciseID=e.exerciseID 
    LEFT JOIN unit u ON e.unitID=u.unitID
    LEFT JOIN category c ON e.categoryID=c.categoryID
    WHERE t.workoutplanID = ${workoutplanID}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
            result(null, res);
    });
};

Training.findByTrainingId = (trainingID, result) => {
    sql.query(`SELECT t.*, t.reps, t.value, e.name as exercise_name, u.name as unit_name, c.name as category_name, c.categoryID
    FROM training t 
    LEFT JOIN exercise e ON t.exerciseID=e.exerciseID 
    LEFT JOIN unit u ON e.unitID=u.unitID
    LEFT JOIN category c ON e.categoryID=c.categoryID
    WHERE t.trainingID = ${trainingID}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
            result(null, res);
    });
};

Training.getAll = result => {
    sql.query("SELECT * FROM training", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        //console.log("training: ", res);
        result(null, res);
    });
};


Training.updateById = (id, training, result) => {
    sql.query(
        "UPDATE training SET reps = ?, value = ?, exerciseID = ?, workoutplanID = ?, done =? WHERE trainingID = ?",
        [ training.reps, training.value, training.exerciseID, training.workoutplanID, training.done, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            if (res.affectedRows == 0) {
                // not found training with the id
                result({ kind: "not_found" }, null);
                return;
            }
            console.log("updated training: ", { id: id, ...training });
            result(null, { id: id, ...training });
        }
    );
};

Training.remove = (id, result) => {
    sql.query("DELETE FROM training WHERE trainingID = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            // not found training with the id
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("deleted training with id: ", id);
        result(null, res);
    });
};

Training.removeAll = result => {
    sql.query("DELETE FROM training", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        //console.log(`deleted ${res.affectedRows} trainings`);
        result(null, res);
    });
};

module.exports = Training;