import { Router } from 'express'
import { Carrito } from '../models/carrito.mongoose.js'
export const carritoRouter = Router()

carritoRouter.get('/', async (req, res) => {
    const carritos = await Carrito.find()
    res.json(carritos)
})

carritoRouter.get('/:cid', async (req, res) => {
    const carritoPorId = await Carrito.findById(req.params.cid)
    if (!carritoPorId) {
        return res.status(404).json({ message: 'El carrito buscado no existe en la base de datos' })
    }
    res.json(carritoPorId)
})

carritoRouter.post('/', async (req, res) => {
    try {
        const newCarrito = await Carrito.create(req.body)
        res.status(201).json(newCarrito)
    } catch (error) {
        res.status(401).json({ message: error.message })
    }
})

carritoRouter.put('/:cid/producto/:pid', async (req, res) => {
    if (!req.params.pid) {
        return res.status(401).json('Debe seleccionar un producto')
    }

    const productoExiste = await Carrito.find(
        {
            _id: req.params.cid,
            carrito: { $elemMatch: { productId: req.params.pid } }
        })

    if (productoExiste.length === 0) {
        const addProductToCart = await Carrito.findByIdAndUpdate(
            req.params.cid,
            { $push: { carrito: { productId: req.params.pid, cant: 1 } } },
            { new: true }
        )
        if (!addProductToCart) {
            return res.status(401).json(`El carrito con ID ${req.params.cid} no existe`)
        }
        res.status(201).json({ message: 'Producto Agregado', info: addProductToCart })
    } else {
        const updProduct = await Carrito.findByIdAndUpdate(
            req.params.cid,
            { $inc: { "carrito.$[elem].cant": 1 } },
            { arrayFilters: [{ "elem.productId": req.params.pid }] },
            { new: true }
        )
        res.status(201).json({ message: 'Producto Actualizado', info: updProduct })
    }
})

carritoRouter.delete('/:cid', async (req, res) => {
    const delCarrito = await Carrito.findByIdAndDelete(
        req.params.cid,
        { new: true }
    )
    if (!delCarrito) {
        return res.status(401).json(`El carrito con ID ${req.params.cid} no existe`)
    }
    res.status(201).json({ message: 'Carrito Eliminado', info: delCarrito })
})

carritoRouter.delete('/:cid/producto/:pid', async (req, res) => {
    const delProdInCarrito = await Carrito.findByIdAndUpdate(
        req.params.cid,
        { $pull: { carrito: { productId: req.params.pid } } },
        { new: true }
    )
    if (!delProdInCarrito) {   
        return res.status(401).json(`El producto con ID ${req.params.pid} no existe en el carrito ${req.params.cid}`)
    }
})