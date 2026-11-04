# Comercial DarkSales — Neon EUA

Esta versão completa utiliza **NEON_USA_DATABASE_URL** prioritariamente, variável já criada pela integração Neon/Vercel. Se a variável não existir, usa DATABASE_URL como alternativa. O banco anterior não é apagado.

## Atualização

Extraia e copie o conteúdo para a pasta atual `comercial-darksales` no VS Code, **sem excluir `.git`**. Execute os comandos separadamente:

```bash
git add .
git commit -m "Conectar Comercial DarkSales ao Neon EUA"
git push origin main
```

O GitHub enviará as alterações à Vercel se a implantação automática estiver conectada. Teste com dados fictícios e confirme a persistência entre acessos. O banco americano começa vazio e deve receber as tabelas na inicialização do aplicativo.

O projeto mantém seus recursos anteriores, e requer `DARKSALES_SECRET_KEY` na Vercel. Não compartilhe valores das variáveis do banco.

**Atenção:** a compilação da sintaxe foi verificada, mas a conexão com a Vercel e o Neon não pôde ser testada neste ambiente.
