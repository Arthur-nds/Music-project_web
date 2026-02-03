import { listarItens, salvar, deleteItem, getItemId, updateData, gerarId } from "../api.js";

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
        salvar("ensaios", new Ensaio(id,titulo,data,local,horario,equipe,repertorio))
    }

    static deleteEnsaio(id) {
        // Pegando objeto da base de dados
        const item = getItemId("ensaios", id);
        deleteItem("ensaios", item);
    }
}