/********
 * 
 * OBJETO CON LAS PROPIEDADES DE LA CALCULADORA
 */

    var p = {

        teclas: document.querySelectorAll("#calculator ul li"),
        digit: null, 
        operations: document.querySelector("#operations"),
        action: null,
        countSing:  null
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
            p.teclas[i].addEventListener("click", m.pushT);
        }

    },

    pushT: function(event){
        p.action = event.target.getAttribute('class');
        p.digit = event.target.innerHTML;
        m.calculator(p.action, p.digit);
    },

    calculator: function(action, digit){

        switch (action) {
            case 'number':
                p.countSing = 0
                if (p.operations.innerHTML == 0) {
                    p.operations.innerHTML = digit;
                }else{
                    p.operations.innerHTML += digit;
                }
            break;
        
            case 'sign':
                p.countSing ++;

                if (p.countSing == 1) {
                    if(p.operations.innerHTML == 0){
                        p.operations.innerHTML = 0;
                    }
                    else{
                        p.operations.innerHTML += digit;
                    }

                }
            break;

            case 'decimal':
                
             console.log("decimal");
            break;

            case 'iqual':
               
                
            break;
        
            default:
                break;
        }
    },

    eraseCalculator: function() {
        p.operations.innerHTML = 0
    }
}

m.start();