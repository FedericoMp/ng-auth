const {connection} = require('../../db/mysql');

exports.getEvents = (req, res) => {
    const getAll = new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM events';
            connection.query(sql, (err, rows, fields) => {
                (!err)
                    ? resolve({events: rows})
                    : reject({ errMsj: `Something wrong was happened: ${err}` });
            });
    });
    return getAll
        .then(data => res.json(data))
        .catch(e => res.json(e))
        .finally(() => console.log('get all events, request completed'));
};