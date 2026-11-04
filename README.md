# Comercial DarkSales — Neon USA · correções financeiras

Aplicação Flask para Vercel. **Banco prioritário:** `NEON_USA_DATABASE_URL` (PostgreSQL Neon EUA). `DATABASE_URL` é apenas fallback.

## Alterações
- Cliente sem confirmação de pagamento entra em **Para entrar**, mesmo quando o formulário solicitou Ativo.
- Um pagamento confirmado ativa automaticamente o cliente e cria **uma comissão por período**.
- Semestral: 15% sobre 6 mensalidades, lançada toda no mês do pagamento. Anual: 20% sobre 12 mensalidades, lançada toda no mês do pagamento. Mensal: 10% sobre 1 mensalidade paga.
- Edição de cadastro não cria pagamento/comissão; há restrição única `(client_id, period_start, period_end)`.
- Histórico guarda **plano, periodicidade e valor mensal originais** para não mudar quando o cadastro for editado.
- Próximo mês mostra **previsões de renovações de todos os ciclos**, separadas de comissões confirmadas.
- Removendo o único pagamento, o cliente volta para **Para entrar**.
- Migração de tabelas não destrutiva; bancos antigos recebem novos campos de histórico automaticamente.
- Sessões e acesso por vendedor permanecem no projeto.

## Publicação
Substitua os arquivos na pasta do VS Code **sem apagar `.git`**, depois execute:
```
git add .
git commit -m "Corrigir clientes pagamentos e comissoes"
git push origin main
```
A Vercel atualizará o deploy conectado ao GitHub. Mantenha `NEON_USA_DATABASE_URL` e `DARKSALES_SECRET_KEY` nas variáveis da Vercel; **não copie URLs ou senhas para o GitHub**.

## Cuidados
- A previsão não é comissão recebida; o vendedor só recebe a comissão após confirmação de pagamento e repasse.
- Pagamentos registrados na base permanecem; correções novas não apagam histórico.
- Caso o banco não possua os novos campos, a aplicação os adicionará automaticamente no primeiro acesso.
- Não foi possível testar uma conexão real com seu banco Neon a partir deste ambiente.
