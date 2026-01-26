import { buscarLista } from "./api.js";


// Buscando pela página atual
const thisPage = document.body.dataset.page;

// Gerando html de cada página
// -> Músicas
if (thisPage === "musicas") {
    initMusicPage();
} else {
    if (thisPage == "ensaios") {
        initEnsaiosPage();
    }
}

// Função que executa todo o script da página de músicas
// Manipulação do DOM --> musicas.html
function initMusicPage() {
    // Adicionar músicas
    const addMusic = document.querySelector("#addMusic");
    if (addMusic != null) {
        addMusic.addEventListener('click', () => {
            const templateForm = document.querySelector('#addMusic-template');
            renderForm(templateForm);
        });
    } else { return; } // Evitando crash
}

function initEnsaiosPage() {
    // Add novo ensaio
    const addEnsaio = document.querySelector('#addEnsaios');
    if (addEnsaio) {
        addEnsaio.addEventListener('click', () => {
            const templateForm = document.querySelector('#addEnsaios-template');
            renderForm(templateForm);
        });
    } else {return;}
}

// Formulários CRUD
function renderForm(templateForm) { // (template/itemBox, save/edit)
    // Geral
    const formulario = templateForm.content.cloneNode(true);
    document.body.appendChild(formulario);
    // Fechar janela
    document.querySelector('.close-crud').addEventListener('click', () => {
        const popup = document.querySelector('.pop-up');
        popup.remove();
    });
    // Salvar / Interação com services
    document.querySelector('#save').addEventListener('click', (e) => {
        window.alert(e.target.closest(".crud-box").classList);
        //salvarMusica()
        // Definindo qual formulário foi criado (ensaio, música ou escala)
        const popup = document.querySelector('.pop-up');
        popup.remove();
    });

}


// Buscando por músicas
/* document.addEventListener("DOMContentLoaded", function () {
    let listaMusicas = buscarLista("musicas");
    const sectionMusica = document.querySelector('.music-list');
    const templateItem = document.querySelector('#itemMusic');
    const itemMusic = templateItem.content.cloneNode(true);
    console.log(itemMusic);
    listaMusicas.forEach((musica) => {
        console.log(musica);
    });
}); */


// Gerando elementos músicas
/* const searchMusic = document.querySelector('#musicName');
searchMusic.addEventListener('input', function () {
    console.log(this.value);
}); */



// Manipulação do DOM --> Escalas
const addEscala = document.querySelector('#addEscalas');

if (addEscala != null) {
    addEscala.addEventListener('click', function () {
        const templateForm = document.querySelector('#addEscalas-template');
        const addEscalaForm = templateForm.content.cloneNode(true);
        document.body.appendChild(addEscalaForm);
        // Fechar janela
        document.querySelector('.close-crud').addEventListener('click', () => {
            const popup = document.querySelector('.pop-up');
            popup.remove();
        });


    });
}



function carregarMusicas(section, musicList) {
    window.alert('Carregar músicas!');
}


