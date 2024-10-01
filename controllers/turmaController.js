const Turma = require("../models/turmaModel");
const Disciplina = require("../models/disciplinaModel");

///////////////////////////////////////////////////////////

exports.createTurma = async (req, res) => {
    const { nome, disciplinas, turno } = req.body; 

    try {
        const turmaExistente = await Turma.findOne({ nome });

        if (turmaExistente) {
            return res.status(400).json({ message: "Turma já existe." });
        }
        const novaTurma = new Turma({ nome, disciplinas, turno });
       
        const turmaSalva = await novaTurma.save();

        res.status(201).json({
            status: "sucess",
            message: "Turma criada com Sucesso!",
            data: { turma: turmaSalva }
        })
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erro ao cadastrar Turma. Tente novamente." }); 
    }
};

exports.getAllTurmas = async (req, res) => {
    try {
        const turmas = await Turma.find().populate("disciplinas");
        res.status(200).json({
            status: "success",
            data: {
                turmas
            }
        });
    } catch (err) {
        res.status(400).json({ 
            status: "fail",
            message: err.message 
        });
    }
};

exports.deleteTurma = async (req, res) => {
    const { id } = req.params;
    const { nome } = req.body;

    try {
        if(id) {
            const turmaDeletada = await Turma.findByIdAndDelete(id);
            
            if (!turmaDeletada) {
                return res.status(404).json({ message: "Turma não encontrada pelo ID." });
            }

            return res.status(200).json({status: "sucess", message: "Turma deletada com sucesso"})

        } else if (nome) {
            const turmaDeletada = await Turma.findOneAndDelete({ nome });

            if (!turmaDeletada) {
                return res.status(404).json({status: "sucess", message: "Turma não encontrada pelo nome." });
            }

            return res.status(200).json({ message: "Turma deletada com sucesso"})

            
        } else {
            return res.status(400).json({ message: "Por favor, forneça um ID ou um nome para deletar." });
        }
        
        
    } catch (err) {
        res.status(400).json({ 
            status: "fail",
            message: err.message 
        });
    }
};
