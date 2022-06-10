const sql = require("./db");

// constructor
const Unit = function(unit) {
    this.name = unit.name;
  };
  
  Unit.create = (newUnit, result) => {
    sql.query("INSERT INTO unit SET ?", newUnit, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created unit: ", { id: res.insertId, ...newUnit });
      result(null, { id: res.insertId, ...newUnit });
    });
  };


Unit.findById = (unitId, result) => {
    sql.query(`SELECT * FROM unit WHERE unitID = ${unitId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("found unit: ", res[0]);
            result(null, res[0]);
            return;
        }
        // not found unit with the id
        result({ kind: "not_found" }, null);
    });
};

Unit.getAll = result => {
    sql.query("SELECT * FROM unit", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        //console.log("unit: ", res);
        result(null, res);
    });
};

Unit.updateById = (id, unit, result) => {
    sql.query(
        "UPDATE unit SET name = ? WHERE unitID = ?",
        [ unit.name, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            if (res.affectedRows == 0) {
                // not found Unit with the id
                result({ kind: "not_found" }, null);
                return;
            }
            console.log("updated unit: ", { id: id, ...unit });
            result(null, { id: id, ...unit });
        }
    );
};

Unit.remove = (id, result) => {
    sql.query("DELETE FROM unit WHERE unitID = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            // not found Unit with the id
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("deleted unit with id: ", id);
        result(null, res);
    });
};

Unit.removeAll = result => {
    sql.query("DELETE FROM unit", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        //console.log(`deleted ${res.affectedRows} units`);
        result(null, res);
    });
}; 

module.exports = Unit;