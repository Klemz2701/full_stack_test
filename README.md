## Full Stack - Test

Este projeto é uma plataforma de gerenciamento de filmes e usuários, permitindo aos administradores gerenciar (adicionar, atualizar, deletar) filmes e usuários. Os usuários podem se registrar, entrar, e visualizar uma lista de filmes disponíveis. Construído com uma arquitetura dividida, o backend é desenvolvido com Node.js e Express, enquanto o frontend utiliza React.

## Começando

- Para começar a trabalhar com este projeto, siga estas etapas:

- Clone o repositório: Clone o projeto para sua máquina local usando o comando git clone git@gitlab.com:Klemz2701/full-stack-test.git.

- Instale o Node.js: Certifique-se de ter o Node.js instalado em sua máquina. Se não, você pode baixá-lo e instalá-lo a partir do site [oficial do Node.js.](https://nodejs.org/)

- Instale as dependências: Navegue até os diretórios do frontend e backend separadamente em seu terminal e execute `npm install` em cada um para instalar as dependências necessárias.

- Configure as variáveis de ambiente: Configure as variáveis de ambiente necessárias para o backend, como strings de conexão do banco de dados, chaves secretas para JWT, etc (é essencial criar um arquivo .env no diretório do backend, baseando-se no arquivo .env.example fornecido. Este arquivo deve incluir todas as variáveis de ambiente necessárias, como strings de conexão de banco de dados e chaves secretas. É importante não alterar o login e a senha fornecidos, pois eles são configurados para funcionar com o banco de dados específico do projeto e alterações podem resultar em falha de conexão. Altere apenas o SECRET).


- Inicie os servidores de desenvolvimento:


- Para o backend, execute `npm run start` no diretório do backend para iniciar o servidor de desenvolvimento, será iniciado em http://localhost:3000.
- Para o frontend, execute `npm start` no diretório do frontend para iniciar o servidor de desenvolvimento, será iniciado em http://localhost:3001.


## Utilização da API
- Sempre fazer o acesso utilizando o baseURL: http://localhost:3000


**GET** -> _baseURL_/

Apenas para testar se a conexão está funcionando

_Usuários:_

**POST** -> _baseURL_/user/register

Usado para registrar um novo usuário, json:
{
    "name" : "",
    "email" : "",
    "password" : "",
    "confirmpassword" : ""
}


**POST** -> _baseURL_/user/login

Usado para realizar a autenticação e receber o token, json:
{
    "email": "",
    "password": ""
}

_**A partir de agora, todas as requisições necessitarão do Token recebido anteriormente, então não se esqueça de adicionar o "Bearer Token" no seu software**_


**GET** -> _baseURL_/users

Usado para retornar uma lista de todos os id, nome e email dos usuários cadastrados.


**GET** -> _baseURL_/user/:id

Usado para retornar informações sobre um id específico de um usuário, alterar o final da codigo para o id desejado
Exemplo: baseURL/user/65d6b9c52ab9608c896de2ad


**PUT** -> _baseURL_/user/:id

Usado para atualizar informações sobre o usuário


**DELETE** -> _baseURL_/user/:id

Usado para deletar um usuário


_Filmes:_

**POST** -> _baseURL_/movie/register

Usado para registrar um novo filme, json:
{
    "title": "",
    "duration": "",
    "synopsis": ""
}


**GET** -> _baseURL_/movie/list

Usado para retornar a lista de filmes, com o id, título, duração e sinópse


**PUT** -> _baseURL_/movie/:id

Usado para atualizar informações do filme


**DELETE** -> _baseURL_/movie/:id

Usado para deletar um filme 


## Backend - Estrutura e Funcionalidades

O backend do projeto é construído com Node.js, Express, e MongoDB (usando Mongoose para modelagem de dados). Ele implementa autenticação JWT para segurança e utiliza bcrypt para hashing de senhas. Aqui estão algumas das principais rotas e funcionalidades:

**Rotas de Usuário:**
Registro de usuário com validação de campos e criptografia de senha.
Login de usuário com autenticação JWT.
Atualização de informações do usuário.
Exclusão de usuário.
Listagem de todos os usuários.

**Rotas de Filme:**
Registro de novos filmes com validações de campo.
Listagem de todos os filmes.
Atualização de informações do filme.
Exclusão de filme.

**Middleware de Autenticação:**
Um middleware que verifica o token JWT nas rotas protegidas.

**Conexão com MongoDB:**
Utiliza variáveis de ambiente para a conexão segura com o banco de dados MongoDB.

Oferece uma API RESTful para o gerenciamento de usuários e filmes, protegendo rotas sensíveis com autenticação JWT e garantindo a segurança dos dados dos usuários com hashing de senhas.

## Frontend - Estrutura e Funcionalidades
O frontend do projeto é construído com React, utilizando React Router para a navegação e Axios para a comunicação com a API do backend. Aqui estão alguns dos principais componentes e funcionalidades:

**App.js:** O componente principal que define as rotas do aplicativo e a navegação.

**Index.js:** Ponto de entrada do React que renderiza o componente App no DOM.

**Api.js:** Define as funções de chamada da API para interagir com o backend.

**Login.js:** Componente para a autenticação de usuários, utilizando tokens JWT.

**MenuPage.js:** Página inicial que apresenta opções de navegação no aplicativo.

**MoviesList.js e UsersList.js:** Componentes que listam filmes e usuários, respectivamente, consumindo dados do backend.

**PrivateRoute.js:** Um componente de rota que requer autenticação, protegendo rotas específicas de usuários não autenticados.

Oferece uma interface de usuário interativa, permitindo aos usuários gerenciar filmes e usuários com autenticação segura e navegação intuitiva.
