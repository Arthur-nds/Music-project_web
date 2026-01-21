import { salvarMusica } from "./services/musicaService.js";

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


