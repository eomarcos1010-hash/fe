/* =========================================================
   PEQUENOS NA FÉ
   DADOS.JS
   Conteúdos principais da plataforma
   ========================================================= */

const PEQUENOS_DADOS = {

    /* =====================================================
       CONFIGURAÇÃO
       ===================================================== */

    plataforma: {
        nome: "Pequenos na Fé",
        subtitulo: "Uma aventura com Deus",
        idadeMinima: 4,
        idadeMaxima: 10
    },


    /* =====================================================
       CATEGORIAS
       ===================================================== */

    categorias: [
        {
            id: "historias",
            titulo: "Aventuras da Bíblia",
            descricao: "Conheça histórias incríveis da Palavra de Deus.",
            icone: "📖",
            pagina: "historias.html"
        },

        {
            id: "jesus",
            titulo: "Conhecendo Jesus",
            descricao: "Descubra mais sobre Jesus e seus ensinamentos.",
            icone: "💛",
            pagina: "jesus.html"
        },

        {
            id: "ingles",
            titulo: "English with Jesus",
            descricao: "Aprenda inglês de um jeito divertido.",
            icone: "🌎",
            pagina: "ingles.html"
        },

        {
            id: "jogos",
            titulo: "Jogos da Fé",
            descricao: "Aprenda brincando com desafios divertidos.",
            icone: "🎮",
            pagina: "jogos.html"
        },

        {
            id: "atividades",
            titulo: "Ateliê dos Pequenos",
            descricao: "Desenhe, crie e coloque sua criatividade em ação.",
            icone: "🎨",
            pagina: "atividades.html"
        },

        {
            id: "louvor",
            titulo: "Cantinho do Louvor",
            descricao: "Músicas para cantar, dançar e louvar.",
            icone: "🎵",
            pagina: "louvor.html"
        },

        {
            id: "momento",
            titulo: "Momento com Deus",
            descricao: "Um momento especial para conversar com Deus.",
            icone: "🙏",
            pagina: "momento-deus.html"
        },

        {
            id: "conquistas",
            titulo: "Minhas Conquistas",
            descricao: "Veja tudo o que você já conquistou.",
            icone: "🏆",
            pagina: "conquistas.html"
        }
    ],


    /* =====================================================
       HISTÓRIAS DA BÍBLIA
       ===================================================== */

    historias: [

        {
            id: "criacao",
            titulo: "A Criação",
            referencia: "Gênesis 1",
            resumo: "Deus criou o céu, a terra, os animais e todas as coisas.",
            categoria: "Criação",
            emoji: "🌎",
            cor: "#7CC8F2",
            pontos: 10,
            concluido: false
        },

        {
            id: "noe",
            titulo: "Noé e a Arca",
            referencia: "Gênesis 6–9",
            resumo: "Noé confiou em Deus e construiu uma grande arca.",
            categoria: "Confiança",
            emoji: "🌈",
            cor: "#8ED7B0",
            pontos: 15,
            concluido: false
        },

        {
            id: "abraao",
            titulo: "Abraão e a Promessa",
            referencia: "Gênesis 12",
            resumo: "Abraão aprendeu a confiar na promessa que Deus fez.",
            categoria: "Fé",
            emoji: "⭐",
            cor: "#F5D477",
            pontos: 15,
            concluido: false
        },

        {
            id: "moises",
            titulo: "Moisés e o Mar",
            referencia: "Êxodo 14",
            resumo: "Deus abriu o mar e mostrou seu poder ao povo de Israel.",
            categoria: "Coragem",
            emoji: "🌊",
            cor: "#82B9E8",
            pontos: 20,
            concluido: false
        },

        {
            id: "davi",
            titulo: "Davi e Golias",
            referencia: "1 Samuel 17",
            resumo: "Davi enfrentou um gigante confiando em Deus.",
            categoria: "Coragem",
            emoji: "🪨",
            cor: "#D8A875",
            pontos: 20,
            concluido: false
        },

        {
            id: "daniel",
            titulo: "Daniel na Cova dos Leões",
            referencia: "Daniel 6",
            resumo: "Daniel continuou confiando em Deus mesmo diante do perigo.",
            categoria: "Fidelidade",
            emoji: "🦁",
            cor: "#F2B45D",
            pontos: 20,
            concluido: false
        },

        {
            id: "jonas",
            titulo: "Jonas e o Grande Peixe",
            referencia: "Jonas 1–4",
            resumo: "Jonas aprendeu uma importante lição sobre obedecer a Deus.",
            categoria: "Obediência",
            emoji: "🐋",
            cor: "#73B7C9",
            pontos: 15,
            concluido: false
        },

        {
            id: "nascimento-jesus",
            titulo: "O Nascimento de Jesus",
            referencia: "Lucas 2",
            resumo: "Jesus nasceu em Belém e trouxe uma mensagem de esperança.",
            categoria: "Jesus",
            emoji: "✨",
            cor: "#D8B6F0",
            pontos: 20,
            concluido: false
        }
    ],


    /* =====================================================
       CONHECENDO JESUS
       ===================================================== */

    jesus: [

        {
            id: "jesus-amor",
            titulo: "Jesus nos ensina a amar",
            descricao: "Aprenda como Jesus demonstrava amor pelas pessoas.",
            emoji: "❤️",
            pontos: 10
        },

        {
            id: "jesus-ajudar",
            titulo: "Jesus nos ensina a ajudar",
            descricao: "Descubra como pequenos gestos podem fazer diferença.",
            emoji: "🤝",
            pontos: 10
        },

        {
            id: "jesus-perdao",
            titulo: "Jesus e o perdão",
            descricao: "Entenda por que perdoar é tão importante.",
            emoji: "💛",
            pontos: 10
        },

        {
            id: "jesus-oracao",
            titulo: "Jesus e a oração",
            descricao: "Aprenda sobre conversar com Deus.",
            emoji: "🙏",
            pontos: 10
        }
    ],


    /* =====================================================
       INGLÊS
       ===================================================== */

    ingles: [

        {
            id: "ingles-cores",
            titulo: "Colors",
            portugues: "Cores",
            palavras: [
                {
                    ingles: "Blue",
                    portugues: "Azul",
                    emoji: "🔵"
                },
                {
                    ingles: "Yellow",
                    portugues: "Amarelo",
                    emoji: "🟡"
                },
                {
                    ingles: "Green",
                    portugues: "Verde",
                    emoji: "🟢"
                },
                {
                    ingles: "Red",
                    portugues: "Vermelho",
                    emoji: "🔴"
                }
            ],
            pontos: 10
        },

        {
            id: "ingles-animais",
            titulo: "Animals",
            portugues: "Animais",
            palavras: [
                {
                    ingles: "Dog",
                    portugues: "Cachorro",
                    emoji: "🐶"
                },
                {
                    ingles: "Cat",
                    portugues: "Gato",
                    emoji: "🐱"
                },
                {
                    ingles: "Lion",
                    portugues: "Leão",
                    emoji: "🦁"
                },
                {
                    ingles: "Fish",
                    portugues: "Peixe",
                    emoji: "🐟"
                }
            ],
            pontos: 10
        },

        {
            id: "ingles-familia",
            titulo: "Family",
            portugues: "Família",
            palavras: [
                {
                    ingles: "Mother",
                    portugues: "Mãe",
                    emoji: "👩"
                },
                {
                    ingles: "Father",
                    portugues: "Pai",
                    emoji: "👨"
                },
                {
                    ingles: "Brother",
                    portugues: "Irmão",
                    emoji: "👦"
                },
                {
                    ingles: "Sister",
                    portugues: "Irmã",
                    emoji: "👧"
                }
            ],
            pontos: 15
        }
    ],


    /* =====================================================
       JOGOS
       ===================================================== */

    jogos: [

        {
            id: "quiz-biblia",
            titulo: "Quiz da Bíblia",
            descricao: "Teste seus conhecimentos sobre as histórias da Bíblia.",
            emoji: "🧠",
            tipo: "quiz",
            pontos: 20
        },

        {
            id: "quem-sou-eu",
            titulo: "Quem sou eu?",
            descricao: "Descubra qual personagem bíblico está escondido.",
            emoji: "🔎",
            tipo: "personagem",
            pontos: 15
        },

        {
            id: "complete-versiculo",
            titulo: "Complete o versículo",
            descricao: "Complete as palavras que estão faltando.",
            emoji: "📜",
            tipo: "versiculo",
            pontos: 20
        },

        {
            id: "memoria",
            titulo: "Memória da Fé",
            descricao: "Encontre os pares e exercite sua memória.",
            emoji: "🧩",
            tipo: "memoria",
            pontos: 15
        }
    ],


    /* =====================================================
       ATIVIDADES
       ===================================================== */

    atividades: [

        {
            id: "desenho-arca",
            titulo: "Desenhe a Arca de Noé",
            descricao: "Use sua criatividade para criar sua própria arca.",
            emoji: "🎨",
            pontos: 10
        },

        {
            id: "desenho-davi",
            titulo: "Desenhe Davi",
            descricao: "Crie seu próprio desenho de Davi.",
            emoji: "🖍️",
            pontos: 10
        },

        {
            id: "colorir-criacao",
            titulo: "Colorindo a Criação",
            descricao: "Escolha suas cores para completar a criação.",
            emoji: "🌈",
            pontos: 10
        }
    ],


    /* =====================================================
       LOUVORES
       ===================================================== */

    louvores: [

        {
            id: "louvor-1",
            titulo: "Deus é tão bom",
            descricao: "Uma canção simples para cantar com alegria.",
            emoji: "🎵"
        },

        {
            id: "louvor-2",
            titulo: "Meu Deus é grande",
            descricao: "Uma música para celebrar a grandeza de Deus.",
            emoji: "⭐"
        },

        {
            id: "louvor-3",
            titulo: "Sou feliz com Jesus",
            descricao: "Uma canção alegre para os pequenos.",
            emoji: "😊"
        }
    ],


    /* =====================================================
       MOMENTO COM DEUS
       ===================================================== */

    momentos: [

        {
            id: "momento-1",
            titulo: "Obrigado, Deus!",
            mensagem: "Pense em três coisas pelas quais você é grato hoje.",
            emoji: "💛",
            pontos: 5
        },

        {
            id: "momento-2",
            titulo: "Uma oração especial",
            mensagem: "Feche os olhos e converse com Deus do seu jeitinho.",
            emoji: "🙏",
            pontos: 5
        },

        {
            id: "momento-3",
            titulo: "Hoje eu posso ajudar",
            mensagem: "Pense em alguém que você pode ajudar hoje.",
            emoji: "🤝",
            pontos: 5
        },

        {
            id: "momento-4",
            titulo: "Um coração agradecido",
            mensagem: "Lembre de algo bom que aconteceu hoje e agradeça a Deus.",
            emoji: "❤️",
            pontos: 5
        }
    ],


    /* =====================================================
       CONQUISTAS
       ===================================================== */

    conquistas: [

        {
            id: "primeiro-passo",
            titulo: "Primeiro Passo",
            descricao: "Criou seu personagem.",
            emoji: "🌟",
            requisito: {
                tipo: "personagem",
                valor: 1
            }
        },

        {
            id: "primeira-historia",
            titulo: "Primeira Aventura",
            descricao: "Completou sua primeira história bíblica.",
            emoji: "📖",
            requisito: {
                tipo: "historias",
                valor: 1
            }
        },

        {
            id: "amigo-da-biblia",
            titulo: "Amigo da Bíblia",
            descricao: "Completou 3 histórias bíblicas.",
            emoji: "📚",
            requisito: {
                tipo: "historias",
                valor: 3
            }
        },

        {
            id: "coracao-feliz",
            titulo: "Coração Feliz",
            descricao: "Completou um Momento com Deus.",
            emoji: "💛",
            requisito: {
                tipo: "momentos",
                valor: 1
            }
        },

        {
            id: "pequeno-aprendiz",
            titulo: "Pequeno Aprendiz",
            descricao: "Completou uma atividade de inglês.",
            emoji: "🌎",
            requisito: {
                tipo: "ingles",
                valor: 1
            }
        },

        {
            id: "mestre-dos-jogos",
            titulo: "Mestre dos Jogos",
            descricao: "Completou 3 jogos.",
            emoji: "🎮",
            requisito: {
                tipo: "jogos",
                valor: 3
            }
        },

        {
            id: "explorador-da-fe",
            titulo: "Explorador da Fé",
            descricao: "Alcançou 100 pontos.",
            emoji: "🗺️",
            requisito: {
                tipo: "pontos",
                valor: 100
            }
        },

        {
            id: "grande-aventureiro",
            titulo: "Grande Aventureiro",
            descricao: "Alcançou 250 pontos.",
            emoji: "🏆",
            requisito: {
                tipo: "pontos",
                valor: 250
            }
        }
    ]
};


/* =========================================================
   FUNÇÕES DE ACESSO
   ========================================================= */

function obterDadosPequenos() {
    return PEQUENOS_DADOS;
}


function obterHistorias() {
    return PEQUENOS_DADOS.historias;
}


function obterHistoria(id) {
    return PEQUENOS_DADOS.historias.find(
        historia => historia.id === id
    );
}


function obterJesusConteudos() {
    return PEQUENOS_DADOS.jesus;
}


function obterIngles() {
    return PEQUENOS_DADOS.ingles;
}


function obterJogos() {
    return PEQUENOS_DADOS.jogos;
}


function obterAtividades() {
    return PEQUENOS_DADOS.atividades;
}


function obterLouvores() {
    return PEQUENOS_DADOS.louvores;
}


function obterMomentos() {
    return PEQUENOS_DADOS.momentos;
}


function obterConquistas() {
    return PEQUENOS_DADOS.conquistas;
}


function obterCategorias() {
    return PEQUENOS_DADOS.categorias;
}


/* =========================================================
   DISPONIBILIZAÇÃO GLOBAL
   ========================================================= */

window.PequenosDados = PEQUENOS_DADOS;

window.PequenosAPI = {
    obterDados: obterDadosPequenos,
    obterHistorias: obterHistorias,
    obterHistoria: obterHistoria,
    obterJesus: obterJesusConteudos,
    obterIngles: obterIngles,
    obterJogos: obterJogos,
    obterAtividades: obterAtividades,
    obterLouvores: obterLouvores,
    obterMomentos: obterMomentos,
    obterConquistas: obterConquistas,
    obterCategorias: obterCategorias
};