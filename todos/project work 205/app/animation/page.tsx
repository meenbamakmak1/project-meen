'use client';

import { useEffect, useRef, useState } from "react";

type BallType = "none" | "basketball" | "football" | "volleyball" | "human";

const ballImages: Record<Exclude<BallType, "none">, string> = {
  basketball: "/animation/Basketball.png",
  football: "/animation/Football.png",
  volleyball: "/animation/Volleyball.png",
  human: "/animation/face.png",
};

export default function AnimationPage() {
  const fieldWidth = 640;
  const fieldHeight = 480;
  const ballSize = 100;
  const [ballType, setBallType] = useState<BallType>("none");
  const [isRunning, setIsRunning] = useState(false);
  const ballRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const positionRef = useRef({ x: 270, y: 190, vx: 3, vy: 2.4, rotation: 0 });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Space") {
        event.preventDefault();
        setIsRunning((running) => !running);
      }
      const types: Record<string, BallType> = {
        Digit1: "none", Digit2: "basketball", Digit3: "football", Digit4: "volleyball", Digit5: "human",
      };
      if (types[event.code]) setBallType(types[event.code]);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (!isRunning) return;
    const step = () => {
      const position = positionRef.current;
      position.x += position.vx;
      position.y += position.vy;
      if (position.x <= 0 || position.x + ballSize >= fieldWidth) {
        position.x = Math.max(0, Math.min(position.x, fieldWidth - ballSize));
        position.vx *= -1;
      }
      if (position.y <= 0 || position.y + ballSize >= fieldHeight) {
        position.y = Math.max(0, Math.min(position.y, fieldHeight - ballSize));
        position.vy *= -1;
      }
      position.rotation += position.vx > 0 ? 2 : -2;
      if (ballRef.current) {
        ballRef.current.style.transform = `translate(${position.x}px, ${position.y}px) rotate(${position.rotation}deg)`;
      }
      animationRef.current = requestAnimationFrame(step);
    };
    animationRef.current = requestAnimationFrame(step);
    return () => { if (animationRef.current !== null) cancelAnimationFrame(animationRef.current); };
  }, [isRunning]);

  const image = ballType === "none" ? undefined : ballImages[ballType];

  return (
    <section className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-center text-3xl font-bold text-gray-900">68052228 กฤษณะ ฮุสเซ็น</h1>
      <div className="mx-auto mt-5 max-w-[640px]">
        <div className="relative h-[min(480px,70vw)] w-full overflow-hidden rounded-xl border-2 border-gray-900 bg-cover bg-center" style={{ backgroundImage: "url('/animation/field.jpeg')" }}>
          <div ref={ballRef} className="absolute left-0 top-0 h-[100px] w-[100px] rounded-full border border-gray-900 bg-gray-200 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: image ? `url('${image}')` : undefined, transform: "translate(270px, 190px)" }} />
        </div>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <button type="button" onClick={() => setIsRunning((running) => !running)} className={`rounded-lg px-4 py-2 font-semibold text-white ${isRunning ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}`}>
            {isRunning ? "Stop" : "Run"} <kbd className="ml-1 rounded bg-white/20 px-1">Space</kbd>
          </button>
          <div className="flex flex-wrap justify-end gap-2">
            {(["none", "basketball", "football", "volleyball", "human"] as BallType[]).map((type) => (
              <button key={type} type="button" onClick={() => setBallType(type)} className={`rounded-lg border px-3 py-2 text-sm ${ballType === type ? "border-blue-600 bg-blue-600 text-white" : "border-gray-300 bg-white text-gray-700 hover:bg-gray-100"}`}>
                {type === "human" ? "Face" : type[0].toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <p className="mt-3 text-center text-sm text-gray-500">กด Space เพื่อเริ่ม/หยุด และกด 1–5 เพื่อเปลี่ยนวัตถุ</p>
      </div>
    </section>
  );
}
