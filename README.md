# Comercial DarkSales — pronto para publicar na Vercel

Sistema completo de gestão comercial: administrador Geral, vendedores, oportunidades, trial, assinaturas, vencimentos, pagamentos e comissões.

## Atualizar o site já criado (simples)

1. Extraia o ZIP.
2. Copie **o conteúdo** da pasta extraída para a pasta `comercial-darksales` aberta no VS Code. Substitua arquivos; **não apague a pasta oculta `.git`**.
3. No terminal do VS Code, execute, um comando de cada vez:

   ```bash
   git add .
   git commit -m "Atualizar Comercial DarkSales"
   git push origin main
   ```
4. A Vercel publica automaticamente o novo código, se estiver conectada à branch `main`. Em Vercel > Deployments, abra o endereço da publicação mais recente.

## Para abrir hoje sem banco externo

O aplicativo **não exige** `DATABASE_URL` para iniciar. Na Vercel, o sistema usa automaticamente um banco SQLite **temporário** em `/tmp` quando `DATABASE_URL` não está configurado. Assim, as telas, cadastros de teste, vendedores e comissões funcionam, mas **os dados podem sumir a qualquer momento** e não são compartilhados de maneira confiável entre diferentes instâncias/usuários. É apenas para avaliação; **não use dados reais de clientes** sem armazenamento persistente.

A chave `DARKSALES_SECRET_KEY` deve continuar configurada na Vercel para que as sessões de login não sejam invalidadas entre requisições. Ela é uma configuração interna e **não impede que o endereço seja público**. Recomenda-se manter `DARKSALES_HTTPS=1`.

Você **não precisa** criar `DARKSALES_DEMO_MODE` nesta versão.

Acesso inicial: usuário `geral`, senha provisória `2026` (trocar no primeiro acesso). O site fica aberto na página de login; somente pessoas autorizadas acessam o painel.

## Quando quiser salvar dados de verdade

Adicione um banco PostgreSQL e configure `DATABASE_URL` nas variáveis de ambiente da Vercel, depois faça Redeploy. O mesmo sistema utiliza PostgreSQL, sem trocar interface ou outras funcionalidades. **Registros do SQLite temporário não são migrados automaticamente.**

## Executar no computador

Requer Python 3.11+. Instale as dependências com `pip install -r requirements.txt`, execute `python app.py` e abra `http://127.0.0.1:5000`. Fora da Vercel, sem PostgreSQL, o SQLite fica em `instance/darksales.db` e persiste localmente.

## Regras das comissões

- Mensal: 10% sobre cada mensalidade paga, no respectivo mês.
- Semestral: 15% sobre seis mensalidades, integralmente no mês do pagamento inicial.
- Anual: 20% sobre doze mensalidades, integralmente no mês do pagamento inicial.

Pagamentos são registrados manualmente. O projeto não processa cobranças automaticamente.
