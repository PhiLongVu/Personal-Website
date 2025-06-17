import React, { useEffect, useRef } from "react";
import Matter from "matter-js";

const { Engine, Render, World, Bodies, Constraint, Mouse, MouseConstraint } =
  Matter;

interface ParticleType {
  body: Matter.Body;
  show: (context: CanvasRenderingContext2D) => void;
}

function Particle(
  x: number,
  y: number,
  r: number,
  fixed: boolean
): ParticleType {
  const body = Bodies.circle(x, y, r, {
    isStatic: fixed,
    friction: 0,
    frictionAir: 0.01,
    restitution: 2,
    density: 0.1,
      render: {
    visible: true,  // hide the default rendering of this body
  }
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

const CursorFollower = ({ src = "/images/spacecat.png", size = 96 }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const requestRef = useRef<number>(0);

  useEffect(() => {
    if (!containerRef.current) return;

    // Use full window size (or you can customize)
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Create Matter.js engine and world
    const engine = Engine.create();
    const world = engine.world;
    world.gravity.y = 1;
    world.gravity.y = 0;
    world.gravity.x = 0;
    const thickness = 50; // enough so particles won't get stuck in edge

    const boundaries = [
      Bodies.rectangle(width / 2, -thickness / 2, width, thickness, {
        isStatic: true,
      }), // top
      Bodies.rectangle(width / 2, height + thickness / 2, width, thickness, {
        isStatic: true,
      }), // bottom
      Bodies.rectangle(-thickness / 2, height / 2, thickness, height, {
        isStatic: true,
      }), // left
      Bodies.rectangle(width + thickness / 2, height / 2, thickness, height, {
        isStatic: true,
      }), // right
    ];

    World.add(world, boundaries);

    // Create canvas renderer inside container div
    const render = Render.create({
      element: containerRef.current,
      engine,
      options: {
        width,
        height,
        wireframes: false,
        background: "transparent",
        pixelRatio: window.devicePixelRatio,
      },
    });

    // Create chain particles
    const particles: ParticleType[] = [];
    const chainLength = 8;
    const spacing = 20;
    const startX = width / 2;
    const startY = height / 4;

    let prev: ParticleType | null = null;
    for (let i = 0; i < chainLength; i++) {
      const fixed = i === 0; // top particle fixed (will follow mouse)
      const p = Particle(startX, startY + i * spacing, 1, fixed);
      particles.push(p);
      World.add(world, p.body);

      if (prev) {
        const constraint = Constraint.create({
          bodyA: p.body,
          bodyB: prev.body,
          length: spacing,
          stiffness: 0.5,
          damping: 0.1,
          render: {
            visible: false, // <-- add this line to hide the line
          },
        });
        World.add(world, constraint);
      }
      prev = p;
    }

    // Optionally add floor boundary to prevent falling off screen
    const floor = Bodies.rectangle(width / 2, height + 50, width, 100, {
      isStatic: true,
    });
    World.add(world, floor);

    // Get first and last particle bodies
    const firstParticle = particles[0].body;
    const lastParticle = particles[particles.length - 1].body;

    Engine.run(engine);
    Render.run(render);

    // Track mouse position globally
    const mousePosition = { x: startX, y: startY };

    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.x = e.clientX;
      mousePosition.y = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Render loop
    const renderLoop = () => {
      Engine.update(engine);

      // Force top particle to follow mouse exactly
      const currentPos = firstParticle.position;
      const t = 0.05; // smaller than 0.1 means slower movement
      const newX = lerp(currentPos.x, mousePosition.x, t);
      const newY = lerp(currentPos.y, mousePosition.y, t);
      Matter.Body.setPosition(firstParticle, { x: newX, y: newY });
      Matter.Body.setVelocity(firstParticle, { x: 0, y: 0 });

      // Clear canvas and redraw
      const ctx = render.context;
      ctx.clearRect(0, 0, width, height);

      // Optional: draw background if needed
      ctx.fillStyle = "transparent";
      ctx.fillRect(0, 0, width, height);

      // Draw chain particles as white circles

      // Update PNG image position to last particle's position
      if (imgRef.current) {
        const pos = lastParticle.position;
        imgRef.current.style.left = `${pos.x}px`;
        imgRef.current.style.top = `${pos.y}px`;
      }

      requestRef.current = requestAnimationFrame(renderLoop);
    };

    renderLoop();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      Render.stop(render);
      World.clear(world, false);
      Engine.clear(engine);
      render.canvas.remove();
      render.textures = {};
    };
  }, []);

  return (
    <>
      <div
        ref={containerRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          width: "100vw",
          height: "100vh",
          overflow: "visible",
          zIndex: 9999,
        }}
      />
      <img
        ref={imgRef}
        src={src}
        alt="cursor follower"
        style={{
          position: "fixed",
          pointerEvents: "none",
          width: size,
          height: "auto",
          userSelect: "none",
          transform: "translate(-50%, -50%)",
          zIndex: 10000,
          top: 0,
          left: 0,
        }}
      />
    </>
  );
};

export default CursorFollower;
function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}
