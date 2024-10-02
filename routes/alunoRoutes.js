const express = require("express");
const router = express.Router();
const alunoController = require("../controllers/alunoController");

//criar um novo aluno
router.post("/create", alunoController.createAluno); // POST /api/alunos

//deletar um aluno pelo ID
router.delete("/delete/:alunoId", alunoController.deleteAluno); // DELETE /api/alunos/:alunoId

//buscar todos os alunos
router.get("/", alunoController.getAllAlunos); // GET /api/alunos

//adicionar/atualizar recuperação, médias finais ou resumo de notas
router.put("/notas/recuperacao", alunoController.addOrUpdateRecuperacaoMedia); // PUT /api/alunos/notas/recuperacao

module.exports = router;
