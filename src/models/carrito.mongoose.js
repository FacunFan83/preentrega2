import { Schema, model } from 'mongoose'
import { randomUUID } from 'crypto'

const schemaCarrito = new Schema({
    _id: { type: String, default: randomUUID },
    carrito: [{ 
        productID: { type: String, ref: 'products' }, 
        cant: { type: Number }
        }]
}, {
    strict: 'throw',
        versionKey: false,
            methods: { }
})

schemaCarrito.pre('find', function (next) {
    this.populate('carrito.$.productID')
    next()
})

export const Carrito = model('carrito', schemaCarrito)