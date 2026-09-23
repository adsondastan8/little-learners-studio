import { useState } from "react";
import { MessageCircle, X } from "lucide-react";

/**
 * Coloque aqui o número de WhatsApp do suporte, com código do país e sem sinais.
 * Exemplo: "258840000000". Deixe vazio se ainda não tiver um número.
 */
export const WHATSAPP_NUMBER = "";

export function SupportButton() {
  const [open, setOpen] = useState(false);

  return (
    <div className="no-print fixed bottom-24 right-4 z-40 sm:bottom-6">
      {open ? (
        <div className="mb-3 w-72 rounded-3xl bg-card p-4 shadow-lift">
          <div className="flex items-start justify-between gap-2">
            <p className="text-base font-semibold text-foreground">
              Precisa de ajuda com o aplicativo?
            </p>
            <button
              type="button"
              aria-label="Fechar ajuda"
              onClick={() => setOpen(false)}
              className="rounded-full p-1 text-muted-foreground"
            >
              <X className="h-5 w-5" aria-hidden />
            </button>
          </div>
          {WHATSAPP_NUMBER ? (
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noreferrer"
              className="mt-4 flex min-h-12 items-center justify-center rounded-2xl bg-leaf text-base font-bold text-white"
            >
              Falar no WhatsApp
            </a>
          ) : (
            <p className="mt-3 rounded-2xl bg-secondary p-3 text-sm text-muted-foreground">
              Número de WhatsApp ainda não configurado.
            </p>
          )}
        </div>
      ) : null}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="ml-auto flex min-h-14 items-center gap-2 rounded-full bg-foreground px-5 text-base font-bold text-background shadow-lift active:scale-95"
      >
        <MessageCircle className="h-5 w-5" aria-hidden />
        Precisa de ajuda?
      </button>
    </div>
  );
}
