/* eslint-disable no-console */
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from './swagger/swagger_output.json';
import app from './app';

dotenv.config({ path: './variables.env' });

mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (error) => {
  console.error(`ERRO: ${error.message}`);
});

const server = express();

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use('/images', express.static('public/images'));

server.use(
  '/docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerFile, {
    swaggerOptions: { persistAuthorization: true },
  }),
);
server.use('/', app);

server.listen(process.env.PORT, () => {
  const blue = '\u001b[34m';
  const reset = '\u001b[0m';
  const cyan = '\x1b[36m';

  console.log(`\n${cyan}Servidor rodando na porta: ${process.env.PORT}`);
  console.log(
    `Documentação: ${blue}http://localhost:${process.env.PORT}/docs${reset}`,
  );
});
