const morgan = require("morgan");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const alunosRouter = require("./routes/alunoRoutes");
const disciplinasRouter = require("./routes/disciplinaRoutes");
const avisosRouter = require("./routes/avisoRoutes");
const turmasRouter = require("./routes/turmaRoutes");
const notasRouter = require("./routes/notasAlunoRoutes"); 

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Rotas
app.use("/api/turmas", turmasRouter);
app.use("/api/alunos", alunosRouter);
app.use("/api/disciplinas", disciplinasRouter);
app.use("/api/avisos", avisosRouter);
app.use("/api/notas", notasRouter);

module.exports = app;
