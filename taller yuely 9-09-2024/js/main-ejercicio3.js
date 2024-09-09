let numeroSecreto = Math.floor(Math.random() * 100) + 1; // Genera un número entero aleatorio entre 1 y 100 (inclusive) y lo almacena en la variable 'numeroSecreto'. 'Math.random()' genera un número decimal entre 0 y 1, 'Math.floor()' redondea hacia abajo al número entero más cercano.

let intentos = 0; // Declara una variable llamada 'intentos' e inicialízala en 0. Esta variable lleva un registro de cuántos intentos ha hecho el usuario para adivinar el número.

function adivinar() {
    let intento = document.getElementById("numero").value; // Obtiene el valor del campo de entrada con el ID 'numero' y lo almacena en la variable 'intento'. Este valor es el número ingresado por el usuario.

    intentos++; // Incrementa el número de intentos en 1 cada vez que se llama a la función 'adivinar()'.

    if (intento == numeroSecreto) { // Compara el valor ingresado por el usuario ('intento') con el número secreto ('numeroSecreto').
        document.getElementById("resultado").innerText = "¡Correcto Adivinaste en " + intentos + " intentos!."; // Si el número ingresado es correcto, muestra un mensaje indicando que el usuario ha adivinado correctamente y el número de intentos realizados.
    }
    else if (intento < numeroSecreto) { // Si el número ingresado es menor que el número secreto.
        document.getElementById("resultado").innerText = "El número es mayor. Inténtalo de nuevo."; // Muestra un mensaje indicando que el número secreto es mayor y solicita al usuario que intente de nuevo.
    } 
    else { // Si el número ingresado es mayor que el número secreto.
        document.getElementById("resultado").innerText = "El número es menor. Inténtalo de nuevo."; // Muestra un mensaje indicando que el número secreto es menor y solicita al usuario que intente de nuevo.
    }
}
