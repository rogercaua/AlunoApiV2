const express = require("express");
const router = express.Router();
const disciplinaController = require("../controllers/disciplinaController"); 

//criar uma nova disciplina
router.post("/create", disciplinaController.createDisciplina);

// listar todas as disciplinas
router.get("/", disciplinaController.getAllDisciplinas);

//Delete por ID ou Body
router.delete("/delete/:id?", disciplinaController.deleteDisciplina);


module.exports = router;
