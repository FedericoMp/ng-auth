 ```javascript
 //promise async / await
 exports.getEvents = (req, res) => {
     const closeConnection = async () => {
         const createQuery = new Promise((resolve, reject) => {
             const q = {
                 sql: 'SELECT * FROM events',
                 timeout: 40000
             };
             connection.query(q, (err, rows, fields) => {
                 (!err)
                     ? resolve({db: rows})
                     : reject({ errMsj: `Something wrong was happened: ${err}` });
             });
         });
         const data = await createQuery;
         connection.end( err => {
             if (!err) {
                 console.log({ successMsj: 'Data loaded succesful, closed connection'})
                 res.json(data);
             } else {
                 console.log({ errMsj: `Something wrong was happened: ${err}` });
                 res.json({ errMsj: `Something wrong was happened: ${err}` });
             }
         });
     };
     closeConnection()
         .then()
         .catch(e => console.log(e));

 };

// simple promis
 exports.getEvents = (req, res) => {
    const createQuery = new Promise((resolve, reject) => {
            const q = {
                sql: 'SELECT * FROM events',
                timeout: 40000
            };
            connection.query(q, (err, rows, fields) => {
                (!err)
                    ? resolve({db: rows})
                    : reject({ errMsj: `Something wrong was happened: ${err}` });
            });
        });
    // esto funciona, pero si se cierra la conexion a la bdd no se pueden hacer mas request
    // const closeConnection = (queryResult) => {
    //     return new Promise((resolve, reject) => {
    //         connection.end( err => {
    //             if (!err) {
    //                 console.log({ successMsj: 'Data loaded succesful, closed connection'})
    //                 resolve(queryResult)
    //             } else {
    //                 reject({ errMsj: `Something wrong was happened: ${err}` });
    //             }
    //         })
    //     });
    // };
    return createQuery
        .then(data => res.json(data))
        // .then(data => closeConnection(data))
        // .then(msj => res.json(msj))
        .catch(e => res.json(e))
        .finally( () => console.log('request completed'));
};
 ```