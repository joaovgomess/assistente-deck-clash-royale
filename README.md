# 🃏 Assistente de Decks para Clash Royale

[Clique aqui para acessar o site!](https://assistente-deck-clash-royale.vercel.app/) Este projeto é uma ferramenta web para auxiliar jogadores de Clash Royale a encontrarem os melhores decks e estratégias, e foi desenvolvido utilizando **HTML**, **CSS**, **JavaScript** e, pela primeira vez em meus projetos, uma **API externa** com um **backend para segurança**.

---

## 🎮 A Inspiração: Uma Jornada de Volta ao Clash Royale

Quando eu era mais novo, Clash Royale era um dos meus jogos favoritos. Recentemente, decidi voltar a jogar e me deparei com um cenário bastante diferente: novas cartas, novas arenas e um meta de decks em constante evolução. Senti uma certa dificuldade em me adaptar e encontrar as melhores combinações para avançar no jogo.

Aproveitando que estou estudando **desenvolvimento web**, vi nisso uma oportunidade perfeita para unir minhas duas paixões: o jogo e a programação. Assim, resolvi criar um serviço que pudesse me ajudar (e a outros jogadores!) a superar esse desafio, fornecendo sugestões de decks e estratégias atualizadas.

---

## 🎯 Objetivo do Projeto

O principal objetivo deste projeto é, além de oferecer uma ferramenta útil para a comunidade de Clash Royale, aprofundar meus conhecimentos em desenvolvimento web, com foco especial em:

* **Integração com APIs:** Foi a primeira vez que usei uma API externa em um dos meus projetos. Este assistente se conecta à poderosa **API do Google Gemini** para gerar as respostas sobre os decks.
* **Segurança de Chaves de API:** Um grande desafio e aprendizado foi entender e implementar a proteção da minha chave de API. Consegui superar essa barreira utilizando um **backend simples com Node.js e funções serverless no Vercel**, garantindo que a chave não ficasse exposta publicamente no GitHub.
* **Desenvolvimento Full-Stack (Básico):** Ao criar uma camada de backend para a segurança, tive a oportunidade de explorar os fundamentos de uma arquitetura full-stack, mesmo que de forma simplificada.
* **Formatação de Respostas (Markdown):** Para exibir as respostas da IA de forma legível e bem formatada, utilizei a biblioteca **Showdown.js**, que converte texto em Markdown para HTML.
* **Estruturação e Estilização:** Continuar aplicando boas práticas em **HTML semântico** e **CSS responsivo**, criando uma interface intuitiva e agradável.
* **Lógica JavaScript:** Reforçar a manipulação do DOM e a lógica assíncrona para interações com a API.

Este projeto não é apenas uma ferramenta, mas também um registro da minha evolução prática, versionado diretamente por este repositório no **GitHub**.

---

## 🧩 Funcionalidades

* Sugere os melhores decks e estratégias para a arena selecionada.
* Oferece dicas de combos, prioridade de evolução de cartas e pontos fortes/fracos dos decks.
* Interface simples e fácil de usar.
* Proteção da chave de API, garantindo a segurança do serviço.

---

## 🚀 Como Executar o Projeto

Para rodar este projeto localmente ou entender sua estrutura:

1.  ### Obtenha sua Chave da API Google Gemini
    Este projeto consome a API Gemini para gerar as respostas. Para isso, você precisará de uma chave de API:
    * Acesse o [Google AI Studio](https://aistudio.google.com/app/apikey).
    * Faça login com sua conta Google.
    * Crie uma nova chave de API ou utilize uma existente.
    * **Mantenha esta chave em segurança!** Nunca a exponha diretamente no código frontend.

2.  ### Clone o repositório
    ```bash
    git clone https://github.com/joaovgomess/assistente-deck-clash-royale
    ```


3.  ### Navegue até o Diretório do Projeto
    ```bash
    cd assistente-deck-clash-royale
    ```

4.  ### Instale as Dependências do Backend (Função Serverless)
    Este projeto usa o Node.js para a função serverless que protege a API Key. Certifique-se de ter o Node.js instalado.
    ```bash
    npm install
    ```
    Isso instalará `@google/generative-ai` (para a comunicação com o Gemini no backend) e **Showdown.js** (para formatar a resposta em Markdown no frontend).

5.  ### Para Executar Localmente
    * **Frontend:** Abra o arquivo `index.html` diretamente no seu navegador.
    * **Backend (Apenas para Teste Local Completo):** Para simular a função serverless localmente, você precisaria de ferramentas como `vercel dev` (se tiver a Vercel CLI instalada) e configurar a API Key localmente (não a coloque no código!).

    **Importante:** Para o funcionamento completo da integração com a API Gemini de forma segura, o projeto deve estar **implantado em um ambiente como o Vercel**, onde a API Key pode ser configurada como uma variável de ambiente protegida.
