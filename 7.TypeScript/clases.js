// CLASE: es un modelo que se usa para crear objetos que comparte un mismo sistema puede tener atributos y metodos
var Propiedades = /** @class */ (function () {
    // el contructor se utiliza para asignar un valor inicial a las propiedades o hacer algo
    // el constructor es lo que inicia el objeto
    function Propiedades() {
        this.texto = "Palabra";
        console.log("texto:", this.texto);
        this.numero = 5;
        this.boleana = true;
        this.arreglo = ["texto1", "texto2", 0, true];
        this.cualquiera = { "p1": "valor1", "p2": "valor2", "p3": "valor3" };
    }
    return Propiedades;
}());
var objeto = new Propiedades();
