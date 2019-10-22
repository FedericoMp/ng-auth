const express = require('express');
const bodyParser = require('body-parser');
const main = require('./routes');
const events = require('./routes/events');

const PORT = 3000;
const app = express();

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());

app.get('', (req, res) => res.redirect('/api'));
app.use('/api', main);
app.use('/api', events);

app.listen(app.get('port'), () => {
    console.log(`server running on ${PORT}`);
});