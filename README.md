# desafio-pitang-backend

## Para Iniciar o projeto use
### `npm start` ou `npm dev`

## O que é

Criar uma API que ira receber os dados do frontend e armazenalos no banco de dados, tambem ora responder requisições de busca e de alteração de dados

### o que foi feito
- API em nodejs com express
- rotas de usuario, como cadastro, login, listagem, etc
- midleware de authenticação, porem este esta inativo, pois essa parte não foi implementada no frontend
- rotas para agendamento de vacinação do codid-19, coo criar um agendamento, listar os agendamentos, listar por dia, deletar ou alterar um agendamento
- validação de dados
- tratamento de erros

### Bibliotecas usadas
- bcryptjs : usada para criptografar as senhas do usuario
- cors : usada para as requicisoes 
- date-fns : usada no tratamento de datas
- dotenv : usada para carregar variaveis de ambiente
- express : usada como o core da apliação, 
- joi : usada para validação de dados
- mongoose : usada para cominicar com o banco de dados
