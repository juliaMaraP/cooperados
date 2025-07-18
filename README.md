# 🚀 API de Cadastro de Cooperados - Unicred

Este projeto foi desenvolvido como parte do processo seletivo da **Unicred**.  
Consiste em uma aplicação full stack com backend em **Hyperf (PHP)** e frontend em **React.js**, utilizando **Docker** e **MySQL**.

---

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
- Tela de login simples 
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
cd seu-repositorio

Subir os containers
docker-compose up -d

Instalar dependências do backend
docker exec -it app composer install

Criar o banco e rodar as migrations
docker exec -it app php bin/hyperf.php migrate

Rodar os testes (opcional)
docker exec -it app php vendor/bin/phpunit

Rodar o frontend (em outro terminal)
cd frontend
npm install
npm run dev

Acesso
API: http://localhost:9501

Frontend: http://localhost:5173


⚙️ Observações Técnicas (Hyperf)
Este projeto foi iniciado com o skeleton oficial do Hyperf. Mais informações técnicas sobre o ambiente podem ser encontradas no repositório oficial do Hyperf.


