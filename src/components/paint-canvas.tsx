import { useEffect, useRef, useState } from "react";
import { Eraser, Palette, RotateCcw, Trash2 } from "lucide-react";

type Stroke = { color: string; size: number; points: { x: number; y: number }[] };

const PALETTE = ["#1f3b73", "#e8a13a", "#3f9d5c", "#e2703a", "#c4437f", "#2b2b2b"];

type Props = {
  /** Letra ou forma desenhada como guia (modo traçado). */
  guide?: string | undefined;
  /** Mostra linhas de escrita (modo escrita). */
  lines?: boolean | undefined;
  /** Mostra seletor de cores e espessura (modo desenho). */
  colors?: boolean | undefined;
};

export function PaintCanvas({ guide, lines, colors }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const strokesRef = useRef<Stroke[]>([]);
  const drawingRef = useRef(false);
  const [color, setColor] = useState<string>("#1f3b73");
  const [size, setSize] = useState(10);
  const [tick, setTick] = useState(0);

  const redraw = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const { width, height } = canvas;
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);

    if (lines) {
      ctx.strokeStyle = "#cfd8e6";
      ctx.lineWidth = 2;
      for (let i = 1; i <= 3; i++) {
        const y = (height / 4) * i;
        ctx.setLineDash(i === 2 ? [8, 10] : []);
        ctx.beginPath();
        ctx.moveTo(24, y);
        ctx.lineTo(width - 24, y);
        ctx.stroke();
      }
      ctx.setLineDash([]);
    }

    if (guide) {
      ctx.save();
      ctx.font = `bold ${Math.min(height * 0.7, width / Math.max(guide.length, 1) * 1.2)}px "Baloo 2", system-ui, sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#e3ecf7";
      ctx.fillText(guide, width / 2, height / 2);
      ctx.strokeStyle = "#a9c2e0";
      ctx.setLineDash([10, 12]);
      ctx.lineWidth = 3;
      ctx.strokeText(guide, width / 2, height / 2);
      ctx.restore();
    }

    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    for (const stroke of strokesRef.current) {
      ctx.strokeStyle = stroke.color;
      ctx.lineWidth = stroke.size;
      ctx.beginPath();
      stroke.points.forEach((p, i) => (i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)));
      const first = stroke.points[0];
      if (stroke.points.length === 1 && first) {
        ctx.arc(first.x, first.y, stroke.size / 2, 0, Math.PI * 2);
        ctx.fillStyle = stroke.color;
        ctx.fill();
      }
      ctx.stroke();
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.round(rect.width);
      canvas.height = Math.round(rect.height);
      redraw();
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [guide, lines]);

  useEffect(redraw, [tick, guide, lines]);

  const pos = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  return (
    <div className="space-y-4">
      <canvas
        ref={canvasRef}
        aria-label="Área de desenho"
        className="h-64 w-full touch-none rounded-3xl border-2 border-border bg-white shadow-soft sm:h-80"
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId);
          drawingRef.current = true;
          strokesRef.current.push({ color, size, points: [pos(e)] });
          setTick((t) => t + 1);
        }}
        onPointerMove={(e) => {
          if (!drawingRef.current) return;
          strokesRef.current[strokesRef.current.length - 1]?.points.push(pos(e));
          setTick((t) => t + 1);
        }}
        onPointerUp={() => (drawingRef.current = false)}
        onPointerLeave={() => (drawingRef.current = false)}
      />

      {colors ? (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
            <Palette className="h-4 w-4" aria-hidden /> Cores
          </div>
          <div className="flex flex-wrap gap-3">
            {PALETTE.map((c) => (
              <button
                key={c}
                type="button"
                aria-label={`Escolher cor ${c}`}
                onClick={() => setColor(c)}
                style={{ backgroundColor: c }}
                className={`h-11 w-11 rounded-full border-4 transition-transform active:scale-95 ${
                  color === c ? "border-foreground scale-110" : "border-white"
                }`}
              />
            ))}
            <button
              type="button"
              aria-label="Apagar"
              onClick={() => setColor("#ffffff")}
              className="flex h-11 w-11 items-center justify-center rounded-full border-4 border-white bg-secondary"
            >
              <Eraser className="h-5 w-5" aria-hidden />
            </button>
          </div>
          <label className="block text-sm font-semibold text-muted-foreground">
            Tamanho do pincel
            <input
              type="range"
              min={4}
              max={36}
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              className="mt-2 w-full accent-primary"
            />
          </label>
        </div>
      ) : null}

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => {
            strokesRef.current.pop();
            setTick((t) => t + 1);
          }}
          className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-2xl border-2 border-border bg-card px-4 text-base font-semibold text-foreground active:scale-[0.98]"
        >
          <RotateCcw className="h-5 w-5" aria-hidden /> Desfazer
        </button>
        <button
          type="button"
          onClick={() => {
            strokesRef.current = [];
            setTick((t) => t + 1);
          }}
          className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-2xl border-2 border-border bg-card px-4 text-base font-semibold text-foreground active:scale-[0.98]"
        >
          <Trash2 className="h-5 w-5" aria-hidden /> Limpar
        </button>
      </div>
    </div>
  );
}
