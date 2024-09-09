function cambiarColor(color) {
    // Cambia el color de fondo de los elementos del semáforo basado en el valor de 'color'.
    document.getElementById("rojo").style.backgroundColor = color === 'rojo' ? 'red' : 'grey'; // Si el valor de 'color' es 'rojo', establece el color de fondo del elemento con ID 'rojo' a rojo. Si no es 'rojo', establece el color de fondo a gris.
    document.getElementById("amarillo").style.backgroundColor = color === 'amarillo' ? 'yellow' : 'grey'; // Si el valor de 'color' es 'amarillo', establece el color de fondo del elemento con ID 'amarillo' a amarillo. Si no es 'amarillo', establece el color de fondo a gris.
    document.getElementById("verde").style.backgroundColor = color === 'verde' ? 'green' : 'grey'; // Si el valor de 'color' es 'verde', establece el color de fondo del elemento con ID 'verde' a verde. Si no es 'verde', establece el color de fondo a gris.
}

function iniciarSemaforo() {
    // Controla la secuencia de los colores del semáforo.
    setTimeout(() => cambiarColor('rojo'), 0); // Llama a la función 'cambiarColor' con el argumento 'rojo' después de 0 milisegundos (es decir, inmediatamente). Esto hace que el semáforo se ponga en rojo al inicio.
    setTimeout(() => cambiarColor('amarillo'), 3000); // Llama a la función 'cambiarColor' con el argumento 'amarillo' después de 3000 milisegundos (3 segundos). Esto cambia el color del semáforo a amarillo después de 3 segundos.
    setTimeout(() => cambiarColor('verde'), 6000); // Llama a la función 'cambiarColor' con el argumento 'verde' después de 6000 milisegundos (6 segundos). Esto cambia el color del semáforo a verde después de 6 segundos.
    setTimeout(iniciarSemaforo, 9000); // Llama a la función 'iniciarSemaforo' después de 9000 milisegundos (9 segundos). Esto reinicia el ciclo del semáforo, creando un bucle continuo de cambio de colores.
}
