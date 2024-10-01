const Aluno = require("../models/alunoModel");
const Disciplina = require("../models/disciplinaModel"); // Importa o modelo de Disciplina
const mongoose = require("mongoose");

// funciona com uma nota por vez
exports.addOrUpdateNotaDeUnidade = async (req, res) => {
  const { alunoId, disciplina, unidade, tipoNota, valor } = req.body;

  try {
    const aluno = await Aluno.findById(alunoId);
    if (!aluno) {
      return res.status(404).json({ message: "Aluno não encontrado." });
    }

    let disciplinaEncontrada;

   
    if (mongoose.Types.ObjectId.isValid(disciplina)) {
      disciplinaEncontrada = await Disciplina.findById(disciplina);
    } else {
      disciplinaEncontrada = await Disciplina.findOne({ nome: disciplina });
    }

    if (!disciplinaEncontrada) {
      return res.status(404).json({ message: "Disciplina não encontrada." });
    }

    // Encontra as notas do aluno para a disciplina
    const notasAluno = aluno.notas.find(nota => nota.disciplina.equals(disciplinaEncontrada._id));

    if (!notasAluno) {
      return res.status(404).json({ message: "Notas não encontradas para essa disciplina." });
    }

    // Atualiza a nota com base no tipo e unidade
    if (unidade === 'unidade1') {
      if (tipoNota === 'AV1') {
        notasAluno.unidade1.AV1 = valor;
      } else if (tipoNota === 'AV2') {
        notasAluno.unidade1.AV2 = valor;
      } else if (tipoNota === 'MU') {
        notasAluno.unidade1.MU = valor;
      } else if (tipoNota === 'MUPN') {
        notasAluno.unidade1.MUPN = valor;
      } else {
        return res.status(400).json({ message: "Tipo de nota inválido para Unidade 1." });
      }
    } else if (unidade === 'unidade2') {
      if (tipoNota === 'AV1') {
        notasAluno.unidade2.AV1 = valor;
      } else if (tipoNota === 'AV2') {
        notasAluno.unidade2.AV2 = valor;
      } else if (tipoNota === 'MU') {
        notasAluno.unidade2.MU = valor;
      } else if (tipoNota === 'MUPN') {
        notasAluno.unidade2.MUPN = valor;
      } else {
        return res.status(400).json({ message: "Tipo de nota inválido para Unidade 2." });
      }
    } else if (unidade === 'recuperacao') {
      notasAluno.recuperacao = valor;
    } else if (unidade === 'mediaFinal') {
      notasAluno.mediaFinal = valor;
    } else {
      return res.status(400).json({ message: "Unidade inválida." });
    }

    await aluno.save();

    return res.status(200).json({
      status: "success",
      message: "Nota adicionada/atualizada com sucesso.",
      data: { aluno }
    });

  } catch (err) {
    return res.status(500).json({ message: "Erro ao adicionar/atualizar nota", err: err.message });
  }
};
