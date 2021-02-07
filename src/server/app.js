const polka = require('polka')

const app = polka()

app.get('/api/:line/:station', require('./routes/apiRoute'))

app.get('/', require('./routes/homeRoute'))

module.exports = app
