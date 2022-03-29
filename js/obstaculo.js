class Obstaculo extends Pared {
  #direccionX;

  constructor(posX, posY, ancho, alto) {
    super(posX, posY, ancho, alto);
    this.#direccionX = 1;
    this.ancho = ancho;
    this.alto = alto;
    this.colorRelleno = "red";
  }

  mover() {
    super.posX += this.#direccionX;
  }

  get direccionX() {
    return this.#direccionX;
  }

  set direccionX(valor) {
    this.#direccionX = valor;
  }
}
