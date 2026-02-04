import { listarItens, salvar, deleteItem, getItemId, updateData, gerarId, historico } from "../api.js";

class Ensaio {
    constructor(id,titulo,data,local,horario,equipe,repertorio) {
        this.id = id;
        this.titulo = titulo;
        this.data = data;
        this.local = local;
        this.horario = horario;
        this.equipe = equipe;
        this.repertorio = repertorio;
    }
}

 export class EnsaioService {
    static salvarEnsaio(titulo,data,local,horario,equipe,repertorio) {
        const id = gerarId("ensaios");
        salvar("ensaios", new Ensaio(id,titulo,data,local,horario,equipe,repertorio));
        historico("ensaio", "c");
    }

    static deleteEnsaio(id) {
        // Pegando objeto da base de dados
        const item = getItemId("ensaios", id);
        deleteItem("ensaios", item);
    }

    static buscarObjetoEnsaio(id) {
        const item = getItemId("ensaios", id); // Buscando item no LocalStorage
        return structuredClone(item); // Gerando clone do objeto
    }

    static updateEnsaio(id,titulo,data,local,horario,equipe,repertorio) {
        const lista = listarItens("ensaios");
        const item = lista.find((e) => {
            return e.id == id;
        });
        item.titulo = titulo;
        item.data = data;
        item.local = local;
        item.horario = horario,
        item.equipe = equipe;
        item.repertorio = repertorio;
        updateData("ensaios", lista);
        historico("ensaio", "u");
    }
}