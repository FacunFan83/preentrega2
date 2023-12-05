import { Router } from 'express'
import { Producto } from '../models/productos.mongoose.js'

export const productosRouter = Router()

productosRouter.get('/', async (req, res) => {
    const filtro = (!req.query.filtro) ? '' : { category: req.query.filtro }
    const itemsPorPagina = (!req.query.itemsPorPagina) ? 10 : req.query.itemsPorPagina
    const pagina = (!req.query.pagina) ? 1 : req.query.pagina
    const paginado = await Producto.paginate( filtro , { limit: itemsPorPagina, page: pagina })
    res.json (paginado)
    // const productos = await Producto.find()
    // res.json(productos)
})

productosRouter.get('/:pid', async (req, res) => {
    const productoPorId = await Producto.findById(req.params.pid)
    if (!productoPorId) {
        return res.status(404).json({ message: 'El producto buscado no existe en la base de datos' })
    }
    res.json(productoPorId)
})

productosRouter.post('/', async (req, res) => {
    try {
        const nuevoProducto = await Producto.create(req.body)
        res.status(201).json(nuevoProducto)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

productosRouter.put('/:pid', async (req, res) => {
    if (req.body.code) {
        return res.status(400).json(`No se puede modificar el código del producto`)
    }
    
    const updProducto = await Producto.findByIdAndUpdate(
        req.params.pid,
        { $set: req.body },
        { new: true }
    )
    if (!updProducto) {
        return res.status(404).json(`El producto con id ${req.params.pid} no se encontró`)
    }
    res.json(updProducto)
})

productosRouter.delete('/:pid', async (req, res) => {
    const delProducto = await Producto.findByIdAndDelete(
        req.params.pid
    )
    if (!delProducto) {
        return res.status(404).json(`El producto con id ${req.params.pid} no se encontró`)
    }
    res.json(delProducto)
})