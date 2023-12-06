import express from 'express'
import { connect } from 'mongoose'
import { PORT, MONGODB_CNX_STR } from './config.js'
import { apiRouter } from './routers/apirouter.js'
import { webRouter } from './routers/webRouter.js'
import { engine } from 'express-handlebars'

const app = express()
app.engine ('handlebars', engine())
app.set('views', './views')
app.set('view engine', 'handlebars')
app.use('/static', express.static('./static'))

await connect(MONGODB_CNX_STR)
console.log(`Base de datos conectada en ${MONGODB_CNX_STR}`)
app.use("/api", apiRouter)
app.use('/', webRouter)

app.listen(PORT, () => {
    console.log (`Conectado al puerto ${PORT}`)
})
