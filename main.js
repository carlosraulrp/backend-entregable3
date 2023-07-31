/* const http = require('http')
const PORT = 8080

//crear el servidor

const server = http.createServer((req, resp)=>{
    resp.end("creo mi servidor")
} )

//indicare el puerto

const connectedServer = server.listen(PORT, ()=>{
    console.log(`servidor http escuchando en el puerto ${connectedServer.address().port}`)
}) */

//creando el servidor con el framework express

const express = require('express')
const fs = require('fs');


const app = express()

const PORT = 8080

/* let visitas = 0 

//paths

app.get('/', (req, res) =>{
    res.send("Mi primer endpoint")
})

app.get('/visitas', (req, res) =>{
    visitas++
    res.send(`La cantidad de visitas es: ${visitas}`)
})

app.get('/fyh', (req, res) =>{
    const now = new Date()
    const fyh = now.toLocaleString()
    res.json({
        fyh
    })
})



app.post('/api', (req, res)=>{
    res.json({
        res: "ejemplo metodo post"
    })
})

app.get('*', (req, res) =>{
    res.send ("Ruta no existe")
})

const server = app.listen(PORT, () =>{
    console.log(`Escuchando en el puerto ${PORT}`)
}) */

//Entrega *************************

class contenedor {
    constructor(file){
        this.file = file
    }


    async getAll(){
        try {
            const objects = await this.getAllObjects()
            return objects
        } catch (error) {
            throw new Error ('Error al obtener los objetos')
        }
    }


    async getAllObjects(){
        try {
            const data = await fs.promises.readFile(this.file, 'utf-8')
            return data ? JSON.parse(data) : []
        } catch (error) {
            return []
        }
    }

}



const productos = new contenedor('productos.txt');

// Ruta GET '/productos' que devuelve un array con todos los productos disponibles en el servidor
app.get('/productos', async (req, res) => {
    try {
        const allProducts = await productos.getAll()
        res.json(allProducts)
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los productos' })
    }
})

app.get('/productoRandom', async (req, res) => {
    try {
        const allProducts = await productos.getAll()
        if (allProducts.length === 0) {
            res.status(404).json({ error: 'No hay productos disponibles' })
        } else {
            const randomIndex = Math.floor(Math.random() * allProducts.length)
            const randomProduct = allProducts[randomIndex];
            res.json(randomProduct)
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener un producto al azar' })
    }
})

// Iniciar el servidor




const server = app.listen(PORT, () =>{
    console.log(`Escuchando en el puerto ${PORT}`)
})









