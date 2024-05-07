const express = require('express')
const app = express()
app.use(express.json())

app.get('/', function (req, res) {
  res.send('Hello World')
})

//Endpoint Read All [GET] /personagens
const personagens  = ['Homem Aranha', 'Homem de Ferro', 'Super Homem', 'Goku']

app.get("/personagens", (req, res) =>{
    res.send(personagens.filter(Boolean))
})

//Endpoint Read by ID [GET] /personagens/:id
app.get("/personagens/:id", (req, res) => {
    // Acessamos o parametro de rota ID
    const id = req.params.id
    // Acessa o item da lista personagem usando o ID - 1
    const item = personagens[id - 1]
    // Enviamos o item como resposta
    res.send(item)
})

// Endpoint create [POST] /personagens

app.post('/personagens', (req, res) => {

  // Acessando o Body da requisição
  const body = req.body

  // Acessando a propiedade "nome" Body 
  const novoItem = body.nome

  // Adicionamos na lista de personagens usando o método "push"
  personagens.push(novoItem)

  res.send('item adicionado com sucesso:' + novoItem)
})

app.put("/personagem/:id", (req, res) => {
  const id = req.params.id
  const body = req.body
  const novoItem = body.nome
  personagens[id - 1] = novoItem
  
  res.send("item atualizado com sucesso! " + id + ' - ' + novoItem )
})

app.delete("/personagens/:id", (req, res) => {
  const id = req.params.id
  delete personagens[id - 1]
  res.send('deletado com sucesso:' + id )
})


app.listen(3000, () => 'servidor rodando na porta 3000')