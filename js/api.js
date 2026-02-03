export function listarItens(ch) {
    const res = localStorage.getItem(ch);
    return JSON.parse(res);
}

export function salvar(ch, objeto) {
    let lista = listarItens(ch);
    if (lista == null) {
        lista = [];
    }
    lista.push(objeto);
    localStorage.setItem(ch, JSON.stringify(lista));
}

export function deleteItem(ch, item) {
    const lista = listarItens(ch); // Buscando array com objetos
    const novaLista = lista.filter((e) => {
        return e.id != item.id;
    });
    if (novaLista.lenght == 0) {
        localStorage.setItem(ch, "");
    } else {
        localStorage.setItem(ch, JSON.stringify(novaLista));
    }

}

export function updateData(ch, lista) {
    localStorage.setItem(ch, JSON.stringify(lista));
}

export function getItemId(ch, id) {
    const lista = listarItens(ch);
    const item = lista.find((e) => {
        return e.id == id;
    });
    return item;
}

export function gerarId(ch) {
    let lista = listarItens(ch);
    let id = 0;
    if (lista) { // Se lista != null (lista não vazia)
        lista.forEach(item => {
            if (id < item.id)
                id = item.id;
        });
    }
    return id + 1; // Retorna último ID + 1 =  próximo id
}

