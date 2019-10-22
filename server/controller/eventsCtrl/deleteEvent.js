const {connection} = require('../../db/mysql');

exports.deleteEvent = (req, res) => {
    const deleteOne = (id) => {
        return new Promise((resolve, reject) => {
            const sql = 'DELETE FROM events WHERE id_event = ?;';
            connection.query(sql, [id], (err, row, fields) => {
                (!err)
                ? resolve({successMesj: `Event deleted...`})
                : reject({errMsj: `Something wrong was happened: ${err}`});
            });
        });
    };
    const {id} = req.params;
    return deleteOne(id)
            .then(msj => res.json(msj))
            .catch(err => res.json(err))
            .finally(() => console.log('the event was deleted'));
};