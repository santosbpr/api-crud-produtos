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
    produto.id = listaProdutos.length > 0 ? Math.max(...listaProdutos.map(p => p.id)) + 1 : 1;
    listaProdutos.push(produto);
    res.status(201).json(produto);
})

app.get('/produtos/:id', (req, res)=> {
    const id = +req.params.id;
    const produto = listaProdutos.find(
        prod => prod.id === id
    );
    if (produto) {
        res.json(produto);
    } else {
        res.status(404).json({ message: 'Produto não encontrado' });
    }
})

app.put('/produtos/:id', (req, res)=> {
    const id = +req.params.id;
    const produtoIndex = listaProdutos.findIndex(prod => prod.id === id);

    if (produtoIndex !== -1) {
        const produtoAtualizado = { ...listaProdutos[produtoIndex], ...req.body, id: id };
        listaProdutos[produtoIndex] = produtoAtualizado;
        res.json(produtoAtualizado);
    } else {
        res.status(404).json({ message: 'Produto não encontrado' });
    }
})

app.delete('/produtos/:id', (req, res)=> {
    const id = +req.params.id;
    const produtoIndex = listaProdutos.findIndex(prod => prod.id === id);

    if (produtoIndex !== -1) {
        const produtoDeletado = listaProdutos.splice(produtoIndex, 1);
        res.json(produtoDeletado[0]);
    } else {
        res.status(404).json({ message: 'Produto não encontrado' });
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})