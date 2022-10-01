require('dotenv').config()
require('./src/routes')

const app = require('./src/server')
require('./database')

app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`)
})
