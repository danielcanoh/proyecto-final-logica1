class Pared {
  #ancho;
  #alto;
  #posX;
  #posY;
  #colorRelleno;

  constructor(posX, posY) {
    this.#ancho = 20;
    this.#alto = 15;
    this.#posX = posX;
    this.#posY = posY;
    this.#colorRelleno = "blue";
  }

  dibujar(ctx) {
    ctx.fillStyle = this.#colorRelleno;
    ctx.fillRect(this.#posX, this.#posY, this.#ancho, this.#alto);
  }

  get bordeIzquierdo() {
    return this.#posX;
  }

  get bordeDerecho() {
    return this.#posX + this.#ancho;
  }

  get bordeSuperior() {
    return this.#posY;
  }

  get bordeInferior() {
    return this.#posY + this.#alto;
  }

  set colorRelleno(color) {
    this.#colorRelleno = color;
  }

  get posX() {
    return this.#posX;
  }

  set posX(valor) {
    this.#posX = valor;
  }

  get posY() {
    return this.#posY;
  }

  set posY(valor) {
    this.#posY = valor;
  }

  get ancho() {
    return this.#ancho;
  }

  set ancho(valor) {
    this.#ancho = valor;
  }

  get alto() {
    return this.#alto;
  }

  set alto(valor) {
    this.#alto = valor;
  }
}
