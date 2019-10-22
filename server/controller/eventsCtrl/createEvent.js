const {connection} = require('../../db/mysql');

exports.createEvent = (req, res) => {
    const create = (name, description, date, image) => {
        return new Promise((resolve, reject) => {
            const sql = `INSERT INTO events(name, description, date, image) VALUES(?, ?, ?, ?);`;
            connection.query(sql, [name, description, date, image], (err, row, fields) => {
                (!err)
                ? resolve({successMsj: `Event created`})
                : reject({errMsj: `Something wrong was happened: ${err}`});
            });
        });
    };
    const {name, description, date, image} = req.body;
    return create(name, description, date, image)
            .then(msj => res.json(msj))
            .catch(err => res.json(err))
            .finally(() => console.log('the event was created'));
};