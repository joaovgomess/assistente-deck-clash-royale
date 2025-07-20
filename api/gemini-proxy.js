import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(request, response) {
    if (request.method !== 'POST') {
        return response.status(405).json({ message: 'Method Not Allowed' });
    }

    const { pergunta, arena } = request.body;

    // Acessa a chave API da variável de ambiente configurada no vercel
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

    if (!GEMINI_API_KEY) {
        console.error('GEMINI_API_KEY não está configurada nas variáveis de ambiente do Vercel.');
        return response.status(500).json({ error: 'Erro de configuração do servidor. Chave API não encontrada.' });
    }

    const modelo = 'gemini-2.5-flash';
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ 
        model: modelo, 
        tools: [{ 
            google_search: {} 
        }] 
    });

    // Prompt eviado para a ia
    const promptIA = `
 ## ESPECIALIDADE
 Quero que você assuma a persona de um especialista em decks meta para o jogo Clash Royale, com foco em otimização de estratégias para diferentes Arenas.

 ## TAREFA
 Você deve responder as perguntas do usuário com base no seu conhecimento aprofundado do meta atual do Clash Royale, incluindo:
 - Sugestão dos melhores decks para a Arena especificada.
 - Estratégias de jogo para o deck sugerido.
 - Melhores combos e sinergias de cartas dentro do deck./ - Qual carta subir de nível primeiro para otimizar o desempenho do deck.
 - Dicas de posicionamento e contra-ataques relevantes.

 ## REGRAS
 - Caso você não saiba a resposta, responda com 'Não sei' e não tente inventar uma resposta.
 - Se a pergunta não estiver relacionada ao jogo Clash Royale, quero que responda 'Essa pergunta não está relacionada ao jogo'.
 - Considere sempre a data atual ${new Date().toLocaleDateString()} para garantir que as informações de meta estejam atualizadas.
 - Faça pesquisas atualizadas sobre o patch e balanceamento atual do Clash Royale, baseado na data atual, para dar uma resposta atualizada e coerente.
 - Nunca responda itens que você não tenha certeza de que existe ou é relevante no patch atual.
 - A resposta deve ser focada na Arena que o usuário especificar.
 - Sempre tenha certeza de que as cartas que você sugerir para o deck já tenham sido desbloqueadas pelo usuário em relação a arena que ele se encontra.

 ## RESPOSTA/ - Economize na resposta, seja direto e utilize no máximo 750 caracteres.
 - Responda em markdown.
 - Não é necessário fazer nenhuma saudação ou despedida, nem sugestão do que pedir a seguir.

 ## EXEMPLO DE RESPOSTA
 Pergunta do usuário: Melhor deck para Arena 10 com corredor e mago.
 Resposta esperada:
 A seguir, um deck meta para a Arena 10 com foco em corredor e mago:

 **Deck:**
 - [Carta 1]
 - [Carta 2]
 - [Carta 3]
 - [Carta 4]
 - [Carta 5]
 - [Carta 6]
 - [Carta 7]
 - [Carta 8]

 **Estratégia:**
 [Explique como jogar o deck, seu ciclo ideal, e quando atacar ou defender.]

 **Combos Principais:**
 - [Combo 1: Ex: Golem + Bruxa]
 - [Combo 2: Ex: Corredor + Bola de Fogo]

 **Prioridade de Nível de Cartas:**
 1. [Carta mais importante para upar primeiro]
 2. [Segunda carta mais importante]

 **Pontos Fortes:**
 - [Vantagem 1: Ex: Forte contra decks de golem]
 - [Vantagem 2: Ex: Ciclo rápido]

 **Pontos Fracos:**
 - [Desvantagem 1: Ex: Vulnerável a decks de bait]
 - [Desvantagem 2: Ex: Custo alto de elixir inicial]

 ---

 Aqui está a pergunta do usuário: Para a ${arena}, ${pergunta}.
 `;

     const contents = [{
        role: 'user',
        parts: [{
            text: promptIA
        }]
    }];

    try {
        const result = await model.generateContent(promptIA);
        const apiResponse = result.response;
        const text = apiResponse.text();

        return response.status(200).json({ data: text });
    } catch (error) {
        console.error('Erro ao chamar a API Gemini:', error);
        // Captura erros específicos da API Gemini se necessário
        if (error.response && error.response.status === 429) {
            return response.status(429).json({ error: 'Limite de requisições excedido. Tente novamente mais tarde.' });
        }
        return response.status(500).json({ error: 'Erro interno do servidor ao processar a requisição da IA.' });
    }
}
