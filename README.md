# 🚀 Gympass API Node.js

API RESTful para um aplicativo de check-in em academias, replicando o conceito do Gym Pass. Desenvolvida como um projeto de estudo em **Node.js** e **TypeScript**, utilizando as melhores práticas e padrões de mercado.

## ✨ Tecnologias

Este projeto foi construído com uma stack robusta e moderna, focada em performance e escalabilidade:

* **Linguagem:** Node.js
* **Superset:** TypeScript
* **Framework:** Fastify (Alto desempenho e baixo overhead)
* **ORM:** Prisma (Next-generation ORM)
* **Validação:** Zod
* **Banco de Dados:** PostgreSQL
* **Containerização:** Docker

### Padrões e Práticas

* Design Patterns
* Testes Unitários
* Testes E2E (End-to-End)
* CI/CD (Integração e Entrega Contínua)

## 📋 Requisitos do Sistema

### Requisitos Funcionais (RFs)

- [x] Deve ser possível se cadastrar.
- [x] Deve ser possível se autenticar.
- [x] Deve ser possível obter o **perfil** do usuário logado.
- [ ] Deve ser possível obter o **número de check-ins** realizados pelo usuário logado.
- [ ] Deve ser possível o usuário obeter seu **histórico de check-ins**.
- [ ] Deve ser possível o usuário **buscar academias** próximas ou pelo nome.
- [x] Deve ser possível o usuário realizar **check-in** em uma academia.
- [ ] Deve ser possível **validar o check-in** do usuário (por administradores).
- [ ] Deve ser possível **cadastrar uma academia** (por administradores).

### Regras de Negócio (RNs)

- [x] O usuário não deve poder se cadastrar com **e-mail duplicado**.
- [x] O usuário não pode fazer **2 check-ins no mesmo dia**.
- [ ] O usuário não pode fazer check-in se não estivér **perto (100m)** da academia.
- [ ] O check-in só pode ser **validado até 20 minutos** após criado.
- [ ] O check-in só pode ser validado por **administradores**.
- [ ] A academia só pode ser cadastrada por **administradores**.

### Requisitos Não-Funcionais (RNFs)

- [x] A senha do usuário precisa estar **criptografada**.
- [x] Os dados da aplicação precisam estar persistidos em banco **PostgreSQL**.
- [ ] Todas listas de dados precisam estar **paginadas com 20 itens** por página.
- [ ] O usuário deve ser identificado por um **JWT** (JSON Web Token).

## 💻 Setup e Execução

Para iniciar o projeto, é necessário ter o **Docker** instalado.

Instale usando o repositório APT

### 1.Configure repositório apt do Docker.
```bash
# Add Docker's official GPG key:
sudo apt update
sudo apt install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# Add the repository to Apt sources:
sudo tee /etc/apt/sources.list.d/docker.sources <<EOF
Types: deb
URIs: https://download.docker.com/linux/ubuntu
Suites: $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}")
Components: stable
Signed-By: /etc/apt/keyrings/docker.asc
EOF

sudo apt update
```

### 2.Instale os pacotes do Docker.
```bash
sudo apt install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

#### Observação
```
O serviço Docker inicia automaticamente após a instalação. Para verificar se o Docker está em execução, utilize:

sudo systemctl status docker

Alguns sistemas podem ter esse comportamento desativado e exigirão uma inicialização manual:

sudo systemctl start docker
```

Para criar o dockergrupo e adicionar seu usuário:

#### 2.1 Crie o dockergrupo.
```bash
sudo groupadd docker
```
#### 2.2 Adicione seu usuário ao dockergrupo.
```bash
sudo usermod -aG docker $USER
```
#### 2.3 Saia da sua conta e entre novamente para que sua participação no grupo seja reavaliada, ou executar o seguinte comando para ativar as alterações nos grupo.
```bash
newgrp docker
```


### 3. Instalação de Dependências

Primeiro, clone o repositório e instale as dependências do Node.js:

```bash
# Clone o repositório
git clone <URL_DO_SEU_REPOSITORIO>
cd gym-checkin-api

# Instale as dependências
npm install
```

### 4. Configuração do Ambiente e Banco de Dados

Suba o container do PostgreSQL e gere o cliente do Prisma:
```bash
# Sobe o container do PostgreSQL (necessário para o banco de dados)
docker compose up -d

# Gere o Prisma Client
npx prisma generate

# Executa as migrações para criar as tabelas no banco de dados
npx prisma migrate dev
```

Nota: Certifique-se de configurar o arquivo de variáveis de ambiente (.env) com as credenciais corretas do seu banco de dados, conforme definido no seu docker-compose.yml.

### 5. Execução do Servidor

Você pode iniciar a API em modo de desenvolvimento (com hot reload) ou em modo de produção.

#### Modo de Desenvolvimento (Recomendado para estudo)
```bash
# Executa a aplicação com o TypeScript em modo de desenvolvimento
npm run dev
```
#### Modo de Produção
```bash
# Compila o código TypeScript para JavaScript
npm run build

# Executa o código compilado
npm run start
```

Após a execução, a API estará acessível em http://localhost:3333 (ou a porta configurada no seu .env).

---


### 🐳 Comandos Docker

| Comando | Descrição |
| :--- | :--- |
| `docker compose up` | Sobe todos os containers na aplicação pela primeira vez. |
| `docker compose start` | Inicia todos os containers já criados da aplicação. |
| `docker compose stop` | Para todos os containers na aplicação. |
| `docker compose down` | Deleta todos os containers na aplicação. |
| `docker ps` | Vê quais containers estão sendo executados. |
| `docker ps -a` | Vê todas os containers criadas. |

### ⚙️ Comandos do Prisma

Após subir o container do PostgreSQL, você pode interagir com o banco de dados e o ORM:

| Comando | Descrição |
| :--- | :--- |
| `npx prisma generate` | Gera o Prisma Client após alterações no schema. |
| `npx prisma migrate dev` | Executa as migrações (cria/atualiza tabelas). |
| `npx prisma studio` | Abre uma interface gráfica para visualizar os dados. |