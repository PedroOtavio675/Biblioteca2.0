

function dataValida(dataStr) {
  const [dia, mes, ano] = dataStr.split("/").map(Number);
  const data = new Date(ano, mes - 1, dia);
  return (
    data.getDate() === dia &&
    data.getMonth() === mes - 1 &&
    data.getFullYear() === ano
  );
}


export default dataValida