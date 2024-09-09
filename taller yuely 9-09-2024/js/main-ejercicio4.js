function calcular() {
    // Obtiene los valores ingresados por el usuario, los convierte a números decimales y los almacena en las variables 'num1' y 'num2'.
    let num1 = parseFloat(document.getElementById("num1").value); // Obtiene el valor del campo de entrada con el ID 'num1', lo convierte a un número decimal y lo almacena en 'num1'.
    let num2 = parseFloat(document.getElementById("num2").value); // Obtiene el valor del campo de entrada con el ID 'num2', lo convierte a un número decimal y lo almacena en 'num2'.
    
    // Obtiene el valor seleccionado en el menú desplegable de operaciones y lo almacena en 'operacion'.
    let operacion = document.getElementById("operacion").value; // Obtiene el valor del campo de selección con el ID 'operacion' y lo almacena en 'operacion'.
    
    let resultado; // Declara una variable para almacenar el resultado del cálculo.

    // Utiliza una estructura de control 'switch' para determinar la operación a realizar basada en el valor de 'operacion'.
    switch(operacion) {
        case "+": // Si 'operacion' es el símbolo '+', realiza la suma de 'num1' y 'num2'.
            resultado = num1 + num2; // Calcula la suma de 'num1' y 'num2' y almacena el resultado en 'resultado'.
            break; // Termina el caso '+', evitando la ejecución de los casos siguientes.
        
        case "-": // Si 'operacion' es el símbolo '-', realiza la resta de 'num1' y 'num2'.
            resultado = num1 - num2; // Calcula la resta de 'num1' y 'num2' y almacena el resultado en 'resultado'.
            break; // Termina el caso '-', evitando la ejecución de los casos siguientes.
        
        case "*": // Si 'operacion' es el símbolo '*', realiza la multiplicación de 'num1' y 'num2'.
            resultado = num1 * num2; // Calcula la multiplicación de 'num1' y 'num2' y almacena el resultado en 'resultado'.
            break; // Termina el caso '*', evitando la ejecución de los casos siguientes.
        
        case "/": // Si 'operacion' es el símbolo '/', realiza la división de 'num1' y 'num2'.
            resultado = num1 / num2; // Calcula la división de 'num1' entre 'num2' y almacena el resultado en 'resultado'.
            break; // Termina el caso '/', evitando la ejecución de los casos siguientes.
        
        default: // Si 'operacion' no coincide con ninguno de los casos anteriores, se ejecuta el caso 'default'.
            resultado = "Operación no válida"; // Asigna el mensaje "Operación no válida" a 'resultado' si la operación no es reconocida.
    }

    // Muestra el resultado del cálculo en el elemento con el ID 'resultado'.
    document.getElementById("resultado").innerText = "Resultado: " + resultado; // Actualiza el contenido del elemento con el ID 'resultado' para mostrar el resultado del cálculo.
}
