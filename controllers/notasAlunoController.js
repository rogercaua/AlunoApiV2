const Aluno = require("../models/alunoModel");
const Disciplina = require("../models/disciplinaModel"); // Importa o modelo de Disciplina
const mongoose = require("mongoose");


// FUNCIONA COM UMA NOTA POR VEZ, ENTRADA DE DADOS DA DISCIPINA(NOME OU ID)
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

   
    const notasAluno = aluno.notas.find(nota => nota.disciplina.equals(disciplinaEncontrada._id));

    if (!notasAluno) {
      return res.status(404).json({ message: "Notas não encontradas para essa disciplina." });
    }

    
    let unidadeNota = null;

    switch (unidade) {
      case 'unidade1':
        unidadeNota = notasAluno.unidade1;
        break;
      case 'unidade2':
        unidadeNota = notasAluno.unidade2;
        break;
      case 'unidade3':
        unidadeNota = notasAluno.unidade3;
        break;
      default:
        return res.status(400).json({ message: "Unidade inválida. Use unidade1, unidade2 ou unidade3." });
    }

    if (!unidadeNota) {
      return res.status(404).json({ message: "Unidade não encontrada." });
    }

    
    if (['AV1', 'AV2', 'MU', 'MUPN1', 'MUPN2'].includes(tipoNota)) {
      unidadeNota[tipoNota] = valor;
    } else {
      return res.status(400).json({ message: "Tipo de nota inválido." });
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



//METODO PARA ADICIONAR/ATUALIZAR RECUPERACAO/MEDIAS ANUAIS E ETC. TUDO QUE NAO SEJA DAS UNIDADES.
exports.addOrUpdateRecuperacaoMedia = async (req, res) => {
  const { alunoId, disciplina, tipoNota, valor } = req.body;

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

    const notasAluno = aluno.notas.find(nota => nota.disciplina.equals(disciplinaEncontrada._id));

    if (!notasAluno) {
      return res.status(404).json({ message: "Notas não encontradas para essa disciplina." });
    }

    
    if (tipoNota === 'recuperacao') {
      notasAluno.recuperacao = valor;
    } else if (tipoNota === 'MFA') { 
      notasAluno.MFA = valor;
    } else if (tipoNota === 'MFAPN') { 
      notasAluno.MFAPN = valor;
    } else if (tipoNota === 'resumo') { 
      notasAluno.resumo = valor;
    } else {
      return res.status(400).json({ message: "Tipo de nota inválido. Use 'recuperacao', 'MFA', 'MFAPN' ou 'resumo'." });
    }

    
    await aluno.save();

    return res.status(200).json({
      status: "success",
      message: "Nota de recuperação ou média final atualizada com sucesso.",
      data: { aluno }
    });

  } catch (err) {
    return res.status(500).json({ message: "Erro ao atualizar nota", err: err.message });
  }
};