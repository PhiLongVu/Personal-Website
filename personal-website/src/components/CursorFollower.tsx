import React, { useEffect, useRef } from "react";
import Matter from "matter-js";

const { Engine, World, Bodies, Constraint } = Matter;

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
    context.strokeStyle = "black"; // outline color
    context.lineWidth = 1; // optional: outline thickness
    context.stroke();
    context.restore();
  };

  return { body, show };
}

const CursorFollower = ({ src = "images/spacecat.webp", size = 96 }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const requestRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    // Set initial canvas size
    canvas.width = width;
    canvas.height = height;

    const engine = Engine.create();
    const world = engine.world;
    world.gravity.x = 0;
    world.gravity.y = 0;

    const particles: ParticleType[] = [];
    const chainLength = 15;
    const spacing = 10;
    const startX = width / 2;
    const startY = height / 2;

    let prev: ParticleType | null = null;
    for (let i = 0; i < chainLength; i++) {
      const fixed = i === 0;
      const p = Particle(startX, startY + i * spacing, 2, fixed);
      particles.push(p);
      World.add(world, p.body);

      if (prev) {
        const constraint = Constraint.create({
          bodyA: p.body,
          bodyB: prev.body,
          length: spacing,
          stiffness: 0.6,
          damping: 0.05,
        });
        World.add(world, constraint);
      }
      prev = p;
    }

    const mousePosition = { x: startX, y: startY };

    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.x = e.clientX;
      mousePosition.y = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;

      // Clamp particles inside viewport bounds
      particles.forEach((p) => {
        const pos = p.body.position;
        const clampedX = Math.min(Math.max(pos.x, 0), width);
        const clampedY = Math.min(Math.max(pos.y, 0), height);
        Matter.Body.setPosition(p.body, { x: clampedX, y: clampedY });
        Matter.Body.setVelocity(p.body, { x: 0, y: 0 });
      });
    };

    window.addEventListener("resize", handleResize);

    const renderLoop = () => {
      Engine.update(engine);

      // Smoothly move first particle to mouse
      const currentPos = particles[0].body.position;
      const t = 0.04;
      const newX = lerp(currentPos.x, mousePosition.x, t);
      const newY = lerp(currentPos.y, mousePosition.y, t);
      Matter.Body.setPosition(particles[0].body, { x: newX, y: newY });
      Matter.Body.setVelocity(particles[0].body, { x: 0, y: 0 });

      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => p.show(ctx));

      if (imgRef.current) {
        const pos = particles[particles.length - 1].body.position;
        imgRef.current.style.left = `${pos.x}px`;
        imgRef.current.style.top = `${pos.y}px`;
      }

      requestRef.current = requestAnimationFrame(renderLoop);
    };

    renderLoop();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(requestRef.current);
      World.clear(world, false);
      Engine.clear(engine);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-screen h-screen pointer-events-none -z-1"
      />
      <img
        ref={imgRef}
        src={src}
        alt="cursor follower"
        className="fixed pointer-events-none select-none -translate-x-1/2 -translate-y-1/2 top-0 left-0 z-0 h-auto"
        style={{ width: size}}
      />
    </>
  );
};

export default CursorFollower;

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}
