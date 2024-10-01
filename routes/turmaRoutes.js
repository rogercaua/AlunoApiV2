const express = require('express');
const router = express.Router();
const turmaController = require('../controllers/turmaController');

// Rota para criar uma nova turma
router.post('/create', turmaController.createTurma);

// Rota para listar todas as turmas
router.get('/', turmaController.getAllTurmas);

//Delete por ID ou Body
router.delete('/delete/:id?', turmaController.deleteTurma);

module.exports = router;
