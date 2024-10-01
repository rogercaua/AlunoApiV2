const Disciplina = require('../models/disciplinaModel');

///////////////////////////////////////////////////////////

exports.getAllDisciplinas = async (req, res) => { 
    try {
        
        const allDisciplinas = await Disciplina.find();

        // Retornando a resposta ao cliente
        res.status(200).json({
            status: "success",
            results: allDisciplinas.length, // Contagem das disciplinas encontradas
            data: {
                disciplinas: allDisciplinas // Alterado para 'disciplinas' para maior clareza
            }
        });
    } catch (err) {
        // Retornando erro se algo der errado
        res.status(500).json({
            status: "fail",
            message: err.message // Exibe a mensagem de erro
        });
    }
};

///////////////////////////////////////////////////////////

exports.createDisciplina = async (req, res) => {
    const { nome } = req.body; 

    try {
        // Verifica se a disciplina já existe
        const disciplinaExistente = await Disciplina.findOne({ nome });

        if (disciplinaExistente) {
            return res.status(400).json({ message: 'Disciplina já existe.' });
        }
        
        const novaDisciplina = new Disciplina({ nome });
       
        const disciplinaSalva = await novaDisciplina.save();
        
       
        res.status(201).json({
            status: "success",
            message: "Disciplina criada com sucesso!",
            data: { disciplina: disciplinaSalva }
        });
    } catch (err) {
        res.status(400).json({ 
            status: "fail",
            message: err.message 
        });
    }
};

///////////////////////////////////////////////////////////

// Remover uma disciplina por ID ou nome
exports.deleteDisciplina = async (req, res) => {
    const { id } = req.params;  // Pegando 'id' da rota
    const { nome } = req.body;  // Pegando 'nome' da query string, se existir

    try {
        let disciplinaDeletada;

        
        if (id) {
            disciplinaDeletada = await Disciplina.findByIdAndDelete(id);

            if (!disciplinaDeletada) {
                return res.status(404).json({ message: 'Disciplina não encontrada pelo ID.' });
            }

        } else if (nome) {
            disciplinaDeletada = await Disciplina.findOneAndDelete({ nome });

            if (!disciplinaDeletada) {
                return res.status(404).json({ message: 'Disciplina não encontrada pelo nome.' });
            }
            
        } else {
            return res.status(400).json({ message: 'Por favor, forneça um ID ou um nome para deletar.' });
        }

        res.status(200).json({ message: `Disciplina removida com sucesso` });

    } catch (err) {
        res.status(400).json({ status: "fail", message: err.message });
    }

};