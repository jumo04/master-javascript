// METODOS Y OBJETOS

class Automovil {

    public marca:string;
    public modelo:string;

    // METODO: es el algoritmo asociado a un objeto que indica la capacidad de lo que este puede hacer
    // la unica diferencia entre metodo y funcion es que llamamos metodos a las funciones de una clase o
    // de un objeto en la programacion orientada a objetos mientras que las funciones son algoritmos de la programacio
    // estructurada
    public a:number;

    
    /**
     * mostrar: metodo para mostrar la marca del carro
     */
    public mostrar(callback: (a:number, f:string) => void) {
        this.a = 2024 - Number(this.modelo); 
        let f:string = `Hola soy un ${this.marca}, modelo ${this.modelo}, tiene ${this.a} años de uso`;
        // let json:any = {"año": `${this.a}`, "mensaje": f}
        callback(this.a, f);
        // return json;
    }
 
}
//para crear el tipo callback typescript es muy tipado por eso el nombre de type. pero en javascript que es un leguaje poco tipado
type CallbackFunction = (result: string) => void;

// Objeto: es una entidad provista de metodos o mensajes a las cuales responde propiedades con valores concretos

var automovi = new Automovil();
automovi.marca = "Toyota";
automovi.modelo = "2015";
const callbacks = (a:number, f:string) =>{
    console.log(`Imprimiendo desde el callback: Manejando un entero: ${a} y un string: ${f}`);
}
automovi.mostrar(callbacks);


// var automovi2 = new Automovil();
// automovi2.marca = "Mazda";
// automovi2.modelo = "2020";
// let info2:any = automovi2.mostrar();
// console.log(info2.mensaje, info2.año);
