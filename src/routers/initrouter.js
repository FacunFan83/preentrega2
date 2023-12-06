import { Router } from 'express'
import { Producto } from '../models/productos.mongoose.js'
import { Carrito } from '../models/carrito.mongoose.js'

export const initRouter = Router()

const dataSet = [
    { title: "Laptop Dell XPS 15", description: "Potente laptop con pantalla 4K y procesador Intel Core i7.", code: "Dell-XPS-15", price: 1799.99, status: true, stock: 25, category: "Laptops", image: "https://ejemplo.com/imagen1.jpg" },
    { title: "Monitor LG UltraWide", description: "Monitor curvo de 34 pulgadas con resolución 4K.", code: "LG-UltraWide", price: 699.99, status: true, stock: 15, category: "Monitores", image: "https://ejemplo.com/imagen2.jpg" },
    { title: "Teclado Mecánico Corsair K70", description: "Teclado mecánico RGB con interruptores Cherry MX.", code: "Corsair-K70", price: 129.99, status: true, stock: 50, category: "Teclados", image: "https://ejemplo.com/imagen3.jpg" },
    { title: "Ratón Logitech MX Master 3", description: "Ratón inalámbrico avanzado con seguimiento de alta precisión.", code: "Logitech-MX-Master-3", price: 99.99, status: true, stock: 30, category: "Ratones", image: "https://ejemplo.com/imagen4.jpg" },
    { title: "Laptop Dell XPS 15", description: "Potente laptop con pantalla 4K y procesador Intel Core i7.", code: "Dell-XPS-15", price: 1799.99, status: true, stock: 25, category: "Laptops", image: "https://ejemplo.com/imagen1.jpg" },
    { title: "Monitor LG UltraWide", description: "Monitor curvo de 34 pulgadas con resolución 4K.", code: "LG-UltraWide", price: 699.99, status: true, stock: 15, category: "Monitores", image: "https://ejemplo.com/imagen2.jpg" },
    { title: "Teclado Mecánico Corsair K70", description: "Teclado mecánico RGB con interruptores Cherry MX.", code: "Corsair-K70", price: 129.99, status: true, stock: 50, category: "Teclados", image: "https://ejemplo.com/imagen3.jpg" },
    { title: "Ratón Logitech MX Master 3", description: "Ratón inalámbrico avanzado con seguimiento de alta precisión.", code: "Logitech-MX-Master-3", price: 99.99, status: true, stock: 30, category: "Ratones", image: "https://ejemplo.com/imagen4.jpg" },
    { title: "Disco Duro Externo Seagate Backup Plus", description: "Almacenamiento externo de 4 TB con conectividad USB 3.0.", code: "Seagate-Backup-Plus", price: 119.99, status: true, stock: 40, category: "Almacenamiento", image: "https://ejemplo.com/imagen5.jpg" },
    { title: "Procesador AMD Ryzen 9 5900X", description: "Procesador de 12 núcleos y 24 hilos para alto rendimiento en juegos y tareas pesadas.", code: "AMD-Ryzen-9-5900X", price: 499.99, status: true, stock: 10, category: "Componentes de PC", image: "https://ejemplo.com/imagen6.jpg" },
    { title: "Memoria RAM Corsair Vengeance LPX 16GB", description: "Módulo de memoria DDR4 de 16 GB con disipador de calor.", code: "Corsair-Vengeance-LPX-16GB", price: 79.99, status: true, stock: 60, category: "Componentes de PC", image: "https://ejemplo.com/imagen7.jpg" },
    { title: "Tarjeta Gráfica NVIDIA GeForce RTX 3080", description: "Potente tarjeta gráfica para juegos de última generación y renderización.", code: "NVIDIA-GeForce-RTX-3080", price: 799.99, status: true, stock: 5, category: "Tarjetas Gráficas", image: "https://ejemplo.com/imagen8.jpg" },
    { title: "Impresora Brother HL-L2390DW", description: "Impresora láser monocromática con impresión a doble cara y conectividad Wi-Fi.", code: "Brother-HL-L2390DW", price: 149.99, status: true, stock: 20, category: "Impresoras", image: "https://ejemplo.com/imagen9.jpg" },
    { title: "Router Inalámbrico TP-Link Archer C4000", description: "Router de triple banda para una conexión Wi-Fi rápida y estable en toda la casa.", code: "TP-Link-Archer-C4000", price: 199.99, status: true, stock: 12, category: "Redes", image: "https://ejemplo.com/imagen10.jpg" },
    { title: "Impresora Epson EcoTank ET-4760", description: "Impresora multifuncional de inyección de tinta con tanque de tinta recargable.", code: "Epson-EcoTank-ET-4760", price: 349.99, status: true, stock: 8, category: "Impresoras", image: "https://ejemplo.com/imagen11.jpg" },
    { title: "Monitor ASUS ROG Swift PG279Q", description: "Monitor de juego de 27 pulgadas con resolución WQHD y frecuencia de actualización de 165 Hz.", code: "ASUS-ROG-Swift-PG279Q", price: 599.99, status: true, stock: 10, category: "Monitores", image: "https://ejemplo.com/imagen12.jpg" },
    { title: "Teclado Inalámbrico Logitech K780", description: "Teclado inalámbrico compatible con múltiples dispositivos y con soporte para tabletas y teléfonos.", code: "Logitech-K780", price: 79.99, status: true, stock: 15, category: "Teclados", image: "https://ejemplo.com/imagen13.jpg" },
    { title: "Altavoces Bluetooth Bose SoundLink Revolve", description: "Altavoces portátiles con sonido envolvente y batería de larga duración.", code: "Bose-SoundLink-Revolve", price: 199.99, status: true, stock: 18, category: "Audio", image: "https://ejemplo.com/imagen14.jpg" },
    { title: "Cámara Canon EOS 5D Mark IV", description: "Cámara réflex digital con sensor de imagen full-frame y grabación de video 4K.", code: "Canon-EOS-5D-Mark-IV", price: 2499.99, status: true, stock: 7, category: "Cámaras", image: "https://ejemplo.com/imagen15.jpg" },
    { title: "Auriculares Sony WH-1000XM4", description: "Auriculares inalámbricos con cancelación de ruido y sonido de alta calidad.", code: "Sony-WH-1000XM4", price: 349.99, status: true, stock: 22, category: "Audio", image: "https://ejemplo.com/imagen16.jpg" },
    { title: "SSD Samsung 970 EVO Plus 1TB", description: "Unidad de estado sólido NVMe con alta velocidad de lectura y escritura.", code: "Samsung-970-EVO-Plus-1TB", price: 179.99, status: true, stock: 13, category: "Almacenamiento", image: "https://ejemplo.com/imagen17.jpg" },
    { title: "Impresora 3D Creality Ender 3", description: "Impresora 3D de escritorio con gran área de construcción y fácil montaje.", code: "Creality-Ender-3", price: 239.99, status: true, stock: 9, category: "Impresoras 3D", image: "https://ejemplo.com/imagen18.jpg" },
    { title: "Tarjeta de Sonido externa Focusrite Scarlett 2i2", description: "Interfaz de audio USB con preamplificadores de micrófono de alta calidad.", code: "Focusrite-Scarlett-2i2", price: 159.99, status: true, stock: 16, category: "Audio", image: "https://ejemplo.com/imagen19.jpg" },
    { title: "Smartwatch Apple Watch Series 7", description: "Reloj inteligente con pantalla siempre encendida y seguimiento avanzado de la salud.", code: "Apple-Watch-Series-7", price: 399.99, status: true, stock: 25, category: "Wearables", image: "https://ejemplo.com/imagen20.jpg" },
    { title: "Teclado mecánico Razer BlackWidow Elite", description: "Teclado gaming con interruptores Razer y retroiluminación personalizable.", code: "Razer-BlackWidow-Elite", price: 169.99, status: true, stock: 20, category: "Teclados", image: "https://ejemplo.com/imagen21.jpg" },
    { title: "Silla de oficina ergonómica Herman Miller Aeron", description: "Silla de oficina premium con diseño ergonómico y ajustes personalizados.", code: "Herman-Miller-Aeron", price: 1099.99, status: true, stock: 5, category: "Muebles de oficina", image: "https://ejemplo.com/imagen22.jpg" },
    { title: "Auriculares inalámbricos Beats Studio Buds", description: "Auriculares compactos con cancelación de ruido y resistencia al agua.", code: "Beats-Studio-Buds", price: 149.99, status: true, stock: 18, category: "Audio", image: "https://ejemplo.com/imagen23.jpg" },
    { title: "Cámara de seguridad Arlo Pro 4", description: "Cámara de seguridad inalámbrica con resolución 2K y visión nocturna en color.", code: "Arlo-Pro-4", price: 249.99, status: true, stock: 12, category: "Cámaras de seguridad", image: "https://ejemplo.com/imagen24.jpg" },
    { title: "Portátil Microsoft Surface Laptop 4", description: "Laptop ultradelgada con pantalla táctil PixelSense y procesador Intel Core.", code: "Microsoft-Surface-Laptop-4", price: 1299.99, status: true, stock: 15, category: "Laptops", image: "https://ejemplo.com/imagen25.jpg" },
    { title: "Altavoz inteligente Amazon Echo Dot (4ta generación)", description: "Altavoz con asistente virtual Alexa y diseño compacto.", code: "Amazon-Echo-Dot-4th-gen", price: 49.99, status: true, stock: 30, category: "Audio", image: "https://ejemplo.com/imagen26.jpg" }
] 

initRouter.get('/', async (req, res) => {
    console.log('queriendo borrar')
    await Carrito.deleteMany()
    await Producto.deleteMany()
    await Producto.insertMany(dataSet)
    res.send('Base de datos creada')
})
