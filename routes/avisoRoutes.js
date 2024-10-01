const express = require("express");
const router = express.Router();
const avisoController = require("../controllers/avisoController");

//criar um aviso
router.post("/create", avisoController.criarAviso);

//deletar um aviso
router.delete("/delete/:avisoId", avisoController.deleteAviso);

//listar avisos de um aluno pela turma
router.get("//:alunoId", avisoController.listarAvisosPorTurma);

module.exports = router;
