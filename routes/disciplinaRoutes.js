const express = require("express");
const router = express.Router();
const disciplinaController = require("../controllers/disciplinaController");

// Criar uma nova disciplina
router.post("/create", disciplinaController.createDisciplina);

// Listar todas as disciplinas
router.get("/", disciplinaController.getAllDisciplinas);

// Deletar disciplina por ID (rota) ou nome (corpo da requisição)
router.delete("/delete/:id?", disciplinaController.deleteDisciplina);

module.exports = router;
