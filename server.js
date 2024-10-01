const dotenv = require ("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./app");
const mongoose = require("mongoose");  
const port = process.env.PORT;

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD 
);

mongoose.connect(DB)
.then(() => console.log("Conectado ao Banco de Dados"))
.catch(err => console.log("Erro ao Conectar ao Banco de dados", err));

app.listen(port, () => console.log(`Server listening on port ${port}`));
