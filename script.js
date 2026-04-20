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

let currentPoint = pointA;
let currentRandomVertex = pointA;
let pointsCounter = 1;

// Función para dibujar un triángulo equilátero en el canvas
function dibujarTriangulo() {
/*     const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d'); */

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
    console.log(punto); // Logs the random point inside the canvas

    // Seleccionar el color actual y avanzar al siguiente
    colorActual = colores[colorIndex];
    colorIndex = (colorIndex + 1) % colores.length; // Reiniciar el índice si llega al final

    ctx.beginPath();
    ctx.arc(punto.x, punto.y, 2, 0, Math.PI * 5); // Dibujar un pequeño círculo en el punto medio
    ctx.fillStyle = colorActual; // Usar el color actual
    ctx.fill();
}

function firstPoint() {
    const initialPoint = {x: Math.random() * canvas.width, y: Math.random() * canvas.height};
    currentPoint = initialPoint;

    dibujarPunto(currentPoint); 
}

function refreshScreen() {
    document.getElementById("pantalla").value += pointsCounter;
}

// Llamar a la función para dibujar el triángulo al cargar la página
dibujarTriangulo();
firstPoint();



function findNewPoint() {

    console.log("buscando nuevo punto...");
    switch (Math.floor(Math.random() * 3) + 1) {
        case 1: 
        currentRandomVertex = pointA;
            break;
        case 2: 
        currentRandomVertex = pointB;
            break;
        case 3: 
        currentRandomVertex = pointC;
            break;
    }

    // ctx.beginPath();
    // ctx.moveTo(currentRandomVertex.x, currentRandomVertex.y); // Moverse al vértice aleatorio actual
    // ctx.lineTo(currentPoint.x, currentPoint.y); // Línea al punto actual
    // ctx.strokeStyle = '#CCCCCC'; // Color del borde
    // ctx.stroke(); // Dibujar el borde
    
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
    while (valor > 0) {
        findNewPoint();
        valor -= 1; 
    }
    
}

function borrar() {
    document.getElementById("pantalla").value = "";
}

function calcular() {
    const resultado = eval(document.getElementById("pantalla").value);
    document.getElementById("pantalla").value = resultado;    
}

const botones = document.querySelectorAll("button");

botones.forEach(boton => {
    boton.addEventListener('touchend', () => {
        boton.blur(); // Elimina el foco del botón en dispositivos táctiles
      });
});
