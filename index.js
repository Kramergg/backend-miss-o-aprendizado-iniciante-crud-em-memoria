const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello World')
})

//Endpoint Read All [GET] /personagens
const personagens  = ['Homem Aranha', 'Homem de Ferro', 'Super Homem', 'Goku']
app.get("/personagens", (req, res) =>{
    res.send(personagens)
})
app.listen(3000)