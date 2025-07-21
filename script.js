const apiKey = '';
const selectArena = document.querySelector('.select-arena');
const inputPergunta = document.querySelector('.input-pergunta');
const botaoPergunta = document.querySelector('.botao-pergunta');
const respostaIA = document.querySelector('.resposta-ia');
const form = document.querySelector('.form');



const markdownToHTML = (text) => {
    const converter = new showdown.Converter()
    return converter.makeHtml(text)
} 


const perguntaIA = async (pergunta, arena) => {
    const urlBackend = `/api/gemini-proxy`;

    const response = await fetch(urlBackend, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            pergunta,
            arena
        })
    })

    const data = await response.json();
    console.log({data});

    if (!response.ok) { // verificando se a resposta http foi um erro (ex: 400, 500)
        console.error("Erro do servidor:", data.error || data.message || "Erro desconhecido");
        throw new Error(data.error || "Não foi possível obter a resposta da IA. Tente novamente mais tarde.");
    }

    return data.data;
} 




const mandarForm = async (event) => {
    event.preventDefault();
    const arena = selectArena.value;
    const pergunta = inputPergunta.value;

    console.log({arena, pergunta})

    if(arena == 'padrao' || pergunta == '') {
        alert('Por favor, preencha todos os campos.')
        return;
    }

    botaoPergunta.disabled = true;
    botaoPergunta.textContent = 'Perguntando...';
    botaoPergunta.classList.add('carregando');


    try {
        const text = await perguntaIA (pergunta, arena);
        respostaIA.querySelector('.resposta-conteudo').innerHTML = markdownToHTML(text);
        respostaIA.classList.remove('hidden');
    } catch(error) {
        console.error('Erro: ', error);
        alert(error.message);
    } finally {
        botaoPergunta.disabled = false;
        botaoPergunta.textContent = 'Perguntar';
        botaoPergunta.classList.remove('carregando');
    }

}

form.addEventListener('submit', mandarForm);