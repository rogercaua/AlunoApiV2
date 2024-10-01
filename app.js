const morgan = require("morgan");
const express = require("express");
const bodyparser = require("body-parser");
const app = express();
const cors = require("cors");

const alunosRouter = require("./routes/alunoRoutes");
const disciplinasRouter = require("./routes/disciplinaRoutes")
const avisosRouter = require("./routes/avisoRoutes")
const turmasRouter = require("./routes/turmaRoutes")


app.use(cors());
app.use(bodyparser.json());

if (process.env.NODE_ENV === "development"){
  app.use(morgan("dev"));
};

app.use("/api/turmas", turmasRouter);
app.use("/api/alunos", alunosRouter);
app.use("/api/disciplinas",disciplinasRouter);
app.use("/api/avisos",avisosRouter);

module.exports = app;
