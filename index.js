const fs = require('fs');
class Contenedor{
    constructor(ruta) {
        this.ruta = ruta;    
}
async getAll(){
    try {
    const  contenido = await fs.promises.readFile(this.ruta,"utf-8");
    const contenidoJSON = JSON.parse(contenido);
     return contenidoJSON;
  
    }catch (e) {
        console.log("error : " + e.message);  
    }


}


}

const productos = new Contenedor("Productos.txt");

const express = require('express');
const { request } = require('http');
const app = express();
const PORT = "8080";

app.listen(PORT,() =>{console.log("El servidor escucha en el puerto " + PORT)});

app.get('/', (req, res) =>{
    res.send("Bienvenido al Servidor");
});

app.get("/Productos", async(req, res) =>{
   res.send(await productos.getAll());
   });




app.get("/ProductoRandom", async(req, res) =>{
    const totalProductos = await productos.getAll();
    const nRandom = numeroRandom(0,totalProductos.length-1);
    const productoFinal = totalProductos[nRandom];
    console.log(await productoFinal)
    res.send(productoFinal);

});


function numeroRandom(min, max){
    return Math.round(Math.random() * (max - min) + min);
}

