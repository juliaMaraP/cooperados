# 🚀 API de Cadastro de Cooperados - Unicred

Este projeto foi desenvolvido como parte do processo seletivo da **Unicred**.  
Consiste em uma aplicação full stack com backend em **Hyperf (PHP)** e frontend em **React.js**, utilizando **Docker** e **MySQL**.

---
## 📄 Documentação da API

A documentação completa da API (com exemplos de requisições e respostas) está disponível no Postman:

🔗 [Acessar Documentação Pública da API](https://documenter.getpostman.com/view/46791555/2sB34kDyiQ)


## 🧩 Funcionalidades

### ✅ Backend (Hyperf)
- Cadastro, listagem, edição e exclusão de cooperados (CRUD)
- Validações:
  - CPF ou CNPJ válidos
  - Telefone válido
  - Data válida (nascimento ou constituição)
  - Campos obrigatórios: nome, CPF/CNPJ, data, renda/faturamento, telefone
  - E-mail é opcional
  - Impede duplicidade de CPF/CNPJ
- Mensagens de erro claras com status codes apropriados
- Testes automatizados com PHPUnit
- CORS habilitado para o frontend consumir a API

### ✅ Frontend (React.js)
- Tela de login simples (login:admin password:admin)
- Tela de listagem de cooperados
- Formulário para cadastro e edição com máscaras de CPF/CNPJ e telefone
- Mensagens de sucesso e erro exibidas na interface
- Integração total com a API

---

## 🛠️ Tecnologias utilizadas

| Camada     | Tecnologia        |
|------------|-------------------|
| Backend    | PHP (Hyperf)      |
| Frontend   | React.js (Vite)   |
| Banco de dados | MySQL         |
| Containers | Docker + Docker Compose |
| Testes     | PHPUnit           |

---

## 🚀 Como rodar o projeto

### 1. Clonar o repositório
```bash
git clone https://github.com/juliaMaraP/cooperados.git


Subir os containers
docker-compose up --build

Instalar dependências do backend
docker exec -it hyperf-app composer install

Criar o banco e rodar as migrations
docker exec -it hyperf-app php bin/hyperf.php migrate

Rodar os testes (opcional)
docker exec -it hyperf-app php vendor/bin/phpunit

Rodar o frontend (em outro terminal)
cd frontend
npm install
npm run dev
```
Acesso
API: http://localhost:9501/cooperados

Frontend: http://localhost:5173


⚙️ Observações Técnicas (Hyperf)
Este projeto foi iniciado com o skeleton oficial do Hyperf. Mais informações técnicas sobre o ambiente podem ser encontradas no repositório oficial do Hyperf.


##  Sobre o teste

---

## ✅ O que foi atendido do desafio

O projeto cumpre **todas as exigências** da proposta, incluindo:

- API RESTful completa com **cadastro, listagem, visualização, edição e exclusão** de cooperados
- Validações completas de todos os campos obrigatórios
- **Validação de CPF e CNPJ** com regras específicas
- **Validação de telefone** com regex
- Impede cadastro de **CPF/CNPJ duplicado**
- Retorno de **status HTTP apropriado** com mensagens de erro claras
- Interface web desenvolvida com **React.js**
- Banco de dados **MySQL**
- Projeto configurado e executável via **Docker**
- README completo com instruções de uso
- Estrutura de código clara, separando responsabilidades no backend

---

## ✨ Diferenciais implementados

Além dos requisitos, o projeto inclui:

- Máscaras dinâmicas de **CPF/CNPJ** e **telefone** no frontend (ao digitar e ao exibir)
- Componentização das telas no React
- Paginação na listagem de cooperados
- Estilização personalizada com **CSS puro**, sem frameworks
- Implementação de **teste automatizado** no backend (PHPUnit) para validação da API
- Fluxo de login simples no frontend (para simular login e redirecionamento)
- Tratamento de erros do Axios centralizado no frontend
- Documentação da API
---

## 🚀 O que faria com mais tempo

Com mais tempo disponível, eu gostaria de:

- Implementar autenticação real (login com token JWT e proteção das rotas)
- Criar testes unitários mais robustos e mocks no backend
- Adicionar filtros mais robustos na listagem de cooperados
- Criar uma dashboard visual com gráficos de renda/faturamento

---

