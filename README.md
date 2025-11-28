# APP

Gympass Style App

## RFs (Requisitos Funcionais)

- [ ] Deve ser possível se cadastrar;
- [ ] Deve ser possível se autenticar;
- [ ] Deve ser possível obter o perfil de um usuário logado;
- [ ] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [ ] Deve ser possível o usuário obeter seu histórico de check-ins;
- [ ] Deve ser possível o usuário buscar academias próximas;
- [ ] Deve ser possível o usuário buscar academias pelo nome;
- [ ] Deve ser possível o usuário realizar check-in em uma academia;
- [ ] Deve ser possível validar o check-in do usuário;
- [ ] Deve ser possível cadastrar uma academia;

## RNs (Regras de Negócio)

- [ ] O usuário não deve poder se cadastrar com e-mail duplicado;
- [ ] O usuário não pode fazer 2 check-ins no mesmo dia;
- [ ] O usuário não pode fazer check-in se não estriver perto (100m) da academia;
- [ ] O check-in so pode ser validade até 20 minutos após criado;
- [ ] O check-in so pode ser validado por administradores;
- [ ] A academia do pode ser cadastrada por administradores;

## RNFs (Requisitos Não-Funcionais)

- [ ] A senha do usuário precisa estar criptografados;
- [ ] Os dados da aplicação prescisam estar persistidos em banco PostgriSQL;
- [ ] Todas listas de dados prescisam estar paginadas com o20 itens por página;
- [ ] o usuário deve ser identificado po um JWT (JSON Web Token);


# SetUp


Subir todos os containers na aplicação pela primeira vez
```bash docker
docker compose up
```
Iniciar todos os containers ja criados da aplicação
```bash docker
docker compose start
```
Para todos os containers na aplicação
```bash docker
docker compose stop
```
Deleta todos os containers na aplicação
```bash docker
docker compose down
```
Ver quais containers estão sendo executadas
```bash docker
docker ps
```
Ver todas os containers criadas
```bash docker
docker ps -a
```

Executar as migrações
```bash prisma
npx prisma migrate dev
```

```bash prisma
npx prisma studio 
```