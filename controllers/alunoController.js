const Aluno = require("../models/alunoModel");
const Turma = require("../models/turmaModel");

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

    if(mongoose.Types.ObjectId.isValid(turma)) {
      turmaId = turma;

    } else{
      let turmaQuery = Turma.findOne({ nome: turma });

      if(!turmaQuery)res.status(404).json({status: "fail", message: "Turma não encontrada."});

      turmaId = turmaQuery._id;

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



// adicionar/atualizar nota de recuperacao ou mediaFinal
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
    } else if (tipoNota === 'mediaFinal') {
      notasAluno.mediaFinal = valor;
    } else {
      return res.status(400).json({ message: "Tipo de nota inválido. Use 'recuperacao' ou 'mediaFinal'." });
    }

    // Salva o aluno com as notas atualizadas
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





