# TODA LINDA STORE

Landing page editorial e responsiva para apresentar a coleção de biquínis da TODA LINDA STORE. Não há carrinho, cadastro, checkout nem banco de dados: cada peça encaminha a cliente diretamente ao WhatsApp.

## Estrutura

- `index.html`: página principal, SEO e estrutura acessível.
- `style.css`: detalhes visuais e estados de acessibilidade.
- `script.js`: gera mensagens personalizadas de interesse no WhatsApp e atualiza o ano do rodapé.
- `assets/`: fotos originais em JPG e versões otimizadas em WebP usadas pelo site.

## Personalização antes de publicar

1. O valor de todos os biquínis está definido como `R$ 40,00` no `index.html`.
2. Substitua `[EMAIL]` pelo e-mail da marca, tanto no link `mailto:` quanto no texto exibido.
3. Se necessário, altere os nomes, cores e fotos dos produtos no mesmo arquivo.
4. Os links de WhatsApp e Instagram já usam os contatos informados:
   - WhatsApp: `+55 98 98570-0659`
   - Instagram: `@todalinda_storeee`

## Visualização local

Abra o arquivo `index.html` no navegador. Para uma prévia mais próxima do deploy, no diretório do projeto execute um servidor estático, por exemplo:

```bash
python3 -m http.server 8000
```

Depois acesse `http://localhost:8000`. Teste também pelo modo responsivo do navegador e por um aparelho Android no Chrome.

## Publicação no GitHub Pages

1. Crie um repositório no GitHub e envie todos os arquivos deste diretório, inclusive `assets/`.
2. No repositório, abra **Settings → Pages**.
3. Em **Build and deployment**, escolha **Deploy from a branch**.
4. Selecione a branch `main` e a pasta `/(root)`, então salve.
5. Aguarde a URL pública fornecida pelo GitHub Pages.

Como os caminhos dos assets são relativos, a página funciona em projetos e sites de usuário do GitHub Pages sem ajustes.

## Publicação na Vercel

1. Importe o repositório pela opção **Add New → Project** na Vercel.
2. Mantenha o framework como **Other** e o diretório raiz como este projeto.
3. Clique em **Deploy**.

Não é necessário processo de build: é um site HTML estático. Futuramente, ele pode ser migrado para Next.js se o catálogo precisar de conteúdo gerenciável.
