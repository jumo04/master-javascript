console.log("##### PROMISES() #####");

// Nos permite realizar operaciones asincronas, cuenta con 3 estados, 
// pending que es cuando se esta apenas esta pendiente la operacion, 
// resolve que indica que la operacion ya esta resuelta y 
// reject que indica que la operacion tuvo un error y no se pudo completar
// estos trabajos se ejecutan en un solo hilo apoyandose de libuv

let reserva_destino = [
    {
        id: 1,
        destino: "Miami"
    }, {
        id: 2,
        destino: "New York"
    }, {
        id: 3,
        destino: "Los Angeles"
    }
]


let reserva_dia = [
    {
        id: 1,
        dia: "Lunes"
    }, {
        id: 2,
        dia: "Martes"
    }, {
        id: 3,
        dia: "Miercoles"
    }
]

let reserva_asiento = [
    {
        id: 1,
        asiento: "Ventana"
    }, {
        id: 2,
        asiento: "Medio"
    }, {
        id: 3,
        asiento: "Pasillo"
    }
]

// Primera tarea: servervar el destino

let get_destino =  id => {
    return new Promise((resolve, reject) => {
        let destinoDB = reserva_destino.find(destino => destino.id === id)
        if (!destinoDB) {
            reject("No existe el destino seleccionado");
        }else{
            resolve(destinoDB);
        }
    });
}

// Segunda tarea: reservar el dia

let get_dia =  id => {
    return new Promise((resolve, reject) => {
        let diaDB = reserva_dia.find(dia => dia.id === id)
        if (!diaDB) {
            reject("No existe el dia seleccionado");
        }else{
            resolve(diaDB);
        }
    });
}

// Tercera tarea: reservar el asiento

let get_asiento =  id => {
    return new Promise((resolve, reject) => {
        let asientoDB = reserva_asiento.find(asiento => asiento.id === id)
        if (!asientoDB) {
            reject("No existe el asiento seleccionado");
        }else{
            resolve(asientoDB);
        }
    });
}


// Tareas sincronas, tareas que se ejecutan al mismo tiempo
// Tareas asincronas: Tareas que se ejejcutan en diferente tiempo en este caso una tarea espera la ejecucion de la otra


// respuesta de la tarea

get_destino(1).then(destinoDB => {
    console.log(`tu destino sera: ${destinoDB.destino}`);
    // respuesta de la tarea 2

    get_dia(2).then(diaDB => {
        console.log(`tu dia sera: ${diaDB.dia}`);
        // respuesta de la tarea 2

        get_asiento(1).then(asientoDB => {
            console.log(`tu asiento sera: ${asientoDB.asiento}`);
        }).catch(err =>{
            console.log("error:", err);
        })

    }).catch(err =>{
        console.log("error:", err);
    })

}).catch(err =>{
    console.log("error:", err);
});

    

