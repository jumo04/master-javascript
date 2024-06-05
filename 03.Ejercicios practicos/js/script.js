/********
 * 
 * OBJETO CON LAS PROPIEDADES DE LA CALCULADORA
 */

    var p = {

        teclas: document.querySelectorAll("#calculator ul li"),
        digit: null, 
        operations: document.querySelector("#operations"),
        action: null,
        countSing:  0,
        swichtDecimal: false,
        result: false,

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

    keyboard: function () {
        document.addEventListener('keydown', m.press);
        
    },

    press: function (event) {
        // console.log(event.keyCode);
        if (event.keyCode == 48  || event.keyCode == 96) {
            p.action = 'number';
            p.digit = 0;
        }

        else if (event.keyCode == 49  || event.keyCode == 97) {
            p.action = 'number';
            p.digit = 1;
        }

        else if (event.keyCode == 50  || event.keyCode == 98) {
            p.action = 'number';
            p.digit = 2;
        }

        else if (event.keyCode == 51  || event.keyCode == 99) {
            p.action = 'number';
            p.digit = 3;
        }

        else if (event.keyCode == 52  || event.keyCode == 100) {
            p.action = 'number';
            p.digit = 4;
        }

        else if (event.keyCode == 53  || event.keyCode == 101) {
            p.action = 'number';
            p.digit = 5;
        }

        else if (event.keyCode == 54  || event.keyCode == 102) {
            p.action = 'number';
            p.digit = 6;
        }

        else if (event.keyCode == 55  || event.keyCode == 103) {
            p.action = 'number';
            p.digit = 7;
        }

        else if (event.keyCode == 56  || event.keyCode == 104) {
            p.action = 'number';
            p.digit = 8;
        }

        else if (event.keyCode == 57  || event.keyCode == 105) {
            p.action = 'number';
            p.digit = 9;
        }

        else if (event.keyCode == 107  || event.keyCode == 187) {
            p.action = 'sign';
            p.digit = "+";
        }

        else if (event.keyCode == 109  || event.keyCode == 189) {
            p.action = 'sign';
            p.digit = "-";
        }

        else if (event.keyCode == 88  || event.keyCode == 106) {
            p.action = 'sign';
            p.digit = "*";
        }

        else if (event.keyCode == 111  || event.keyCode == 191) {
            p.action = 'sign';
            p.digit = "/";
        }
        else if (event.keyCode == 190  || event.keyCode == 110) {
            p.action = 'decimal';
            p.digit = ".";
        }

        else if (event.keyCode == 13 ) {
            p.action = 'iqual';
            p.digit = "=";
        }

        else if (event.keyCode == 8 ) {
            p.action = "";
            m.eraseCalculator();
        }

        else{
            p.action = "";
            p.result = "";
        }

        m.calculator(p.action, p.digit);

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
                if (p.operations.innerHTML == "0") {
                    p.operations.innerHTML = digit;
                }else{
                    if (p.result) {
                        p.result =  false;
                        p.operations.innerHTML = digit;
                    }else{
                        p.operations.innerHTML += digit;   
                    }
                }
            break;
        
            case 'sign':
                p.countSing ++;

                if (p.countSing == "1") {
                    if(p.operations.innerHTML == "0"){
                        p.operations.innerHTML = 0;
                    }
                    else{
                        p.operations.innerHTML += digit;
                        p.swichtDecimal = false;
                        p.result =  false;
                    }

                }
            break;
            case 'decimal':

             if(!p.swichtDecimal && p.countSing != "1"){

                p.operations.innerHTML += digit;
                p.swichtDecimal = true;
                p.result = false; 
            }

            break;

            case 'iqual':
                if (p.countSing != "1"){

                    p.operations.innerHTML = eval(p.operations.innerHTML);
                    var expresion = /./g;

                    if (!expresion.test(p.operations.innerHTML)) {    
                        p.cantidadDecimal = true;
                    }
                    
                    p.result = true 
                }
               
            break;
        
            default:
                break;
        }
    },

    eraseCalculator: function() {
        p.result = false;
        p.operations.innerHTML = 0;
    }
}

m.start();
m.keyboard();