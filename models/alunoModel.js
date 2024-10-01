const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Schema para notas (AV1, AV2, MU, MUPN)
const unidadeSchema = new mongoose.Schema({
    AV1: { type: Number, default: null },
    AV2: { type: Number, default: null },
    MU: { type: Number, default: null },
    MUPN1: { type: Number, default: null },
    MUPN2: { type: Number, default: null },
}, { _id: false });

// Schema para as notas do aluno em cada disciplina
// const notasAlunoSchema = new mongoose.Schema({
//     disciplina: { type: mongoose.Schema.Types.ObjectId, ref: 'Disciplina', required: true },
//     unidade1: { type: notasSchema, default: () => ({}) }, // Embutindo notasSchema
//     unidade2: { type: notasSchema, default: () => ({}) }, // Embutindo notasSchema
//     recuperacao: { type: Number, default: null },
//     mediaFinal: { type: Number, default: null }
// }, { _id: false });

const notasAlunoSchema = new mongoose.Schema({
    disciplina: { type: mongoose.Schema.Types.ObjectId, ref: 'Disciplina', required: true },
    unidade1: { type: unidadeSchema, default: () => ({}) }, // Unidade 1
    unidade2: { type: unidadeSchema, default: () => ({}) }, // Unidade 2
    unidade3: { type: unidadeSchema, default: () => ({}) }, // Unidade 3
    MFA: { type: Number, default: null }, // Menção final anual
    FT: { type: Number, default: 0 }, // Total de faltas
    MFAPN: { type: Number, default: null }, // Menção final anual pós NOA
    resumo: { type: String, default: null } // Resumo final do aluno
}, { _id: false });

// Schema para o aluno
const alunoSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    senha: { type: String, required: true },
    turma: { type: mongoose.Schema.Types.ObjectId, ref: 'Turma', required: true },
    notas: [notasAlunoSchema]
});

// Middleware para criptografar a senha antes de salvar
alunoSchema.pre('save', async function(next) {
    if (this.isModified('senha') || this.isNew) {
        const salt = await bcrypt.genSalt(10);
        this.senha = await bcrypt.hash(this.senha, salt);
    }
    next();
});

// Método para comparação de senha
alunoSchema.methods.compareSenha = function(senha) {
    return bcrypt.compare(senha, this.senha);
};

// Exportando o modelo de Aluno
module.exports = mongoose.model('Aluno', alunoSchema);
