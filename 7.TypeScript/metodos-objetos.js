// METODOS Y OBJETOS
var Automovil = /** @class */ (function () {
    function Automovil() {
    }
    /**
     * mostrar: metodo para mostrar la marca del carro
     */
    Automovil.prototype.mostrar = function (callback) {
        this.a = 2024 - Number(this.modelo);
        var f = "Hola soy un ".concat(this.marca, ", modelo ").concat(this.modelo, ", tiene ").concat(this.a, " a\u00F1os de uso");
        // let json:any = {"año": `${this.a}`, "mensaje": f}
        callback(this.a, f);
        // return json;
    };
    return Automovil;
}());
// Objeto: es una entidad provista de metodos o mensajes a las cuales responde propiedades con valores concretos
var automovi = new Automovil();
automovi.marca = "Toyota";
automovi.modelo = "2015";
var callback = function (a, f) {
    console.log("Imprimiendo desde el callback: Manejando un entero: ".concat(a, " y un string: ").concat(f));
};
automovi.mostrar(callback);
// var automovi2 = new Automovil();
// automovi2.marca = "Mazda";
// automovi2.modelo = "2020";
// let info2:any = automovi2.mostrar();
// console.log(info2.mensaje, info2.año);
