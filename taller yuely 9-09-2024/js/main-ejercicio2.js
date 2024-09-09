var contador = 1; // Declara una variable global llamada 'contador' e inicialízala con el valor 1. Esta variable lleva un registro de la imagen actual en la secuencia.

var temporizador; // Declara una variable global llamada 'temporizador' que se usará para almacenar el identificador del temporizador de intervalo.

function iniciar(){
    temporizador = setInterval(rotarImagenes, 3000); // Establece un intervalo que llama a la función 'rotarImagenes()' cada 3000 milisegundos (3 segundos) y almacena el identificador del intervalo en 'temporizador'.
    temporizador = setInterval(parar, 0) // Establece un segundo intervalo que llama a la función 'parar()' cada 0 milisegundos (es decir, inmediatamente). Este código sobrescribe el primer valor de 'temporizador', lo que significa que el primer intervalo se pierde y solo se ejecuta la función 'parar()' inmediatamente.
}

function rotarImagenes(){
    if (contador >= 10) { // Verifica si el valor de 'contador' es mayor o igual a 10.
        contador = 0; // Si es así, reinicia el valor de 'contador' a 0.
    }
    var img = document.getElementById('imgSlide'); // Obtiene el elemento de imagen con el ID 'imgSlide' del documento HTML.
    img.src = './images/img' + ++contador + '.jpg'; // Incrementa el valor de 'contador' (antes de usarlo), luego actualiza la fuente de la imagen ('src') para mostrar la imagen correspondiente en la secuencia.
}

