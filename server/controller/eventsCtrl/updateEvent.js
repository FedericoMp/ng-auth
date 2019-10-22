const {connection} = require('../../db/mysql');

exports.updateEvent = (req, res) => {
    const update = (name, description, date, image, id) => {
        return new Promise((resolve, reject) => {
            const sql = `UPDATE events SET name = ?, description = ?, date = ?, image = ? WHERE id_event = ?;`;
            connection.query(sql, [name, description, date, image, id], (err, row, fields) => {
                (!err)
                ? resolve({successMsj: `Event udated`})
                : reject({errMsj: `Something wrong was happened: ${err}`});
            });
        });
    };
    const {name, description, date, image} = req.body;
    const {id} = req.params;
    return update(name, description, date, image, id)
            .then(msj => res.json(msj))
            .catch(err => res.json(err))
            .finally(() => { console.log('the event was updated')});
};