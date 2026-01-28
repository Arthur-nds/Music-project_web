import { listarItens } from "./api.js";
import { salvarMusica } from "./services/musicaService.js";


// Buscando pela página atual
const thisPage = document.body.dataset.page;

// Gerando html de cada página
// -> Músicas
if (thisPage == "musicas") {
    initMusicPage();
} else if (thisPage == "ensaios") {
    initEnsaiosPage();
} else if (thisPage == "escalas") {
    initEscalasPage();
} else {
    window.alert(thisPage);
}


// Função que executa todo o script da página de músicas
// Manipulação do DOM --> musicas.html
function initMusicPage() {
    // Carregar músicas do LocalStorage
    let lista = listarItens("musicas");
    lista.forEach(musica => {
        carregarMusica(musica);
    });

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
    } else { return; }
}

function initEscalasPage() {
    const addEscala = document.querySelector('#addEscalas');
    if (addEscala) {
        addEscala.addEventListener('click', () => {
            const templateForm = document.querySelector('#addEscalas-template');
            renderForm(templateForm);
        });
    } else { return; }
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
        window.alert(e.target.closest(".crud-box").classList[1]);
        // Buscando pela classe do container .crud-box para saber o tipo de formulário(músicas,ensaios,escalas)
        let tipo = e.target.closest(".crud-box").classList[1];
        console.log(`Tipo CRUD: ${tipo}`);
        if(tipo == "form-add-music") {salvarMusica()}
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


function carregarMusica(musica) {
    // Clonando template
    const templateItem = document.querySelector('#itemMusic');
    const boxItem = templateItem.content.cloneNode(true);
    boxItem.querySelector('.music-title h3').innerHTML = musica.titulo;
    boxItem.querySelector('.music-title p').innerHTML = musica.nArtista;
    boxItem.querySelector('.music-info .tom').innerHTML = musica.tom.toUpperCase();
    boxItem.querySelector('.music-info .bpm').innerHTML = musica.bpm + " BPM";
    boxItem.querySelector('.music-links .cifra a').setAttribute("href", musica.lCifra);
    boxItem.querySelector('.music-links .letra a').setAttribute("href", musica.lLetra);
    boxItem.querySelector('.original-version').setAttribute("href", musica.lOriginal);
    document.querySelector('.music-list').appendChild(boxItem);

}
/*  
<article class="box-music item">
    <header class="music-title">
        <h3>Nome da música</h3>
        <p>Artista</p>
    </header>
    <div class="music-info">
        <span class="tom">C</span>
        <span class="bpm">60 BPM</span>
    </div>
    <div class="music-links">
        <h4>Links:</h4>
        <span class="cifra"><a href="#" target="_blank" rel="noopener noreferrer">Cifra</a></span>
        <span class="letra"><a href="#" target="_blank" rel="noopener noreferrer">Letra</a></span>
        <div class="original-version btn-view">
            <span class="material-symbols-outlined">open_in_new</span>
            Ver original
        </div>
    </div>
    <div class="edit-music">
        <button class="btn-item">Editar</button>
    </div>
</article>
*/


