const polka = require('polka')
const serveStatic = require('serve-static')

const app = polka()

app.use('/static', serveStatic('./public'))

app.get('/api/:line/:station', require('./routes/apiRoute'))

app.get('/', require('./routes/homeRoute'))

module.exports = app
