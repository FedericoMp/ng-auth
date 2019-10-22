const {connection} = require('../../db/mysql');

exports.getEvent = (req, res) => {
    const getOne = (id) => {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM events WHERE id_event = ?';
            connection.query(sql, id, (err, row, fields) => {
                (!err)
                    ? resolve({event: row[0]})
                    : reject({errMsj: `Something wrong was happened: ${err}`});
            });
        });
    };
    const {id} = req.params;
    return getOne(id)
            .then(data => res.json(data))
            .catch(err => res.json(err))
            .finally(() => console.log('get event by id, request completed'));
};