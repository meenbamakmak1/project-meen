'use client';

import { useEffect, useState } from "react";

type Operator = "+" | "-";

export default function CalculatorPage() {
  const [display, setDisplay] = useState("0");
  const [first, setFirst] = useState<number | null>(null);
  const [operator, setOperator] = useState<Operator | null>(null);
  const [waitingForSecond, setWaitingForSecond] = useState(false);

  const clear = () => {
    setDisplay("0");
    setFirst(null);
    setOperator(null);
    setWaitingForSecond(false);
  };

  const addNumber = (number: number) => {
    if (waitingForSecond) {
      setDisplay(String(number));
      setWaitingForSecond(false);
      return;
    }

    setDisplay((current) => {
      if (current === "0") return String(number);
      return current.length < 9 ? `${current}${number}` : current;
    });
  };

  const chooseOperator = (nextOperator: Operator) => {
    const current = Number(display);

    if (first !== null && operator !== null && !waitingForSecond) {
      const result = operator === "+" ? first + current : first - current;
      setDisplay(String(result));
      setFirst(result);
    } else {
      setFirst(current);
    }

    setOperator(nextOperator);
    setWaitingForSecond(true);
  };

  const calculate = () => {
    if (first === null || operator === null) return;

    const second = waitingForSecond ? first : Number(display);
    const result = operator === "+" ? first + second : first - second;
    setDisplay(String(result));
    setFirst(result);
    setOperator(null);
    setWaitingForSecond(false);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") clear();
      else if (event.key === "Enter") calculate();
      else if (/^[0-9]$/.test(event.key)) addNumber(Number(event.key));
      else if (event.key === "+" || event.key === "-") chooseOperator(event.key);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  const rows = [
    [7, 8, 9],
    [4, 5, 6],
    [1, 2, 3],
    [0],
  ];
  const memoryButtons: { label: string; action?: () => void }[] = [
    { label: "MC" },
    { label: "MR" },
    { label: "M+" },
    { label: "M-" },
    { label: "CE", action: clear },
  ];

  return (
    <section className="mx-auto flex max-w-sm justify-center px-4 py-10">
      <div className="w-full rounded-[18px] border-[3px] border-pink-600 bg-pink-700 p-2">
        <div className="rounded-[15px] border-[5px] border-pink-700 bg-gradient-to-br from-pink-50 to-pink-300 p-3">
          <h1 className="mb-3 text-center text-2xl font-bold text-pink-950">Calculator</h1>
          <output className="flex h-12 items-center justify-end overflow-hidden rounded-xl border border-pink-700 bg-pink-50 px-3 text-3xl font-medium text-pink-950" aria-live="polite">
            {Number(display).toLocaleString("en-US")}
          </output>

          <div className="mt-2 grid grid-cols-5 gap-1.5">
            {memoryButtons.map(({ label, action }) => (
              <button key={label} type="button" disabled={!action} onClick={action} className="h-11 rounded-lg border border-pink-700 bg-gradient-to-b from-pink-50 to-pink-300 font-bold text-pink-950 disabled:cursor-not-allowed disabled:opacity-60">
                {label}
              </button>
            ))}
            {rows.slice(0, 3).flatMap((row) => row).map((number) => (
              <button key={number} type="button" onClick={() => addNumber(number)} className="h-11 rounded-lg border border-pink-700 bg-gradient-to-b from-pink-50 to-pink-200 text-lg font-bold text-pink-950 hover:brightness-105">
                {number}
              </button>
            ))}
            <button type="button" disabled className="h-11 rounded-lg border border-pink-700 bg-gradient-to-b from-pink-50 to-pink-300 font-bold text-pink-950 disabled:opacity-60">÷</button>
            <button type="button" disabled className="h-11 rounded-lg border border-pink-700 bg-gradient-to-b from-pink-50 to-pink-300 font-bold text-pink-950 disabled:opacity-60">√</button>
            <button type="button" disabled className="h-11 rounded-lg border border-pink-700 bg-gradient-to-b from-pink-50 to-pink-300 font-bold text-pink-950 disabled:opacity-60">×</button>
            <button type="button" disabled className="h-11 rounded-lg border border-pink-700 bg-gradient-to-b from-pink-50 to-pink-300 font-bold text-pink-950 disabled:opacity-60">%</button>
            <button type="button" onClick={() => chooseOperator("-")} className="h-11 rounded-lg border border-pink-700 bg-gradient-to-b from-pink-50 to-pink-300 text-lg font-bold text-pink-950">−</button>
            <button type="button" disabled className="h-11 rounded-lg border border-pink-700 bg-gradient-to-b from-pink-50 to-pink-300 font-bold text-pink-950 disabled:opacity-60">1/x</button>
            <button type="button" onClick={() => addNumber(0)} className="h-11 rounded-lg border border-pink-700 bg-gradient-to-b from-pink-50 to-pink-200 text-lg font-bold text-pink-950">0</button>
            <button type="button" disabled className="h-11 rounded-lg border border-pink-700 bg-gradient-to-b from-pink-50 to-pink-200 font-bold text-pink-950 disabled:opacity-60">.</button>
            <button type="button" disabled className="h-11 rounded-lg border border-pink-700 bg-gradient-to-b from-pink-50 to-pink-200 font-bold text-pink-950 disabled:opacity-60">+/−</button>
            <button type="button" onClick={() => chooseOperator("+")} className="h-11 rounded-lg border border-pink-700 bg-gradient-to-b from-pink-50 to-pink-300 text-lg font-bold text-pink-950">+</button>
            <button type="button" onClick={calculate} className="h-11 rounded-lg border border-pink-700 bg-gradient-to-b from-pink-50 to-pink-300 text-lg font-bold text-pink-950">=</button>
          </div>
        </div>
        <p className="py-2 text-center font-mono text-sm text-white">68052228 กฤษณะ ฮุสเซ็น</p>
      </div>
    </section>
  );
}
