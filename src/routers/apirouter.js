import { Router, json } from "express"
import { productosRouter } from "./productosrouter.js"
import { initRouter } from "./initrouter.js"
import { carritoRouter } from "./carritorouter.js"

export const apiRouter = Router()

apiRouter.use(json())
apiRouter.use('/productos', productosRouter)
apiRouter.use('/carritos', carritoRouter)
apiRouter.use('/dbInit', initRouter)
