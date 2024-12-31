const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware para servir arquivos estáticos da pasta "public"
app.use(express.static(path.join(__dirname, 'public')));

// Rotas específicas para cada página
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/area-administrativa', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'area-administrativa.html'));
});

app.get('/cadastro-processos', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'cadastro-processos.html'));
});

app.get('/cadastro-clientes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'cadastro-clientes.html'));
});

app.get('/logout', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'logout.html'));
});

// Tratamento de erros 404 para páginas não encontradas
app.use((req, res) => {
    res.status(404).send('Página não encontrada');
});

// Inicializa o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
