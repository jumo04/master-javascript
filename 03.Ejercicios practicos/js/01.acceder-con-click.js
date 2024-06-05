/********
 * 
 * OBJETO CON LAS PROPIEDADES DE LA CALCULADORA
 */

    var p = {

        teclas: document.querySelectorAll("#calculator ul li"),
        action: null
    }



/*******
 * 
 * OBJETO CON LOS METODOS DE LA CALCULADORA
 * 
 */

var m = {

    start: function(){

        for (var i = 0; i <p.teclas.length; i++)
        {
            p.teclas[i].addEventListener("click", m.pushT)
        }

    },

    pushT: function(event){
        p.action = event.target.getAttribute('class');
        m.calculator(p.action);
    },

    calculator: function(action){

        switch (action) {
            case 'number':
                console.log("numero");
            break;
        
            case 'sign':
                
             console.log("signo");
            break;

            case 'decimal':
                
             console.log("decimal");
            break;

            case 'iqual':
                
             console.log("igual");
            break;
        
            default:
                break;
        }
    }
}

m.start();