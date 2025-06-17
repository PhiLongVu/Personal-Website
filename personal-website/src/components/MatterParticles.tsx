import React, { useEffect, useRef } from "react";
import Matter from "matter-js";
import type { Body } from "matter-js";

const { Engine, Render, World, Bodies, Constraint, Mouse, MouseConstraint } = Matter;

interface ParticleType {
  body: Body;
  show: (context: CanvasRenderingContext2D) => void;
}

function Particle(x: number, y: number, r: number, fixed: boolean): ParticleType {
  const body = Bodies.circle(x, y, r, {
    isStatic: fixed,
    friction: 0,
    frictionAir: 0.02,
    restitution: 0.8,
  });

  const show = (context: CanvasRenderingContext2D) => {
    const pos = body.position;
    const angle = body.angle;
    context.save();
    context.translate(pos.x, pos.y);
    context.rotate(angle);
    context.fillStyle = "white";
    context.beginPath();
    context.arc(0, 0, r, 0, 2 * Math.PI);
    context.fill();
    context.restore();
  };

  return { body, show };
}

interface BoundaryType {
  body: Body;
  show: (context: CanvasRenderingContext2D) => void;
}

function Boundary(x: number, y: number, w: number, h: number, a: number): BoundaryType {
  const body = Bodies.rectangle(x, y, w, h, { isStatic: true, angle: a });

  const show = (context: CanvasRenderingContext2D) => {
    const pos = body.position;
    const angle = body.angle;
    context.save();
    context.translate(pos.x, pos.y);
    context.rotate(angle);
    context.fillStyle = "grey";
    context.fillRect(-w / 2, -h / 2, w, h);
    context.restore();
  };

  return { body, show };
}

const MatterParticles = () => {
  const sceneRef = useRef<HTMLDivElement | null>(null);
  const requestRef = useRef<number>(0);

  useEffect(() => {
    if (!sceneRef.current) return;

    const width = 400;
    const height = 400;

    // Create engine and world
    const engine = Engine.create();
    const world = engine.world;
    world.gravity.y = 1;

    // Create renderer
    const render = Render.create({
      element: sceneRef.current,
      engine,
      options: {
        width,
        height,
        wireframes: false,
        background: "#333",
      },
    });

    // Create particles and constraints
    const particles: ParticleType[] = [];
    const boundaries: BoundaryType[] = [];

    let prev: ParticleType | null = null;
    for (let x = 200; x < 400; x += 20) {
      const fixed = prev === null; // first particle fixed
      const p = Particle(x, 100, 10, fixed);
      particles.push(p);
      World.add(world, p.body);

      if (prev) {
        const options = {
          bodyA: p.body,
          bodyB: prev.body,
          length: 20,
          stiffness: 0.4,
          damping: 0.1, // added slight damping for stability
        };
        const constraint = Constraint.create(options);
        World.add(world, constraint);
      }
      prev = p;
    }

    boundaries.push(Boundary(width / 2, height, width, 20, 0));
    boundaries.forEach((b) => World.add(world, b.body));

    // Add mouse control
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false },
      },
    });
    World.add(world, mouseConstraint);

    // Store last particle's body
    const lastParticleBody = particles[particles.length - 1].body;

    Engine.run(engine);
    Render.run(render);

    // Custom render loop
    const renderLoop = () => {
      Engine.update(engine);

      // Only move last particle if mouse is inside canvas and not dragging last particle itself
      if (
        mouse.position.x > 0 &&
        mouse.position.x < width &&
        mouse.position.y > 0 &&
        mouse.position.y < height &&
        mouseConstraint.body !== lastParticleBody
      ) {
        // Move last particle to mouse position (snap)
        Matter.Body.setPosition(lastParticleBody, mouse.position);
        Matter.Body.setVelocity(lastParticleBody, { x: 0, y: 0 });
      }

      const context = render.context;
      context.clearRect(0, 0, width, height);

      // Background fill
      context.fillStyle = "#333";
      context.fillRect(0, 0, width, height);

      // Draw boundaries and particles
      boundaries.forEach((b) => b.show(context));
      particles.forEach((p) => p.show(context));

      // Draw line when dragging other bodies except last particle
      if (mouseConstraint.body && mouseConstraint.body !== lastParticleBody) {
        const pos = mouseConstraint.body.position;
        const offset = mouseConstraint.constraint.pointB;
        const m = mouse.position;
        context.strokeStyle = "lime";
        context.lineWidth = 2;
        context.beginPath();
        context.moveTo(pos.x + offset.x, pos.y + offset.y);
        context.lineTo(m.x, m.y);
        context.stroke();
      }

      requestRef.current = requestAnimationFrame(renderLoop);
    };

    renderLoop();

    // Cleanup
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      Render.stop(render);
      World.clear(world, false);
      Engine.clear(engine);
      render.canvas.remove();
      render.textures = {};
    };
  }, []);

  return <div ref={sceneRef} />;
};

export default MatterParticles;
