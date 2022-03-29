class Pacman {
  #radio;
  #posX;
  #posY;
  #colorRelleno;
  #angulo1;
  #angulo2;
  #velX;
  #velY;

  constructor(radioInicial, xInicial, yInicial, velocidad) {
    this.#radio = radioInicial;
    this.#posX = xInicial;
    this.#posY = yInicial;
    this.#colorRelleno = "#FEF128";
    this.#angulo1 = 0.2 * Math.PI;
    this.#angulo2 = 1.8 * Math.PI;
    this.#velX = velocidad;
    this.#velY = velocidad;
  }

  dibujar(ctx) {
    // Dibujar círculo con una abertura
    ctx.beginPath();
    ctx.arc(
      this.#posX,
      this.#posY,
      this.#radio,
      this.#angulo1,
      this.#angulo2,
      false
    );

    // Líneas que forman la boca
    ctx.lineTo(this.#posX, this.#posY);
    ctx.closePath();

    // Definir color del personaje y el borde
    ctx.fillStyle = this.#colorRelleno;
    ctx.fill();
    ctx.stroke();
  }

  actualizarEstado() {
    this.dibujar(ctx);
    this.#posX += this.#velX;
    this.#posY += this.#velY;
  }

  moverArriba() {
    this.#posY -= this.#velY;
  }

  moverAbajo() {
    this.#posY += this.#velY;
  }

  moverDerecha() {
    this.#posX += this.#velX;
  }

  moverIzquierda() {
    this.#posX -= this.#velX;
  }

  get radio() {
    return this.#radio;
  }

  get posX() {
    return this.#posX;
  }

  get posY() {
    return this.#posY;
  }

  set angulo1(valor) {
    this.#angulo1 = valor;
  }

  set angulo2(valor) {
    this.#angulo2 = valor;
  }

  get velX() {
    return this.#velX;
  }

  set velX(valor) {
    this.#velX = valor;
  }

  get velY() {
    return this.#velY;
  }

  set velY(valor) {
    this.#velY = valor;
  }
}
