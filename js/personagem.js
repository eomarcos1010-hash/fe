// ==========================================
// PEQUENOS NA FÉ
// PERSONAGEM.JS
// ==========================================

const CHAVE_PERSONAGEM = "pequenosNaFe_personagem";

const personagemPadrao = {
    genero: "menino",
    pele: "#F6C9A8",
    cabelo: "#171717"
};


// ==========================================
// CARREGAR PERSONAGEM
// ==========================================

function carregarPersonagem() {

    try {

        const salvo = localStorage.getItem(CHAVE_PERSONAGEM);

        if (!salvo) {
            return { ...personagemPadrao };
        }

        const personagem = JSON.parse(salvo);

        return {
            ...personagemPadrao,
            ...personagem
        };

    } catch (erro) {

        console.warn(
            "Erro ao carregar personagem:",
            erro
        );

        return { ...personagemPadrao };
    }
}


// ==========================================
// SALVAR PERSONAGEM
// ==========================================

function salvarPersonagem(personagem) {

    localStorage.setItem(
        CHAVE_PERSONAGEM,
        JSON.stringify(personagem)
    );
}


// ==========================================
// ATUALIZAR VISUAL DO PERSONAGEM
// ==========================================

function atualizarPersonagem(elemento, personagem) {

    if (!elemento) {
        return;
    }

    // Dados
    elemento.dataset.gender = personagem.genero;
    elemento.dataset.skin = personagem.pele;
    elemento.dataset.hair = personagem.cabelo;

    // Variáveis CSS
    elemento.style.setProperty(
        "--skin",
        personagem.pele
    );

    elemento.style.setProperty(
        "--hair",
        personagem.cabelo
    );

    // Cabeça
    const cabeca = elemento.querySelector(
        ".character-head"
    );

    if (cabeca) {
        cabeca.style.backgroundColor =
            personagem.pele;
    }

    // Cabelo
    const cabelo = elemento.querySelector(
        ".character-hair"
    );

    if (cabelo) {
        cabelo.style.backgroundColor =
            personagem.cabelo;
    }

    // Corpo
    const corpo = elemento.querySelector(
        ".character-body"
    );

    if (corpo) {
        corpo.style.setProperty(
            "--skin",
            personagem.pele
        );
    }
}


// ==========================================
// ATUALIZAR TODOS OS PERSONAGENS
// ==========================================

function atualizarTodosPersonagens(personagem) {

    const elementos = document.querySelectorAll(
        ".character-preview"
    );

    elementos.forEach((elemento) => {

        atualizarPersonagem(
            elemento,
            personagem
        );

    });
}


// ==========================================
// MARCAR BOTÕES SELECIONADOS
// ==========================================

function marcarEscolhasAtuais(personagem) {

    // GÊNERO
    document
        .querySelectorAll("[data-gender]")
        .forEach((botao) => {

            botao.classList.toggle(
                "selected",
                botao.dataset.gender === personagem.genero
            );

        });


    // PELE
    document
        .querySelectorAll("[data-skin]")
        .forEach((botao) => {

            const corBotao =
                botao.dataset.skin?.toUpperCase();

            const corAtual =
                personagem.pele?.toUpperCase();

            botao.classList.toggle(
                "selected",
                corBotao === corAtual
            );

        });


    // CABELO
    document
        .querySelectorAll("[data-hair]")
        .forEach((botao) => {

            const corBotao =
                botao.dataset.hair?.toUpperCase();

            const corAtual =
                personagem.cabelo?.toUpperCase();

            botao.classList.toggle(
                "selected",
                corBotao === corAtual
            );

        });
}


// ==========================================
// SELECIONAR GÊNERO
// ==========================================

function selecionarGenero(genero) {

    const personagem =
        carregarPersonagem();

    personagem.genero = genero;

    salvarPersonagem(
        personagem
    );

    marcarEscolhasAtuais(
        personagem
    );

    atualizarTodosPersonagens(
        personagem
    );
}


// ==========================================
// SELECIONAR PELE
// ==========================================

function selecionarPele(cor) {

    const personagem =
        carregarPersonagem();

    personagem.pele = cor;

    salvarPersonagem(
        personagem
    );

    marcarEscolhasAtuais(
        personagem
    );

    atualizarTodosPersonagens(
        personagem
    );
}


// ==========================================
// SELECIONAR CABELO
// ==========================================

function selecionarCabelo(cor) {

    const personagem =
        carregarPersonagem();

    personagem.cabelo = cor;

    salvarPersonagem(
        personagem
    );

    marcarEscolhasAtuais(
        personagem
    );

    atualizarTodosPersonagens(
        personagem
    );
}


// ==========================================
// CONFIGURAR CLIQUES
// ==========================================

function configurarEscolhasPersonagem() {


    // --------------------------
    // MENINO / MENINA
    // --------------------------

    document
        .querySelectorAll("[data-gender]")
        .forEach((botao) => {

            botao.addEventListener(
                "click",
                function () {

                    selecionarGenero(
                        this.dataset.gender
                    );

                }
            );

        });


    // --------------------------
    // COR DA PELE
    // --------------------------

    document
        .querySelectorAll("[data-skin]")
        .forEach((botao) => {

            botao.addEventListener(
                "click",
                function () {

                    selecionarPele(
                        this.dataset.skin
                    );

                }
            );

        });


    // --------------------------
    // COR DO CABELO
    // --------------------------

    document
        .querySelectorAll("[data-hair]")
        .forEach((botao) => {

            botao.addEventListener(
                "click",
                function () {

                    selecionarCabelo(
                        this.dataset.hair
                    );

                }
            );

        });

}


// ==========================================
// INICIAR
// ==========================================

function iniciarPersonagem() {

    const personagem =
        carregarPersonagem();

    configurarEscolhasPersonagem();

    marcarEscolhasAtuais(
        personagem
    );

    atualizarTodosPersonagens(
        personagem
    );

}


// ==========================================
// DISPONIBILIZAR PARA OUTROS JS
// ==========================================

window.PeQuenosPersonagem = {

    salvar: salvarPersonagem,

    carregar: carregarPersonagem,

    atualizar: atualizarPersonagem,

    atualizarTodos:
        atualizarTodosPersonagens,

    selecionarGenero:
        selecionarGenero,

    selecionarPele:
        selecionarPele,

    selecionarCabelo:
        selecionarCabelo

};


// ==========================================
// INICIAR QUANDO A PÁGINA CARREGAR
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    iniciarPersonagem
);