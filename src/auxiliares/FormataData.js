export const format = ( data ) => {
    const[ano,mes,dia] = data.split("-");
    return `${dia}/${mes}/${ano}`;
}