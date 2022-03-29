/* *** Seleccionar los elementos del HTML *** */
const miCanvas = document.getElementById("miCanvas");
const puntaje = document.querySelector(".total-score");
const pantallaGanar = document.querySelector(".winner");
const pantallaIniciar = document.querySelector(".start");
const pantallaPerder = document.querySelector(".game-over");
const btnNuevoJuego = document.querySelector(".btnNew");
const ctx = miCanvas.getContext("2d");

/* *** Obtener dimensiones del canvas *** */
const w = miCanvas.clientWidth;
const h = miCanvas.clientHeight;

/* *** Crear el personaje *** */
const pacman = new Pacman(6, 30, 128, 0);

/* *** Arreglos que contienen las paredes y las basuras *** */
const paredes = [];
const basuritas = [];

/* *** La variable totalPuntaje sirve para llevar la cuenta del puntaje a medida que el personaje va comiendo. 
  La variable jugando sirve como una condición, el juego solo funcionará mientras esta variable sea verdadera. ****/
let totalPuntaje = 0;
let jugando = true;

/* *** Se representa el mapa usando arreglos para agregar todos los elementos dinámicamente.
  Los guiones representan los muros y las O representas las basuritas. *** */
const mapa = [
  ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
  ["-", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "-"],
  ["-", "O", "-", "-", "-", "-", "O", "-", "O", "-", "-", "-", "-", "O", "-"],
  ["-", "O", "-", "O", "O", "O", "O", "-", "O", "O", "O", "O", "-", "O", "-"],
  ["-", "O", "-", "O", "-", "O", "O", "O", "O", "O", "-", "O", "-", "O", "-"],
  ["-", "O", "-", "O", "-", "O", "-", "-", "-", "O", "-", "O", "-", "O", "-"],
  ["-", "O", "-", "O", "O", "O", "O", "-", "O", "O", "O", "O", "-", "O", "-"],
  ["-", "O", "-", "O", "-", "-", "O", "-", "O", "-", "-", "O", "-", "O", "-"],
  ["-", ".", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "-"],
  ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
];

/* *** Se crea el arreglo con los 2 obstáculos *** */
const obstaculos = [
  new Obstaculo(210, 35, 40, 5),
  new Obstaculo(20, 110, 40, 5),
];

/* *** Se guarda la imagen que se usará para representar las basuritas en una variable *** */
const image = new Image();
image.src = "./assets/cascara.png";

/* *** En este bloque se agregan todos los elementos dinámicamente. Para esto, se recorre cada arreglo que hay
dentro del arreglo principal llamado mapa. Como los elementos de mapa son arreglos que están dentro de otro
arreglo, es necesario usar 2 ciclos *** */
for (let i = 0; i < mapa.length; i++) {
  for (let j = 0; j < mapa[i].length; j++) {
    /* *** Las condiciones indican que: cuando se encuentre un elemento que sea un guión, se agregue una pared al arreglo paredes.
    Cuando se encuentre un elemento que sea una O se agregue una basurita al arreglo basuritas. 
    La posición de cada elemento se calcula dinámicamente usando el ancho y alto de cada pared y las variables i y j de los ciclos *** */
    if (mapa[i][j] === "-") {
      paredes.push(new Pared(20 * j, 15 * i));
    } else if (mapa[i][j] === "O") {
      basuritas.push(
        new Basura(paredes[i].ancho * j, paredes[i].alto * i, image)
      );
    }
  }
}

/* *** Esta función se utiliza para cambiar la dirección en que apunta la boca del personaje *** */
const cambiarBoca = function (angulo1, angulo2) {
  pacman.angulo1 = angulo1;
  pacman.angulo2 = angulo2;
};

/* *** Se crea una animación *** */
window.requestAnimationFrame(animacion);

function animacion() {
  ctx.clearRect(0, 0, w, h);

  /* *** El código de abajo solo se ejecuta cuando la variable jugando sea verdadera *** */
  if (jugando) {
    for (let i = 0; i < paredes.length; i++) {
      /* *** Se comprueba si existe alguna colisión entre el personaje y una pared *** */
      if (
        pacman.posY - pacman.radio + pacman.velY <= paredes[i].bordeInferior &&
        pacman.posX + pacman.radio + pacman.velX >= paredes[i].bordeIzquierdo &&
        pacman.posY + pacman.radio + pacman.velY >= paredes[i].bordeSuperior &&
        pacman.posX - pacman.radio + pacman.velX <= paredes[i].bordeDerecho
      ) {
        pacman.velX = 0;
        pacman.velY = 0;
      }
    }

    for (let i = 0; i < basuritas.length; i++) {
      /* *** Se comprueba si existe alguna colisión entre el personaje y alguna basurita. Si es el caso,
      la respectiva basurita se elimina del arreglo y el puntaje total aumenta y se muestra en pantalla *** */
      if (
        pacman.posY - pacman.radio <= basuritas[i].bordeInferior &&
        pacman.posX + pacman.radio >= basuritas[i].bordeIzquierdo &&
        pacman.posY + pacman.radio >= basuritas[i].bordeSuperior &&
        pacman.posX - pacman.radio <= basuritas[i].bordeDerecho
      ) {
        basuritas.splice(i, 1);
        totalPuntaje++;
        puntaje.textContent = totalPuntaje;
      }
    }

    /* *** Condición que indica cuando se gana el juego *** */
    if (totalPuntaje === 70) {
      /* *** Se oculta el canvas, se muestra la pantalla de You Win y la variable jugando se vuelve
      falsa para que el código no se ejecute más. *** */
      jugando = false;
      miCanvas.classList.add("hidden");
      pantallaGanar.classList.remove("hidden");
    }

    /* *** Se dibujan todos los elementos del juego */
    pacman.actualizarEstado();

    for (let i = 0; i < paredes.length; i++) {
      paredes[i].dibujar(ctx);
    }

    for (let i = 0; i < basuritas.length; i++) {
      basuritas[i].dibujar(ctx);
    }

    for (let i = 0; i < obstaculos.length; i++) {
      obstaculos[i].dibujar(ctx);
      obstaculos[i].mover();

      /* *** Cuando los obstáculos lleguen a cierto punto cambiarán la dirección en que se mueven *** */
      if (obstaculos[i].bordeDerecho > 280) {
        obstaculos[i].direccionX *= -1;
      } else if (obstaculos[i].bordeIzquierdo < 20) {
        obstaculos[i].direccionX *= -1;
      }

      /* *** Se comprueba si existe alguna colisión entre el personaje y algún obstáculo. Si es el caso, se pierde el juego- */
      if (
        pacman.posY - pacman.radio <= obstaculos[i].bordeInferior &&
        pacman.posX + pacman.radio >= obstaculos[i].bordeIzquierdo &&
        pacman.posY + pacman.radio >= obstaculos[i].bordeSuperior &&
        pacman.posX - pacman.radio <= obstaculos[i].bordeDerecho
      ) {
        /* *** Se oculta el canvas y se muestra la pantalla de Game Over *** */
        miCanvas.classList.add("hidden");
        pantallaPerder.classList.remove("hidden");
      }
    }

    window.requestAnimationFrame(animacion);
  }
}

/* *** Cuando se presionan las flechas, la velocidad cambia para que el personaje se pueda mover. 
  También cambia la dirección en la que apunta la boca. *** */
document.addEventListener("keydown", function (e) {
  ctx.clearRect(0, 0, w, h);
  switch (e.key) {
    case "ArrowRight":
      pacman.velX = 1;
      cambiarBoca(0.2 * Math.PI, 1.8 * Math.PI);
      break;
    case "ArrowUp":
      pacman.velY = -1;
      cambiarBoca(-0.3 * Math.PI, 1.3 * Math.PI);
      break;
    case "ArrowLeft":
      pacman.velX = -1;
      cambiarBoca(-0.8 * Math.PI, 0.8 * Math.PI);
      break;
    case "ArrowDown":
      pacman.velY = 1;
      cambiarBoca(-1.3 * Math.PI, 0.3 * Math.PI);
      break;
  }
});

/* *** Cuando se dejan de presionar las flechas, la velocidad se vuelve 0 para que el personaje se quede quieto. *** */
document.addEventListener("keyup", function (e) {
  ctx.clearRect(0, 0, w, h);
  switch (e.key) {
    case "ArrowRight":
      pacman.velX = 0;
      break;
    case "ArrowUp":
      pacman.velY = 0;
      break;
    case "ArrowLeft":
      pacman.velX = 0;
      break;
    case "ArrowDown":
      pacman.velY = 0;
      break;
  }
});

/* *** Evento asociado al botón para iniciar el juego *** */
btnNuevoJuego.addEventListener("click", function () {
  /* *** Cuando inicia el juego la pantalla inicial y el botón se ocultan para que se pueda ver el canvas. *** */
  pantallaIniciar.classList.add("hidden");
  btnNuevoJuego.classList.toggle("hidden");
});
