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
    initHomePage();
}


// Função que executa todo o script da página de músicas
// Manipulação do DOM --> musicas.html
function initMusicPage() {
    // Carregar músicas do LocalStorage
    carregarMusica();

    // Adicionar músicas
    const addMusic = document.querySelector("#addMusic");
    if (addMusic != null) {
        addMusic.addEventListener('click', () => {
            const templateForm = document.querySelector('#addMusic-template');
            renderForm(templateForm);
        });
    } else { return; } // Evitando crash
}





// Load Ensaios page
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






// Load Escalas page
function initEscalasPage() {
    const addEscala = document.querySelector('#addEscalas');
    if (addEscala) {
        addEscala.addEventListener('click', () => {
            const templateForm = document.querySelector('#addEscalas-template');
            renderForm(templateForm);
        });
    } else { return; }
}




//Carregando home
function initHomePage() {
    // ...
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
        if(tipo == "form-add-music") {
            // Buscando dados
            let tituloMusica = document.querySelector('#titleMusic').value;
            let linkCifra = document.querySelector('#linkCifra').value;
            let tomMusic = document.querySelector('#tomMusic').value;
            let linkLetra = document.querySelector('#linkLetra').value;
            let nomeArtista = document.querySelector('#nomeArtista').value;
            let bpmMusica = parseInt(document.querySelector('#bpmMusica').value);
            let linkOriginal = document.querySelector('#linkOriginal').value;
            salvarMusica(tituloMusica, linkCifra, tomMusic, linkCifra, linkLetra, nomeArtista, bpmMusica, linkOriginal); 
            carregarMusica()
        }
        else if(tipo == "form-add-ensaio") {salvarEnsaio(); carregarEnsaio();}
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


function carregarMusica() {
    const musicList = document.querySelector('.music-list');
    musicList.innerHTML = ''; // Limpando lista para carregar todas as músicas
    let lista = listarItens("musicas");
    if(lista) {
        lista.forEach(musica => {
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
            musicList.appendChild(boxItem);
        });
    }
    

}



