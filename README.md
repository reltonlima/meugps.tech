# 📍 MeuGPS.tech

![Status do Deploy](https://img.shields.io/github/actions/workflow/status/reltonlima/meugps.tech/main.yml?branch=main&style=flat-square)
![Licença](https://img.shields.io/github/license/reltonlima/meugps.tech?style=flat-square)

O **MeuGPS.tech** é um portfólio de alta performance e uma API de monitoramento construída sobre uma infraestrutura robusta na nuvem. O projeto serve como base para estudos de arquitetura distribuída, integração com IA e automação de infraestrutura.

## 🚀 Tecnologias e Infraestrutura

Este projeto não é apenas um site, mas um ecossistema completo:
- **Frontend:** HTML5 moderno com Tailwind CSS (servido via Nginx).
- **Backend:** Node.js (nativo) gerenciado pelo PM2.
- **Infraestrutura:** Instância Compute Engine no Google Cloud (GCP).
- **Domínio & Segurança:** Cloudflare com SSL Full Strict (Let's Encrypt).
- **CI/CD:** GitHub Actions para deploy automatizado via SSH.

---

## 🛠️ Como rodar o projeto localmente

Para testar o projeto no seu computador, siga os passos abaixo:

### 1. Requisitos
- [Node.js](https://nodejs.org/) instalado (Versão 18 ou superior).
- Git.

### 2. Clonagem e Instalação
```bash
# Clone o repositório
git clone [https://github.com/reltonlima/meugps.tech.git](https://github.com/reltonlima/meugps.tech.git)
```
# Entre na pasta
cd meugps.tech

# Instale as dependências (se houver)
npm install

### 3. Execução
Você pode rodar o backend e o frontend separadamente para testes:

Para o Backend:
```bash
node src/server.js
```
O servidor estará rodando em http://localhost:3000.

Para o Frontend: Abra o arquivo public/index.html no seu navegador.

Dica: Se usar VS Code, utilize a extensão Live Server para rodar em http://localhost:5500.

🤝 Como contribuir (Open Source)
Este é um projeto aberto e toda ajuda é bem-vinda! Se você quer aprender sobre GCP, Nginx ou Node.js, este é o lugar certo.

Faça um Fork do projeto.

Crie uma Branch para sua feature (git checkout -b feature/minha-melhoria).

Commit suas mudanças (git commit -m 'feat: adiciona nova funcionalidade').

Push para a Branch (git push origin feature/minha-melhoria).

Abra um Pull Request.

Idéias para contribuição:

[ ] Implementação de integração com a API do Supabase.

[ ] Criação de um painel de logs em tempo real.

[ ] Melhorias no design responsivo do frontend.

📄 Licença---

### O que você deve fazer agora:
1.  Crie um arquivo chamado **`README.md`** na raiz do seu projeto local.
2.  Cole o conteúdo acima.
3.  Faça o commit e push:
    ```bash
    git add README.md
    git commit -m "docs: adiciona readme completo com instruções de setup"
    git push origin main
    ```

Dessa forma, quem acessar seu GitHub já verá a página principal do repositório toda organizada e profissional.

**Deseja que eu gere o arquivo de licença `LICENSE` agora para que o projeto seja oficialmente Open Source com permissões claras?**
Distribuído sob a licença MIT. Veja LICENSE para mais informações.

Desenvolvido por Relton Lima 🚀

```bash
---

### O que você deve fazer agora:
1.  Crie um arquivo chamado **`README.md`** na raiz do seu projeto local.
2.  Cole o conteúdo acima.
3.  Faça o commit e push:
    ```bash
    git add README.md
    git commit -m "docs: adiciona readme completo com instruções de setup"
    git push origin main
    ```

Dessa forma, quem acessar seu GitHub já verá a página principal do repositório toda organizada e profissional.

**Deseja que eu gere o arquivo de licença `LICENSE` agora para que o projeto seja oficialmente Open Source com permissões claras?**
```