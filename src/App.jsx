import { useEffect, useRef, useState } from "react";
import { motion, MotionConfig, useAnimate } from "motion/react";
import {
  PiArrowDownRight,
  PiArrowLeft,
  PiArrowRight,
  PiArrowUp,
  PiDownloadSimple,
  PiEnvelopeSimple,
  PiLinkedinLogo,
  PiList,
  PiMoon,
  PiQuotes,
  PiSun,
  PiX,
  PiWhatsappLogo,
} from "react-icons/pi";
import caseProfessionImage from "./assets/project-cases/profession.webp";
import casePracticeImage from "./assets/project-cases/practice.webp";
import caseEntrepreneurshipImage from "./assets/project-cases/entrepreneurship.webp";
import caseSegmentsImage from "./assets/project-cases/segments.webp";
import casePortfolioImage from "./assets/project-cases/portfolio.webp";
import andreMoraisPortrait from "./assets/recommendations/andre-morais-de-castro.webp";
import pauloQueirozPortrait from "./assets/recommendations/paulo-queiroz.webp";
import jonathasMoreiraPortrait from "./assets/recommendations/jonathas-moreira.webp";
import hugoMelimPortrait from "./assets/recommendations/hugo-melim.webp";
import carolineSantanaPortrait from "./assets/recommendations/caroline-santana.webp";
import trajanoMontassierPortrait from "./assets/recommendations/trajano-montassier.webp";
import robertoCarlosPortrait from "./assets/recommendations/roberto-carlos.webp";
import rodolfoGeyerPortrait from "./assets/recommendations/rodolfo-geyer.webp";
import tiagoFerreiraPortrait from "./assets/recommendations/tiago-ferreira.webp";
import beatrizSousaPortrait from "./assets/recommendations/beatriz-sousa.webp";

const projects = [
  {
    id: "profession",
    number: "01",
    client: "Profissão",
    title: "Produto, IA e Negócios",
    description:
      "Trabalho da definição do problema à entrega: pesquisa com usuários, prioridades de negócio, desenho da experiência e acompanhamento do produto. Aplico IA quando ela simplifica uma tarefa ou melhora a decisão.",
    tags: ["Gestão de produto", "IA aplicada", "Product discovery"],
    image: caseProfessionImage,
    accent: "blue",
  },
  {
    id: "practice",
    number: "02",
    client: "Atuação",
    title: "Multidisciplinaridade t-shaped",
    description:
      "Contribuo em times de produto, design e engenharia, assumindo responsabilidades de Product Manager, Product Lead, Tech Lead, UX Designer, Product Designer e AI Engineer. Conecto descoberta do problema, estratégia, experiência e tecnologia para levar produtos da ideia à evolução contínua.",
    tags: ["Product Management", "Product Lead", "Tech Lead", "UX / UI", "Product Design", "AI Engineering"],
    image: casePracticeImage,
    accent: "orange",
  },
  {
    id: "entrepreneurship",
    number: "03",
    client: "Empreendedorismo",
    title: "Ecossistema de negócios",
    description:
      "Participo da construção e da operação da Young DevOps, da LeadFinder e da GeoServices Tech. Também desenvolvo a JovnArt, projeto de moda e curadoria. Em cada frente, conecto produto, posicionamento e execução.",
    tags: ["Young DevOps", "LeadFinder", "GeoServices Tech", "JovnArt"],
    image: caseEntrepreneurshipImage,
    accent: "green",
  },
  {
    id: "segments",
    number: "04",
    client: "Segmentos",
    title: "Experiência em 13 segmentos",
    description:
      "Já trabalhei com Educação, Saúde, iGaming, Moda, ONGs, Tecnologia, Química, Logística, Gestão, Jurídico, Hotelaria, Entretenimento e Música.",
    tags: ["Educação", "Saúde", "iGaming", "Tecnologia"],
    image: caseSegmentsImage,
    accent: "yellow",
  },
  {
    id: "portfolio",
    number: "05",
    client: "Portfólio",
    title: "Portfólio de produtos digitais",
    description:
      "Projetos em saúde, educação, entretenimento, iGaming e outros mercados: Atlas AI, Cuida e Amor, EduServen, Dot10 e Esportiva PvP. Uma seleção de produtos e experiências digitais em diferentes contextos.",
    tags: ["Atlas AI", "Cuida e Amor", "EduServen", "Dot10", "Esportiva PvP", "Outros"],
    image: casePortfolioImage,
    accent: "blue",
  },
];

const selectedWork = [
  {
    area: "IA e operações",
    title: "Atlas AI",
    description: "Ferramenta intranet que integra MCPs e APIs do ecossistema EA para automatizar decisões, alertar lideranças sobre riscos operacionais e agilizar processos com Claude.",
    contribution: "Produto AI First",
  },
  {
    area: "Saúde e educação",
    title: "Cuida e Amor",
    description: "Site integrado a uma plataforma de cursos e treinamento para cuidadores de idosos.",
    contribution: "Site e plataforma de aprendizagem",
    url: "https://cuidaeamor.com.br/",
  },
  {
    area: "Educação",
    title: "EduServen",
    description: "Produto SaaS de gestão educacional pensado para escolas públicas e privadas.",
    contribution: "Produto digital para gestão escolar",
  },
  {
    area: "iGaming",
    title: "Dot10",
    description: "Projeto de site e plataforma digital para o mercado de iGaming.",
    contribution: "Experiência e plataforma digital",
  },
];

const fitSituations = [
  { number: "01", title: "Criar um produto digital", description: "Transformar um problema em uma oportunidade clara, definir prioridades e traçar um caminho de entrega." },
  { number: "02", title: "Evoluir o que já existe", description: "Entender onde a experiência ou a operação trava e decidir o que melhorar primeiro." },
  { number: "03", title: "Aplicar IA com propósito", description: "Identificar tarefas e decisões em que IA pode reduzir esforço ou ampliar capacidade." },
];

const areas = ["Produto", "Estratégia", "Pesquisa", "Benchmark", "Processos", "Design", "UX", "SEO", "IA", "Liderança"];

const navItems = [
  { label: "Projetos", href: "#projetos" },
  { label: "Negócios", href: "#negocios" },
  { label: "Reconhecimento", href: "#reconhecimento" },
  { label: "Sobre", href: "#sobre" },
  { label: "Contato", href: "#contato" },
];

const businesses = [
  { number: "01", title: "Young DevOps", type: "Tech house", description: "Desenvolvimento de produtos digitais sob demanda, unindo pesquisa, design e tecnologia para empresas e startups.", status: "Sócio · Produto e IA", accent: "green", url: "https://youngdevops.com.br" },
  { number: "02", title: "LeadFinder", type: "SaaS de prospecção B2B", description: "Plataforma para encontrar empresas, qualificar oportunidades e organizar o pipeline comercial.", status: "Sócio · Product Manager & Ops", accent: "blue", url: "https://leadfinderbr.com" },
  { number: "03", title: "GeoServices™ Tech", type: "Assistência técnica", description: "Diagnóstico, manutenção e suporte para computadores e equipamentos digitais.", status: "Fundador · Operação e atendimento", accent: "orange", url: "https://geoservices.tech" },
  { number: "04", title: "JovnArt | gs™", type: "Moda e curadoria", description: "Projeto de streetwear, sportswear e moda clássica feita na terra do samba.", status: "Marca · Moda e curadoria", accent: "yellow", url: "https://www.instagram.com/jovnart/" },
  { number: "05", title: "Portal da Reputação", type: "Em desenvolvimento", description: "Novo produto digital na área de reputação de empresas e serviços.", status: "Próximo empreendimento", accent: "green", url: "https://portaldareputacao.com" },
];

const recommendations = [
  { name: "André Castro", role: "Diretor Executivo da Morais de Castro", text: "Geovane demonstra profissionalismo e comprometimento. Tem atitude proativa e com foco na resolução das tarefas e desafios.", image: andreMoraisPortrait },
  { name: "Rodolfo Augusto Geyer Junior", role: "Sócio na CTech & CTO na EA Entretenimento", text: "Tive a oportunidade de trabalhar com Geovane e acompanhar de perto sua forma de conduzir desafios e projetos.", image: rodolfoGeyerPortrait, longText: ["É raro e fascinante a capacidade de se conectar com outras pessoas de outros times. Talvez a pessoa que mais pode definir a palavra ‘conexão’ — que em um time de tecnologia é de extrema importância.", "Outro ponto que sempre me chamou atenção é sua disponibilidade para colaborar e compartilhar conhecimento, contribuindo não apenas com suas próprias entregas, mas também com o desenvolvimento de quem trabalha ao seu redor. Tanto que normalmente estava no top do nosso ranking interno!", "Sem dúvida, é um profissional que agrega muito a qualquer equipe e que eu recomendo com total confiança!"] },
  { name: "Roberto Carlos", role: "CTO na Young DevOps", text: "Profissional de grande excelência em tecnologia, com ótimos documentos de projetos e protótipos de estilo moderno.", image: robertoCarlosPortrait },
  { name: "Paulo Queiroz", role: "Gerente de TI na OAB-Bahia", text: "Geovane é um profissional dedicado e comprometido com os estudos, e sua evolução profissional.", image: pauloQueirozPortrait },
  { name: "Trajano Montassier", role: "Coordenador de TI na Morais de Castro", text: "Tive o privilégio de liderar Geovane durante seu tempo na MC, e afirmo que ele foi competente, dedicado e comprometido.", image: trajanoMontassierPortrait },
  { name: "Hugo Melim", role: "Account Manager na Altenar", text: "Geovane é um visionário de Produto", image: hugoMelimPortrait },
  { name: "Tiago Ferreira", role: "Gestor na Cuida e Amor", text: "Agradeço à Geovane por ser parte fundamental da nossa jornada de transformação, e estamos ansiosos para continuar essa trajetória futuramente.", image: tiagoFerreiraPortrait },
  { name: "Caroline Santana", role: "Analista de Desenvolvimento na Stefanini", text: "Geovane é um profissional proativo e sempre empenhado em oferecer soluções para otimizar as atividades da empresa.", image: carolineSantanaPortrait },
  { name: "Jônathas Moreira", role: "Analista de Cybersecurity SOC na TLD", text: "Tive a imensa oportunidade de trabalhar na mesma equipe que Geovane, extremamente qualificado e sempre em busca de novos aprendizados.", image: jonathasMoreiraPortrait },
  { name: "Beatriz Sousa", role: "Ativista no Instituto Odara", text: "Desde o começo eu fiquei super feliz com a atenção aos detalhes, a comunicação aberta e todo o esforço de Geovane pra deixar tudo do jeitinho que eu imaginava. Ótimo profissional!", image: beatrizSousaPortrait },
];

function scrollToSection(event, id) {
  event.preventDefault();
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.querySelector(id)?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
}

function ArrowLink({ children, href = "#projetos", onClick }) {
  return <a className="arrow-link" href={href} onClick={onClick}><span>{children}</span><PiArrowDownRight aria-hidden="true" weight="bold" /></a>;
}

function Brand({ footer = false }) {
  return <span className={footer ? "footer-brand" : "brand-lockup"}><span className="brand-logo-crop" aria-hidden="true"><img src="/brand-gs.png" alt="" /></span>{footer ? <span>🌐⛳️</span> : <><span className="brand-divider">|</span><span>Geovane Souza</span></>}</span>;
}

function ProjectDetail({ project }) {
  return <article className={`project-detail project-detail-${project.accent}`}>
    <div className="detail-topline"><span>{project.number} / 05</span></div>
    <div className="detail-image-wrap"><img src={project.image} alt={`Ilustração de ${project.client.toLowerCase()}: ${project.title}`} width="1536" height="1024" decoding="async" /></div>
    <div className="detail-content"><div className="project-card-meta"><span>{project.client}</span><span className={`project-dot project-dot-${project.accent}`} /></div><h3>{project.title}</h3><p>{project.description}</p><div className="detail-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><a className="detail-link" href="#contato" onClick={(event) => scrollToSection(event, "#contato")}>Conversar sobre um projeto <PiArrowRight aria-hidden="true" weight="bold" /></a></div>
  </article>;
}

function RecommendationCard({ recommendation, duplicate = false }) {
  return <article className="recommendation-card" aria-hidden={duplicate || undefined}><PiQuotes aria-hidden="true" weight="fill" /><p>{recommendation.isSummary ? recommendation.text : `“${recommendation.text}”`}</p>{recommendation.longText && <details className="recommendation-more"><summary>Ler depoimento completo</summary><div>{recommendation.longText.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></details>}<div className="recommendation-person">{recommendation.image && <img src={recommendation.image} alt="" loading="lazy" decoding="async" /> }<div className="recommendation-person-copy"><strong>{recommendation.name}</strong><span>{recommendation.role}</span></div></div></article>;
}

export function App() {
  const [heroScope, animateHero] = useAnimate();
  const projectsCarouselRef = useRef(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [carouselDirection, setCarouselDirection] = useState(1);
  const [carouselPaused, setCarouselPaused] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [whatsappVisible, setWhatsappVisible] = useState(() =>
    typeof window !== "undefined" && Boolean(window.location.hash && window.location.hash !== "#top"),
  );
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "dark";
    return window.localStorage.getItem("geovane-theme") || "dark";
  });

  function toggleTheme() {
    setTheme((currentTheme) => {
      const nextTheme = currentTheme === "dark" ? "light" : "dark";
      window.localStorage.setItem("geovane-theme", nextTheme);
      return nextTheme;
    });
  }
  function stepProject(direction) {
    setCarouselDirection(direction);
    setCarouselIndex((currentIndex) => Math.max(0, Math.min(projects.length - 1, currentIndex + direction)));
  }

  function handleProjectDragEnd(event, info) {
    const threshold = (projectsCarouselRef.current?.offsetWidth ?? 320) * 0.16;
    if (info.offset.x < -threshold) stepProject(1);
    else if (info.offset.x > threshold) stepProject(-1);
  }

  useEffect(() => {
    const isMobileInput = window.matchMedia("(max-width: 720px), (pointer: coarse)").matches;
    if (carouselPaused || isMobileInput || document.hidden || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const timer = window.setInterval(() => {
      if (document.hidden) return;
      const nextDirection = carouselIndex >= projects.length - 1 ? -1 : carouselIndex <= 0 ? 1 : carouselDirection;
      setCarouselDirection(nextDirection);
      setCarouselIndex(carouselIndex + nextDirection);
    }, 7000);
    return () => window.clearInterval(timer);
  }, [carouselDirection, carouselIndex, carouselPaused]);

  useEffect(() => {
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "dark" ? "#0b0b0b" : "#f7f7f5");
  }, [theme]);

  useEffect(() => {
    const projectsSection = document.getElementById("projetos");
    const heroSection = document.getElementById("top");
    const siteNav = document.querySelector(".site-nav");
    if (!projectsSection || !heroSection) return undefined;

    const updateVisibility = () => {
      const navBottom = siteNav?.getBoundingClientRect().bottom ?? 0;
      const projectsStarted = projectsSection.getBoundingClientRect().top <= navBottom;
      const heroFinished = heroSection.getBoundingClientRect().bottom <= navBottom;
      setWhatsappVisible(projectsStarted || heroFinished);
    };

    const updateAfterLayout = () => {
      window.requestAnimationFrame(() => window.requestAnimationFrame(() => {
        updateVisibility();
        window.setTimeout(updateVisibility, 500);
      }));
    };

    window.addEventListener("scroll", updateVisibility, { passive: true });
    document.addEventListener("scroll", updateVisibility, { passive: true, capture: true });
    window.addEventListener("resize", updateVisibility);
    window.addEventListener("hashchange", updateAfterLayout);
    return () => {
      window.removeEventListener("scroll", updateVisibility);
      document.removeEventListener("scroll", updateVisibility, true);
      window.removeEventListener("resize", updateVisibility);
      window.removeEventListener("hashchange", updateAfterLayout);
    };
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    animateHero(".hero-main > .eyebrow", { opacity: [0, 1], y: [12, 0] }, { duration: 0.45, ease: "easeOut" });
    animateHero(".hero-main h1", { opacity: [0, 1], y: [34, 0], scale: [0.96, 1] }, { delay: 0.08, duration: 0.9, ease: [0.16, 1, 0.3, 1] });
    animateHero(".hero-accent-line", { scaleX: [0, 1] }, { delay: 0.45, duration: 0.7, ease: [0.16, 1, 0.3, 1] });
    animateHero(".hero-bottom", { opacity: [0, 1], y: [18, 0] }, { delay: 0.34, duration: 0.65, ease: "easeOut" });
    animateHero(".hero-trust, .hero-tags", { opacity: [0, 1], y: [12, 0] }, { delay: 0.58, duration: 0.6, ease: "easeOut" });
  }, [animateHero]);



  return <MotionConfig reducedMotion="user"><div className="site-shell" data-theme={theme}>
    <a className="skip-link" href="#main-content">Pular para o conteúdo</a>
    <header className="site-nav">
      <a className="brand-link" href="#top" aria-label="Geovane Souza — voltar ao início" onClick={(event) => scrollToSection(event, "#top")}><Brand /></a>
      <nav className="desktop-nav" aria-label="Navegação principal">{navItems.map((item) => <a key={item.href} href={item.href} onClick={(event) => scrollToSection(event, item.href)}>{item.label}</a>)}</nav>
      <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label={`Ativar modo ${theme === "dark" ? "light" : "dark"}`} aria-pressed={theme === "dark"}>{theme === "dark" ? <PiSun aria-hidden="true" weight="bold" /> : <PiMoon aria-hidden="true" weight="bold" />}<span>{theme === "dark" ? "Light" : "Dark"}</span></button>
      <button className="mobile-menu-toggle" type="button" aria-label={menuOpen ? "Fechar menu" : "Abrir menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen((isOpen) => !isOpen)}>{menuOpen ? <PiX aria-hidden="true" weight="bold" /> : <PiList aria-hidden="true" weight="bold" />}</button>
      <a className="availability-pill" href="#contato" aria-label="Disponível para conversar sobre projetos" onClick={(event) => scrollToSection(event, "#contato")}><span className="availability-dot" aria-hidden="true" />Disponível</a>
      {menuOpen && <nav className="mobile-menu" aria-label="Navegação mobile">{navItems.map((item) => <a key={item.href} href={item.href} onClick={(event) => { setMenuOpen(false); scrollToSection(event, item.href); }}>{item.label}<PiArrowDownRight aria-hidden="true" weight="bold" /></a>)}</nav>}
    </header>

    <main id="main-content">
      <section className="hero section-frame" id="top" aria-labelledby="hero-title">
        <div className="hero-main" ref={heroScope}>
          <div className="eyebrow">Produto, IA e Negócios</div>
          <h1 id="hero-title">Do problema ao <span className="text-blue hero-product-name">produto digital</span> que <span className="text-green">funciona.</span></h1>
          <span className="hero-accent-line" aria-hidden="true" />
          <div className="hero-bottom">
            <p className="hero-lede">Ajudo empresas e profissionais a definir prioridades, criar produtos e aplicar IA para otimizar UX, ROI e a operação.</p>
            <div className="hero-action-stack">
              <div className="hero-actions"><motion.a className="button button-orange" href="#contato" onClick={(event) => scrollToSection(event, "#contato")} whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }} transition={{ type: "spring", stiffness: 420, damping: 25 }}>Conversar sobre projeto <PiArrowDownRight aria-hidden="true" weight="bold" /></motion.a><a className="text-link text-link-linkedin" href="https://www.linkedin.com/in/ola-geovanesouza/" target="_blank" rel="noreferrer"><PiLinkedinLogo aria-hidden="true" weight="bold" /> LinkedIn</a></div>
            </div>
          </div>
          <a className="hero-trust" href="#reconhecimento" onClick={(event) => scrollToSection(event, "#reconhecimento")}>5 reconhecimentos profissionais <span aria-hidden="true">·</span> Programa registrado no INPI <PiArrowRight aria-hidden="true" weight="bold" /></a>
          <div className="hero-tags" aria-label="Áreas de atuação">{areas.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>
        </div>
        <div className="proof-strip" aria-label="Provas e credenciais"><div><strong>01</strong><span>programa de computador<br />registrado no INPI</span></div><div><strong>03</strong><span>operações<br />em atividade</span></div><div><strong>05</strong><span>premiações<br />de parceiros</span></div><div><strong>+10</strong><span>leads<br />apoiados</span></div><div><strong>+10</strong><span>recomendações<br />de profissionais</span></div><div><strong>+15</strong><span>produtos digitais<br />criados</span></div></div>
      </section>

      <motion.section className="projects-section section-frame" id="projetos" aria-labelledby="projects-title" initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.08 }} transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}>
        <div className="section-heading"><div><div className="eyebrow"><span className="eyebrow-line" /> Projetos e atuação</div><h2 id="projects-title">Da estratégia<br /><span className="text-blue">à entrega.</span></h2></div><p>Atuo com gestão de produto, IA aplicada e construção de negócios digitais. Explore as frentes e veja entregas do portfólio.</p></div>
        <div className="projects-layout"><div className="projects-carousel-shell" onMouseEnter={() => setCarouselPaused(true)} onMouseLeave={() => setCarouselPaused(false)} onFocusCapture={() => setCarouselPaused(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setCarouselPaused(false); }}><button className="carousel-control carousel-control-previous" type="button" onClick={() => stepProject(-1)} disabled={carouselIndex === 0} aria-label="Ir para a área anterior"><span>Anterior</span><PiArrowLeft aria-hidden="true" weight="bold" /></button><div className="projects-carousel" ref={projectsCarouselRef} role="region" aria-label={`Carrossel de frentes de atuação — área ${carouselIndex + 1} de ${projects.length}`} aria-roledescription="carrossel"><motion.div className="projects-list" drag="x" dragConstraints={projectsCarouselRef} dragElastic={0.06} dragMomentum={false} onDragEnd={handleProjectDragEnd} animate={{ x: `${-carouselIndex * 20}%` }} transition={{ type: "spring", stiffness: 110, damping: 24, mass: 0.9 }}>{projects.map((project, index) => <div className="project-entry" key={project.id} aria-hidden={index !== carouselIndex} inert={index !== carouselIndex}><ProjectDetail project={project} /></div>)}</motion.div></div><button className="carousel-control carousel-control-next" type="button" onClick={() => stepProject(1)} disabled={carouselIndex === projects.length - 1} aria-label="Ir para a próxima área"><span>Próximo</span><PiArrowRight aria-hidden="true" weight="bold" /></button></div></div>
        <div className="selected-work" aria-labelledby="selected-work-title"><div className="selected-work-heading"><span className="eyebrow"><span className="eyebrow-line" /> Trabalhos selecionados</span><h3 id="selected-work-title">Produtos digitais em contextos reais.</h3></div><div className="selected-work-grid" role="region" aria-label="Carrossel de trabalhos selecionados" aria-roledescription="carrossel" tabIndex={0}>{selectedWork.map((work) => <article className="selected-work-card" key={work.title}><span className="selected-work-area">{work.area}</span><h4>{work.title}</h4><p>{work.description}</p><span className="selected-work-contribution">{work.contribution}</span>{work.url && <a href={work.url} target="_blank" rel="noreferrer">Visitar projeto <PiArrowRight aria-hidden="true" weight="bold" /></a>}</article>)}</div><p className="selected-work-hint" aria-hidden="true">Deslize para ver mais <PiArrowRight weight="bold" /></p></div>
        <div className="fit-panel" aria-labelledby="fit-title">
          <div className="fit-intro"><div className="eyebrow"><span className="eyebrow-line" /> Quando faz sentido conversar</div><h3 id="fit-title">Em que desafio posso ajudar?</h3><p>Trabalho melhor quando há uma decisão de produto a tomar e um problema concreto para resolver.</p></div>
          <div className="fit-grid">{fitSituations.map((situation) => <article className="fit-item" key={situation.number}><span>{situation.number}</span><h4>{situation.title}</h4><p>{situation.description}</p></article>)}</div>
          <a className="fit-cta" href="#contato" onClick={(event) => scrollToSection(event, "#contato")}>Descrever meu desafio <PiArrowRight aria-hidden="true" weight="bold" /></a>
        </div>
      </motion.section>

      <motion.section className="business-section section-frame" id="negocios" aria-labelledby="business-title" initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.08 }} transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}> <div className="section-heading"><div><div className="eyebrow"><span className="eyebrow-line" /> Negócios</div><h2 id="business-title">Construir também<br /><span className="text-green">é operar.</span></h2></div><p>Atuo na criação e operação de produtos, serviços e marcas. Conheça as iniciativas e o papel que desempenho em cada uma.</p></div><div className="business-list">{businesses.map((business) => <a className={`business-card business-card-${business.accent}`} href={business.url} target="_blank" rel="noreferrer" aria-label={`Visitar ${business.title}`} key={business.title}><div className="business-number">{business.number}</div><div><div className="business-type">{business.type}</div><h3>{business.title}</h3><p>{business.description}</p><span className="business-status">{business.status}</span><span className="business-visit">Visitar iniciativa <PiArrowRight aria-hidden="true" weight="bold" /></span></div><PiArrowDownRight aria-hidden="true" weight="bold" /></a>)}</div><div className="section-conversion"><span>Tem um produto ou operação para evoluir?</span><a href="#contato" onClick={(event) => scrollToSection(event, "#contato")}>Conversar sobre o desafio <PiArrowRight aria-hidden="true" weight="bold" /></a></div></motion.section>

      <motion.section className="recognition-section section-frame" id="reconhecimento" aria-labelledby="recognition-title" initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.08 }} transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}> <div className="section-heading"><div><div className="eyebrow"><span className="eyebrow-line" /> Reconhecimento</div><h2 id="recognition-title">Resultados e<br /><span className="text-blue">reconhecimento.</span></h2></div><p>Premiações profissionais, recomendações de colegas e um programa de computador registrado no INPI.</p></div><div className="recognition-grid"><div className="recognition-proof recognition-proof-orange"><h3>Performance de alta produtividade</h3><p>Cinco reconhecimentos: maior número de atendimentos e soluções na TI da Morais de Castro (2021–2024) e 1º lugar no ranking interno de atividades e projetos do Grupo EA (2026).</p><span>Resultados profissionais</span></div><div className="recognition-proof"><h3>Recomendações de outros profissionais</h3><p>Mais de 10 recomendações no LinkedIn sobre dedicação, proatividade, comunicação e resolução de problemas.</p><a href="https://www.linkedin.com/in/ola-geovanesouza/" target="_blank" rel="noreferrer">Conferir no LinkedIn <PiArrowRight aria-hidden="true" weight="bold" /></a></div><div className="recognition-proof recognition-proof-yellow"><h3>Programa de computador registrado no INPI</h3><p>Registro nº BR512025000624-1, concedido em 18/02/2025 pelo Instituto Nacional da Propriedade Industrial.</p><span>Autoria de software</span></div></div><p className="recommendations-context">Trechos de recomendações profissionais. Os textos completos estão no meu <a href="https://www.linkedin.com/in/ola-geovanesouza/" target="_blank" rel="noreferrer">perfil do LinkedIn</a>.</p><div className="recommendations-viewport" aria-label="Recomendações de profissionais"><div className="recommendations-track">{recommendations.map((recommendation) => <RecommendationCard recommendation={recommendation} key={recommendation.name} />)}{recommendations.map((recommendation) => <RecommendationCard recommendation={recommendation} duplicate key={`duplicate-${recommendation.name}`} />)}</div></div><div className="section-conversion recognition-conversion"><span>Quer entender como posso contribuir no seu contexto?</span><a href="#contato" onClick={(event) => scrollToSection(event, "#contato")}>Falar sobre um projeto <PiArrowRight aria-hidden="true" weight="bold" /></a></div></motion.section>

      <motion.section className="about-section section-frame" id="sobre" aria-labelledby="about-title" initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.08 }} transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}> <div className="about-intro"><div className="eyebrow"><span className="eyebrow-line" /> Sobre Geovane Souza</div><h2 id="about-title">Produto do problema<br />à <span className="text-green">entrega.</span></h2></div><div className="about-grid"><div className="about-copy"><p className="about-lede">Sou Geovane Souza, Product Manager e Engenheiro de Software com foco em IA. Atuo entre produto digital, IA aplicada, design e operação de negócios.</p><p>Na Young DevOps, LeadFinder e outros negócios, participo da estratégia e da execução. Começo pelo problema, organizo prioridades com o time e acompanho a experiência e a operação depois do lançamento.</p><ArrowLink href="#contato" onClick={(event) => scrollToSection(event, "#contato")}>Conversar sobre produto</ArrowLink></div><div className="about-facts"><div className="fact-row"><span>01</span><strong>Produto</strong><em>visão, estratégia, priorização</em></div><div className="fact-row"><span>02</span><strong>IA aplicada</strong><em>automação, agentes, protótipos</em></div><div className="fact-row"><span>03</span><strong>Design</strong><em>experiência, narrativa, sistemas</em></div><div className="fact-row"><span>04</span><strong>Execução</strong><em>rituais, operação, crescimento</em></div><div className="fact-row"><span>05</span><strong>Otimização</strong><em>melhoria contínua, eficiência</em></div><div className="fact-row"><span>06</span><strong>Escala</strong><em>crescimento sustentável, impacto</em></div><a className="cv-link" href="/cv-geovane-vieira-de-souza-pt-br.pdf" download><PiDownloadSimple aria-hidden="true" weight="bold" /> Baixar currículo em PDF</a></div></div></motion.section>

      <div className="contact-frame"><span className="contact-watermark" aria-hidden="true">gs<sup>™</sup></span><motion.section className="contact-section section-frame" id="contato" aria-labelledby="contact-title" initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.08 }} transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}> <div className="contact-copy"><div className="eyebrow eyebrow-dark"><span className="eyebrow-line" /> Contato</div><h2 id="contact-title">Vamos construir<br />algo <span>útil?</span></h2><p>Se você precisa decidir o que construir, evoluir um produto digital ou aplicar IA em uma operação, me conte o problema e o objetivo. Esse contexto ajuda a começar a conversa.</p></div><div className="contact-actions"><a className="button button-dark" href="mailto:ola@geovanesouza.com?subject=Projeto%20de%20produto%20digital"><PiEnvelopeSimple aria-hidden="true" weight="bold" /> Enviar e-mail: ola@geovanesouza.com</a><a className="button button-whatsapp" href="https://wa.me/5571988895138" target="_blank" rel="noreferrer"><PiWhatsappLogo aria-hidden="true" weight="fill" /> Conversar pelo WhatsApp</a><a className="button button-outline-dark" href="/cv-geovane-vieira-de-souza-pt-br.pdf" download><PiDownloadSimple aria-hidden="true" weight="bold" /> Baixar CV</a><a className="contact-linkedin" href="https://www.linkedin.com/in/ola-geovanesouza/" target="_blank" rel="noreferrer"><PiLinkedinLogo aria-hidden="true" weight="bold" /> Ver LinkedIn</a></div></motion.section></div>
    </main>

    <footer className="site-footer"><Brand footer /><span>Salvador, BA · 2026</span><a href="#top" onClick={(event) => scrollToSection(event, "#top")}>Voltar ao topo <PiArrowUp aria-hidden="true" weight="bold" /></a></footer>
    <a className={`whatsapp-fab${whatsappVisible ? " is-visible" : ""}`} href="https://wa.me/5571988895138" target="_blank" rel="noreferrer" aria-label="Conversar pelo WhatsApp" aria-hidden={!whatsappVisible} tabIndex={whatsappVisible ? 0 : -1}><PiWhatsappLogo aria-hidden="true" weight="fill" /></a>
  </div></MotionConfig>;
}
