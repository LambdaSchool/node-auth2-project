const db = require("../../data/db-config");

const get = () => {
    return db("Users");
};

const findBy = (filter) => {
    return db("Users as u")
        .select("u.id", "u.username", "u.password", "u.department")
        .where(filter);
};

const insert = (user) => {
    return db.insert(user).into("Users");
};

module.exports = {
    get,
    findBy,
    insert,
};
