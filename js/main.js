import { listarItens } from "./api.js";
import { MusicaService } from "./services/musicaService.js";
import { EnsaioService } from "./services/ensaioService.js";


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
    const container = document.querySelector('.music-list'); // Lista com todas as músicas (aplicando ideia de bubbling)
    const addMusic = document.querySelector("#addMusic"); // Botão "Adicionar música"

    //Carregando lista de músicas
    carregarMusicList();

    // Adicionar músicas
    if (addMusic != null) {
        addMusic.addEventListener('click', () => {
            const templateForm = document.querySelector('#addMusic-template');
            renderForm(templateForm, "addMusic");
        });
    } else { return; } // Evitando crash

    // Ações que modificam música ("métodos" do objeto musica)
    container.addEventListener('click', (e) => {
        const targetButton = e.target.closest('button');
        if (targetButton) { // Evita erro caso o elemento clicado não seja um botão
            const action = targetButton.dataset.action;
            // Buscando id da música clicada
            const idMusica = targetButton.closest('.item').dataset.id;
            if (action == 'deletar') {
                MusicaService.deleteMusic(idMusica);
                carregarMusicList();
            } else { // Só pode ser "editar"
                // Chamando edição da música
                openUpdateMusic(idMusica);
                carregarMusicList();
            }
        }
    });

}

// Load Ensaios page
function initEnsaiosPage() {
    const listaEnsaios = document.querySelector('.lista-ensaios');
    const addEnsaio = document.querySelector('#addEnsaios'); // Botão de adicionar ensaio

    carregarEnsaio();
    // Adicionar música
    if (addEnsaio) {
        addEnsaio.addEventListener('click', () => {
            const templateForm = document.querySelector('#addEnsaios-template');
            renderForm(templateForm, "addEnsaio");
        });
    } else { return; }

    // Modificações em ensaios
    listaEnsaios.addEventListener('click', (e)=> {
        const targetButton = e.target.closest('button');
        const idEnsaio = targetButton.closest('.item').dataset.id;
        if (targetButton) { // targetButton != null
            const action = targetButton.dataset.action;
            if (action == "deletar") {
                EnsaioService.deleteEnsaio(idEnsaio);
                carregarEnsaio();
            }
        }
    });
}






// Load Escalas page
function initEscalasPage() {
    const addEscala = document.querySelector('#addEscalas');
    if (addEscala) {
        addEscala.addEventListener('click', () => {
            const templateForm = document.querySelector('#addEscalas-template');
            renderForm(templateForm, "addEscala");
        });
    } else { return; }
}




//Carregando home
function initHomePage() {
    // ...
}






// Formulários CRUD
function renderForm(templateForm, modo) { // (template/itemBox, save/edit)
    const formulario = templateForm.content.cloneNode(true);
    formulario.querySelector('form').dataset.modo = modo;
    document.body.appendChild(formulario);
    // Fechar janela
    document.querySelector('.close-crud').addEventListener('click', () => {
        const popup = document.querySelector('.pop-up');
        popup.remove();
    });
    // Salvar / Interação com services
    document.querySelector('#save').addEventListener('click', (e) => {
        // Defindo o que será feito
        submitForm(modo);
        // Remove o modal
        const popup = document.querySelector('.pop-up');
        popup.remove();
    });

}

function submitForm(modo) {
    if (modo == "addMusic") {
        // Salvando musica....
        insertIntoMusicDB();
        carregarMusicList();
    } else if (modo == "editMusic") {
        closeUpdateMusic();
        carregarMusicList();
    }
    else if (modo == "addEnsaio") {
        insertIntoEnsaiosDB();
        carregarEnsaio();
    } else if (modo == "addEscala") {
        console.log('addEscala');
    }
}

function carregarMusicList() {
    const musicList = document.querySelector('.music-list');
    musicList.innerHTML = '';
    // Carregar músicas do LocalStorage
    let lista = listarItens("musicas");
    console.log(`Lista antes do forEach: ${JSON.stringify(lista)}`);
    console.log(`lista == null ${lista == null}`);
    if (lista != null && lista.length != 0) {
        lista.forEach(musica => {
            // Clonando template
            const templateItem = document.querySelector('#itemMusic');
            const boxItem = templateItem.content.cloneNode(true);
            // Colocando valores o objeto no template
            boxItem.querySelector('.item').dataset.id = musica.id;
            boxItem.querySelector('.music-title h3').innerHTML = musica.titulo;
            boxItem.querySelector('.music-title p').innerHTML = musica.artista;
            boxItem.querySelector('.music-info .tom').innerHTML = musica.tom.toUpperCase();
            boxItem.querySelector('.music-info .bpm').innerHTML = musica.bpm + " BPM";
            boxItem.querySelector('.music-links .cifra a').setAttribute("href", musica.cifra);
            boxItem.querySelector('.music-links .letra a').setAttribute("href", musica.letra);
            boxItem.querySelector('.original-version').setAttribute("href", musica.original);
            musicList.appendChild(boxItem);
        });
    }
    else {
        musicList.innerHTML = `
            <div class="emptyList">
                <span class="material-symbols-outlined">music_off</span>
                <p>Nenhuma música foi adicionada ainda!</p>
            </div>
        `;
    }
}

function carregarEnsaio() {
    const listaEnsaios = document.querySelector('.lista-ensaios');
    listaEnsaios.innerHTML = ''; // container de ensaios
    const lista = listarItens("ensaios"); // Lista de ensaios da base de dados
    if (lista != null && lista.length > 0) {
        lista.forEach(ensaio => {
            // Clonando template
            const templateItem = document.querySelector('#itemEnsaio');
            const boxItem = templateItem.content.cloneNode(true);
            boxItem.querySelector('.item').dataset.id = ensaio.id;
            boxItem.querySelector('header h2').innerHTML = ensaio.titulo;
            boxItem.querySelector('#data-marcada').innerHTML = ensaio.data;
            boxItem.querySelector('#local-marcado').innerHTML = ensaio.local;
            boxItem.querySelector('#horario').innerHTML = ensaio.local;
            boxItem.querySelector('.equipe-list').innerHTML = ensaio.equipe;
            boxItem.querySelector('.repertorio').innerHTML = ensaio.repertorio;
            listaEnsaios.appendChild(boxItem);
        });
    } else {
        listaEnsaios.innerHTML = `
            <div class="emptyList">
                <span class="material-symbols-outlined">event_available</span>
                <p>Nenhum ensaio foi adicionado ainda!</p>
            </div>
        `;
    }
}

// Get data music from form and call salvarMusica(...)
function insertIntoMusicDB() {
    // Pegando dados do formulário
    const dados = getDataForm();
    MusicaService.salvarMusica(dados[0], dados[1], dados[2], dados[3], dados[4], dados[5], dados[6]);
}

function insertIntoEnsaiosDB() {
    // Pegando dados do formulário
    const dados = getDataForm();
    EnsaioService.salvarEnsaio(dados[0], dados[1], dados[2], dados[3], dados[4], dados[5]);
}


function openUpdateMusic(idMusica) {
    // Pedindo música para o service
    const musicaEditada = MusicaService.buscarObjetoMusica(idMusica);
    // console.log(`MusicaService.buscarObjetoMusica(idMusica) == ${JSON.stringify(musicaEditada)}`);

    // Carregando formulário
    const templateForm = document.querySelector('#addMusic-template');
    renderForm(templateForm, "editMusic");
    fillFormMusic(musicaEditada);
    // Colocando o id da música no dataset do formulário
    document.querySelector('.crud-box form').dataset.idEdited = idMusica;
}

function closeUpdateMusic() {
    // Pegando id da música
    const idEditado = document.querySelector('.crud-box form').dataset.idEdited;
    const dados = getDataForm();
    MusicaService.updateMusic(idEditado, dados[0], dados[1], dados[2], dados[3], dados[4], dados[5], dados[6]);
}

function fillFormMusic(obj) {
    document.querySelector('#titleMusic').value = obj.titulo;
    document.querySelector('#linkCifra').value = obj.cifra;
    document.querySelector('#tomMusic').value = obj.tom;
    document.querySelector('#linkLetra').value = obj.letra;
    document.querySelector('#nomeArtista').value = obj.artista;
    document.querySelector('#bpmMusica').value = obj.bpm;
    document.querySelector('#linkOriginal').value = obj.original;
}

function getDataForm() {
    // Buscando dados
    let data = [];
    document.querySelectorAll('.crud-box input').forEach(inputElement => {
        data.push(inputElement.value);
    });

    return data;
}



