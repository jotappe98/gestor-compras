# Gestor de Compras

<p align="center">
Sistema desktop desenvolvido para otimizar e digitalizar o processo de compras da Ferragem Monteiro.
</p>

<p align="center">

 Projeto em desenvolvimento

</p>

---

# Sobre o projeto

O **Gestor de Compras** é um sistema desktop desenvolvido para substituir o processo manual de controle de compras utilizado atualmente pela empresa onde trabalho.

Hoje todas as solicitações são feitas utilizando papel e caneta, tornando o acompanhamento difícil, sujeito a perdas de informação e sem histórico organizado.

O objetivo do sistema é centralizar todo o fluxo de solicitações de compra em uma única aplicação, permitindo organizar produtos, prioridades, categorias, fornecedores e histórico de compras de forma rápida e intuitiva.

Além de resolver um problema real da empresa, este projeto também faz parte da minha evolução como desenvolvedor, aplicando conceitos de arquitetura de software, APIs REST, banco de dados relacionais e desenvolvimento de interfaces modernas.

---

# Objetivos

- Eliminar o controle manual de compras
- Centralizar todas as solicitações
- Facilitar o acompanhamento dos pedidos
- Organizar prioridades
- Melhorar a produtividade
- Criar histórico de compras
- Facilitar futuras integrações

---

# Tecnologias utilizadas

## Front-end

- React
- JavaScript
- CSS3
- Vite

## Back-end

- Python
- Flask
- SQLAlchemy

## Banco de dados

- MySQL

## Ferramentas

- Git
- GitHub
- Postman
- MySQL Workbench
- VS Code

---

# Arquitetura

O projeto utiliza **Arquitetura em Camadas (Layered Architecture)**, separando responsabilidades para facilitar manutenção, evolução e testes.

```
Frontend (React)

        │

        ▼

Rotas Flask

        │

        ▼

Services

        │

        ▼

Repositories

        │

        ▼

MySQL
```

Cada camada possui uma única responsabilidade.

- Frontend → Interface do usuário
- Routes → Recebimento das requisições
- Services → Regras de negócio
- Repositories → Comunicação com o banco
- Banco de dados → Persistência

---

# Estrutura do projeto

```
gestor-compras/

├── backend/
│
│   ├── app/
│   │
│   ├── models/
│   ├── repositories/
│   ├── routes/
│   ├── schemas/
│   ├── services/
│   ├── config/
│   └── database/
│
└── frontend/
    │
    ├── src/
    │
    ├── components/
    ├── pages/
    ├── services/
    ├── styles/
    └── assets/
```

---

# Funcionalidades implementadas

## Cadastro

- Cadastro de produtos
- Quantidade
- Categoria
- Prioridade
- Solicitante
- Fornecedor

---

## Listagem

- Lista de itens pendentes
- Seleção de item
- Painel de detalhes
- Numeração automática
- Paginação

---

## Pesquisa

Pesquisa em tempo real por:

- Nome
- Referência do produto
- Fornecedor
- Solicitante

---



## Interface

- Layout Desktop
- Sidebar
- Barra de pesquisa
- Tabela responsiva
- Painel de detalhes

---

# Funcionalidades em desenvolvimento

- Histórico de compras
- Lixeira
- Restaurar itens
- Exclusão definitiva
- Filtros avançados
- Ordenação
- Geração de relação de compras
- Exportação em PDF
- Melhorias visuais
- Atalhos de teclado
- Animações da interface

---

# Banco de dados

O banco foi modelado especificamente para o sistema.

Principais tabelas:

- categorias
- prioridades
- solicitantes
- status_item
- itens_compra

Relacionamentos implementados utilizando SQLAlchemy.

---

# API

Atualmente o backend possui endpoints para:

## Itens

```
POST /items
```

Criar item.

---

```
GET /items
```

Listar itens pendentes.

---

```
GET /items/search
```

Pesquisar itens.

---

```
GET /items/history
```

Histórico.

---

```
PATCH /items/{id}/complete
```

Finalizar item.

---

```
PATCH /items/{id}/trash
```

Mover para lixeira.

---

# Como executar

## Backend

Clone o projeto

```
git clone github.com/jotappe98/gestor-compras
```

Entre na pasta

```
cd backend
```

Instale as dependências

```
pip install -r requirements.txt
```

Configure o arquivo `.env`

```
DATABASE_URL=
```

Execute

```
python run.py
```

---

## Frontend

Entre na pasta

```
cd frontend
```

Instale as dependências

```
npm install
```

Execute

```
npm run dev
```

---

# Roadmap

- [x] Estrutura inicial
- [x] Banco de dados
- [x] API REST
- [x] Cadastro de itens
- [x] Listagem
- [x] Pesquisa
- [x] Paginação
- [x] Painel de detalhes
- [ ] Histórico
- [ ] Lixeira
- [ ] Filtros
- [ ] Ordenação
- [ ] Relação de compras
- [ ] Exportação PDF
- [ ] Dashboard
- [ ] Login de usuários

---

# Status do projeto

Atualmente o sistema encontra-se em desenvolvimento ativo.

Novas funcionalidades estão sendo implementadas continuamente e a aplicação será utilizada futuramente no ambiente interno da empresa Ferragem Monteiro para substituir o processo manual de compras.

---

# Autor

### João


---

# Licença

Este projeto foi desenvolvido para fins de estudo e aplicação prática em ambiente empresarial.