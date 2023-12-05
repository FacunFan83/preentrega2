import { Schema, model } from 'mongoose'
import { randomUUID } from 'crypto'

const schemaCarrito = new Schema({
    _id: { type: String, default: randomUUID },
    carrito: [{ productId: { type: String, required: true }, cant: { type: Number, required: true } }]
}, {
    strict: 'throw',
    versionKey: false,
    methods: {}
})

export const Carrito = model('carrito', schemaCarrito)