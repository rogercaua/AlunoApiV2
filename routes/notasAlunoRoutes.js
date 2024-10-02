const express = require('express');
const router = express.Router();
const notasController = require('../controllers/notasAlunoController');

// Adicionar/atualizar a nota de uma unidade
router.put('/notas/unidade', notasController.addOrUpdateNotaDeUnidade);

//Adicionar/atualizar notas de recuperação ou médias finais
router.put('/notas/recuperacao-media', notasController.addOrUpdateRecuperacaoMedia);

module.exports = router;
