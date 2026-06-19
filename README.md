
```markdown
# 🔐 Cadastro e Login - API

API REST para cadastro e login de usuários desenvolvida do zero com Node.js, Express e TypeScript. O projeto foi estruturado para praticar conceitos de arquitetura em camadas, tipagem estática e segurança na manipulação de dados sensíveis utilizando JWT e criptografia de senhas.

---

## 🚀 Tecnologias

* **Node.js** — Ambiente de execução JavaScript
* **TypeScript** — Superset tipado do JavaScript
* **Express** — Framework web para APIs REST
* **JWT (JSON Web Token)** — Autenticação segura via tokens
* **bcryptjs** — Criptografia e hashing de senhas
* **dotenv** — Gerenciamento de variáveis de ambiente
* **tsx** — Execução TypeScript em tempo de desenvolvimento sem compilação manual
* **tsup** — Build automatizado e ultra-rápido para produção

---

## 📁 Estrutura do Projeto

```text
src/
 ├── controllers/    # Camada de interface HTTP (recebe requisições e envia respostas)
 ├── models/         # Definição de interfaces e tipos do TypeScript (DTOs)
 ├── routes/         # Definição dos caminhos/endpoints da API
 ├── services/       # Camada de regras de negócio e lógica pesada (criptografia, validações)
 └── index.ts        # Ponto de entrada (inicialização do servidor Express)

```

---

## ⚙️ Funcionalidades

### 🔐 Autenticação e Usuários

* **Cadastro de usuários** (`POST /auth/register`)
* **Login com geração de Token JWT** (`POST /auth/login`)
* **Omissão de dados sensíveis** (A senha criptografada nunca é exposta no retorno das requisições)

---

## 🧠 Recursos Técnicos Implementados

* **Utility Types do TypeScript:** Uso estratégico do `Omit<User>` para gerar o DTO de cadastro, evitando duplicação de interfaces.
* **Imutabilidade no JavaScript:** Aplicação de desestruturação combinada com o operador *Rest* (`...`) para remover propriedades sensíveis de objetos de forma limpa.
* **Persistência em Memória:** Simulação de um banco de dados relacional através de coleções tipadas na memória para focar puramente na lógica de software e fluxo de dados.

---

## ⚙️ Como rodar localmente

### 1. Clone o repositório

```bash
git clone [https://github.com/seu-usuario/api-autenticacao-typescript.git](https://github.com/seu-usuario/api-autenticacao-typescript.git)
cd api-autenticacao-typescript

```

### 2. Instale as dependências

```bash
npm install

```

### 3. Rodar em desenvolvimento (Watch Mode)

```bash
npm run start:watch

```

O servidor estará disponível em: 👉 `http://localhost:3000`

### 4. Gerar build TypeScript (Produção)

```bash
npm run dist

```

Os arquivos compilados de forma otimizada serão gerados na pasta: `dist/`

---

## 📋 Principais Rotas

### 🔐 Autenticação

| Método | Rota | Descrição |
| --- | --- | --- |
| **POST** | `/auth/register` | Cria um novo usuário e retorna o perfil criado (sem a senha). |
| **POST** | `/auth/login` | Valida as credenciais e devolve o token JWT de acesso. |

---

## 🧪 Como Testar os Endpoints (Via Terminal)

Abra uma nova aba do terminal e utilize os comandos `curl` abaixo para validar o fluxo:

### 📑 1. Cadastrar um Usuário

```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name": "Giliarde Rodrigues", "email": "giliarde@email.com", "password": "senha_super_segura"}'

```

### 🔑 2. Realizar Login

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "giliarde@email.com", "password": "senha_super_segura"}'

```

---

## 🧱 Arquitetura do Projeto

O sistema foi organizado em camadas para facilitar a manutenção e focar no aprendizado de boas práticas de design de software:

* **Routes** → Direcionamento e mapeamento dos endpoints da aplicação.
* **Controllers** → Validação inicial do payload HTTP, controle de status das respostas e comunicação com a lógica.
* **Services** → Localização estrita de toda a regra de negócio (hashing da senha, busca por e-mail duplicado e assinatura do JWT).
* **Models** → Concentração das regras de tipo e contratos do TypeScript.

---

## 👨‍💻 Autor

Desenvolvido por **Giliarde Rodrigues**

```


```
