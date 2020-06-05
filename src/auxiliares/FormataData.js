export const format = ( data ) => {
    const[ano,mes,dia] = data&&data.split("-");
    return `${dia}/${mes}/${ano}`;
}

export const format2 = ( data ) => {
    const[ano,mes,dia] = data&&data.split("-");
    return `${dia}-${mes}-${ano}`;
}

