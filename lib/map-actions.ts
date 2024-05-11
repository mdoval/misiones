export async function obtenerCoordenadas(address: string) {    
    let url = `https://geocode.search.hereapi.com/v1/geocode?q=${address}&apiKey=RYtNOYrxkEouRjsbi1tgm3MF0f1UNUbs_rSnwUSE8y0`
    //console.log(url)
    const datos = await (await fetch(url)).json()
    return datos
}