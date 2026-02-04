/* export function formatarDataCurta(iso) {
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
} */

const meses = [
  "janeiro","fevereiro","março","abril","maio","junho",
  "julho","agosto","setembro","outubro","novembro","dezembro"
];

export function formatarDataExtenso(iso) {
  const [y, m, d] = iso.split("-");
  console.log(`y: ${y}`);
  return `&nbsp${Number(d)} de ${meses[Number(m) - 1]} de ${y}`;
}
