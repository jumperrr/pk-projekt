const sql = require("./db");

// constructor
const Category = function (category) {
    this.name = category.name;
};

Category.create = (category, result) => {
    sql.query("INSERT INTO category SET ?", category, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created category: ", { id: res.insertId, ...category });
        result(null, { id: res.insertId, ...category });
    });
};

Category.findById = (categoryId, result) => {
    sql.query(`SELECT * FROM category WHERE categoryID = ${categoryId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("found category: ", res[0]);
            result(null, res[0]);
            return;
        }
        // not found category with the id
        result({ kind: "not_found" }, null);
    });
};

Category.getAll = result => {
    sql.query("SELECT * FROM category", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        //console.log("category: ", res);
        result(null, res);
    });
};

Category.updateById = (id, category, result) => {
    sql.query(
        "UPDATE category SET name = ? WHERE categoryID = ?",
        [ category.name, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            if (res.affectedRows == 0) {
                // not found category with the id
                result({ kind: "not_found" }, null);
                return;
            }
            console.log("updated category: ", { id: id, ...category });
            result(null, { id: id, ...category });
        }
    );
};

Category.remove = (id, result) => {
    sql.query("DELETE FROM category WHERE categoryID = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            // not found category with the id
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("deleted category with id: ", id);
        result(null, res);
    });
};

Category.removeAll = result => {
    sql.query("DELETE FROM category", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        //console.log(`deleted ${res.affectedRows} categories`);
        result(null, res);
    });
};

module.exports = Category;