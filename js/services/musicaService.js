import { salvar } from "../api.js";

export function salvarMusica(tituloMusica,linkCifra, tomMusic, linkLetra, nomeArtista, bpmMusica, linkOriginal) {

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

