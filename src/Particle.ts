import P5, { Vector } from "p5";

export class Particle extends Vector {
  private diameter: number;
  private energy = 1;
  private p5: P5;

  constructor(p5: P5, diameter: number) {
    super();
    const x = p5.width / 2;
    const y = p5.random(30);
    this.set(x, y);
    this.diameter = diameter;
    this.p5 = p5;
  }

  // todo move to util
  private rand(min, max) {
    return Math.random() * (max - min) + min;
  }

  public tick() {
    this.add(-1 * this.energy, this.rand(-1, 1) * this.energy);
  }

  public draw() {
    this.p5.fill(255);
    this.p5.noStroke();
    this.p5.circle(this.x, this.y, this.diameter);
  }

  public finished() {
    return this.x <= 0;
  }

  public intersects(others: Particle[]) {
    for (const other of others) {
      const dx = other.x - this.x;
      const dy = other.y - this.y;
      const dsq = dx * dx + dy * dy;
      if (dsq < (this.diameter / 2) * (other.diameter / 2) * 4) {
        return true;
      }
    }
    return false;
  }
}
