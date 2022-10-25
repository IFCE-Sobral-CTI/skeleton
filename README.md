# ESQUELETO PARA APLICAÇÕES DO IFCE - CAMPUS SOBRAL

## FERRAMENTAS USADAS

* Laravel
* Inertia
* ReactJS

## INSTALAÇÃO

Para instalar faça um clone do projeto:

```sh
git clone https://github.com/CTI-Sobral-IFCE/skeleton.git meu-projeto
```

Acesse o diretório do projeto:

```sh
cd meu-projeto
```

Remova o repositório do Esqueleto de Aplicação:

```sh
git remote remove origin
```

Adicione o repositório do seu projeto.

```sh
git remote add origin https://github.com/USER/REPO.git
```

Faça uma cópia do arquivo ```.env```:

```sh
cp .env.example .env
```

Abra o arquivo ```.env``` e preencha com as configurações(Nome, url, banco de dados) do seu projeto.

Instale os pacotes do PHP/Laravel:

```sh
composer update
```

Instale os pacotes Javascript/Inertia/Javascript:

```sh
npm install
```

Gere a chave de segurança da sua aplicação Laravel:

```sh
php artisan key:generate
```

Povoe o banco de dados:

```sh
php artisan migrate:fresh --seed
```

Para executar o projeto depois das configurações:

```sh
npm run dev
```

O sistema está distribuído em duas partes do front-end.

* Página de acesso público
  * <http://url-do-app>
* Dashboard
  * <http://url-do-app/admin>

Para acessar a dashboard use as seguintes credenciais
* Usuário: ti.sobral@ifce.edu.br
* Senha: qwe123

### TELAS

[Gerenciamento de Usuários]: https://github.com/CTI-Sobral-IFCE/skeleton/blob/main/public/screenshots/users-admin.png?raw=true

### CRÉDITOS

Projeto desenvolvido pela Coordenadoria de Tecnologia da Informação do IFCE - *Campus* Sobral.

### CONTATO

<ti.sobral@ifce.edu.br>

### LICENÇA

Este é um software de código aberto licenciado sob a licença do [MIT](https://opensource.org/licenses/MIT).
