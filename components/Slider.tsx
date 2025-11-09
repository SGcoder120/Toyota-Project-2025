'use client';

interface SliderProps {
  min: number;
  max: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  step?: number;
}

export function Slider({ min, max, value, onChange, step = 1 }: SliderProps) {
  return (
    <div className="relative">
      <input
        type="range"
        min={min}
        max={max}
        value={value[0]}
        onChange={(e) => onChange([Number(e.target.value), value[1]])}
        step={step}
        className="w-full"
      />
      <input
        type="range"
        min={min}
        max={max}
        value={value[1]}
        onChange={(e) => onChange([value[0], Number(e.target.value)])}
        step={step}
        className="w-full"
      />
    </div>
  );
}

