# Comercial DarkSales — correção de comissões e pagamentos

Esta atualização mantém a estrutura do projeto atual para GitHub/Vercel. Não substitua a pasta `.git`.

## Corrigido

- Editar um cliente **não** gera pagamentos ou comissões, mesmo que ele esteja ativo.
- No cadastro inicial, **Pagamento confirmado** não fica mais marcado automaticamente. Marque apenas se o cliente pagou.
- A tela de pagamento não aceita início de período escolhido livremente. O servidor determina o ciclo contratado e impede registrar a mesma competência duas vezes.
- Nova renovação só é liberada a partir de **5 dias antes do vencimento** do último período pago; na renovação, há novo ciclo e nova comissão.
- Se já houver uma comissão duplicada, o administrador Geral pode abrir a ficha do cliente e usar **Excluir lançamento incorreto** no histórico de pagamentos. O sistema recalcula o vencimento depois da exclusão.
- Comissão: mensal 10% por mensalidade paga; semestral 15% × 6 meses; anual 20% × 12 meses. As últimas duas entram integralmente no mês do pagamento.
- Próximo mês: previsão das mensalidades de clientes ativos cuja data de pagamento de 30 em 30 dias cai no mês escolhido, com detalhamento em Comissões.
- Mantidos os menus Clientes, Comissões e Vendedores e as abas internas de clientes.

## Publicar atualização

Extraia o ZIP, copie os arquivos para a pasta do projeto no VS Code sem apagar `.git`, depois execute separadamente:

```bash
git add .
git commit -m "Corrigir pagamentos duplicados DarkSales"
git push origin main
```

Após a Vercel publicar o commit mais recente, teste com um cliente **fictício**: cadastre como ativo com pagamento confirmado, verifique que há uma comissão; salve novamente a ficha sem alterações e confira que não houve segunda comissão; tente registrar outro pagamento antes dos 5 dias finais e confira que é bloqueado.

## Limitação IMPORTANTE: clientes desaparecendo

Se a Vercel está sem `DATABASE_URL`, o projeto usa SQLite no diretório temporário `/tmp`. Os cadastros podem aparecer em uma visita e sumir em outra, porque instâncias diferentes têm armazenamento local diferente. **Nenhum patch de código resolve a persistência dos dados nessa hospedagem.** Para registrar dados reais, compartilhar clientes entre vendedores e garantir que permaneçam após cada deploy, configure PostgreSQL em `DATABASE_URL` e depois faça a migração necessária. Dados da fase temporária não serão transferidos automaticamente.

## Verificação

Sintaxe Python, compilação dos 9 templates Jinja, regras de vencimento e cálculo monetário foram conferidos com testes locais isolados. A execução completa em Flask e no ambiente Vercel não pôde ser reproduzida aqui. Confirme no deployment real. Chaves de sessão devem permanecer em variáveis de ambiente, não no repositório público.
