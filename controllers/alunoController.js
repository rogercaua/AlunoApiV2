const Aluno = require("../models/alunoModel");
const Turma = require("../models/turmaModel");
const mongoose = require("mongoose");
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// requer nome do aluno, email, senha e turma (id ou nome)
exports.createAluno = async (req, res) => {
  const { nome, email, senha, turma } = req.body;

  if (!nome || !email || !senha || !turma) {
    return res.status(400).json({
      status: "fail",
      message: "Nome, email, turma e senha são obrigatórios."
    });
  }

  try {
    let turmaId;

    if (mongoose.Types.ObjectId.isValid(turma)) {
      turmaId = turma;
    } else {
      const turmaEncontrada = await Turma.findOne({ nome: turma });
      if (!turmaEncontrada) {
        return res.status(404).json({ status: "fail", message: "Turma não encontrada." });
      }
      turmaId = turmaEncontrada._id;
    }

    const novoAluno = new Aluno({
      nome,
      email,
      senha,
      turmaId,
      notas: turmaEncontrada.disciplinas.map(disciplina => ({
        disciplina: disciplina._id, 
        unidade1: {}, 
        unidade2: {}, 
        unidade3: {}, 
        MFA: null, 
        FT: 0, 
        MFAPN: null, 
        resumo: null 
      }))
    });

    // Salva o aluno no banco de dados
    await novoAluno.save();

    // Retorna o sucesso com os dados do aluno
    return res.status(201).json({
      status: "success",
      data: {
        aluno: novoAluno
      }
    });
  } catch (err) {
    // Retorna erro em caso de falha
    return res.status(500).json({
      message: "Erro ao criar aluno",
      err: err.message
    });
  }
};



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


exports.getAllAlunos = async (req, res) => {
  try {
    const alunos = await Aluno.find()
      .populate({
        path: 'notas.disciplina', // Popula o campo disciplina dentro de notas
        select: 'nome' // Seleciona apenas o nome da disciplina
      });

    return res.status(200).json({
      status: "success",
      data: {
        alunos
      },
    });
  } catch (err) {
    return res.status(500).json({ message: "Erro ao buscar alunos", err: err.message });
  }
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.deleteAluno = async (req, res) => {
  const { alunoId } = req.params;

  try {
    const alunoDeletado = await Aluno.findByIdAndDelete(alunoId);

    if (!alunoDeletado) {
      return res.status(404).json({ message: "Aluno não encontrado" });
    }

    return res.status(200).json({ message: "Aluno deletado!" });
  } catch (err) {
    return res.status(500).json({ message: "Erro ao deletar aluno!", err: err.message });
  }
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* MODELO JSON PARA ENVIAR/ATUALIZAR NOTA
{
  "alunoId": "651f1e9a6f597b8a2cbe1f28",  // ID do aluno
  "disciplina": "651f1e9a6f597b8a2cbe1f29",  // ID da disciplina (ou nome da disciplina)
  "unidade": "unidade1",  // Unidade: 'unidade1', 'unidade2', 'unidade3', 'recuperacao', 'mediaFinal'
  "tipoNota": "AV1",  // Tipo de nota: 'AV1', 'AV2', 'MU', 'MUPN'
  "valor": 8.5  // Valor da nota
}
*/



