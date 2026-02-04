import { countItens, listarItens } from "./api.js";
import { MusicaService } from "./services/musicaService.js";
import { EnsaioService } from "./services/ensaioService.js";
import { EscalaService } from "./services/escalaService.js";
import { diasAte, formatarDataExtenso } from "./dataUtils.js";


// Buscando pela página atual
const thisPage = document.body.dataset.page;
let musicasSelecionadas = []; // vetor usado na motagem de repertório

// Verifica se música já foi selecionada e, se não, adiciona
function insertMusicaSelecionadas(obj) {
    const resultado = musicasSelecionadas.some(musica => {
        return musica.id == obj.id;
    });
    return resultado;
}

// Remove música selecionada
function removeMusicaSelecionada(obj) {
    console.log(`musicasSelecionadas antes da remoção: ${JSON.stringify(structuredClone(musicasSelecionadas))}`);
    musicasSelecionadas = musicasSelecionadas.filter(musica => {
        return musica.id != obj.id;
    });

    console.log(`musicasSelecionadas depois da remoção: ${JSON.stringify(musicasSelecionadas)}`);
}

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

    // Buscar músicas
    const inputTxt = document.querySelector('#musicName');
    inputTxt.addEventListener('input', () =>{
        // console.log(inputTxt.value);
        const termo = inputTxt.value.toLowerCase().trim();
        pesquisaMusicas(termo);
    });

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
    listaEnsaios.addEventListener('click', (e) => {
        const targetButton = e.target.closest('button');
        if (targetButton) { // targetButton != null
            const idEnsaio = targetButton.closest('.item').dataset.id;
            const action = targetButton.dataset.action;
            if (action == "deletar") {
                EnsaioService.deleteEnsaio(idEnsaio);
                carregarEnsaio();
            } else {
                openUpdateEnsaio(idEnsaio);
                carregarEnsaio();
            }
        }
    });
}

// Load Escalas page
function initEscalasPage() {
    const container = document.querySelector('.lista-escalas');
    const addEscala = document.querySelector('#addEscalas');

    // Carregando escalas
    carregarEscala();

    // Adicionar nova escala
    if (addEscala) {
        addEscala.addEventListener('click', () => {
            const templateForm = document.querySelector('#addEscalas-template');
            renderForm(templateForm, "addEscala");
        });
    } else { return; }

    // Ações de edifação
    container.addEventListener('click', (e) => {
        const targetButton = e.target.closest('button');
        if (targetButton) { // targetButton != null
            const idEscala = targetButton.closest('.item').dataset.id;
            const action = targetButton.dataset.action;
            if (action == "deletar") {
                EscalaService.deleteEscala(idEscala);
                carregarEscala();
            } else {
                openUpdateEscala(idEscala);
                carregarEscala();
            }
        }
    });
}




//Carregando home
function initHomePage() {
    // Carregar escalas da semana
    carregarEscalasSemana();

    // Carregando ensaios da semana
    carregarEnsaiosSemana();

    // Carregar histórico
    carregarHistorico();

    // Contagem dos cards
    contagem()
}

function pesquisaMusicas(termo) {
    // Pegando lista completa
    const listaCompleta = listarItens("musicas");
    const listaFiltrada = listaCompleta.filter(musica => {
        return musica.titulo.toLowerCase().includes(termo);
    });

    // console.log(`Lista filtrada: ${JSON.stringify(listaFiltrada)}`);
    carregarMusicList(listaFiltrada);
}


function carregarPesquisa(lista) {

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

    if (!modo.includes("Music")) {
        musicasSelecionadas = []; // Limpando array de músicas
        const boxList = document.querySelector('.boxList');
        document.querySelector('#repertorio').addEventListener('input', (e) => {
            const inputTxt = e.target;
            listarRepertorio(boxList, inputTxt.value);
        });
        boxList.addEventListener('click', (e) => {
            const itemTarget = e.target.closest('.itemList');
            adicionarMusica(itemTarget.dataset.id);
        });

    }

    // Salvar / Interação com services
    document.querySelector('#save').addEventListener('click', (e) => {
        // Defindo o que será feito
        submitForm(modo);
        // Remove o modal
        const popup = document.querySelector('.pop-up');
        popup.remove();
    });

}

function listarRepertorio(container, txt) {
    container.innerHTML = '';
    // Buscar lista de músicas
    const lista = listarItens("musicas");
    if (lista != null && lista.length > 0) {
        const listaFiltrada = lista.filter((musica) => {
            return musica.titulo.toLowerCase().includes(txt.toLowerCase());
        });
        // console.log(`Lista filtrada: ${JSON.stringify(listaFiltrada)}`);
        // <span class="itemList"> Nome da Música - Artista</span>
        listaFiltrada.forEach(m => {
            const templateItem = document.querySelector('#itemListTemplate');
            const boxItem = templateItem.content.cloneNode(true);
            boxItem.querySelector('.itemList').dataset.id = m.id;
            boxItem.querySelector('.titleRepertorio').innerHTML = m.titulo;
            boxItem.querySelector('.artistaRepertorio').innerHTML = m.artista;
            container.appendChild(boxItem);
        });
    } else {
        container.innerHTML = `Nenhuma música foi adicionada.`;
    }
}

// Adiciona músicas na lista de músicas selecionadas (UI)
function adicionarMusica(id) {
    // console.log(`id clicado: ${id}`);
    // Buscando objeto musica
    const musica = MusicaService.buscarObjetoMusica(id);
    // Buscando container de músicas selecionadas (boxRes)
    const container = document.querySelector('.boxRes');
    // se a música ainda não foi selecionada --> adiciona
    if (!insertMusicaSelecionadas(musica)) {
        // Inserindo do array 
        musicasSelecionadas.push(musica);

        //Pegando template
        const templateItem = document.querySelector('#itemBoxRes');
        const item = templateItem.content.cloneNode(true);
        // console.log(`musicasSelecionadas: ${JSON.stringify(musicasSelecionadas)}`);
        item.querySelector('.musicSelected').dataset.id = musica.id;
        item.querySelector('.musicSelected').innerHTML = `${musica.titulo} - ${musica.artista}`;
        container.appendChild(item);
    }

    // Remover item
    container.addEventListener('click', (e) => {
        const itemMusica = e.target.closest('.musicSelected');
        if (itemMusica != null) {
            // Removendo das musicasSelecionadas
            const idMusica = itemMusica.dataset.id;
            const objMusica = MusicaService.buscarObjetoMusica(idMusica);
            console.log(`Objeto que será removido: ${objMusica}`);
            removeMusicaSelecionada(objMusica);
            //removendo do html
            itemMusica.remove()
        }
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
    } else if (modo == "editEnsaio") {
        closeUpdateEnsaio();
        carregarEnsaio();
    } else if (modo == "addEscala") {
        insertIntoEscalasDB();
        carregarEscala();
    } else {
        closeUpdateEscala();
        carregarEscala();
    }
}

function carregarMusicList(lista = "") {
    const musicList = document.querySelector('.music-list');
    musicList.innerHTML = '';
    // Carregar músicas do LocalStorage
    if (lista == "") {
        lista = listarItens("musicas");
    }
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
            boxItem.querySelector('#data-marcada').innerHTML = formatarDataExtenso(ensaio.data);
            boxItem.querySelector('#local-marcado').innerHTML = '&nbsp;' + ensaio.local;
            boxItem.querySelector('#horario').innerHTML = '&nbsp;' + ensaio.horario;
            boxItem.querySelector('.equipe-list').innerHTML = ensaio.equipe;
            ensaio.repertorio.forEach(idMusica => {
                // Pegando cópia do objeto
                const musica = MusicaService.buscarObjetoMusica(idMusica);
                console.log(MusicaService.buscarObjetoMusica(musica));
                const itemRepertorio = document.querySelector('#itemRepertorio').content.cloneNode(true);
                console.log(`musica.titulo => ${musica.titulo}`);
                itemRepertorio.querySelector('p').innerHTML = musica.titulo;
                itemRepertorio.querySelector('.tom').innerHTML = musica.tom;
                itemRepertorio.querySelector('.bpm').innerHTML = musica.bpm;
                // Adicionando no container
                boxItem.querySelector('.repertorio .lista').appendChild(itemRepertorio);
            });

            // boxItem.querySelector('.repertorio').innerHTML = ensaio.repertorio;
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

function carregarEscala() {
    const listaEscalas = document.querySelector('.lista-escalas');
    listaEscalas.innerHTML = '';
    const lista = listarItens("escalas");
    if (lista != null && lista.length > 0) {
        lista.forEach((escala) => {
            const templateItem = document.querySelector('#itemEscala');
            const boxItem = templateItem.content.cloneNode(true);
            boxItem.querySelector('.item').dataset.id = escala.id;
            boxItem.querySelector('.item .titulo').innerHTML = escala.titulo;
            boxItem.querySelector('.item .data').innerHTML = formatarDataExtenso(escala.data);
            boxItem.querySelector('.lista-equipe').innerHTML = escala.equipe;
            // console.log('escala.repertorio: ' + escala.repertorio);
            escala.repertorio.forEach(idMusica => {
                // Pegando cópia do objeto
                console.log(`id música: ${idMusica}`)
                const musica = MusicaService.buscarObjetoMusica(idMusica);
                // console.log('Objeto música: ' + MusicaService.buscarObjetoMusica(idMusica));
                const itemRepertorio = document.querySelector('#itemRepertorio').content.cloneNode(true);
                // console.log(`musica.titulo => ${musica.titulo}`);
                itemRepertorio.querySelector('p').innerHTML = musica.titulo;
                itemRepertorio.querySelector('.tom').innerHTML = musica.tom;
                itemRepertorio.querySelector('.bpm').innerHTML = musica.bpm;
                // Adicionando no container
                boxItem.querySelector('.repertorio .lista').appendChild(itemRepertorio);
            });
            // boxItem.querySelector('.lista-repertorio').innerHTML = escala.repertorio;
            listaEscalas.appendChild(boxItem);
        });
    } else {
        listaEscalas.innerHTML = `
            <div class="emptyList">
                <span class="material-symbols-outlined">calendar_check</span>
                <p>Nenhuma escala foi adicionada ainda!</p>
            </div>
        `;
    }
}

function carregarEscalasSemana() {
    const listaEscalas = document.querySelector('.escalas .itens');
    const listaCompleta = listarItens("escalas");
    if (listaCompleta != null && listaCompleta.length > 0) {
        const lista = listaCompleta.filter((e) => {
            return diasAte(e.data) <= 7;
        });
        lista.forEach(escala => {
            let tempo = diasAte(escala.data);
            if (tempo <= 7) {
                const templateItem = document.querySelector('#itemEscalaHome');
                const boxItem = templateItem.content.cloneNode(true);
                boxItem.querySelector('.item-title').innerHTML = escala.titulo;
                boxItem.querySelector('.item-time-count').innerHTML = tempo + " dia(s)";
                listaEscalas.appendChild(boxItem);
            }
        });
    } else {
        listaEscalas.innerHTML = `
            <div class="emptyList">
                <span class="material-symbols-outlined">calendar_check</span>
                <p>Nenhuma escala dentro de 1 semana!</p>
            </div>
        `;
    }
}

function carregarEnsaiosSemana() {
    const listaEnsaios = document.querySelector('.ensaios .itens');
    const listaCompleta = listarItens("ensaios");

    if (listaCompleta != null && listaCompleta.length > 0) {
        const lista = listaCompleta.filter((e) => {
            return diasAte(e.data) <= 7;
        });
        console.log(JSON.stringify(lista));
        lista.forEach(ensaio => {
            let tempo = diasAte(ensaio.data);
            if (tempo <= 7) {
                const templateItem = document.querySelector('#itemEnsaioHome');
                const boxItem = templateItem.content.cloneNode(true);
                boxItem.querySelector('.item-title').innerHTML = ensaio.titulo;
                boxItem.querySelector('.item-time-count').innerHTML = tempo + " dia(s)";
                boxItem.querySelector('.horario-marcado').innerHTML = ensaio.horario;
                boxItem.querySelector('.data-marcada').innerHTML = formatarDataExtenso(ensaio.data);
                listaEnsaios.appendChild(boxItem);
            }
        });
    } else {
        listaEnsaios.innerHTML = `
            <div class="emptyList">
                <span class="material-symbols-outlined">event_available</span>
                <p>Nenhum ensaio marcado dentro de 1 semana!</p>
            </div>
        `;
    }
}

function carregarHistorico() {
    const historico = listarItens("historico");
    const listaHistorico = document.querySelector('.notifications .itens');
    if (historico != null && historico.length > 0) {
        historico.forEach(h => {
            const templateItem = document.querySelector('#templateHistorico');
            const boxItem = templateItem.content.cloneNode(true);
            boxItem.querySelector('.item-title').innerHTML = h;
            listaHistorico.append(boxItem);
        });
    } else {
        listaHistorico.innerHTML = `
            <div class="emptyList">
                <span class="material-symbols-outlined">contract_edit</span>
                <p>Nenhuma modificação registrada.</p>
            </div>
        `;
    }
}

function contagem() {
    const cards = document.querySelectorAll('.cards article');
    cards.forEach(card => {
        // Tipo de card
        const tipo = card.dataset.tipo;
        console.log(`Tipo: ${tipo}`);
        card.querySelector('.card-cont').innerHTML = countItens(tipo);
    });
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
    dados[5] = getRepertorio();
    EnsaioService.salvarEnsaio(dados[0], dados[1], dados[2], dados[3], dados[4], dados[5]);
}

function insertIntoEscalasDB() {
    // Pegando dados do formulário
    const dados = getDataForm();
    console.log(getRepertorio());
    dados[3] = getRepertorio();
    EscalaService.salvarEscala(dados[0], dados[1], dados[2], dados[3]);
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
    document.querySelector('.crud-box header h2').innerHTML = 'Editar música'
}

function closeUpdateMusic() {
    // Pegando id da música
    const idEditado = document.querySelector('.crud-box form').dataset.idEdited;
    const dados = getDataForm();
    MusicaService.updateMusic(idEditado, dados[0], dados[1], dados[2], dados[3], dados[4], dados[5], dados[6]);
}

function openUpdateEnsaio(idEnsaio) {
    // Buscando objeto correspondente ao Ensaio
    const ensaioEditado = EnsaioService.buscarObjetoEnsaio(idEnsaio);
    // Gerando forms
    const templateForm = document.querySelector('#addEnsaios-template');
    renderForm(templateForm, "editEnsaio");
    fillFormEnsaio(ensaioEditado);
    // Colocando id do ensaio editado no dataset do formulário
    document.querySelector('.crud-box form').dataset.idEdited = idEnsaio;
    document.querySelector('.crud-box header h2').innerHTML = 'Editar ensaio'
}

function closeUpdateEnsaio() {
    const idEnsaio = document.querySelector('.crud-box form').dataset.idEdited;
    const dados = getDataForm();
    dados[5] = getRepertorio();
    EnsaioService.updateEnsaio(idEnsaio, dados[0], dados[1], dados[2], dados[3], dados[4], dados[5]);
}

function openUpdateEscala(idEscala) {
    // BUscando objeto
    const escalaEditada = EscalaService.buscarObjetoEscala(idEscala);
    console.log(`escalaEditada: ${JSON.stringify(escalaEditada)}`);
    //Gerando forms
    const templateForm = document.querySelector('#addEscalas-template');
    renderForm(templateForm, "editEscalas");
    fillFormEscala(escalaEditada);
    // Colocando id do ensaio editado no dataset do formulário
    document.querySelector('.crud-box form').dataset.idEdited = idEscala;
    document.querySelector('.crud-box header h2').innerHTML = 'Editar escala'
}

function closeUpdateEscala() {
    const idEscala = document.querySelector('.crud-box form').dataset.idEdited;
    const dados = getDataForm();
    dados[3] = getRepertorio();
    EscalaService.updateEscala(idEscala, dados[0], dados[1], dados[2], dados[3], dados[4]);
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

function fillFormEnsaio(obj) {
    document.querySelector('#titleEnsaio').value = obj.titulo;
    document.querySelector('#dataEnsaio').value = obj.data;
    document.querySelector('#localEnsaio').value = obj.local;
    document.querySelector('#horarioEnsaio').value = obj.horario;
    document.querySelector('#equipeEnsaio').value = obj.equipe;
    obj.repertorio.forEach(idMusica => {
        adicionarMusica(idMusica);
    });
    // document.querySelector('#repertorio').value = obj.repertorio;
}

function fillFormEscala(obj) {
    document.querySelector('#titleEscala').value = obj.titulo;
    document.querySelector('#dataEscala').value = obj.data;
    document.querySelector('#equipeEscala').value = obj.equipe;
    obj.repertorio.forEach(idMusica => {
        adicionarMusica(idMusica);
    });
}

function getDataForm() {
    // Buscando dados
    let data = [];
    document.querySelectorAll('.crud-box input').forEach(inputElement => {
        data.push(inputElement.value);
    });

    return data;
}

function getRepertorio() {
    const idsRepertorio = [];
    musicasSelecionadas.forEach(musica => {
        idsRepertorio.push(musica.id);
    });
    return idsRepertorio;
}



