import { buscarLista } from "./api.js";

// Manipulação do DOM --> musicas.html
const addMusic = document.querySelector("#addMusic");
if (addMusic != null) {
    addMusic.addEventListener('click', () => {
        const templateForm = document.querySelector('#addMusic-template');
        const addMusicForm = templateForm.content.cloneNode(true);
        document.body.appendChild(addMusicForm);
        // Fechar janela
        document.querySelector('.close-crud').addEventListener('click', () => {
            const popup = document.querySelector('.pop-up');
            popup.remove();
        });

        // Acessando services
        const saveButton = document.querySelector('#save');
        saveButton.addEventListener('click', () => {
            salvarMusica()
            const popup = document.querySelector('.pop-up');
            popup.remove();
        });

    });
}

document.addEventListener("DOMContentLoaded", function () {
    let listaMusicas = buscarLista("musicas");
    const sectionMusica = document.querySelector('.music-list');
    const templateItem = document.querySelector('#itemMusic');
    const itemMusic = templateItem.content.cloneNode(true);
    console.log(itemMusic);
    listaMusicas.forEach((musica) => {
        console.log(musica);
    });
});


// Gerando elementos músicas
const searchMusic = document.querySelector('#musicName');
searchMusic.addEventListener('input', () =>{
    window.alert("OK");
});

function desenharMusicas(obj) {
    
}


// Manipulação do DOM --> Ensaios
const addEnsaio = document.querySelector('#addEnsaios');

if (addEnsaio != null) {
    addEnsaio.addEventListener('click', function () {
        const templateForm = document.querySelector('#addEnsaios-template');
        const addEnsaioForm = templateForm.content.cloneNode(true);
        document.body.appendChild(addEnsaioForm);
        // Fechar janela
        document.querySelector('.close-crud').addEventListener('click', () => {
            const popup = document.querySelector('.pop-up');
            popup.remove();
        });
    });
}

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


