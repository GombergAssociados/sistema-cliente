const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware para interpretar requisições com JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Servir arquivos estáticos da pasta "public"
app.use(express.static(path.join(__dirname, 'public')));

// Rotas
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/area-administrativa', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'area-administrativa.html'));
});

app.get('/cadastro-processos', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'cadastro-processos.html'));
});

// Escutando na porta especificada
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
