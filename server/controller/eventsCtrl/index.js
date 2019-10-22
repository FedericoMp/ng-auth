// este archivo no se usa, se usan las funciones por separado, este archivo agrupa todo
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