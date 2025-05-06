const express = require('express')
const app = express()
const port = 3000

let listaProdutos = [
    { id: 1, nome: "Arroz", preco: 3.20 },
    { id: 2, nome: "Feijao", preco: 7.50 },
    { id: 3, nome: "Coca cola", preco: 9.90 }
];

app.use(express.json()) // for parsing application/json

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/produtos', (req, res)=> {
    res.json(listaProdutos);
})

app.post('/produtos', (req, res)=> {
    let produto = req.body;
    produto.id = 4;
    listaProdutos.push(produto);
    res.status(201).json(produto);
})

app.get('/produtos/:id', (req, res)=> {    
    const id = +req.params.id;
    const produto = listaProdutos.find(
        prod => prod.id == id
    );
    res.json(produto);
})

app.put('/produtos/:id', (req, res)=> {
    const id = req.params.id;
    res.send("Atualizar Produto com id: "+id);
})

app.delete('/produtos/:id', (req, res)=> {
    const id = req.params.id;
    res.send("Deletar Produto com id: "+id);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})