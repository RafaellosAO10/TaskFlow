# 🚀 TaskFlow - Sistema Ágil de Gerenciamento de Tarefas

## 📋 Sobre o Projeto

O **TaskFlow** é um sistema web de **gerenciamento ágil de tarefas**, desenvolvido como parte de um projeto acadêmico para uma **startup de logística**, aplicando **práticas reais de Engenharia de Software** e **metodologias ágeis**.  
O objetivo do sistema é otimizar o acompanhamento de atividades e equipes através de **quadros Kanban** e **listas dinâmicas**, com suporte a **modo claro/escuro**, **filtros inteligentes** e **atribuição de responsáveis**.

---

## ✨ Funcionalidades Principais

- ✅ **CRUD completo de tarefas** — criar, visualizar, editar e excluir tarefas.
- 🔍 **Busca e Filtro de Tarefas** — busca por título, responsável, prioridade e status.
- 🚦 **Controle de Status** — colunas interativas: *A Fazer*, *Em Progresso* e *Concluído*.
- 🏷️ **Priorização** — níveis: *Crítica*, *Alta*, *Média* e *Baixa*.
- 👤 **Atribuição de Responsável** — define quem executará a tarefa.
- 🌓 **Modo Claro e Escuro** — alternância visual com persistência de preferência.
- 🧭 **Visualização Dual** — exibição em **modo Kanban** ou **modo Lista**.
- ⏰ **Registro de Datas** — exibe criação e conclusão das tarefas.
- 💾 **Armazenamento Local** — persistência das tarefas no *localStorage*.
- 🎨 **Design Responsivo e Moderno** — interface intuitiva e adaptável a diferentes telas.

---

## 📦 Tecnologias Utilizadas

| Categoria | Tecnologias |
|------------|--------------|
| **Frontend** | React.js, TypeScript, Tailwind CSS |
| **Componentes UI** | shadcn/ui, Lucide Icons |
| **Gerenciamento de Estado** | React Hooks (useState, useEffect) |
| **Datas** | date-fns |
| **Ferramentas de Build** | Vite |
| **Controle de Versão** | Git e GitHub |

---

## ⚙️ Instalação e Execução

Siga os passos abaixo para executar o projeto localmente:

```bash
# Clone o repositório
git clone https://github.com/RafaellosAO10/TaskFlow

# Acesse a pasta do projeto
cd taskflow

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
