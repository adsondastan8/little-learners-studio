import { Link } from "@tanstack/react-router";
import { PartyPopper, Star } from "lucide-react";

const MESSAGES = [
  "Excelente! 👏",
  "Muito bem!",
  "Mais uma etapa concluída! 🎉",
  "Você está avançando!",
];

export function celebrationMessage(seed: number): string {
  return MESSAGES[seed % MESSAGES.length] ?? "Muito bem!";
}

type Props = {
  open: boolean;
  message: string;
  stars: number;
  nextId: string | null;
  onClose: () => void;
};

export function CelebrationModal({ open, message, stars, nextId, onClose }: Props) {
  if (!open) return null;
  return (
    <div className="no-print fixed inset-0 z-50 flex items-end justify-center bg-foreground/40 p-4 sm:items-center">
      <div
        role="dialog"
        aria-modal="true"
        className="w-full max-w-md animate-pop rounded-3xl bg-card p-6 text-center shadow-lift"
      >
        <div className="mx-auto flex h-16 w-16 animate-bounce-soft items-center justify-center rounded-full bg-sun/25">
          <PartyPopper className="h-8 w-8 text-tangerine" aria-hidden />
        </div>
        <h2 className="mt-4 font-display text-2xl font-bold text-foreground">{message}</h2>
        <p className="mt-2 inline-flex items-center gap-2 rounded-full bg-sun/20 px-4 py-1 text-sm font-semibold text-foreground">
          <Star className="h-4 w-4 fill-current text-sun" aria-hidden /> {stars} estrelas
        </p>
        <div className="mt-6 space-y-3">
          {nextId ? (
            <Link
              to="/atividade/$activityId"
              params={{ activityId: nextId }}
              onClick={onClose}
              className="flex min-h-14 w-full items-center justify-center rounded-2xl bg-primary text-lg font-bold text-primary-foreground active:scale-[0.98]"
            >
              Próxima atividade →
            </Link>
          ) : (
            <Link
              to="/progresso"
              onClick={onClose}
              className="flex min-h-14 w-full items-center justify-center rounded-2xl bg-primary text-lg font-bold text-primary-foreground active:scale-[0.98]"
            >
              Ver o meu progresso →
            </Link>
          )}
          <button
            type="button"
            onClick={onClose}
            className="min-h-12 w-full rounded-2xl border-2 border-border bg-card text-base font-semibold text-foreground"
          >
            Ficar aqui
          </button>
        </div>
      </div>
    </div>
  );
}
