const express = require("express");
const router = express.Router();
const avisoController = require("../controllers/avisoController");

// Criar um aviso
router.post("/create", avisoController.criarAviso);

// Deletar um aviso
router.delete("/delete/:avisoId", avisoController.deleteAviso);

// Listar avisos de um aluno pela turma
router.get("/avisos/:alunoId", avisoController.listarAvisosPorTurma);

module.exports = router;
