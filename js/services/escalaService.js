// import { deleteItem, gerarId, getItemId, listarItens, updateData } from "../api";
import { listarItens, salvar, deleteItem, getItemId, updateData, gerarId } from "../api.js";

class Escala {
    constructor(id, titulo, data, equipe, repertorio) {
        this.id = id;
        this.titulo = titulo;
        this.data = data;
        this.equipe = equipe;
        this.repertorio = repertorio;
    }

    getData() {
        return new Date(this.data);
    }

    getDataExtenso() {
        return this.getData().toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "long",
            year: "numeric"
        });
    }
}

export class EscalaService {
    static salvarEscala(titulo, data, equipe, repertorio) {
        const id = gerarId("escalas");
        const escala = new Escala(id, titulo, data, equipe, repertorio);
        salvar("escalas", escala);
    }

    static buscarObjetoEscala(id) {
        let item = getItemId("escalas", id);
        return structuredClone(item);
    }

    static updateEscala(id, titulo, data, equipe, repertorio) {
        const lista = listarItens("escalas");
        const item = lista.find((e) => {
            return e.id == id;
        });

        item.data = data;
        item.titulo = titulo;
        item.equipe = equipe;
        item.repertorio = repertorio;
        updateData("escalas", lista);
    }

    static deleteEscala(id) {
        const item = getItemId("escalas", id);
        deleteItem("escalas", item);
    }

}