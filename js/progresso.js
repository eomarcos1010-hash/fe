const CHAVE_PROGRESSO = "pequenosNaFe_progresso";

const PROGRESSO_PADRAO = {
    pontos: 0,

    historiasConcluidas: [],
    jesusConcluidos: [],
    inglesConcluidos: [],
    jogosConcluidos: [],
    atividadesConcluidas: [],
    momentosConcluidos: [],
    louvoresOuvidos: [],

    conquistasDesbloqueadas: [],

    diasAtivos: [],
    ultimaAtividade: null
};


/* =========================================================
   UTILIDADES
========================================================= */

function copiarArray(array) {
    return Array.isArray(array)
        ? [...array]
        : [];
}


function criarProgressoPadrao() {

    return {
        ...PROGRESSO_PADRAO,

        historiasConcluidas: [],
        jesusConcluidos: [],
        inglesConcluidos: [],
        jogosConcluidos: [],
        atividadesConcluidas: [],
        momentosConcluidos: [],
        louvoresOuvidos: [],
        conquistasDesbloqueadas: [],
        diasAtivos: []
    };

}


/* =========================================================
   CARREGAR
========================================================= */

function carregarProgresso() {

    try {

        const salvo =
            localStorage.getItem(
                CHAVE_PROGRESSO
            );

        if (!salvo) {
            return criarProgressoPadrao();
        }

        const dados =
            JSON.parse(salvo);

        const progresso = {
            ...criarProgressoPadrao(),
            ...dados
        };

        progresso.historiasConcluidas =
            copiarArray(
                dados.historiasConcluidas
            );

        progresso.jesusConcluidos =
            copiarArray(
                dados.jesusConcluidos
            );

        progresso.inglesConcluidos =
            copiarArray(
                dados.inglesConcluidos
            );

        progresso.jogosConcluidos =
            copiarArray(
                dados.jogosConcluidos
            );

        progresso.atividadesConcluidas =
            copiarArray(
                dados.atividadesConcluidas
            );

        progresso.momentosConcluidos =
            copiarArray(
                dados.momentosConcluidos
            );

        progresso.louvoresOuvidos =
            copiarArray(
                dados.louvoresOuvidos
            );

        progresso.conquistasDesbloqueadas =
            copiarArray(
                dados.conquistasDesbloqueadas
            );

        progresso.diasAtivos =
            copiarArray(
                dados.diasAtivos
            );

        progresso.pontos =
            Number(
                dados.pontos || 0
            );

        return progresso;

    } catch (erro) {

        console.warn(
            "Erro ao carregar progresso:",
            erro
        );

        return criarProgressoPadrao();

    }

}


/* =========================================================
   SALVAR
========================================================= */

function salvarProgresso(progresso) {

    try {

        localStorage.setItem(
            CHAVE_PROGRESSO,
            JSON.stringify(
                progresso
            )
        );

        return true;

    } catch (erro) {

        console.warn(
            "Erro ao salvar progresso:",
            erro
        );

        return false;

    }

}


/* =========================================================
   XP / PONTOS
========================================================= */

function adicionarPontos(valor = 0) {

    const pontos =
        Number(valor) || 0;

    if (pontos <= 0) {
        return obterPontos();
    }

    const progresso =
        carregarProgresso();

    progresso.pontos =
        Number(
            progresso.pontos || 0
        ) + pontos;

    progresso.ultimaAtividade =
        new Date().toISOString();

    registrarDiaAtivoNoProgresso(
        progresso
    );

    salvarProgresso(
        progresso
    );

    verificarConquistasInterno(
        progresso
    );

    return progresso.pontos;

}


function obterPontos() {

    const progresso =
        carregarProgresso();

    return Number(
        progresso.pontos || 0
    );

}


/* =========================================================
   DIA ATIVO
========================================================= */

function obterDataLocal() {

    const agora =
        new Date();

    const ano =
        agora.getFullYear();

    const mes =
        String(
            agora.getMonth() + 1
        ).padStart(2, "0");

    const dia =
        String(
            agora.getDate()
        ).padStart(2, "0");

    return `${ano}-${mes}-${dia}`;

}


function registrarDiaAtivoNoProgresso(
    progresso
) {

    const hoje =
        obterDataLocal();

    if (
        !progresso.diasAtivos.includes(
            hoje
        )
    ) {

        progresso.diasAtivos.push(
            hoje
        );

    }

}


function registrarDiaAtivo() {

    const progresso =
        carregarProgresso();

    registrarDiaAtivoNoProgresso(
        progresso
    );

    progresso.ultimaAtividade =
        new Date().toISOString();

    salvarProgresso(
        progresso
    );

}


function obterSequenciaDias() {

    const progresso =
        carregarProgresso();

    const dias =
        [...progresso.diasAtivos]
            .sort()
            .reverse();

    if (!dias.length) {
        return 0;
    }

    let sequencia = 0;

    let dataEsperada =
        new Date();

    for (
        let i = 0;
        i < dias.length;
        i++
    ) {

        const data =
            new Date(
                `${dias[i]}T00:00:00`
            );

        const esperado =
            new Date(
                dataEsperada
            );

        esperado.setHours(
            0,
            0,
            0,
            0
        );

        if (
            data.getTime() ===
            esperado.getTime()
        ) {

            sequencia++;

            dataEsperada.setDate(
                dataEsperada.getDate() - 1
            );

        } else {

            break;

        }

    }

    return sequencia;

}


/* =========================================================
   CONCLUSÃO DE ITENS
========================================================= */

function obterListaPorCategoria(
    progresso,
    categoria
) {

    const listas = {

        historias:
            "historiasConcluidas",

        jesus:
            "jesusConcluidos",

        ingles:
            "inglesConcluidos",

        jogos:
            "jogosConcluidos",

        atividades:
            "atividadesConcluidas",

        momentos:
            "momentosConcluidos",

        louvores:
            "louvoresOuvidos"

    };

    const chave =
        listas[categoria];

    if (!chave) {
        return null;
    }

    return {
        chave,
        lista:
            progresso[chave]
    };

}


function concluirItem(
    categoria,
    id,
    pontos = 0
) {

    const progresso =
        carregarProgresso();

    const resultado =
        obterListaPorCategoria(
            progresso,
            categoria
        );

    if (!resultado) {
        return false;
    }

    const itemId =
        String(id);

    const jaConcluido =
        resultado.lista.includes(
            itemId
        );

    if (!jaConcluido) {

        resultado.lista.push(
            itemId
        );

        if (
            Number(pontos) > 0
        ) {

            progresso.pontos +=
                Number(pontos);

        }

        progresso.ultimaAtividade =
            new Date().toISOString();

        registrarDiaAtivoNoProgresso(
            progresso
        );

        salvarProgresso(
            progresso
        );

        verificarConquistasInterno(
            progresso
        );

        dispararAtividadeConcluida(
            categoria,
            itemId
        );

        return true;

    }

    return false;

}


function itemConcluido(
    categoria,
    id
) {

    const progresso =
        carregarProgresso();

    const resultado =
        obterListaPorCategoria(
            progresso,
            categoria
        );

    if (!resultado) {
        return false;
    }

    return resultado.lista.includes(
        String(id)
    );

}


/* =========================================================
   CONTADORES
========================================================= */

function contarItens(
    categoria
) {

    const progresso =
        carregarProgresso();

    const resultado =
        obterListaPorCategoria(
            progresso,
            categoria
        );

    if (!resultado) {
        return 0;
    }

    return resultado.lista.length;

}


function contarHistorias() {
    return contarItens("historias");
}


function contarJogos() {
    return contarItens("jogos");
}


function contarIngles() {
    return contarItens("ingles");
}


function contarMomentos() {
    return contarItens("momentos");
}


function contarAtividades() {
    return contarItens("atividades");
}


/* =========================================================
   ENGLISH
========================================================= */

/*
    O ingles.html possui suas próprias 60 atividades
    salvas em:

    pequenosNaFe_ingles_atividades

    Aqui fazemos a sincronização delas com o progresso
    geral da plataforma.
*/

function sincronizarIngles() {

    let atividadesIngles = [];

    try {

        atividadesIngles =
            JSON.parse(
                localStorage.getItem(
                    "pequenosNaFe_ingles_atividades"
                ) || "[]"
            );

    } catch {

        atividadesIngles = [];

    }

    if (
        !Array.isArray(
            atividadesIngles
        )
    ) {
        atividadesIngles = [];
    }

    const progresso =
        carregarProgresso();

    let alterou = false;

    atividadesIngles.forEach(
        id => {

            const idString =
                `ingles-${id}`;

            if (
                !progresso
                    .inglesConcluidos
                    .includes(idString)
            ) {

                progresso
                    .inglesConcluidos
                    .push(
                        idString
                    );

                alterou = true;

            }

        }
    );

    if (alterou) {

        progresso.ultimaAtividade =
            new Date().toISOString();

        registrarDiaAtivoNoProgresso(
            progresso
        );

        salvarProgresso(
            progresso
        );

        verificarConquistasInterno(
            progresso
        );

    }

    return progresso
        .inglesConcluidos
        .length;

}


/* =========================================================
   CONQUISTAS
========================================================= */

const CONQUISTAS = [

    {
        id: "primeiro-passo",
        nome: "Primeiro Passo",
        descricao:
            "Começou sua aventura no Pequenos na Fé.",
        icone: "🌱",
        verificar:
            progresso =>
                obterTotalAtividades(
                    progresso
                ) >= 1
    },

    {
        id: "primeira-historia",
        nome: "Primeira História",
        descricao:
            "Completou sua primeira história da Bíblia.",
        icone: "📖",
        verificar:
            progresso =>
                progresso
                    .historiasConcluidas
                    .length >= 1
    },

    {
        id: "amigo-da-biblia",
        nome: "Amigo da Bíblia",
        descricao:
            "Completou 3 histórias bíblicas.",
        icone: "📚",
        verificar:
            progresso =>
                progresso
                    .historiasConcluidas
                    .length >= 3
    },

    {
        id: "coracao-feliz",
        nome: "Coração Feliz",
        descricao:
            "Completou 3 atividades sobre Jesus.",
        icone: "❤️",
        verificar:
            progresso =>
                progresso
                    .jesusConcluidos
                    .length >= 3
    },

    {
        id: "pequeno-aprendiz",
        nome: "Pequeno Aprendiz",
        descricao:
            "Completou 5 atividades.",
        icone: "⭐",
        verificar:
            progresso =>
                obterTotalAtividades(
                    progresso
                ) >= 5
    },

    {
        id: "english-first-step",
        nome: "First English Step",
        descricao:
            "Completou 5 atividades de inglês.",
        icone: "🇺🇸",
        verificar:
            progresso =>
                progresso
                    .inglesConcluidos
                    .length >= 5
    },

    {
        id: "english-student",
        nome: "Little English Student",
        descricao:
            "Completou 15 atividades de inglês.",
        icone: "📚",
        verificar:
            progresso =>
                progresso
                    .inglesConcluidos
                    .length >= 15
    },

    {
        id: "english-explorer",
        nome: "English Explorer",
        descricao:
            "Completou 25 atividades de inglês.",
        icone: "🧭",
        verificar:
            progresso =>
                progresso
                    .inglesConcluidos
                    .length >= 25
    },

    {
        id: "friend-of-noah",
        nome: "Friend of Noah",
        descricao:
            "Completou 35 atividades de inglês.",
        icone: "🛶",
        verificar:
            progresso =>
                progresso
                    .inglesConcluidos
                    .filter(
                        id =>
                            Number(
                                String(id)
                                    .replace(
                                        "ingles-",
                                        ""
                                    )
                            ) <= 40
                    )
                    .length >= 35
    },

    {
        id: "noahs-ark-master",
        nome: "Noah's Ark Master",
        descricao:
            "Completou as 40 atividades da Arca de Noé.",
        icone: "🦁",
        verificar:
            progresso =>
                contarInglesUnidade(
                    progresso,
                    1,
                    40
                ) >= 40
    },

    {
        id: "heart-of-love",
        nome: "Heart Full of Love",
        descricao:
            "Completou as 20 atividades sobre amor.",
        icone: "❤️",
        verificar:
            progresso =>
                contarInglesUnidade(
                    progresso,
                    41,
                    60
                ) >= 20
    },

    {
        id: "mestre-dos-jogos",
        nome: "Mestre dos Jogos",
        descricao:
            "Completou 3 jogos.",
        icone: "🎮",
        verificar:
            progresso =>
                progresso
                    .jogosConcluidos
                    .length >= 3
    },

    {
        id: "explorador-da-fe",
        nome: "Explorador da Fé",
        descricao:
            "Completou 25 atividades na plataforma.",
        icone: "🧭",
        verificar:
            progresso =>
                obterTotalAtividades(
                    progresso
                ) >= 25
    },

    {
        id: "grande-aventureiro",
        nome: "Grande Aventureiro",
        descricao:
            "Completou 50 atividades.",
        icone: "🏆",
        verificar:
            progresso =>
                obterTotalAtividades(
                    progresso
                ) >= 50
    },

    {
        id: "coracao-cheio",
        nome: "Coração Cheio de Amor",
        descricao:
            "Completou toda a unidade sobre amor.",
        icone: "💖",
        verificar:
            progresso =>
                contarInglesUnidade(
                    progresso,
                    41,
                    60
                ) >= 20
    }

];


function contarInglesUnidade(
    progresso,
    inicio,
    fim
) {

    return progresso
        .inglesConcluidos
        .filter(
            id => {

                const numero =
                    Number(
                        String(id)
                            .replace(
                                "ingles-",
                                ""
                            )
                    );

                return (
                    numero >= inicio &&
                    numero <= fim
                );

            }
        )
        .length;

}


function obterTotalAtividades(
    progresso
) {

    return (
        progresso
            .historiasConcluidas
            .length +

        progresso
            .jesusConcluidos
            .length +

        progresso
            .inglesConcluidos
            .length +

        progresso
            .jogosConcluidos
            .length +

        progresso
            .atividadesConcluidas
            .length +

        progresso
            .momentosConcluidos
            .length +

        progresso
            .louvoresOuvidos
            .length
    );

}


/* =========================================================
   VERIFICAR CONQUISTAS
========================================================= */

function verificarConquistasInterno(
    progresso
) {

    let novas = [];

    CONQUISTAS.forEach(
        conquista => {

            const jaTem =
                progresso
                    .conquistasDesbloqueadas
                    .includes(
                        conquista.id
                    );

            if (jaTem) {
                return;
            }

            let desbloqueou = false;

            try {

                desbloqueou =
                    conquista.verificar(
                        progresso
                    );

            } catch (erro) {

                console.warn(
                    "Erro ao verificar conquista:",
                    conquista.id,
                    erro
                );

            }

            if (desbloqueou) {

                progresso
                    .conquistasDesbloqueadas
                    .push(
                        conquista.id
                    );

                novas.push(
                    conquista
                );

            }

        }
    );

    if (novas.length) {

        salvarProgresso(
            progresso
        );

        novas.forEach(
            conquista => {

                dispararConquistaDesbloqueada(
                    conquista
                );

            }
        );

    }

    return novas;

}


function verificarConquistas() {

    const progresso =
        carregarProgresso();

    return verificarConquistasInterno(
        progresso
    );

}


/* =========================================================
   CONQUISTA INDIVIDUAL
========================================================= */

function desbloquearConquista(
    id
) {

    const progresso =
        carregarProgresso();

    if (
        progresso
            .conquistasDesbloqueadas
            .includes(id)
    ) {
        return false;
    }

    const conquista =
        CONQUISTAS.find(
            item =>
                item.id === id
        );

    if (!conquista) {
        return false;
    }

    progresso
        .conquistasDesbloqueadas
        .push(id);

    salvarProgresso(
        progresso
    );

    dispararConquistaDesbloqueada(
        conquista
    );

    return true;

}


function conquistaDesbloqueada(
    id
) {

    const progresso =
        carregarProgresso();

    return progresso
        .conquistasDesbloqueadas
        .includes(id);

}


function obterConquistasDesbloqueadas() {

    const progresso =
        carregarProgresso();

    return progresso
        .conquistasDesbloqueadas
        .map(
            id =>
                CONQUISTAS.find(
                    conquista =>
                        conquista.id === id
                )
        )
        .filter(Boolean);

}


function obterTodasConquistas() {

    return CONQUISTAS.map(
        conquista => ({
            ...conquista,
            desbloqueada:
                conquistaDesbloqueada(
                    conquista.id
                )
        })
    );

}


/* =========================================================
   RESUMO
========================================================= */

function obterResumoProgresso() {

    sincronizarIngles();

    const progresso =
        carregarProgresso();

    const total =
        obterTotalAtividades(
            progresso
        );

    return {

        pontos:
            progresso.pontos,

        totalAtividades:
            total,

        historias:
            progresso
                .historiasConcluidas
                .length,

        jesus:
            progresso
                .jesusConcluidos
                .length,

        ingles:
            progresso
                .inglesConcluidos
                .length,

        jogos:
            progresso
                .jogosConcluidos
                .length,

        atividades:
            progresso
                .atividadesConcluidas
                .length,

        momentos:
            progresso
                .momentosConcluidos
                .length,

        louvores:
            progresso
                .louvoresOuvidos
                .length,

        conquistas:
            progresso
                .conquistasDesbloqueadas
                .length,

        diasAtivos:
            progresso
                .diasAtivos
                .length,

        sequencia:
            obterSequenciaDias(),

        porcentagem:
            Math.min(
                100,
                Math.round(
                    (total / 60) *
                    100
                )
            )

    };

}


/* =========================================================
   RESET
========================================================= */

function resetarProgresso() {

    localStorage.removeItem(
        CHAVE_PROGRESSO
    );

    localStorage.removeItem(
        "pequenosNaFe_ingles_atividades"
    );

    localStorage.removeItem(
        "pequenosNaFe_ingles_xp"
    );

    return true;

}


/* =========================================================
   EVENTOS
========================================================= */

function dispararAtividadeConcluida(
    categoria,
    id
) {

    window.dispatchEvent(
        new CustomEvent(
            "pequenos:atividadeConcluida",
            {
                detail: {
                    categoria,
                    id
                }
            }
        )
    );

}


function dispararConquistaDesbloqueada(
    conquista
) {

    window.dispatchEvent(
        new CustomEvent(
            "pequenos:conquistaDesbloqueada",
            {
                detail: conquista
            }
        )
    );

}


/* =========================================================
   API GLOBAL
========================================================= */

window.PequenosProgresso = {

    carregar:
        carregarProgresso,

    salvar:
        salvarProgresso,

    adicionarPontos:
        adicionarPontos,

    obterPontos:
        obterPontos,

    concluir:
        concluirItem,

    concluido:
        itemConcluido,

    contar:
        contarItens,

    contarHistorias:
        contarHistorias,

    contarJogos:
        contarJogos,

    contarIngles:
        contarIngles,

    contarMomentos:
        contarMomentos,

    contarAtividades:
        contarAtividades,

    sincronizarIngles:
        sincronizarIngles,

    verificarConquistas:
        verificarConquistas,

    desbloquearConquista:
        desbloquearConquista,

    conquistaDesbloqueada:
        conquistaDesbloqueada,

    obterConquistas:
        obterConquistasDesbloqueadas,

    obterTodasConquistas:
        obterTodasConquistas,

    obterSequencia:
        obterSequenciaDias,

    registrarDia:
        registrarDiaAtivo,

    resumo:
        obterResumoProgresso,

    resetar:
        resetarProgresso,

    eventoConclusao:
        dispararAtividadeConcluida
};


/* =========================================================
   INICIALIZAÇÃO
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const progresso =
            carregarProgresso();

        registrarDiaAtivo();

        sincronizarIngles();

        verificarConquistasInterno(
            progresso
        );

    }
);