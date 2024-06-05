let cursos = [{
    titulo: "Aprende Javascript",
    nivel: "Basico"
},
{
    titulo: "Aprende ECMAScript",
    nivel: "intermedio"
},
{
    titulo: "Aprende Angular",
    nivel: "Avanzado"
}]

console.log("###  FOR ###");

for (let i = 0; i < cursos.length; i++) {
    console.log(cursos[i].titulo);

    if (i > 0) {
        break;
    }
}

console.log("###  FOREACH ###");

// Es una reduccion del codigo del ciclo FOR y para interrumpirlo se debe de colocar en primera instancia el return.

cursos.forEach((curso, index)=> {
    if (index > 0) {
        return;
    }
    console.log(curso.titulo);
    
});