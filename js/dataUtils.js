export function diasAte(iso) {
    const [y, m, d] = iso.split("-").map(Number);
    const dataAlvo = new Date(y, m - 1, d); // sem timezone
    const hoje = new Date();
    const hojeSemHora = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate());
    const diff = dataAlvo - hojeSemHora;
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
}


const meses = [
    "janeiro", "fevereiro", "março", "abril", "maio", "junho",
    "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"
];

export function formatarDataExtenso(iso) {
    const [y, m, d] = iso.split("-");
    return `&nbsp${Number(d)} de ${meses[Number(m) - 1]} de ${y}`;
}
