const express = require('express');
const router = express.Router();
const turmaController = require('../controllers/turmaController');

// Rota para criar uma nova turma
router.post('/create', turmaController.createTurma);

// Rota para listar todas as turmas
router.get('/', turmaController.getAllTurmas);

// Rota para deletar turma por ID (parâmetro da rota) ou nome (via corpo da requisição)
router.delete('/delete/:id?', turmaController.deleteTurma);

module.exports = router;
