class Basura extends Pared {
  #image;

  constructor(posX, posY, ancho, alto) {
    super(ancho, alto);
    this.#image = image;
    this.posX = posX;
    this.posY = posY;
  }

  dibujar(ctx) {
    ctx.drawImage(this.#image, this.posX, this.posY);
  }
}
