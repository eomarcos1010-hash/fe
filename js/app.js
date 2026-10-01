// ==========================================
// PEQUENOS NA FÉ
// APP.JS
// Controle geral da entrada da plataforma
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    // ------------------------------------------
    // BOTÃO: COMEÇAR MINHA AVENTURA
    // ------------------------------------------

    const continueButton =
        document.getElementById("continueButton");

    if (continueButton) {

        continueButton.addEventListener("click", () => {

            const personagem =
                window.PeQuenosPersonagem
                    ? window.PeQuenosPersonagem.carregar()
                    : null;

            // Salva o personagem escolhido
            if (
                personagem &&
                window.PeQuenosPersonagem
            ) {
                window.PeQuenosPersonagem.salvar(
                    personagem
                );
            }

            // Marca o cadastro como concluído
            localStorage.setItem(
                "pequenosNaFe_configurado",
                "true"
            );

            // Vai para o painel
            window.location.href = "painel.html";
        });
    }


    // ------------------------------------------
    // VERIFICA SE O USUÁRIO JÁ CONFIGUROU
    // ------------------------------------------

    const paginaAtual =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();

    const configurado =
        localStorage.getItem(
            "pequenosNaFe_configurado"
        ) === "true";


    // Se já configurou e está entrando novamente
    // pela página inicial, pode continuar normalmente.
    //
    // Não fazemos redirecionamento automático aqui
    // para permitir que o usuário possa editar
    // o personagem novamente.


    // ------------------------------------------
    // BOTÕES QUE VOLTAM PARA O INÍCIO
    // ------------------------------------------

    document
        .querySelectorAll("[data-voltar-inicio]")
        .forEach((botao) => {

            botao.addEventListener(
                "click",
                () => {
                    window.location.href =
                        "index.html";
                }
            );

        });


    // ------------------------------------------
    // BOTÕES QUE ABREM O PAINEL
    // ------------------------------------------

    document
        .querySelectorAll("[data-ir-painel]")
        .forEach((botao) => {

            botao.addEventListener(
                "click",
                () => {
                    window.location.href =
                        "painel.html";
                }
            );

        });


    // ------------------------------------------
    // BOTÃO DE SAIR / RECOMEÇAR
    // ------------------------------------------

    document
        .querySelectorAll("[data-recomecar]")
        .forEach((botao) => {

            botao.addEventListener(
                "click",
                () => {

                    const confirmar =
                        window.confirm(
                            "Quer criar um novo personagem?"
                        );

                    if (!confirmar) {
                        return;
                    }

                    localStorage.removeItem(
                        "pequenosNaFe_configurado"
                    );

                    localStorage.removeItem(
                        "pequenosNaFe_personagem"
                    );

                    window.location.href =
                        "index.html";
                }
            );

        });


    // ------------------------------------------
    // BOTÃO PARA RESETAR TODO O PROGRESSO
    // ------------------------------------------

    document
        .querySelectorAll("[data-resetar-progresso]")
        .forEach((botao) => {

            botao.addEventListener(
                "click",
                () => {

                    const confirmar =
                        window.confirm(
                            "Tem certeza que deseja apagar todo o progresso?"
                        );

                    if (!confirmar) {
                        return;
                    }

                    if (
                        window.PequenosProgresso &&
                        window.PequenosProgresso.resetar
                    ) {
                        window.PequenosProgresso.resetar();
                    } else {
                        localStorage.removeItem(
                            "pequenosNaFe_progresso"
                        );
                    }

                    window.location.reload();
                }
            );

        });


    // ------------------------------------------
    // MARCA A PÁGINA ATUAL NO MENU
    // ------------------------------------------

    document
        .querySelectorAll(
            "[data-navigation] a"
        )
        .forEach((link) => {

            const href =
                link.getAttribute("href");

            if (!href) {
                return;
            }

            const arquivo =
                href
                    .split("/")
                    .pop()
                    .split("?")[0]
                    .toLowerCase();

            if (
                arquivo === paginaAtual
            ) {
                link.classList.add(
                    "active"
                );
            }

        });


    // ------------------------------------------
    // ATALHO: ESC
    // Fecha elementos que tenham
    // data-fechar-esc
    // ------------------------------------------

    document.addEventListener(
        "keydown",
        (evento) => {

            if (evento.key !== "Escape") {
                return;
            }

            document
                .querySelectorAll(
                    "[data-fechar-esc]"
                )
                .forEach((elemento) => {

                    elemento.classList.remove(
                        "open"
                    );

                    elemento.classList.remove(
                        "active"
                    );

                });

        }
    );

});


// ==========================================
// FUNÇÕES GERAIS
// ==========================================

function irPara(url) {

    if (!url) {
        return;
    }

    window.location.href = url;
}


function obterPersonagemAtual() {

    if (
        window.PeQuenosPersonagem &&
        window.PeQuenosPersonagem.carregar
    ) {
        return window.PeQuenosPersonagem.carregar();
    }

    return null;
}


function obterProgressoAtual() {

    if (
        window.PequenosProgresso &&
        window.PequenosProgresso.carregar
    ) {
        return window.PequenosProgresso.carregar();
    }

    return null;
}


function plataformaConfigurada() {

    return (
        localStorage.getItem(
            "pequenosNaFe_configurado"
        ) === "true"
    );
}


// ==========================================
// EXPÕE FUNÇÕES GLOBALMENTE
// ==========================================

window.PequenosApp = {

    irPara: irPara,

    obterPersonagem:
        obterPersonagemAtual,

    obterProgresso:
        obterProgressoAtual,

    configurada:
        plataformaConfigurada
};