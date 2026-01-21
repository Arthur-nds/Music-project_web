import { salvar } from "../api.js";

export function salvarMusica() {
    const formulario = document.querySelector('.form-add-music.form');
    let tituloMusica = document.querySelector('#titleMusic').value;
    let linkCifra = document.querySelector('#linkCifra').value;
    let tomMusic = document.querySelector('#tomMusic').value;
    let linkLetra = document.querySelector('#linkLetra').value;
    let nomeArtista = document.querySelector('#nomeArtista').value;
    let bpmMusica = parseInt(document.querySelector('#bpmMusica').value);
    let linkOriginal = document.querySelector('#linkOriginal').value;

    let musica = {
        titulo: tituloMusica,
        lCifra: linkCifra,
        tom: tomMusic,
        lLetra: linkLetra,
        nArtista: nomeArtista,
        bpm: bpmMusica,
        lOriginal: linkOriginal
    }
    salvar("musicas", musica);
}

