<p align="center">
  <img src="readme-assets/baskapp-logo.png" width="200" alt="BaskApp Logo" />
</p>

<h1 align="center">BaskApp API</h1>

<p align="center">API core para o app BaskApp, app de estatistica de atletas de basquete e trade dos jogadores.</p>
<p align="center">
    <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Descrição

API desenvolvida em Node com NestJs, utilizando TypeOrm para gestão de banco de dados.

## Executar o app

Crie um arquivo chamado .env e adicione as seguintes chaves
````.dotenv
# DATA BASE
DB_TYPE=postgres
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD={SUA SENHA}
DB_DATABASE=baskapp
# True only in dev mode
DB_SYNCHRONIZE=true

# SECRET
JWT_SECRET=FLVksKSu3PFakZ9TXz2ec5UubHI7PaXZn5G1oUyRG2TnZiXlHuRok1s
````

### Baixar dependências

```bash
$ npm install
```

### Rodar o app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## License

Nest is [MIT licensed](LICENSE).
