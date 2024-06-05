console.log("##### CALLBACKS() #####");

// Es una funcion que se ejecuta cuando algo sucede en otra funcion

let paises = [
    {
    id: 1,
    pais: "Argentina",
    continente: "Suramerica"
    },{
        id: 2,
        pais: "Colombia",
        continente: "Suramerica"
    },{
        id: 3,
        pais: "Mexico",
        continente: "Centroamerica"
    }
]

let tomarPais = (id, callback) =>{
    let id_pais = paises.find(pais =>{
        return pais.id === id;
    })

    if (!id_pais) {
        callback("No existe pais en la BD")
    }else{
        callback(null, id_pais);
    }
}

tomarPais(4, (err, res) =>{
    if (err) {
        return console.log(err);
    }
    console.log(res);
})