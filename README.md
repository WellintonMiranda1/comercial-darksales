# Comercial DarkSales — atualização consolidada

Atualiza o site já publicado no mesmo repositório GitHub, sem criar outro projeto.

## Publicação

1. Extraia o ZIP e copie os arquivos para a pasta `comercial-darksales` aberta no VS Code. **Não apague `.git`**.
2. Execute um comando por vez:

```bash
git add .
git commit -m "Correcoes Comercial DarkSales"
git push origin main
```

3. Confira o novo commit em Vercel > Deployments e abra o site.

## Alterações

- Menu lateral sem abas repetidas (Para entrar, Trial, Ativos permanecem em Clientes).
- Vencimento automático no navegador e no servidor: mensal **30 dias**, semestral **6 meses de calendário**, anual **12 meses de calendário**.
- Fim do trial exibido somente para etapa Trial. Campos de plano aparecem em Ativo/Inadimplente/Cancelado.
- No cadastro de cliente ativo, marque **Pagamento confirmado** para gerar imediatamente comissão no mês atual. Caso ainda não tenha pago, deixe desmarcado, salve e confirme o pagamento posteriormente na ficha do cliente.
- Comissão mensal: 10% a cada período pago. Semestral: 15% sobre 6 meses, integral no mês de confirmação. Anual: 20% sobre 12 meses, integral no mês de confirmação.
- Tela de comissões simplificada para consultar registros e previsões mensais; vendedores veem suas próprias comissões.
- Troca de senha opcional permanece.

## Sem banco externo na Vercel

O código continua iniciando sem `DATABASE_URL` usando um SQLite **temporário em /tmp**. Isso serve só para testar telas. **Cadastros, senhas, comissões e fotos podem desaparecer e não são compartilhados consistentemente entre instâncias.** Para dados de verdade é necessário configurar PostgreSQL (`DATABASE_URL`). Não há migração automática de testes. A chave `DARKSALES_SECRET_KEY` deve estar configurada e permanecer privada. Não use dados reais de clientes enquanto o banco não for persistente.

## Limites da verificação

Foi verificada a sintaxe Python, a estrutura HTML e a integridade do ZIP. A execução completa no servidor Flask/Vercel precisa ser validada após o deploy.
