// Manipulação do DOM --> musicas.html
const addMusic = document.querySelector("#addMusic");

addMusic.addEventListener('click', () => {
    const templateForm = document.querySelector('#addMusic-template');
    const addMusicForm = templateForm.content.cloneNode(true);
    document.body.appendChild(addMusicForm);
    document.querySelector('.close-crud').addEventListener('click', () => {
        const popup = document.querySelector('.pop-up');
        popup.remove();
    });
});

