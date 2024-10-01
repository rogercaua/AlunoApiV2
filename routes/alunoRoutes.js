const express = require("express");
const router = express.Router();
const alunoController = require("../controllers/alunoController"); // Certifique-se de que o caminho esteja correto


router.post("/create", alunoController.createAluno); // POST /api/alunos

// Rota para deletar um aluno pelo ID
router.delete("/delete/:alunoId", alunoController.deleteAluno); // DELETE /api/alunos/:alunoId


router.get("/", alunoController.getAllAlunos); // GET /api/alunos

module.exports = router;
