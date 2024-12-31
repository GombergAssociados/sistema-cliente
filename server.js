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

// Rota principal (index.html)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rota para área administrativa
app.get('/area-administrativa.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'area-administrativa.html'));
});

// Rota para cadastro de processos
app.get('/cadastro-processos.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'cadastro-processos.html'));
});

// Outras rotas podem ser adicionadas aqui se necessário
app.get('/login.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/formulario.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'formulario.html'));
});

// Escutando na porta especificada
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
