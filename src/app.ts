import P5 from "p5";
import "p5/lib/addons/p5.dom";

import { Particle } from "./Particle";

var sketch = (p: P5) => {
  let snowflake: Particle[] = [];
  let activeParticle: Particle = new Particle(p, 10);

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };

  p.draw = () => {
    p.background(0);
    p.translate(p.width / 2, p.height / 2);

    while (
      !activeParticle.finished() &&
      !activeParticle.intersects(snowflake)
    ) {
      activeParticle.tick();
    }
    snowflake.push(activeParticle);
    activeParticle = new Particle(p, 10);

    activeParticle.draw();
    snowflake.forEach((c) => {
      c.draw();
    });
    for (let i = 0; i < 6; i++) {
      p.push();
      p.rotate(p.PI / 3);
      activeParticle.draw();
      snowflake.forEach((c) => {
        c.draw();
      });
      p.pop();
    }
  };
};

new P5(sketch);
