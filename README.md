# 🐾 EloPet

> Conectando causas animais a doadores através de uma plataforma segura, escalável e tipada de ponta a ponta.

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

O **EloPet** é uma aplicação Fullstack desenvolvida para facilitar a criação de perfis e a arrecadação de doações para pets em situação de vulnerabilidade. O projeto foi construído com as tecnologias mais modernas do ecossistema React/Next.js, com um **forte foco na arquitetura do Back-End, segurança e integridade de dados**.

🔗 **[Acesse o projeto em produção aqui](https://elo-pet.vercel.app)**

---

## ⚙️ Arquitetura e Destaques Técnicos (Back-End)

Este projeto foi desenvolvido como um laboratório de boas práticas de Engenharia de Software, focando em resolver problemas reais de escalabilidade e segurança:

- **Autenticação Segura e Middlewares:** Sistema de login OAuth2 (Google e GitHub) gerido pelo **Auth.js**. Utilização de **Edge Middlewares** do Next.js para interceptação de requisições, protegendo rotas privadas e redirecionando usuários não autenticados antes da renderização da página.
- **Server Actions & E2E Type Safety:** Substituição das tradicionais rotas REST (API Routes) por **Server Actions**. Isso garante que a comunicação entre o formulário no Client-Side e a mutação no banco de dados seja 100% tipada pelo TypeScript, eliminando intermediários vulneráveis e ganhando performance.
- **Modelagem Relacional:** Banco de dados **PostgreSQL** orquestrado pelo **Prisma ORM**. Implementação de relacionamentos complexos garantindo a integridade referencial dos dados entre Usuários, Perfis de Pets e Histórico de Doações.
- **Validação Rigorosa de Dados:** Implementação da regra de ouro do Back-End: *nunca confie no input do cliente*. Todo dado que chega ao servidor é estritamente sanitizado e validado utilizando o **Zod**, prevenindo injeções e dados malformados.
- **Gerenciamento Inteligente de Cache:** Uso estratégico da função `revalidatePath` do Next.js para invalidação de cache sob demanda. O servidor só busca novos dados no banco quando uma mutação real ocorre, economizando banda e recursos.
- **Integrações de Nuvem:** Upload de imagens seguro direto para a nuvem utilizando o **UploadThing** e infraestrutura preparada para processamento de pagamentos via **Stripe**.

---

## 🛠️ Tecnologias Utilizadas

**Ecossistema Principal:**
- [Next.js](https://nextjs.org/) (App Router)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)

**Back-End & Banco de Dados:**
- [Prisma ORM](https://www.prisma.io/)
- PostgreSQL
- [Auth.js (NextAuth)](https://authjs.dev/)
- [Zod](https://zod.dev/) (Validação de Schemas)

**Front-End & UI:**
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/) (Componentes acessíveis e customizáveis)
- Lucide Icons

**Serviços Externos:**
- **UploadThing:** Gerenciamento e armazenamento de arquivos (Imagens de perfil).
- **Stripe:** Processamento de pagamentos.

---

## 🚀 Como rodar o projeto localmente

Siga os passos abaixo para testar o projeto na sua máquina:

### 1. Pré-requisitos
Certifique-se de ter instalado em sua máquina:
- Node.js (versão 18.x ou superior)
- Git
- Uma conta no PostgreSQL (pode ser local ou serviços como Supabase/Neon)

### 2. Clonando o Repositório
```bash
git clone [https://github.com/SEU_USUARIO/elopet.git](https://github.com/SEU_USUARIO/elopet.git)
cd elopet
````

### 3. Instalando as Dependências
```bash
npm install
```
### 4. Configurando as Variáveis de Ambiente
```bash
Crie um arquivo .env na raiz do projeto e preencha com as suas credenciais, utilizando o arquivo .env.example como base:

Snippet de código

# Banco de Dados
DATABASE_URL="sua_url_do_postgresql_aqui"

# Auth.js
AUTH_SECRET="gere_um_secret_aleatorio_no_terminal"

# Providers de Login (OAuth)
AUTH_GITHUB_ID="seu_github_client_id"
AUTH_GITHUB_SECRET="seu_github_client_secret"
AUTH_GOOGLE_ID="seu_google_client_id"
AUTH_GOOGLE_SECRET="seu_google_client_secret"

# UploadThing (Imagens)
UPLOADTHING_SECRET="seu_uploadthing_secret"
UPLOADTHING_APP_ID="seu_uploadthing_app_id"

# URLs
NEXT_PUBLIC_HOST_URL="http://localhost:3000"
````

### 5. Configurando o Banco de Dados
Gere as tipagens do Prisma e empurre as tabelas para o seu banco de dados:

```bash

npx prisma generate
npx prisma db push
````
### 6. Rodando a Aplicação
```bash

npm run dev
Acesse http://localhost:3000 no seu navegador para ver a aplicação rodando.
````

### 👨‍💻 Autor
Desenvolvido por Bernardo Guimarães.

Estudante de Ciência da Computação apaixonado por desenvolvimento web e arquitetura de software.

Gostou do projeto? Deixe uma ⭐ no repositório!
