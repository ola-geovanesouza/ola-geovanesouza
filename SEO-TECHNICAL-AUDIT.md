# Auditoria técnica de SEO, GEO, AEO e desempenho

**Data da coleta:** 9 de novembro de 2026 (America/Bahia)  
**Escopo:** `https://geovanesouza.com`, versão publicada antes desta implantação, build local revisado e prévia local.  
**Método:** crawl HTTP próprio da homepage, sitemap, robots, variantes de host e URL inexistente; inspeção de HTML bruto e página renderizada; checagem manual de âncoras, links, metadados e JSON-LD; Lighthouse de laboratório em mobile e desktop. A propriedade pessoal do Search Console não está compartilhada com a conta conectada.

## Configuração do crawl

- **User-agent:** rastreamento normal e segunda tentativa com texto de UA Googlebot. O segundo pedido retornou 403, mas foi uma simulação por cabeçalho. Isso não identifica um Googlebot legítimo; a verificação requer IP/DNS reverso ou faixas oficiais do Google. Para a próxima coleta, manter Googlebot Smartphone como perfil de teste e comparar com navegador normal.
- **JavaScript:** manter renderização JS ligada na passagem comparativa. O build local contém conteúdo, headings, links e JSON-LD no HTML pré-renderizado; a passagem sem JS serve para conferir a resposta inicial e a passagem com JS para conferir hidratação/carrosséis. O teste de prévia não substitui a inspeção da URL renderizada pelo Google.
- **Modelagem por templates:** uma URL HTML indexável (`/`) e uma página de erro (`404.html`). As áreas de projetos, negócios, recomendações e sobre são seções com fragmentos (`#...`), não páginas independentes. Não há templates de categoria, ficha, artigo, idioma alternativo, paginação ou filtros de e-commerce.

## Resumo do crawl

- Sitemap: 1 URL canônica (`https://geovanesouza.com/`), coerente com o site de uma página.
- URL canônica indexável identificada no crawl: 1 de 1 URL no sitemap (100% do sitemap observado; **não** representa a cobertura do índice do Google).
- Variantes públicas adicionais: `www` em HTTPS servia o mesmo HTML com status 200; HTTP no host raiz redirecionava com 301 para HTTPS sem `www`.
- Página: idioma `pt-BR`, um H1, cinco H2 e 16 H3 na versão inspecionada; título, descrição, canonical, Open Graph, Twitter e JSON-LD presentes.
- Links internos/âncoras: 36 referências examinadas e 16 destinos por ID; nenhum fragmento quebrado ou ID duplicado foi encontrado. As seções são alcançáveis pela navegação; não há página órfã separada no modelo atual.
- Não foi possível cruzar URLs descobertas/indexadas com Search Console: a conta conectada (`ola@geovanesouza.com`) não tem acesso à propriedade `geovanesouza.com`.
- E-commerce, filtros, paginação e `hreflang`: não aplicáveis ao site atual, em português e sem catálogo transacional.

## Problemas e ações priorizados

Prioridade 1 significa risco direto de impedir descoberta ou indexação. Horas são estimativas de integração, não medição de duração real.

| Prioridade | Integração (h) | Problema / evidência | Recomendação precisa | URL de exemplo | Status |
|---|---:|---|---|---|---|
| 1 | 1–2 | Um pedido com `User-Agent: Googlebot` recebeu 403 (`hcdn`). Cabeçalho pode ser falsificado; não comprova bloqueio do Googlebot verificado. | Consultar logs do Hostinger/CDN e URL Inspection “Testar URL publicada”; validar IP por DNS reverso/faixas oficiais. Se o Googlebot verificado também receber 403, liberar apenas as rotas públicas e assets necessários no WAF e repetir a inspeção. | `/` | **Pendente de verificação**; Search Console sem acesso. |
| 1 | 0,5–1 | `https://www.geovanesouza.com/` respondia 200 com o mesmo conteúdo da raiz. Canonical apontava para o apex, mas mantinha duas variantes HTTPS rastreáveis. | Redirecionar `www`→`https://geovanesouza.com` com 301, preservando caminho e query; manter canonical absoluto para o apex. Regra adicionada ao `.htaccess`; confirmar resposta 301 no ambiente publicado. | `https://www.geovanesouza.com/` | **Corrigido no pacote; confirmação após deploy.** |
| 1 | 0,5 | A versão pública anterior entregava erro de URL sem navegação útil; o status observado era 404. | Manter 404 HTTP real, sem redirecionar para a home, e oferecer links para início, projetos e contato. Página `404.html` e `ErrorDocument` em português adicionados. | `/seo-audit-nonexistent-20261109` | **Corrigido no pacote; confirmar status e corpo após deploy.** |
| 1 | 0,5 | Sinal de rastreamento ambíguo no teste de UA e sem relatório de cobertura/indexação acessível. | Adicionar a conta conectada como usuário da propriedade de domínio; conferir página indexada/canonical, bloqueios, “Descoberta — atualmente não indexada”, “Rastreada — atualmente não indexada”, erros 4xx/5xx e sitemap. Não presumir que as categorias estejam ocorrendo sem consultar o relatório. | Propriedade `sc-domain:geovanesouza.com` | **Bloqueado por permissão; pedido de acesso necessário.** |
| 2 | 1 | `geoservices.tech` apresentou incompatibilidade de certificado TLS e a URL HTTP retornou 404 nas verificações anteriores. Link externo relevante para conversão. | Corrigir certificado e resposta HTTPS no serviço que hospeda GeoServices; depois atualizar o link para a URL final que responda 200. Não é possível corrigir isso neste repositório. | `https://geoservices.tech/` | **Pendente no host do negócio.** |
| 2 | 0,25 | Link de Portal da Reputação fazia um salto 301 para o host `www`. | Apontar o link diretamente para a URL HTTPS final após confirmar que é a canônica e retorna 200. | `https://portaldareputacao.com/` | **Oportunidade; sem bloqueio de indexação do site pessoal.** |
| 2 | 1–2 | Lighthouse mobile de laboratório na versão publicada antes dos ajustes: Performance 49, LCP 3,6 s, TBT 2,79 s, CLS 0; desktop Performance 99, LCP 0,8 s e CLS 0,014. LCP e TBT mobile eram fracos. INP não é métrica aferível por essa execução de laboratório. | Repetir Lighthouse/PageSpeed depois da publicação. Comparar LCP/INP/CLS com CrUX/Search Console em dados de campo; separar alterações do bundle de efeitos de cache, aparelho e rede. | `/` | **Baseline antigo; pós-deploy ainda não medido.** |
| 2 | 2–4 | CSS externo do Google Fonts era bloqueador de renderização estimado em ~987 ms no Lighthouse; CSS próprio, ~189 ms. | Servir WOFF2 localmente com `font-display: swap`, pré-carregar apenas a fonte crítica e evitar carregar pesos não usados. Fontes locais e remoção do CSS externo já foram incorporadas. | `/` | **Corrigido no build; falta medição pública pós-deploy.** |
| 2 | 1–2 | Cinco imagens tinham potencial de economia estimado em 155 KiB mobile / 169 KiB desktop no Lighthouse; imagens grandes eram redimensionadas no navegador. | Redimensionar/servir variantes adequadas ao tamanho visual, declarar largura/altura e usar lazy loading apenas abaixo da dobra; preservar imagem LCP eager/prioritária. Imagens do carrossel de projetos foram marcadas como lazy. | `/#projetos` | **Parte aplicada; rever oportunidades Lighthouse após deploy.** |
| 2 | 0,5–1 | Arquivos do bundle têm nomes com hash, mas estavam sem política de cache longo explícita no pacote público. | Aplicar `Cache-Control: public, max-age=31536000, immutable` somente aos arquivos fingerprinted; manter HTML com revalidação curta. Regra adicionada ao `.htaccess`. | `/assets/index-<hash>.js` | **Corrigido no pacote; confirmar headers após deploy.** |
| 2 | 0,5 | O pacote anterior tinha erro de rota genérico; o worker Sites também precisava preservar status 404 e o crawl estático precisa servir página própria. | Preservar o status 404 na borda/worker e testar URL aleatória sem cair na homepage. Arquivo de 404 estático e regras Hostinger incluídos; worker existente preservado conforme instrução do projeto. | `/rota-inexistente` | **Corrigido no pacote; teste remoto pendente.** |
| 3 | 4–8 por caso | A homepage reúne prova e intenção, mas as frentes/projetos não têm páginas individuais com problema, responsabilidade, decisões, entregas e resultados verificados. Isso limita buscas específicas e profundidade citável por assistentes. | Criar 2–3 estudos de caso apenas com fatos autorizados e verificáveis; cada página deve responder contexto, papel, decisões, solução e resultado, com links internos e canonical próprios. Não criar páginas vazias por palavra-chave. | `/#projetos` | **Recomendação de curto prazo; evidências de resultados ainda precisam ser reunidas.** |
| 3 | 2–4 | Os cards e a página possuem JSON-LD `WebSite`, `WebPage` e `Person`, com `sameAs` para LinkedIn, cargo e localização. A sintaxe foi inspecionada, mas não houve validação remota em Rich Results Test. | Validar o JSON-LD depois do deploy e manter somente propriedades consistentes com o texto visível. Considerar `ProfilePage` apenas se a página for centrada primariamente no perfil pessoal; não promete rich result. | `/` | **Marcado presente; validação externa pendente.** |
| 3 | 2–3 | Premiações, números e recomendações são afirmações factuais que não apontam para documentos de comprovação no próprio site. | Preservar formulações exatas; adicionar links para fonte pública/certificado quando houver autorização e deixar a origem clara. Não criar métricas sem documentação. | `/#reconhecimento` | **Conteúdo publicado; comprovação externa a reunir.** |
| 3 | 1–2 | SEO aparece como competência, mas não há exemplo público de trabalho em SEO no portfólio. | Manter Produto e IA aplicada como eixo principal; adicionar evidência concreta antes de posicionar SEO como serviço ou especialidade central. | `/#top` | **Oportunidade editorial; sem erro técnico.** |
| 4 | 1–2 | O título atual é claro, e descrição/canonical/social tags estão presentes. Não foram observadas ausências ou duplicações de H1 na resposta inspecionada. | Revalidar título, description, headings, `lang`, canonical e tags Open Graph no HTML publicado; não alterar metadados que já estão corretos sem dados de consulta/impressão. | `/` | **Sem problema observado; rechecagem no deploy.** |
| 4 | 1–2 | `alt`, contraste e uso por teclado precisam de validação contínua; auditoria anterior marcou A11y 92, majoritariamente por baixo contraste de marca d'água decorativa. | Preservar `aria-hidden` em decoração; escrever alt descritivo só para imagens informativas; executar verificação teclado/contraste na página final. Evitar texto alternativo repetindo o card inteiro. | `/#projetos` | **A revisar no pós-deploy; Lighthouse anterior marcou A11y 92.** |

## GEO/AEO e conteúdo

- A página expressa identidade, função, cidade, especialidades, negócios, credenciais e contato no HTML. Isso favorece extração factual, mas não garante citação por uma IA.
- JSON-LD ajuda a desambiguar a entidade `Person`; manter `name`, `jobTitle`, `address` e `sameAs` coerentes entre página, LinkedIn e CV.
- A homepage tem respostas concisas para “quem é”, “o que faz” e “como entrar em contato”. Perguntas frequentes só devem ser criadas se responderem dúvidas reais de recrutadores/clientes, não para inserir blocos de FAQ artificiais.
- Para fortalecer citações, publicar estudos de caso verificáveis com autoria, contexto, papel, decisões e fonte/resultado. Evitar declarar causalidade de negócio sem evidência.
- Não existe mecanismo confiável para “forçar” assistentes generativos a recomendar a página; rastreabilidade pública, conteúdo verificável, links de entidades e qualidade da fonte são dependências.

## Implementação por horizonte

### Imediato — incluído no pacote desta publicação

1. Canonical de host `www` para apex via 301.
2. Página 404 em português com navegação útil e resposta 404 real.
3. Fontes WOFF2 locais e removido bloqueio externo de Google Fonts.
4. Lazy loading de imagens não críticas do carrossel.
5. Cache de um ano para assets com hash.
6. Pré-render do conteúdo no HTML; renderização Motion simplificada apenas durante a geração do HTML para evitar travar o build, mantendo animações no cliente.

### Curto prazo — assim que Search Console e evidências estiverem disponíveis

1. Conceder acesso à propriedade de Search Console; revisar cobertura, inspeção ao vivo, canonical escolhido pelo Google, logs e Core Web Vitals de campo.
2. Confirmar que o Googlebot verificado não recebe 403 e enviar o sitemap atualizado.
3. Corrigir TLS/URL da GeoServices Tech.
4. Criar estudos de caso com evidências reais e validar JSON-LD em ferramentas oficiais.
5. Reexecutar Lighthouse mobile/desktop e comparar com o baseline, além de inspecionar mobile em dispositivos reais.

### Contínuo

- Mensalmente conferir GSC: indexação, impressões/cliques, canonical, sitemaps, cobertura e CWV; Bing Webmaster Tools para descoberta adicional.
- Repetir Lighthouse depois de mudança significativa e observar LCP ≤2,5 s, INP ≤200 ms e CLS ≤0,1 no percentil 75 de dados de campo.
- Revisar links externos, certificados, PDFs e referências de negócios; atualizar claims apenas com provas e datas atuais.
- Atualizar `lastmod`/sitemap só quando o conteúdo indexável mudar de forma relevante.

## Fontes de referência

- [SEO para JavaScript — Google Search Central](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics)
- [Sitemaps — Google Search Central](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview)
- [Verificação de requisições de crawlers do Google](https://developers.google.com/crawling/docs/crawlers-fetchers/verify-google-requests)
- [Relatório de indexação — Search Console](https://support.google.com/webmasters/answer/7440203?hl=pt-BR)
- [Relatório de Core Web Vitals — Search Console](https://support.google.com/webmasters/answer/9205520?hl=pt-BR)
- [Limites de Core Web Vitals — web.dev](https://web.dev/articles/defining-core-web-vitals-thresholds)
- [Dados estruturados ProfilePage — Google Search Central](https://developers.google.com/search/docs/appearance/structured-data/profile-page)
