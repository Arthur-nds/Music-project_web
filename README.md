# 🎵 Sistema de Gerenciamento Musical Web

## 📌 Resumo do Projeto

Este projeto é uma aplicação web desenvolvida para a disciplina **Programação Básica para Web**, do curso **Tecnólogo em Sistemas para Internet**.

⚠️ **Importante:** este projeto foi desenvolvido como um **protótipo funcional**, com foco inicial na implementação de um **CRUD (Create, Read, Update, Delete)**. O objetivo principal nesta etapa não foi criar um sistema completo, mas **validar a ideia, a arquitetura e a aplicação dos conceitos exigidos pela disciplina**.

A aplicação simula um **sistema de gerenciamento musical**, permitindo cadastrar, visualizar, atualizar e remover músicas, servindo como base para futuras evoluções.

---

## 💡 Ideia do Projeto

A ideia do projeto é desenvolver um **sistema simples de gerenciamento musical**, inicialmente como um **protótipo**, focado em operações básicas de CRUD.

Nesta primeira versão, o escopo foi propositalmente limitado para permitir maior atenção à **qualidade do código, lógica de programação e uso correto das tecnologias**, em vez de quantidade de funcionalidades.

O sistema funciona como um pequeno catálogo musical, onde o usuário pode:

* Cadastrar músicas
* Visualizar músicas cadastradas
* Atualizar informações
* Remover músicas

O tema musical foi escolhido por afinidade pessoal e por permitir trabalhar de forma prática conceitos fundamentais como objetos, arrays, eventos, persistência de dados e requisições assíncronas.

---

## ✅ Requisitos Atendidos (Checklist)

* [x] **Estruturas básicas** (condicionais, laços e funções)
* [] **Objetos e Arrays** com uso de `map`, `filter` e `reduce` (3 ou mais métodos)
* [x] **Arrow Functions**, incluindo uso em eventos
* [x] **DOM dinâmico**

  * Criação, remoção e atualização de elementos
  * Manipulação de formulários
  * Tratamento de eventos
* [x] **Requisição assíncrona** com `fetch`

  * Exibição de estado de carregamento (loading)
  * Tratamento de erros
* [] **Promises** usando `.then()` / `.catch()`
* [] **Async/Await** com `try/catch`
* [x] **Web Storage (LocalStorage)** para persistência de dados
* [] **API HTML5 adicional**: `Audio API` (ou outra, conforme implementação)
* [x] **Responsividade**, semântica HTML e acessibilidade básica
* [x] **Organização de arquivos** e README completo

---

## 🛠️ Decisões Técnicas

* **JavaScript Vanilla** foi utilizado para reforçar o aprendizado dos fundamentos, sem dependência de frameworks.
* A **Programação Orientada a Objetos (POO)** foi aplicada para representar músicas como objetos, facilitando manutenção e evolução do código.
* A separação de arquivos JavaScript foi adotada para melhorar a organização, dividindo responsabilidades como:

  * Lógica de negócio
  * Manipulação do DOM
  * Persistência de dados
* O **LocalStorage** foi escolhido por ser uma solução simples e adequada ao escopo acadêmico do projeto.
* O uso de **fetch API** simula integração com serviços externos, preparando o projeto para uma possível evolução futura com backend.

---

## ⚠️ Limitações Conhecidas

* Os dados ficam restritos ao navegador do usuário
* Não há autenticação ou controle de usuários
* A persistência não é compartilhada entre dispositivos
* O projeto não possui backend próprio (somente frontend)

Essas limitações são esperadas devido ao escopo acadêmico e aos objetivos da disciplina.

---

## ▶️ Como Executar o Projeto

1. Clone ou baixe este repositório
2. Abra a pasta do projeto
3. Execute o arquivo `index.html` em um navegador moderno (Chrome, Edge ou Firefox)

```bash
# Exemplo
abrir index.html
```

> ❗ Não é necessário instalar dependências ou rodar servidor

---

## 🖼️ Prints e GIFs

> 📸 **Adicione aqui prints ou GIFs da aplicação em funcionamento**

Exemplo:

```
/docs
 ├── tela-inicial.png
 ├── cadastro-musica.gif
```

---

## 📂 Estrutura de Arquivos (Exemplo)

```
📁 projeto-musical
 ├── 📁 css
 │   └── style.css
 ├── 📁 js
 │   ├── musica.js
 │   ├── storage.js
 │   ├── api.js
 │   └── main.js
 ├── 📁 docs
 │   └── prints e gifs
 └── index.html
```

---

## 🤖 Declaração de Uso de IA

Este projeto utilizou **Inteligência Artificial (ChatGPT)** como ferramenta de apoio para:

* Revisão de conceitos
* Organização do README
* Esclarecimento de dúvidas técnicas

Todo o código foi **analisado, adaptado e compreendido** pelo autor, sendo utilizado como parte do processo de aprendizado.

---

## ✍️ Autor

**Arthur**
Estudante de Tecnólogo em Sistemas para Internet
Interesses: Desenvolvimento Web, Programação e Música

---

## 📌 Status do Projeto

📘 Projeto acadêmico — concluído / em evolução
