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


## Cancelamento de PAGAMENTO (independente da assinatura)
- Cada vendedor pode **estornar o último pagamento** de um cliente sob sua responsabilidade; o administrador Geral pode estornar o último pagamento de qualquer cliente.
- O motivo do estorno é obrigatório e o sistema pede confirmação.
- Ao estornar, o pagamento deixa de contar no faturamento e a comissão correspondente sai dos totais do mês, evitando duplicidade.
- O histórico do estorno é mantido em `payment_cancellations` com valor, período, comissão, motivo e usuário responsável.
- O próximo vencimento é recalculado pelo último pagamento restante. Sem nenhum pagamento confirmado, o cliente volta a **Para entrar** (se já estava Cancelado, permanece Cancelado).
- Se a comissão daquele pagamento **já tiver sido repassada**, apenas o Geral pode estornar, pois será necessário acertar o valor com o vendedor.
- Não é permitido estornar um pagamento intermediário: é necessário começar pelo mais recente para não romper a sequência de períodos.
- A mudança cria uma nova tabela de auditoria automaticamente na primeira requisição, sem excluir tabelas existentes do Neon USA.

## Ordenação de clientes
Na página Clientes, use **Ordenar por** para selecionar cadastro mais recente, mais antigo, nome A–Z ou Z–A. A busca e a categoria selecionada são preservadas. A data é a de criação do registro (não a última edição).


## Origem dos clientes (atualização)

O formulário de cadastro e edição possui **Origem do cliente**: Lead, Prospecção, Indicação ou Outro.
Ao selecionar **Indicação**, o campo obrigatório **Quem indicou?** é exibido.
As informações são validadas também no servidor e gravadas em `clients.origin` e `clients.referred_by`.
A migração não destrutiva cria automaticamente as duas colunas em bancos Neon/PostgreSQL e SQLite existentes, preservando os cadastros antigos (origem padrão: Lead).

## Origem na listagem de clientes
A tabela Clientes exibe a coluna **Origem** entre **Status** e **Plano**. Para origem Indicação, também mostra o nome de quem indicou. Os cadastros já existentes não são modificados.


## Projeção de entrada
Em Para entrar ou Trial, preencha a data prevista, plano previsto, periodicidade e valor mensal previsto. Na listagem Clientes, a coluna Data prevista aparece após Data do cadastro e há ordenação por data prevista. Registros antigos são mantidos por migração não destrutiva. A projeção não gera pagamento nem comissão.


## Correção — Aba Projeções

Na tela **Clientes → Para entrar**, existem agora duas subabas: **Lista de clientes** e **Projeções**. A segunda mostra clientes com data prevista, agrupados por mês, com valor mensal previsto, plano, periodicidade e vendedor. Clientes sem data prevista permanecem na Lista de clientes. A nova visão não altera cobranças ou comissões.


## Projeções v2 — atualização visível

- Na faixa superior de **Clientes** aparece a aba **📅 Projeções**, ao lado de **Para entrar**. Ela abre a visão mensal diretamente.
- Na lista **Para entrar** há ainda um botão **Abrir Projeções**.
- No formulário de novo cliente, a seção **📅 Projeção de entrada** aparece quando a etapa é **Para entrar** ou **Trial**.
- Confirme a publicação: no cabeçalho deve aparecer **Ambiente interno · versão Projeções 2**. Se não aparecer, a Vercel está exibindo uma versão anterior; confirme o commit em Deployments.
- Valores previstos não entram na receita recebida nem geram comissões.


## Módulo independente: Projeção Comercial
- Novo item **Projeção** no menu lateral, separado de Clientes.
- Cards: projeção total pendente, valor e número de clientes do mês atual, valor e número do próximo mês.
- Listagem agrupada por mês, busca, filtro por vendedor (Geral), criar/editar/excluir e histórico de convertidas/perdidas.
- Nenhuma porcentagem, probabilidade ou total geral de leads.
- Valores de projeções não geram pagamentos ou comissões.
- Tabela `sales_projections` criada automaticamente em SQLite ou PostgreSQL sem alterar tabelas existentes.
