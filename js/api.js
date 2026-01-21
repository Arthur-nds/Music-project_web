/* const btn = document.querySelector('#teste');

btn.addEventListener('click', () =>{
    window.alert('.')
    let lista = [];
    let musica = {
        id: 1,
        titulo: "Ousado Amor",
        artista: "Isaías Saad"
    }

    lista.push(musica)
    let musica2 = {
        id: 2,
        titulo: "Me Ama",
        artista: "Diante do Trono"
    }
    lista.push(musica2);
    console.log(lista);
    localStorage.setItem('musicas', JSON.stringify(lista));
}); */
export function buscarLista(ch) {
    let res = localStorage.getItem(ch);
    return JSON.parse(res);
}

export function salvar(ch, objeto) {
    let lista = buscarLista(ch);
    if(lista == null){
        lista = [];
    }
    lista.push(objeto);
    localStorage.setItem(ch, JSON.stringify(lista));
}

