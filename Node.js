const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Conexão ao Banco de Dados SQLite
const db = new sqlite3.Database('./database.db', (err) => {
  if (err) console.error('Erro ao conectar ao banco de dados:', err);
  else console.log('Conectado ao banco de dados SQLite');
});

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Criação de tabelas
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS clientes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT,
      rg TEXT,
      documento TEXT,
      email TEXT,
      telefone TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS processos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      cliente_id INTEGER,
      numero TEXT,
      descricao TEXT,
      FOREIGN KEY (cliente_id) REFERENCES clientes (id)
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS honorarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      cliente_id INTEGER,
      valor REAL,
      forma_pagamento TEXT,
      parcelas INTEGER,
      observacoes TEXT,
      despesas REAL,
      FOREIGN KEY (cliente_id) REFERENCES clientes (id)
    )
  `);
});

// Rotas de Clientes
app.post('/api/clientes', (req, res) => {
  const { nome, rg, documento, email, telefone } = req.body;
  const query = `INSERT INTO clientes (nome, rg, documento, email, telefone) VALUES (?, ?, ?, ?, ?)`;
  db.run(query, [nome, rg, documento, email, telefone], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(201).json({ id: this.lastID });
    }
  });
});

app.get('/api/clientes', (req, res) => {
  db.all(`SELECT * FROM clientes`, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

app.delete('/api/clientes/:id', (req, res) => {
  const { id } = req.params;
  db.run(`DELETE FROM clientes WHERE id = ?`, [id], (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(204).send();
    }
  });
});

// Rotas de Processos
app.post('/api/processos', (req, res) => {
  const { cliente_id, numero, descricao } = req.body;
  db.run(
    `INSERT INTO processos (cliente_id, numero, descricao) VALUES (?, ?, ?)`,
    [cliente_id, numero, descricao],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).json({ id: this.lastID });
      }
    }
  );
});

app.get('/api/processos', (req, res) => {
  db.all(
    `SELECT processos.*, clientes.nome AS cliente_nome FROM processos 
     INNER JOIN clientes ON processos.cliente_id = clientes.id`,
    [],
    (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(rows);
      }
    }
  );
});

// Rotas de Honorários
app.post('/api/honorarios', (req, res) => {
  const { cliente_id, valor, forma_pagamento, parcelas, observacoes, despesas } = req.body;
  db.run(
    `INSERT INTO honorarios (cliente_id, valor, forma_pagamento, parcelas, observacoes, despesas) 
     VALUES (?, ?, ?, ?, ?, ?)`,
    [cliente_id, valor, forma_pagamento, parcelas, observacoes, despesas],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).json({ id: this.lastID });
      }
    }
  );
});

app.get('/api/honorarios', (req, res) => {
  db.all(
    `SELECT honorarios.*, clientes.nome AS cliente_nome FROM honorarios 
     INNER JOIN clientes ON honorarios.cliente_id = clientes.id`,
    [],
    (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(rows);
      }
    }
  );
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
