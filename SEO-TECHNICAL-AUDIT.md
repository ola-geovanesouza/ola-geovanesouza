# Auditoria técnica de SEO, GEO, AEO e desempenho

**Data da coleta:** 9 de novembro de 2026 (America/Bahia)  
**Escopo:** `https://geovanesouza.com`, build atual e publicação confirmada em 9 de novembro de 2026. Para desempenho, o único baseline Lighthouse disponível é de uma versão anterior à correção; as métricas pós-publicação não puderam ser obtidas.
**Método:** crawl HTTP da homepage, sitemap, robots, variantes de host e URL inexistente; inspeção de HTML bruto, metadados, headings, links, âncoras, JSON-LD e assets; comparação de fontes de conteúdo/pré-renderização; Lighthouse de laboratório anterior em mobile e desktop; validação HTTP do deploy. A propriedade pessoal do Search Console não está compartilhada com a conta conectada.

## Configuração do crawl

- **User-agent:** rastreamento normal e segunda tentativa com texto de UA Googlebot. O segundo pedido retornou 403, mas foi uma simulação por cabeçalho. Isso não identifica um Googlebot legítimo; a verificação requer IP/DNS reverso ou faixas oficiais do Google. Para a próxima coleta, manter Googlebot Smartphone como perfil de teste e comparar com navegador normal.
- **JavaScript:** manter renderização JS ligada na passagem comparativa. O build local contém conteúdo, headings, links e JSON-LD no HTML pré-renderizado; a passagem sem JS serve para conferir a resposta inicial e a passagem com JS para conferir hidratação/carrosséis. O teste de prévia não substitui a inspeção da URL renderizada pelo Google.
- **Modelagem por templates:** uma URL HTML indexável (`/`) e uma página de erro (`404.html`). As áreas de projetos, negócios, recomendações e sobre são seções com fragmentos (`#...`), não páginas independentes. Não há templates de categoria, ficha, artigo, idioma alternativo, paginação ou filtros de e-commerce.

## Resumo do crawl

- Sitemap: 1 URL canônica (`https://geovanesouza.com/`), coerente com o site de uma página.
- URL canônica indexável identificada no crawl: 1 de 1 URL no sitemap (100% do sitemap observado; **não** representa a cobertura do índice do Google).
- Variantes públicas adicionais: HTTP no host raiz e HTTPS em `www` agora redirecionam com 301 para `https://geovanesouza.com/`.
- `robots.txt`: 200, `User-agent: *` e `Allow: /`, com URL do sitemap. Nenhuma regra específica bloqueia Googlebot/Bingbot no arquivo.
- Página: idioma `pt-BR`, um H1, cinco H2 e 16 H3 na versão inspecionada; título, descrição, canonical, Open Graph, Twitter e JSON-LD presentes.
- Malha interna: 36 links no HTML, 21 para fragmentos de seção e dois para o PDF do CV; nenhum link sem texto/label, nenhum `nofollow`, nenhum fragmento quebrado e nenhum ID duplicado. Como o site tem uma única URL canônica, PageRank por página e profundidade entre páginas não são métricas úteis; as seções são alcançáveis pela navegação e não há páginas órfãs separadas.
- Não foi possível cruzar URLs descobertas/indexadas com Search Console: a conta conectada (`ola@geovanesouza.com`) não tem acesso à propriedade `geovanesouza.com`.
- E-commerce, filtros, paginação e `hreflang`: não aplicáveis ao site atual, em português e sem catálogo transacional.

## Problemas e ações priorizados

Prioridade 1 significa risco direto de impedir descoberta ou indexação. Horas são estimativas de integração, não medição de duração real.

| Prioridade | Integração (h) | Problema / evidência | Recomendação precisa | URL de exemplo | Status |
|---|---:|---|---|---|---|
| 1 | 0,5–1 | O HTML pré-renderizado da primeira publicação continha 25 elementos de conteúdo com `opacity:0` até o JavaScript/Intersection Observer rodar. O texto estava no código-fonte, mas sem JavaScript as seções ficavam visualmente ocultas. | Não emitir estilos iniciais de Motion no HTML estático; manter o HTML visível e deixar as animações para a hidratação no navegador. O alias SSR foi conectado ao pipeline do Vite e agora remove os estilos de entrada; o script de pré-render também pode ser executado novamente sem perder o shell. | `/#projetos`, `/#negocios`, `/#reconhecimento`, `/#sobre` | **Corrigido, verificado: 0 ocorrências `opacity:0` no HTML final.** |
| 1 | 1–2 | Um pedido com `User-Agent: Googlebot` recebeu 403 (`hcdn`). Cabeçalho pode ser falsificado; não comprova bloqueio do Googlebot verificado e não é evidência suficiente para declarar o site bloqueado. | Consultar logs do Hostinger/CDN e Search Console “Testar URL publicada”; validar IP por DNS reverso/faixas oficiais. Se o Googlebot verificado também receber 403, liberar apenas rotas públicas e assets necessários no WAF e repetir a inspeção. | `/` | **Pendente de verificação**; Search Console sem acesso. |
| 1 | 0,5 | A conta conectada não possui acesso à propriedade de domínio; ficam indisponíveis páginas excluídas e seus motivos, URL Inspection, canonical escolhido pelo Google, CWV de campo e envio do sitemap. | Adicionar `ola@geovanesouza.com` como usuário da propriedade `sc-domain:geovanesouza.com`; revisar páginas excluídas e motivos, URL Inspection e CWV. Isso é uma dependência de acesso, não prova de erro de indexação. | Propriedade `sc-domain:geovanesouza.com` | **Pendente de acesso do proprietário.** |
| 1 | 0,5–1 | `https://www.geovanesouza.com/` respondia 200 com o mesmo conteúdo da raiz, mantendo duas variantes HTTPS rastreáveis. | Redirecionar `www`→`https://geovanesouza.com` com 301, preservando caminho e query; manter canonical absoluto para o apex. | `https://www.geovanesouza.com/` | **Corrigido e verificado após deploy: 301 para apex.** |
| 1 | 0,5 | A versão pública anterior entregava erro de URL sem navegação útil; o status era 404, porém sem bons próximos passos. | Manter 404 HTTP real, sem redirecionar para a home, e oferecer links para início, projetos e contato. | `/seo-audit-nonexistent-20261109` | **Corrigido e verificado ao vivo: 404 real, sem redirecionamento e com três links úteis.** |
| 2 | 1 | O certificado HTTPS de `geoservices.tech` e `www.geoservices.tech` não corresponde ao domínio; os dois hosts falharam na validação TLS. O link externo do card não abre com conexão segura. O site aparece como Website Builder na Hostinger, mas a conta DNS conectada informou que não é proprietária do domínio. | No painel do Website Builder, confirmar que o domínio está conectado, aponta para os servidores Hostinger e o site está publicado; o SSL do Builder é automático. Se esses pontos estiverem corretos e o certificado continuar inválido, solicitar correção ao suporte Hostinger/administrador DNS. Depois apontar o card ao host canônico HTTPS. | `https://geoservices.tech/` | **Pendente fora deste repositório; sem permissão sobre a zona DNS para corrigir.** |
| 2 | 0,25 | Portal da Reputação responde com um 301 para `https://www.portaldareputacao.com/`. | Usar diretamente a URL final. | `https://www.portaldareputacao.com/` | **Corrigido no código e publicado.** |
| 2 | 1–2 | Lighthouse mobile de laboratório na versão publicada antes dos ajustes: Performance 49, LCP 3,6 s, TBT 2,79 s, CLS 0; desktop Performance 99, LCP 0,8 s e CLS 0,014. LCP e TBT mobile eram fracos. INP não é métrica aferível por essa execução de laboratório. O PSI pós-publicação respondeu 429 por quota anônima; não há medição nova nem dados de campo disponíveis. | Repetir Lighthouse com uma execução concluída e comparar LCP/INP/CLS com CrUX/Search Console em dados de campo; separar alterações do bundle de efeitos de cache, aparelho e rede. | `/` | **Baseline antigo; nova medição pendente. PSI API indisponível por quota.** |
| 2 | 2–4 | CSS externo do Google Fonts era bloqueador de renderização estimado em ~987 ms no Lighthouse; CSS próprio, ~189 ms. | Servir WOFF2 localmente com `font-display: swap`, pré-carregar apenas a fonte crítica e evitar carregar pesos não usados. Fontes locais e remoção do CSS externo já foram incorporadas. | `/` | **Corrigido e publicado; ambas as fontes respondem 200.** |
| 2 | 1–2 | Cinco imagens tinham potencial de economia estimado em 155 KiB mobile / 169 KiB desktop no Lighthouse; imagens grandes eram redimensionadas no navegador. | Redimensionar/servir variantes adequadas ao tamanho visual, declarar largura/altura e usar lazy loading apenas abaixo da dobra; preservar imagem LCP eager/prioritária. Imagens do carrossel de projetos foram marcadas como lazy. | `/#projetos` | **Lazy loading aplicado; oportunidades de compressão precisam nova medição Lighthouse.** |
| 2 | 2–4 | Lighthouse anterior estimou ~53 KiB comprimidos / 123 KiB de JavaScript não utilizado (cerca de 44% do JS analisado). Não é medição do build/deploy atual. | Repetir auditoria em rede/dispositivo móvel e dividir código ou adiar módulos pesados que não sejam necessários no primeiro viewport; preservar hidratação, animações e comportamento acessível dos carrosséis. | `/` | **Oportunidade do baseline anterior; validar com Lighthouse atualizado.** |
| 2 | 0,5–1 | Arquivos do bundle têm nomes com hash, mas estavam sem política de cache longo explícita no pacote público. | Aplicar `Cache-Control: public, max-age=31536000, immutable` somente aos arquivos fingerprinted; manter HTML com revalidação curta. Regra adicionada ao `.htaccess`. | `/assets/index-<hash>.js` | **Corrigido e publicado; CSS e JS com cache imutável de 1 ano.** |
| 3 | 4–8 por caso | A homepage reúne prova e intenção, mas as frentes/projetos não têm páginas individuais com problema, responsabilidade, decisões, entregas e resultados verificados. Isso limita buscas específicas e profundidade citável por assistentes. | Criar 2–3 estudos de caso apenas com fatos autorizados e verificáveis; cada página deve responder contexto, papel, decisões, solução e resultado, com links internos e canonical próprios. Não criar páginas vazias por palavra-chave. | `/#projetos` | **Recomendação de curto prazo; evidências de resultados ainda precisam ser reunidas.** |
| 3 | 2–4 | Os cards e a página possuem JSON-LD `WebSite`, `WebPage` e `Person`, com `sameAs` para LinkedIn, cargo e localização. A sintaxe foi inspecionada, mas não houve validação remota em Rich Results Test. | Validar o JSON-LD depois do deploy e manter somente propriedades consistentes com o texto visível. Considerar `ProfilePage` apenas se a página for centrada primariamente no perfil pessoal; não promete rich result. | `/` | **Marcado presente; validação externa pendente.** |
| 3 | 2–3 | Premiações, números e recomendações são afirmações factuais que não apontam para documentos de comprovação no próprio site. | Preservar formulações exatas; adicionar links para fonte pública/certificado quando houver autorização e deixar a origem clara. Não criar métricas sem documentação. | `/#reconhecimento` | **Conteúdo publicado; comprovação externa a reunir.** |
| 3 | 1–2 | SEO aparece como competência, mas não há exemplo público de trabalho em SEO no portfólio. | Manter Produto e IA aplicada como eixo principal; adicionar evidência concreta antes de posicionar SEO como serviço ou especialidade central. | `/#top` | **Oportunidade editorial; sem erro técnico.** |
| 4 | 1–2 | O título tem 55 caracteres, a descrição 142, `lang=pt-BR`, canonical, social tags, um H1, cinco H2 e 16 H3. Não foram encontradas metas ausentes ou H1 duplicados no HTML final. | Preservar o metadado atual até haver dados de consulta/impressão; revisar headings quando o conteúdo mudar. Evitar criar páginas para palavras-chave sem conteúdo distinto. | `/` | **Rechecado após deploy; sem problema observado no HTML.** |
| 4 | 1–2 | As seis imagens informativas dos projetos têm alt descritivo. Fotos de recomendadores e marcas aparecem como decoração, com nomes/texto adjacentes; contraste por tema e navegação por teclado precisam de inspeção assistiva dedicada. Lighthouse anterior marcou A11y 92, em grande parte por contraste de marca d'água. | Manter `alt` vazio apenas nas imagens decorativas; conferir contraste no tema atual e navegação por teclado em menu, carrosséis e CTAs; não duplicar o conteúdo do card no alt. | `/#projetos`, `/#reconhecimento` | **Alt conferido no HTML; contraste/teclado pendentes de medição dedicada.** |

## GEO/AEO e conteúdo

- A página expressa identidade, função, cidade, especialidades, negócios, credenciais e contato no HTML. Isso favorece extração factual, mas não garante citação por uma IA.
- JSON-LD ajuda a desambiguar a entidade `Person`; manter `name`, `jobTitle`, `address` e `sameAs` coerentes entre página, LinkedIn e CV.
- A homepage tem respostas concisas para “quem é”, “o que faz” e “como entrar em contato”. Perguntas frequentes só devem ser criadas se responderem dúvidas reais de recrutadores/clientes, não para inserir blocos de FAQ artificiais.
- A promessa está explícita, e há prova e CTAs diretos antes/depois das seções; o ponto de conversão a validar é foco de público: “empresas e profissionais” pode cobrir perfis muito distintos. RCD recomenda especificar o ICP e colocar prova verificável antes do pedido de contato. Não estreitei o texto sem evidência sobre qual segmento deve ser priorizado.
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
3. Corrigir TLS/URL da GeoServices Tech no painel do Website Builder ou com o proprietário DNS/suporte; a conta conectada não controla a zona DNS desse domínio.
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
- [SSL no Hostinger Website Builder — Central de Ajuda Hostinger](https://support.hostinger.com/en/articles/8368399-website-builder-ssl)
- [Conectar domínio ao Hostinger Website Builder — Central de Ajuda Hostinger](https://support.hostinger.com/en/articles/8347449-how-to-connect-a-domain-to-hostinger-website-builder)
