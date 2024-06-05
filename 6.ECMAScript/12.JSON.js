console.log("##### JSON ######");
// Es un estandar basico para intercambio de informacion que se usa en muchos sistemas de manera plana
// Propiedades en comillas dobles " " y valores en comillas dobles " "


let json = {
    "squadName": "Super hero squad",
    "homeTown": "Metro City",
    "formed": 2016,
    "secretBase": "Super tower",
    "active": true,
    "members": [
      {
        "name": "Molecule Man",
        "age": 29,
        "secretIdentity": "Dan Jukes",
        "powers": ["Radiation resistance", "Turning tiny", "Radiation blast"]
      },
      {
        "name": "Madame Uppercut",
        "age": 39,
        "secretIdentity": "Jane Wilson",
        "powers": [
          "Million tonne punch",
          "Damage resistance",
          "Superhuman reflexes"
        ]
      },
      {
        "name": "Eternal Flame",
        "age": 1000000,
        "secretIdentity": "Unknown",
        "powers": [
          "Immortality",
          "Heat Immunity",
          "Inferno",
          "Teleportation",
          "Interdimensional travel"
        ]
      }
    ]
  }

  console.log(json);

// JSON.stringify: Tomar mi json o creacion de array y objetos y convertirlo en json para ser enviado a otras
// instacias clientes o servidor
// lo envia como cadena string

let enviar_json = JSON.stringify(json);

console.log(enviar_json);


// JSON.parse: Recibe un dato JSON que provenga de otras instancias cliente o servidor para convertirlos en JSON
// o arreglos y objetos


let convertir_json = JSON.parse(enviar_json);
console.log(convertir_json);