//****** GAME LOOP ********//

var time = new Date(); // Tiempo actual
var deltaTime = 0; // Diferencia de tiempo entre frames

// Inicializa el juego cuando la página esté lista
if (document.readyState === "complete" || document.readyState === "interactive") {
    setTimeout(Init, 1); // Llama a Init después de 1 ms
} else {
    document.addEventListener("DOMContentLoaded", Init); // Llama a Init cuando el DOM esté listo
}

// Función de inicialización
function Init() {
    time = new Date(); // Resetea el tiempo
    Start(); // Configura todo
    Loop(); // Inicia el bucle del juego
}

// Función del bucle principal del juego
function Loop() {
    deltaTime = (new Date() - time) / 1000; // Calcula el tiempo desde el último frame
    time = new Date(); // Actualiza el tiempo
    Update(); // Actualiza el estado del juego
    requestAnimationFrame(Loop); // Llama a Loop en el siguiente frame
}

//****** GAME LOGIC ********//

var sueloY = 22; // Posición Y del suelo
var velY = 0; // Velocidad vertical del dinosaurio
var impulso = 900; // Fuerza de salto
var gravedad = 2500; // Gravedad que afecta al dinosaurio

var dinoPosX = 42; // Posición X fija del dinosaurio
var dinoPosY = sueloY; // Posición Y del dinosaurio que cambia durante el salto

var sueloX = 0; // Posición X del suelo, que se mueve para simular el avance del dino
var velEscenario = 1280 / 3; // Velocidad del suelo en relación al juego
var gameVel = 1; // Velocidad general del juego
var score = 0; // Puntuación inicial del jugador

var parado = false; // Indica si el juego está detenido (game over)
var saltando = false; // Indica si el dinosaurio está en medio de un salto

var tiempoHastaObstaculo = 2; // Tiempo inicial hasta la aparición del primer obstáculo
var tiempoObstaculoMin = 0.7; // Tiempo mínimo entre obstáculos
var tiempoObstaculoMax = 1.8; // Tiempo máximo entre obstáculos
var obstaculoPosY = 16; // Posición vertical de los obstáculos
var obstaculos = []; // Array que almacena los obstáculos actuales

var tiempoHastaNube = 0.5; // Tiempo hasta la aparición de la primera nube
var tiempoNubeMin = 0.7; // Tiempo mínimo entre nubes
var tiempoNubeMax = 2.7; // Tiempo máximo entre nubes
var maxNubeY = 270; // Altura máxima de las nubes
var minNubeY = 100; // Altura mínima de las nubes
var nubes = []; // Array que almacena las nubes actuales
var velNube = 0.5; // Velocidad de desplazamiento de las nubes

var contenedor; // Elemento contenedor del juego
var dino; // Elemento visual del dinosaurio
var textoScore; // Elemento visual de la puntuación
var suelo; // Elemento visual del suelo
var gameOver; // Elemento visual de pantalla de fin del juego

// Inicializa los elementos y eventos
function Start() {
    gameOver = document.querySelector(".game-over"); // Asocia el elemento de fin del juego
    suelo = document.querySelector(".suelo"); // Asocia el elemento del suelo
    contenedor = document.querySelector(".contenedor"); // Asocia el contenedor del juego
    textoScore = document.querySelector(".score"); // Asocia el marcador de puntuación
    dino = document.querySelector(".dino"); // Asocia el dinosaurio
    document.addEventListener("keydown", HandleKeyDown); // Escucha teclas para detectar saltos
}

// Actualiza el estado del juego
function Update() {
    if (parado) return; // Si el juego está detenido, no realiza actualizaciones

    MoverDinosaurio(); // Mueve al dinosaurio si está en el aire
    MoverSuelo(); // Mueve el suelo para simular avance
    DecidirCrearObstaculos(); // Crea obstáculos en función del tiempo
    DecidirCrearNubes(); // Crea nubes aleatoriamente en función del tiempo
    MoverObstaculos(); // Mueve los obstáculos de derecha a izquierda
    MoverNubes(); // Mueve las nubes de derecha a izquierda
    DetectarColision(); // Verifica si hay colisiones entre el dinosaurio y los obstáculos

    velY -= gravedad * deltaTime; // Aplica la gravedad al dinosaurio en el aire
}

// Maneja la tecla presionada
function HandleKeyDown(ev) {
    if (ev.keyCode == 32) { // Si la tecla es la barra espaciadora
        Saltar(); // El dinosaurio salta
    }
}

// Hace que el dinosaurio salte
function Saltar() {
    if (dinoPosY === sueloY) { // Si el dinosaurio está en el suelo
        saltando = true; // Cambia el estado a saltando
        velY = impulso; // Aplica la fuerza de salto
        dino.classList.remove("dino-corriendo"); // Detiene la animación de correr
    }
}

// Mueve el dinosaurio según su velocidad vertical
function MoverDinosaurio() {
    dinoPosY += velY * deltaTime; // Calcula la nueva posición vertical del dino
    if (dinoPosY < sueloY) {
        TocarSuelo(); // Si el dino cae al suelo, ajusta la posición
    }
    dino.style.bottom = dinoPosY + "px"; // Actualiza la posición en pantalla
}

// Ajusta la posición del dinosaurio al tocar el suelo
function TocarSuelo() {
    dinoPosY = sueloY; // Fija la posición del dino al suelo
    velY = 0; // Resetea la velocidad vertical
    if (saltando) {
        dino.classList.add("dino-corriendo"); // Reanuda la animación de correr
    }
    saltando = false; // Resetea el estado de salto
}

// Mueve el suelo para simular el desplazamiento
function MoverSuelo() {
    sueloX += CalcularDesplazamiento(); // Calcula el desplazamiento del suelo
    suelo.style.left = -(sueloX % contenedor.clientWidth) + "px"; // Aplica el movimiento cíclico del suelo
}

// Calcula el desplazamiento del suelo en función de la velocidad del juego
function CalcularDesplazamiento() {
    return velEscenario * deltaTime * gameVel;
}

// Maneja la colisión del dinosaurio
function Estrellarse() {
    dino.classList.remove("dino-corriendo"); // Detiene la animación de correr
    dino.classList.add("dino-estrellado"); // Aplica la clase de colisión
    parado = true; // Detiene el juego
}

// Decide si crear un nuevo obstáculo
function DecidirCrearObstaculos() {
    tiempoHastaObstaculo -= deltaTime; // Resta el tiempo hasta el próximo obstáculo
    if (tiempoHastaObstaculo <= 0) { // Si es el momento
        CrearObstaculo(); // Crea un obstáculo
    }
}

// Decide si crear una nueva nube
function DecidirCrearNubes() {
    tiempoHastaNube -= deltaTime; // Resta el tiempo hasta la próxima nube
    if (tiempoHastaNube <= 0) { // Si es el momento
        CrearNube(); // Crea una nueva nube
    }
}

// Crea un nuevo obstáculo y lo agrega al juego
function CrearObstaculo() {
    var obstaculo = document.createElement("div"); // Crea el div para el obstáculo
    contenedor.appendChild(obstaculo); // Añade el obstáculo al contenedor del juego
    obstaculo.classList.add("cactus"); // Asigna la clase cactus
    if (Math.random() > 0.5) obstaculo.classList.add("cactus2"); // A veces se asigna un obstáculo doble
    obstaculo.posX = contenedor.clientWidth; // Inicializa la posición del obstáculo
    obstaculo.style.left = contenedor.clientWidth + "px"; // Posición inicial

    obstaculos.push(obstaculo); // Añade el obstáculo al array
    tiempoHastaObstaculo = tiempoObstaculoMin + Math.random() * (tiempoObstaculoMax - tiempoObstaculoMin) / gameVel; // Calcula el tiempo hasta el próximo obstáculo
}

// Crea una nueva nube y la agrega al juego
function CrearNube() {
    var nube = document.createElement("div"); // Crea el div para la nube
    contenedor.appendChild(nube); // Añade la nube al contenedor
    nube.classList.add("nube"); // Asigna la clase nube
    nube.posX = contenedor.clientWidth; // Inicializa la posición de la nube
    nube.style.left = contenedor.clientWidth + "px"; // Posición inicial
    nube.style.bottom = minNubeY + Math.random() * (maxNubeY - minNubeY) + "px"; // Posición vertical aleatoria
    
    nubes.push(nube); // Añade la nube al array
    tiempoHastaNube = tiempoNubeMin + Math.random() * (tiempoNubeMax - tiempoNubeMin) / gameVel; // Calcula el tiempo hasta la próxima nube
}

// Mueve los obstáculos en el juego
function MoverObstaculos() {
    for (var i = obstaculos.length - 1; i >= 0; i--) { // Recorre el array de obstáculos
        if (obstaculos[i].posX < -obstaculos[i].clientWidth) { // Si el obstáculo sale de la pantalla
            obstaculos[i].parentNode.removeChild(obstaculos[i]); // Elimina el obstáculo
            obstaculos.splice(i, 1); // Lo quita del array
            GanarPuntos(); // Incrementa la puntuación
        } else {
            obstaculos[i].posX -= CalcularDesplazamiento(); // Mueve el obstáculo hacia la izquierda
            obstaculos[i].style.left = obstaculos[i].posX + "px"; // Actualiza la posición en pantalla
        }
    }
}

// Mueve las nubes en el juego
function MoverNubes() {
    for (var i = nubes.length - 1; i >= 0; i--) { // Recorre el array de nubes
        if (nubes[i].posX < -nubes[i].clientWidth) { // Si la nube sale de la pantalla
            nubes[i].parentNode.removeChild(nubes[i]); // Elimina la nube
            nubes.splice(i, 1); // La quita del array
        } else {
            nubes[i].posX -= CalcularDesplazamiento() * velNube; // Mueve la nube más lentamente que los obstáculos
            nubes[i].style.left = nubes[i].posX + "px"; // Actualiza la posición en pantalla
        }
    }
}

// Aumenta la puntuación y ajusta la velocidad del juego
function GanarPuntos() {
    score++; // Incrementa la puntuación
    textoScore.innerText = score; // Actualiza el marcador en pantalla
    if (score == 5) { // A los 5 puntos, aumenta la velocidad
        gameVel = 1.5;
        contenedor.classList.add("mediodia"); // Cambia el fondo
    } else if (score == 10) { // A los 10 puntos, aumenta más la velocidad
        gameVel = 2;
        contenedor.classList.add("tarde"); // Cambia el fondo
    } else if (score == 20) { // A los 20 puntos, la velocidad aumenta aún más
        gameVel = 3;
        contenedor.classList.add("noche"); // Cambia el fondo
    }
    suelo.style.animationDuration = (3 / gameVel) + "s"; // Ajusta la animación del suelo según la velocidad
}

// Maneja el fin del juego
function GameOver() {
    Estrellarse(); // Maneja la colisión del dinosaurio
    gameOver.style.display = "block"; // Muestra la pantalla de fin del juego
}

// Detecta si el dinosaurio colisiona con algún obstáculo
function DetectarColision() {
    for (var i = 0; i < obstaculos.length; i++) { // Recorre los obstáculos
        if (obstaculos[i].posX > dinoPosX + dino.clientWidth) { // Si el obstáculo está lejos
            break; // No hay colisión, termina el bucle
        } else {
            if (IsCollision(dino, obstaculos[i], 10, 30, 15, 20)) { // Si hay colisión
                GameOver(); // Fin del juego
            }
        }
    }
}

// Verifica si dos elementos colisionan
function IsCollision(a, b, paddingTop, paddingRight, paddingBottom, paddingLeft) {
    var aRect = a.getBoundingClientRect(); // Obtiene el rectángulo de colisión del dino
    var bRect = b.getBoundingClientRect(); // Obtiene el rectángulo de colisión del obstáculo

    return !(
        ((aRect.top + aRect.height - paddingBottom) < (bRect.top)) || // Verifica si están separados en Y
        (aRect.top + paddingTop > (bRect.top + bRect.height)) || // Verifica si están separados en Y
        ((aRect.left + aRect.width - paddingRight) < bRect.left) || // Verifica si están separados en X
        (aRect.left + paddingLeft > (bRect.left + bRect.width)) // Verifica si están separados en X
    );
}
