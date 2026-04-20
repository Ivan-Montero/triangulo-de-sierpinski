// Definir los colores y un índice para seleccionarlos secuencialmente
const colores = ['#e74c3c','#e67e22',  '#3498db', '#2ecc71', '#9b59b6', '#f1c40f', '#1abc9c', '#34495e'];
let colorIndex = 0;
let colorActual = colores[colorIndex];
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
// Coordenadas del triángulo equilátero
const centerX = canvas.width / 2; // Centro del canvas en X
const centerY = canvas.height / 2; // Centro del canvas en Y
const sideLength = 400; // Longitud de los lados del triángulo
const height = (Math.sqrt(3) / 2) * sideLength; // Altura del triángulo equilátero

// Puntos del triángulo
let pointA = { x: centerX, y: centerY - height / 2 }; // Vértice superior
let pointB = { x: centerX - sideLength / 2, y: centerY + height / 2 }; // Vértice inferior izquierdo
let pointC = { x: centerX + sideLength / 2, y: centerY + height / 2 }; // Vértice inferior derecho

const initialPoint = {x: Math.random() * canvas.width, y: Math.random() * canvas.height};
let currentPoint = initialPoint;
let currentRandomVertex = pointA;
let pointsCounter = 0;

// Función para dibujar un triángulo equilátero en el canvas
function dibujarTriangulo() {
    if (!ctx) {
        console.error('Tu navegador no soporta Canvas.');
        return;
    }

    // Limpiar el canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#ffffff'; // Color blanco
    ctx.fillRect(0, 0, canvas.width, canvas.height); // Rellenar todo el canvas con blanco

    // Dibujar el triángulo
    dibujarPunto(pointA);
    dibujarPunto(pointB);
    dibujarPunto(pointC);
    ctx.beginPath();
    ctx.moveTo(pointA.x, pointA.y); // Moverse al vértice superior
    ctx.lineTo(pointB.x, pointB.y); // Línea al vértice inferior izquierdo
    ctx.lineTo(pointC.x, pointC.y); // Línea al vértice inferior derecho
    ctx.closePath(); // Cerrar el triángulo


    // Estilo del triángulo
    ctx.fillStyle = '#000000'; // Color de relleno
    ctx.fill(); // Rellenar el triángulo
    ctx.strokeStyle = '#000000'; // Color del borde
    ctx.stroke(); // Dibujar el borde
}

function dibujarPunto(punto) {
    // Seleccionar el color actual y avanzar al siguiente
    colorActual = colores[colorIndex];
    colorIndex = (colorIndex + 1) % colores.length; // Reiniciar el índice si llega al final

    if(pointsCounter < 20){
        ctx.beginPath();
        ctx.arc(punto.x, punto.y, 2, 0, Math.PI * 2); // Dibujar un pequeño círculo en el punto medio
        ctx.fillStyle = colorActual; // Usar el color actual
        ctx.fill();
    } else {
        ctx.beginPath();
        ctx.arc(punto.x, punto.y, 1, 0, Math.PI * 1); // Dibujar un pequeño círculo en el punto medio
        ctx.fillStyle = colorActual; // Usar el color actual
        ctx.fill();
    }
}

function refreshScreen() {
    console.log (pointsCounter);
    document.getElementById("pantalla").value = pointsCounter;
}

function dibujaEsquema(){
    // Dibujar una llave entre currentRandomVertex y currentPoint
    ctx.beginPath();
    ctx.moveTo(currentRandomVertex.x, currentRandomVertex.y); // Moverse al vértice aleatorio actual

    // Calcular el vector entre los dos puntos
    const vector = {
        x: currentPoint.x - currentRandomVertex.x,
        y: currentPoint.y - currentRandomVertex.y,
    };

    // Calcular el vector perpendicular
    const perpendicular = {
        x: -vector.y,
        y: vector.x,
    };

    // Normalizar el vector perpendicular
    const length = Math.sqrt(perpendicular.x ** 2 + perpendicular.y ** 2);
    const normalizedPerpendicular = {
        x: (perpendicular.x / length) * 50, // 50 es la magnitud del desplazamiento
        y: (perpendicular.y / length) * 50,
    };

    // Calcular el punto de control para la curva (desplazado perpendicularmente)
    const controlPoint = {
        x: (currentRandomVertex.x + currentPoint.x) / 2 + normalizedPerpendicular.x,
        y: (currentRandomVertex.y + currentPoint.y) / 2 + normalizedPerpendicular.y,
    };

    // Dibujar la curva de Bézier (llave)
    ctx.bezierCurveTo(
        controlPoint.x, controlPoint.y, // Punto de control
        controlPoint.x, controlPoint.y, // Segundo punto de control (igual para un bucle simple)
        currentPoint.x, currentPoint.y  // Punto final
    );

    ctx.strokeStyle = '#FF5733'; // Color de la llave
    ctx.lineWidth = 2; // Ancho de la línea
    ctx.stroke(); // Dibujar la curva
}

// Llamar a la función para dibujar el triángulo al cargar la página
dibujarTriangulo();
dibujarPunto(currentPoint);

function findNewPoint() {
    const auxRandom = Math.random();
    console.log("buscando nuevo punto...");
    console.log(auxRandom);
    switch (Math.floor(auxRandom* 3) + 1) {
        case 1: 
        currentRandomVertex = pointA;
        console.log("pointA");
            break;
        case 2: 
        currentRandomVertex = pointB;
        console.log("pointB");
            break;
        case 3: 
        currentRandomVertex = pointC;
        console.log("pointC");
            break;
    }
    

    if(pointsCounter < 15){
        ctx.beginPath();
        ctx.moveTo(currentRandomVertex.x, currentRandomVertex.y); // Moverse al vértice aleatorio actual
        ctx.lineTo(currentPoint.x, currentPoint.y); // Línea al punto actual
        ctx.strokeStyle = '#CCCCCC'; // Color del borde
        ctx.stroke(); // Dibujar el borde
        // dibujaEsquema();
    }
    
    // Calcular el punto medio entre currentRandomVertex y currentPoint
    const midpoint = {
        x: (currentRandomVertex.x + currentPoint.x) / 2,
        y: (currentRandomVertex.y + currentPoint.y) / 2
    };

    // Actualizar currentPoint con el nuevo punto medio
    currentPoint = midpoint;
    dibujarPunto(currentPoint);


}

function agregar(valor) {
    pointsCounter += valor;
    refreshScreen();
    while (valor > 0) {
        findNewPoint();
        valor -= 1; 
    }
}

function borrar() {
    document.getElementById("pantalla").value = "";
    dibujarTriangulo();

    pointsCounter = 1;
}

const botones = document.querySelectorAll("button");

botones.forEach(boton => {
    boton.addEventListener('touchend', () => {
        boton.blur(); // Elimina el foco del botón en dispositivos táctiles
      });
});
