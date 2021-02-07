const polka = require('polka')

const app = polka()

app.get('/api/:line/:station', require('./routes/apiRoute'))

module.exports = app
