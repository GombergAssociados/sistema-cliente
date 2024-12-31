const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Banco de Dados
const db = new sqlite3.Database('./database.db', (err) => {
    if (err) console.error('Erro ao conectar ao banco de dados', err);
    else console.log('Conectado ao banco de dados SQLite');
});

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Criação da tabela
db.run(`
    CREATE TABLE IF NOT EXISTS clientes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        rg TEXT NOT NULL,
        documento TEXT NOT NULL,
        email TEXT NOT NULL,
        telefone TEXT NOT NULL
    )
`);

// Rotas
// Enviar o index.html na raiz
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Listar clientes
app.get('/api/clientes', (req, res) => {
    db.all('SELECT * FROM clientes', [], (err, rows) => {
        if (err) {
            console.error('Erro ao buscar clientes:', err);
            res.status(500).json({ error: 'Erro ao buscar clientes' });
        } else {
            res.json(rows);
        }
    });
});

// Adicionar cliente
app.post('/api/clientes', (req, res) => {
    const { nome, rg, documento, email, telefone } = req.body;
    db.run(
        'INSERT INTO clientes (nome, rg, documento, email, telefone) VALUES (?, ?, ?, ?, ?)',
        [nome, rg, documento, email, telefone],
        function (err) {
            if (err) {
                console.error('Erro ao adicionar cliente:', err);
                res.status(500).json({ error: 'Erro ao adicionar cliente' });
            } else {
                res.json({ id: this.lastID, message: 'Cliente adicionado com sucesso' });
            }
        }
    );
});

// Excluir cliente
app.delete('/api/clientes/:id', (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM clientes WHERE id = ?', [id], function (err) {
        if (err) {
            console.error('Erro ao excluir cliente:', err);
            res.status(500).json({ error: 'Erro ao excluir cliente' });
        } else if (this.changes === 0) {
            res.status(404).json({ error: 'Cliente não encontrado' });
        } else {
            res.json({ message: 'Cliente excluído com sucesso' });
        }
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
