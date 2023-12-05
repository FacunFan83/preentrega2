import express from 'express'
import { connect } from 'mongoose'
import { PORT, MONGODB_CNX_STR } from './config.js'
import { apiRouter } from './routers/apirouter.js'
const app = express()

await connect(MONGODB_CNX_STR)
console.log(`Base de datos conectada en ${MONGODB_CNX_STR}`)
app.use("/api", apiRouter)

app.listen(PORT, () => {
    console.log (`Conectado al puerto ${PORT}`)
})
