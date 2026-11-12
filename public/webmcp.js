(() => {
  const modelContext = document.modelContext || navigator.modelContext;
  if (!modelContext?.registerTool) return;

  try {
    Promise.resolve(modelContext.registerTool({
    name: "get_geovane_portfolio_info",
    description: "Obtém informações públicas do portfólio de Geovane Souza: áreas de atuação, projetos, negócios, reconhecimento ou contato.",
    inputSchema: {
      type: "object",
      properties: {
        topic: {
          type: "string",
          description: "Tema da informação solicitada.",
          enum: ["overview", "areas", "projects", "businesses", "recognition", "contact"]
        }
      },
      additionalProperties: false
    },
    execute: async ({ topic = "overview" } = {}) => {
      const answers = {
        overview: "Geovane Souza é Product Manager e Engenheiro de Software com foco em IA, em Salvador, Bahia. Atua em produto digital, IA aplicada, UX, design, engenharia de software e operação de negócios.",
        areas: "Frentes: Produto, Atuação, Empreendedorismo, Segmentos, Portfólio e Skill. O trabalho conecta estratégia, pesquisa, benchmarking, processos, engenharia, UX, IA, liderança e entrega.",
        projects: "Projetos selecionados: Atlas AI, Cuida e Amor, EduServen e Dot10. O portfólio completo está em https://geovanesouza.com/#projetos.",
        businesses: "Negócios: Young DevOps (sócio, produto e IA), LeadFinder (sócio, Product Manager & Ops), GeoServices Tech, JovnArt | gs™ e Portal da Reputação (em desenvolvimento). Mais detalhes em https://geovanesouza.com/#negocios.",
        recognition: "O site apresenta cinco reconhecimentos profissionais, mais de dez recomendações no LinkedIn e o registro de programa de computador BR512025000624-1, concedido pelo INPI em 18/02/2025. Detalhes: https://geovanesouza.com/#reconhecimento.",
        contact: "E-mail: ola@geovanesouza.com. WhatsApp: https://wa.me/5571988895138. LinkedIn: https://www.linkedin.com/in/ola-geovanesouza/. Currículo PDF: https://geovanesouza.com/cv-geovane-vieira-de-souza-pt-br.pdf."
      };
      const text = answers[answers[topic] ? topic : "overview"];
      return { content: [{ type: "text", text }] };
    }
    })).catch(() => {});
  } catch {
    // The page remains fully usable in browsers without WebMCP support.
  }
})();
