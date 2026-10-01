/* =========================================================
   PEQUENOS NA FÉ
   PAINEL.JS
   Controle do painel principal
   ========================================================= */


/* =========================================================
   INICIALIZAÇÃO
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        iniciarPainel();

    }
);


/* =========================================================
   INICIAR PAINEL
   ========================================================= */

function iniciarPainel() {

    carregarPersonagemPainel();

    carregarSaudacao();

    carregarProgressoPainel();

    carregarCategorias();

    carregarHistoriasDestaque();

    carregarAtividadeDoDia();

    configurarNavegacao();

    configurarEventosProgresso();
}


/* =========================================================
   PERSONAGEM
   ========================================================= */

function carregarPersonagemPainel() {

    if (
        !window.PeQuenosPersonagem
    ) {
        return;
    }


    const personagem =
        window.PeQuenosPersonagem
            .carregar();


    const personagens =
        document.querySelectorAll(
            ".character-preview"
        );


    personagens.forEach(
        elemento => {

            window.PeQuenosPersonagem
                .atualizar(
                    elemento,
                    personagem
                );
        }
    );
}


/* =========================================================
   SAUDAÇÃO
   ========================================================= */

function carregarSaudacao() {

    const elemento =
        document.querySelector(
            "[data-user-greeting]"
        );


    if (!elemento) {
        return;
    }


    const hora =
        new Date().getHours();


    let saudacao =
        "Olá!";


    if (hora >= 5 && hora < 12) {

        saudacao =
            "Bom dia! ☀️";

    } else if (
        hora >= 12 &&
        hora < 18
    ) {

        saudacao =
            "Boa tarde! 🌤️";

    } else {

        saudacao =
            "Boa noite! 🌙";
    }


    elemento.textContent =
        saudacao;
}


/* =========================================================
   NOME DO PERSONAGEM
   ========================================================= */

function carregarNomePersonagem() {

    const personagem =
        window.PeQuenosPersonagem
            ? window.PeQuenosPersonagem
                .carregar()
            : null;


    const elementos =
        document.querySelectorAll(
            "[data-character-name]"
        );


    if (!personagem) {
        return;
    }


    let nome =
        localStorage.getItem(
            "pequenosNaFe_nome"
        );


    if (!nome) {

        nome =
            personagem.genero === "menina"
                ? "Pequena"
                : "Pequeno";
    }


    elementos.forEach(
        elemento => {

            elemento.textContent =
                nome;
        }
    );
}


/* =========================================================
   PROGRESSO
   ========================================================= */

function carregarProgressoPainel() {

    if (
        !window.PequenosProgresso
    ) {
        return;
    }


    const resumo =
        window.PequenosProgresso
            .resumo();


    atualizarElemento(
        "[data-pontos]",
        resumo.pontos
    );


    atualizarElemento(
        "[data-historias]",
        resumo.historias
    );


    atualizarElemento(
        "[data-jogos]",
        resumo.jogos
    );


    atualizarElemento(
        "[data-conquistas]",
        resumo.conquistas
    );


    atualizarElemento(
        "[data-dias]",
        resumo.sequencia
    );


    atualizarElemento(
        "[data-atividades]",
        resumo.atividades
    );


    atualizarElemento(
        "[data-ingles]",
        resumo.ingles
    );


    const barras =
        document.querySelectorAll(
            "[data-progress-bar]"
        );


    barras.forEach(
        barra => {

            const porcentagem =
                calcularPorcentagem(
                    resumo
                );


            barra.style.width =
                `${porcentagem}%`;
        }
    );


    const porcentagens =
        document.querySelectorAll(
            "[data-progress-percent]"
        );


    porcentagens.forEach(
        elemento => {

            elemento.textContent =
                `${calcularPorcentagem(resumo)}%`;
        }
    );
}


/* =========================================================
   CALCULAR PROGRESSO GERAL
   ========================================================= */

function calcularPorcentagem(
    resumo
) {

    const total =
        20;


    const atual =
        Math.min(
            resumo.totalConcluido,
            total
        );


    return Math.round(
        (
            atual /
            total
        ) *
        100
    );
}


/* =========================================================
   CATEGORIAS
   ========================================================= */

function carregarCategorias() {

    if (
        !window.PequenosDados
    ) {
        return;
    }


    const container =
        document.querySelector(
            "[data-categories]"
        );


    if (!container) {
        return;
    }


    const categorias =
        window.PequenosDados
            .categorias;


    container.innerHTML = "";


    categorias.forEach(
        categoria => {

            const card =
                document.createElement(
                    "a"
                );


            card.href =
                categoria.pagina;


            card.className =
                "category-card";


            card.innerHTML = `
                <div class="category-icon">
                    ${categoria.icone}
                </div>

                <div class="category-info">
                    <strong>
                        ${categoria.titulo}
                    </strong>

                    <span>
                        ${categoria.descricao}
                    </span>
                </div>

                <div class="category-arrow">
                    →
                </div>
            `;


            container.appendChild(
                card
            );
        }
    );
}


/* =========================================================
   HISTÓRIAS EM DESTAQUE
   ========================================================= */

function carregarHistoriasDestaque() {

    if (
        !window.PequenosDados
    ) {
        return;
    }


    const container =
        document.querySelector(
            "[data-featured-stories]"
        );


    if (!container) {
        return;
    }


    const historias =
        window.PequenosDados
            .historias
            .slice(0, 4);


    container.innerHTML = "";


    historias.forEach(
        historia => {

            const concluida =
                window.PequenosProgresso
                    ? window.PequenosProgresso
                        .concluido(
                            "historiasConcluidas",
                            historia.id
                        )
                    : false;


            const card =
                document.createElement(
                    "a"
                );


            card.href =
                `historias.html?id=${historia.id}`;


            card.className =
                "story-card";


            if (concluida) {
                card.classList.add(
                    "completed"
                );
            }


            card.innerHTML = `
                <div
                    class="story-image"
                    style="--story-color:${historia.cor};"
                >
                    <span>
                        ${historia.emoji}
                    </span>

                    ${
                        concluida
                            ? `<div class="story-completed">✓</div>`
                            : ""
                    }
                </div>

                <div class="story-content">

                    <span class="story-category">
                        ${historia.categoria}
                    </span>

                    <strong>
                        ${historia.titulo}
                    </strong>

                    <small>
                        ${historia.resumo}
                    </small>

                    <div class="story-footer">

                        <span>
                            ⭐ ${historia.pontos} pontos
                        </span>

                        <span>
                            →
                        </span>

                    </div>

                </div>
            `;


            container.appendChild(
                card
            );
        }
    );
}


/* =========================================================
   ATIVIDADE DO DIA
   ========================================================= */

function carregarAtividadeDoDia() {

    if (
        !window.PequenosDados
    ) {
        return;
    }


    const elemento =
        document.querySelector(
            "[data-daily-activity]"
        );


    if (!elemento) {
        return;
    }


    const momentos =
        window.PequenosDados
            .momentos;


    if (
        !momentos.length
    ) {
        return;
    }


    const indice =
        new Date().getDate()
        % momentos.length;


    const momento =
        momentos[indice];


    elemento.innerHTML = `

        <div class="daily-icon">
            ${momento.emoji}
        </div>

        <div class="daily-content">

            <span>
                MOMENTO COM DEUS
            </span>

            <strong>
                ${momento.titulo}
            </strong>

            <p>
                ${momento.mensagem}
            </p>

        </div>

        <a
            href="momento-deus.html?id=${momento.id}"
            class="daily-button"
        >
            Começar
        </a>
    `;
}


/* =========================================================
   NAVEGAÇÃO
   ========================================================= */

function configurarNavegacao() {

    const botoes =
        document.querySelectorAll(
            "[data-navigation]"
        );


    botoes.forEach(
        botao => {

            botao.addEventListener(
                "click",
                () => {

                    const destino =
                        botao.dataset.navigation;


                    if (!destino) {
                        return;
                    }


                    window.location.href =
                        destino;
                }
            );
        }
    );
}


/* =========================================================
   EVENTOS DE PROGRESSO
   ========================================================= */

function configurarEventosProgresso() {

    document.addEventListener(
        "atividadeConcluida",
        () => {

            carregarProgressoPainel();
            carregarHistoriasDestaque();

        }
    );


    document.addEventListener(
        "conquistaDesbloqueada",
        () => {

            carregarProgressoPainel();

            mostrarNotificacao(
                "Nova conquista desbloqueada! 🏆"
            );

        }
    );
}


/* =========================================================
   ATUALIZAR ELEMENTO
   ========================================================= */

function atualizarElemento(
    seletor,
    valor
) {

    const elementos =
        document.querySelectorAll(
            seletor
        );


    elementos.forEach(
        elemento => {

            elemento.textContent =
                valor;
        }
    );
}


/* =========================================================
   NOTIFICAÇÃO
   ========================================================= */

function mostrarNotificacao(
    mensagem
) {

    let notificacao =
        document.querySelector(
            ".pequenos-notification"
        );


    if (!notificacao) {

        notificacao =
            document.createElement(
                "div"
            );


        notificacao.className =
            "pequenos-notification";


        document.body.appendChild(
            notificacao
        );
    }


    notificacao.textContent =
        mensagem;


    notificacao.classList.add(
        "show"
    );


    clearTimeout(
        window.pequenosNotificationTimer
    );


    window.pequenosNotificationTimer =
        setTimeout(
            () => {

                notificacao.classList.remove(
                    "show"
                );

            },
            3000
        );
}


/* =========================================================
   ATUALIZAR PAINEL MANUALMENTE
   ========================================================= */

function atualizarPainel() {

    carregarPersonagemPainel();

    carregarNomePersonagem();

    carregarSaudacao();

    carregarProgressoPainel();

    carregarCategorias();

    carregarHistoriasDestaque();

    carregarAtividadeDoDia();
}


/* =========================================================
   DISPONIBILIZAR GLOBALMENTE
   ========================================================= */

window.PequenosPainel = {

    iniciar:
        iniciarPainel,

    atualizar:
        atualizarPainel,

    progresso:
        carregarProgressoPainel,

    personagem:
        carregarPersonagemPainel,

    historias:
        carregarHistoriasDestaque,

    categorias:
        carregarCategorias,

    atividade:
        carregarAtividadeDoDia
};


/* =========================================================
   CARREGAR NOME APÓS INICIALIZAÇÃO
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        carregarNomePersonagem();

    }
);