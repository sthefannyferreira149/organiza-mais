# Organiza+

Aplicação web para organização e acompanhamento de tarefas, desenvolvida com Spring Boot e uma interface responsiva em HTML, CSS e JavaScript.

![Java](https://img.shields.io/badge/Java-25-ED8B00?logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-4.0.6-6DB33F?logo=springboot&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?logo=mysql&logoColor=white)
![Maven](https://img.shields.io/badge/Maven-C71A36?logo=apachemaven&logoColor=white)

---

## Sobre o projeto

O **Organiza+** permite criar, visualizar, editar, concluir e excluir tarefas. As informações são persistidas em um banco MySQL por meio de uma API REST desenvolvida com Spring Data JPA.

### Principais recursos

- Criação de tarefas com título, descrição e data de entrega
- Filtros para tarefas pendentes e concluídas
- Alteração do status diretamente pela interface
- Edição e exclusão de tarefas
- Contadores atualizados automaticamente
- Interface responsiva e acessível
- API REST para integração com outros sistemas

---

## Tecnologias utilizadas

- **Java 25**
- **Spring Boot 4.0.6**
- **Spring Web MVC**
- **Spring Data JPA**
- **Hibernate**
- **MySQL**
- **Maven Wrapper**
- **HTML5**
- **CSS3**
- **JavaScript**

---

## Pré-requisitos

Antes de iniciar, certifique-se de ter instalado:

- [JDK 25](https://www.oracle.com/java/technologies/downloads/)
- [MySQL](https://dev.mysql.com/downloads/)
- [Git](https://git-scm.com/)

Não é necessário instalar o Maven, pois o projeto já inclui o Maven Wrapper.

---

## Instalação

Clone o repositório:

```bash
git clone https://github.com/sthefannyferreira149/organiza-mais.git
cd organiza-mais
```

---

## Configuração do banco de dados

Por padrão, a aplicação utiliza as configurações abaixo:

| Configuração | Valor |
| --- | --- |
| Banco | `gerenciador_db` |
| Usuário | `root` |
| Senha | `SUA_SENHA` |
| Host | `localhost` |
| Porta | `3306` |

Caso suas credenciais sejam diferentes, atualize o arquivo:

```text
src/main/resources/application.properties
```

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/gerenciador_db?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=sua_senha
spring.jpa.hibernate.ddl-auto=update
```

O banco informado em `createDatabaseIfNotExist=true` é criado automaticamente, caso não exista.

> Recomenda-se não versionar credenciais reais. Em ambientes compartilhados ou de produção, utilize variáveis de ambiente ou um gerenciador de segredos.

---

## Executando a aplicação

### Windows

```powershell
.\mvnw.cmd spring-boot:run
```

### Linux ou macOS

```bash
./mvnw spring-boot:run
```

Após iniciar a aplicação, acesse:

```text
http://localhost:8080
```

---

## Executando os testes

### Windows

```powershell
.\mvnw.cmd test
```

### Linux ou macOS

```bash
./mvnw test
```

---

## API REST

### Tarefas

Base URL:

```text
/api/tarefas
```

| Método | Endpoint | Descrição |
| --- | --- | --- |
| `GET` | `/api/tarefas` | Lista todas as tarefas |
| `POST` | `/api/tarefas` | Cria uma tarefa |
| `PUT` | `/api/tarefas/{id}` | Atualiza uma tarefa |
| `DELETE` | `/api/tarefas/{id}` | Remove uma tarefa |

Exemplo de criação:

```bash
curl -X POST http://localhost:8080/api/tarefas \
  -H "Content-Type: application/json" \
  -d '{"titulo":"Estudar Java","descricao":"Revisar Spring Boot","dataEntrega":"2026-11-30","status":"A_FAZER"}'
```

Exemplo de resposta:

```json
{
  "id": 1,
  "titulo": "Estudar Java",
  "descricao": "Revisar Spring Boot",
  "status": "A_FAZER",
  "lista": null,
  "dataCriacao": "2026-11-24T13:43:25",
  "dataEntrega": "2026-11-30"
}
```

Status disponíveis:

- `A_FAZER`
- `FAZENDO`
- `CONCLUIDA`

### Listas

Base URL:

```text
/api/listas
```

| Método | Endpoint | Descrição |
| --- | --- | --- |
| `GET` | `/api/listas` | Lista todas as listas |
| `POST` | `/api/listas` | Cria uma lista |

Exemplo de criação:

```bash
curl -X POST http://localhost:8080/api/listas \
  -H "Content-Type: application/json" \
  -d '{"nome":"Trabalho","cor":"#7c3aed"}'
```

---

## Estrutura do projeto

```text
src/
├── main/
│   ├── java/com/example/demo/
│   │   ├── DemoApplication.java
│   │   ├── controller/
│   │   │   ├── ListaController.java
│   │   │   └── TarefaController.java
│   │   ├── model/
│   │   │   ├── Lista.java
│   │   │   └── Tarefa.java
│   │   └── repository/
│   │       ├── ListaRepository.java
│   │       └── TarefaRepository.java
│   └── resources/
│       ├── application.properties
│       └── static/
│           ├── app.js
│           ├── index.html
│           └── styles.css
└── test/
    └── java/com/example/demo/
        └── DemoApplicationTests.java
```

---

## Uso

1. Inicie o MySQL.
2. Configure as credenciais em `application.properties`.
3. Execute a aplicação com o Maven Wrapper.
4. Abra `http://localhost:8080`.
5. Cadastre uma tarefa informando título, descrição e data de entrega.
6. Utilize os filtros, a edição, a conclusão ou a exclusão conforme necessário.

---

## Licença

Este projeto ainda não possui uma licença definida.
