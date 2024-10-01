const mongoose = require("mongoose");

const turmaSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    unique: true
  },
  disciplinas: [
    { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Disciplina",
      required: true 
    }
  ],
  turno: {
    type: String,
    enum: ['Manhã', 'Tarde', 'Noite'],
    required: true
  }
}, {
  timestamps: true 
});

const Turma = mongoose.model("Turma", turmaSchema);
module.exports = Turma;
