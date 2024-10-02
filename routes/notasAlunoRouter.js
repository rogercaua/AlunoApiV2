const express = require('express');
const router = express.Router();
const alunoController = require('../controllers/alunoController');

// Adicionar/atualizar a nota de uma unidade
router.post('/notas/unidade', alunoController.addOrUpdateNotaDeUnidade);

//Adicionar/atualizar notas de recuperação ou médias finais
router.post('/notas/recuperacao-media', alunoController.addOrUpdateRecuperacaoMedia);

module.exports = router;
