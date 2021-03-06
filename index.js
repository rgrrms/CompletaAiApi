import express from 'express';
import db from "./src/models";
import cors from 'cors';
import dotenv from 'dotenv-safe';
import router from "./src/routes/router";
dotenv.config();

(async () => {
  try {
    await db.mongoose.connect(db.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log('Conectado no mongo com sucesso!');
  } catch (error) {
    console.log('Erro na conexão com o mongo ' + error);
  }
})();

const app = express();
app.use(cors());
app.use(express.json());

app.use(router);

app.use(express.json());

app.listen(process.env.PORT, () => console.log(`App listening on port ${process.env.PORT}!`));
