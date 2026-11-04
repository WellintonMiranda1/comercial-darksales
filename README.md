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


## Versão visual premium — novembro de 2026
Atualização exclusivamente visual: elevação, leve efeito 3D nos cards, sombras, gradientes, estados hover/foco e layout responsivo. Não modifica regras financeiras, tabelas ou configuração do Neon USA.


## Excluir pagamentos e clientes

- **Pagamentos:** abra o cadastro de um cliente e use **Excluir lançamento incorreto** no histórico de pagamentos. A comissão correspondente é excluída juntamente com o pagamento e o vencimento é recalculado.
- **Clientes:** abra o cadastro e use **Excluir cliente definitivamente**, no final do formulário. Exclui o cliente e **todos** os pagamentos e comissões ligados a ele, na mesma transação.
- As duas ações são reservadas ao usuário **Geral (administrador)** e exigem confirmação no navegador. Não podem ser desfeitas.
- Os totais de clientes, faturamento e comissões são recalculados com base nos registros restantes.


## Cancelamento por vendedor — atualização
- Na ficha de cada cliente, o botão **Cancelar assinatura** fica disponível ao vendedor responsável e ao administrador Geral.
- A confirmação muda a etapa do cliente para **Cancelado**; o cadastro e os pagamentos/comissões históricos permanecem intactos.
- Clientes cancelados deixam de entrar nas previsões de renovações futuras.
- Excluir um cliente ou pagamento continua restrito ao Geral.
