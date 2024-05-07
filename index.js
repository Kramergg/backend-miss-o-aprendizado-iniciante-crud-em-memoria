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
    if (!item) {
      return res.status(404).send("item não encontrado.")
    }
    // Enviamos o item como resposta
    res.send(item)
})

// Endpoint create [POST] /personagens

app.post('/personagens', (req, res) => {

  // Acessando o Body da requisição
  const body = req.body

  // Acessando a propiedade "nome" Body 
  const novoItem = body.nome

  // checa se o "nome" está presente no body
  if (!novoItem) {
    return res.status(400).send("o corpo da requisição deve conter a propiedade `nome`")
  }
  // checar se o novoItem já existe
  if (personagens.includes(novoItem)) {
    return res.status(409).send("Esse item ja existe na lista de personagens!!")
  }

  // Adicionamos na lista de personagens usando o método "push"
  personagens.push(novoItem)

  res.status(201).send('item adicionado com sucesso:' + novoItem)
})

app.put("/personagem/:id", (req, res) => {
  const id = req.params.id
  const body = req.body
  const novoItem = body.nome
  if (!personagens[id -1]){
    return res.status(404).send("item não encontrado.")
  }

     // checa se o "nome" está presente no body
  if (!novoItem) {
    return res.status(400).send("o corpo da requisição deve conter a propiedade `nome`")
  }

  // checar se o novoItem já existe
  if (personagens.includes(novoItem)) {
    return res.status(409).send("Esse item ja existe na lista de personagens!!")
  }

  personagens[id - 1] = novoItem
  
  res.send("item atualizado com sucesso! " + id + ' - ' + novoItem )
})

app.delete("/personagens/:id", (req, res) => {
  const id = req.params.id
  if (!personagens[id -1]){
    return res.status(404).send("item não encontrado.")
  }
  delete personagens[id - 1]
  res.send('deletado com sucesso:' + id )
})


app.listen(3000, () => 'servidor rodando na porta 3000')