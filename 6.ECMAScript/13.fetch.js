console.log("##### FETCH ######");
// Es una funcion que nos permite ejecutar servicios http: GET, POST, PUT, DELETE, PATCH


// http://calapi.inadiutorium.cz/api/v0/en/calendars/default

let get_api = () => {
    const endpoint = 'http://calapi.inadiutorium.cz/api/v0/en/calendars/default';
    const params = {
        method: "GET",
        header: {
            "Content-Type": "applications/json"
        }
    }

    fetch(endpoint, params).then(response => {
        return response.json();
        // console.log(response)
    }).then(result => {
        const resultado = result.sanctorale;
        // resultado.for
        console.log(resultado);
    })
}

get_api();