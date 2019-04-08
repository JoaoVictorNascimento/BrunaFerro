const express = require('express');
const app = express();

const port = 3000;

app.listen(port, () => {
  console.log('Listening on http://localhost:3000');
});

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
  console.log(__dirname);
})

app.get('/pedido', (req, res) => {
  res.sendFile(__dirname + '/public/pages/pedido.html');
})

app.get('/orcamento', (req, res) => {
  res.sendFile(__dirname + '/public/pages/orcamento.html');
})

app.get('/produtos', (req, res) => {
  res.sendFile(__dirname + '/public/pages/produtos.html');
})

app.get('/ovoPascoa', (req, res) => {
  res.sendFile(__dirname + '/public/pages/ovoPascoa.html');
})

app.get('/cadastroProduto', (req, res) => {
  res.sendFile(__dirname + '/public/pages/cadastroProduto.html');
})