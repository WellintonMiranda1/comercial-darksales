# Comercial DarkSales — versão para Vercel

Aplicativo de gestão comercial (Flask): vendedores, leads, trial, assinantes, pagamentos e comissões.

## Publicar na Vercel

1. Extraia este ZIP e envie **o conteúdo desta pasta** para seu repositório no GitHub (não inclua banco de dados ou `.env`).
2. Na Vercel: **Add New → Project → Import** o repositório.
3. Crie um banco **PostgreSQL persistente**, por exemplo integrando Neon à Vercel pelo Marketplace / Storage. Copie a URL de conexão do banco.
4. Em **Project Settings → Environment Variables**, configure:
   - `DATABASE_URL`: URL PostgreSQL completa (conexão SSL; se necessário use URL de pool fornecida pelo provedor).
   - `DARKSALES_SECRET_KEY`: string aleatória longa e secreta (32+ caracteres).
   - `DARKSALES_HTTPS`: `1`.
5. Clique **Deploy** ou **Redeploy**, se já tinha feito o primeiro deploy antes de configurar variáveis.
6. Primeiro login: usuário `geral`, senha inicial `2026`. O aplicativo obriga alteração no primeiro acesso.

**Importante:** não basta publicar o ZIP sem configurar o PostgreSQL e as variáveis. A Vercel não preserva arquivos SQLite locais entre execuções. Este pacote usa PostgreSQL quando `DATABASE_URL` estiver definido. As fotos também ficam armazenadas no PostgreSQL nesse modo.

**Segurança:** repositório público só com arquivos de código; jamais inclua `.env`, banco ou credenciais no GitHub. O usuário inicial `geral` tem senha provisória fraca e exige troca. Para produção pública com clientes reais, recomenda-se habilitar proteção anti-força-bruta, backup automático do PostgreSQL e monitoramento de erros.

## Para executar localmente

Instale Python 3.11+, crie um ambiente virtual e rode `pip install -r requirements.txt`. Execute `python app.py` e abra `http://127.0.0.1:5000`. Sem `DATABASE_URL`, é usado SQLite local (apenas desenvolvimento).

## Comissões

Mensal: 10% de cada mês confirmado. Semestral: 15% do valor de 6 meses, pago de uma vez no primeiro mês. Anual: 20% do valor de 12 meses, pago de uma vez no primeiro mês. O sistema registra pagamentos manualmente e usa a data informada para relatórios; não processa pagamentos automaticamente.
