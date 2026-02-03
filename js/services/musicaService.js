import { listarItens, salvar, deleteItem, getItemId, updateData, gerarId } from "../api.js";

// Representação do objeto musica
class Musica {
    constructor(id, titulo, cifra, tom, letra, artista, bpm, original) {
        this.id = id;
        this.titulo = titulo;
        this.cifra = "https://" + cifra;
        this.tom = tom;
        this.letra = "https://" + letra;
        this.artista = artista;
        this.bpm = bpm;
        this.original = "https://" + original;
    }
}

export class MusicaService {
    static salvarMusica(tituloMusica, linkCifra, tomMusic, linkLetra, nomeArtista, bpmMusica, linkOriginal) {
        const id = gerarId("musicas");
        const musica = new Musica(id, tituloMusica, linkCifra, tomMusic, linkLetra, nomeArtista, bpmMusica, linkOriginal);
        salvar("musicas", musica); // Guarda no LocalStorage
    }

    static deleteMusic(id) {
        // Regras de negócio
        // Em breve
        // Buscando elemento
        const item = getItemId("musicas",id);
        deleteItem("musicas",item)
        
    }

    static updateMusic(id, titulo, cifra, tom, letra, artista, bpm, original) {
        const lista = listarItens("musicas");
        const item = lista.find((m) => {
            return m.id == id;
        });
        console.log(`Lista antes do update: ${JSON.stringify(lista)}`);
        item.titulo = titulo;
        item.cifra = "https://" + cifra;
        item.tom = tom;
        item.letra = "https://" + letra;
        item.artista = artista;
        item.bpm = bpm;
        item.original = "https://" + original;
        console.log(`Lista depois do update: ${JSON.stringify(lista)}`);
        updateData("musicas", lista);

    }

    static buscarObjetoMusica(id) {
        // Solicitando objeto para LocalStorage
        let item = getItemId("musicas",id);
        return structuredClone(item);
    }
}


