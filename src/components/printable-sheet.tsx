import type { Printable } from "@/lib/printables";

function SheetHeader({ title }: { title: string }) {
  return (
    <header className="mb-8 border-b-2 border-black/70 pb-4">
      <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
      <div className="mt-4 flex flex-wrap gap-6 text-base">
        <span>Nome: ______________________________</span>
        <span>Data: ____ / ____ / ______</span>
      </div>
    </header>
  );
}

function WriteLines({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-8">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="border-b-2 border-black/50 pt-8" />
      ))}
    </div>
  );
}

/** Ficha educacional em A4 vertical, pronta para imprimir ou guardar como PDF. */
export function PrintableSheet({ item }: { item: Printable }) {
  return (
    <article className="sheet mx-auto w-full max-w-[820px] bg-white p-8 text-black sm:p-12">
      <SheetHeader title={item.title} />

      {item.kind === "trace" ? (
        <section className="space-y-10">
          <div className="avoid-break">
            <h2 className="mb-3 text-lg font-semibold">Trace a letra:</h2>
            {(item.letters ?? []).map((letter) => (
              <div key={letter} className="avoid-break mb-6 border-b-2 border-dashed border-black/40 pb-3">
                <div className="flex flex-wrap items-end gap-6 text-6xl font-bold text-black/25">
                  {[0, 1, 2, 3].map((i) => (
                    <span key={i}>{letter}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="avoid-break">
            <h2 className="mb-4 text-lg font-semibold">Agora escreva sozinho:</h2>
            <WriteLines count={3} />
          </div>
        </section>
      ) : null}

      {item.kind === "lines" ? (
        <section className="space-y-10">
          {(item.letters ?? []).map((letter) => (
            <div key={letter} className="avoid-break">
              <h2 className="mb-3 text-lg font-semibold">Escreva: {letter}</h2>
              <WriteLines count={3} />
            </div>
          ))}
        </section>
      ) : null}

      {item.kind === "draw" ? (
        <section className="avoid-break">
          <h2 className="mb-4 text-lg font-semibold">Desenhe e pinte</h2>
          <div className="h-[520px] w-full rounded-lg border-2 border-black/60" />
          <p className="mt-4 text-base">Conte o que desenhou: ____________________________</p>
        </section>
      ) : null}

      {item.kind === "match" ? (
        <section className="avoid-break">
          <h2 className="mb-6 text-lg font-semibold">Ligue a palavra à imagem</h2>
          <div className="grid grid-cols-2 gap-x-16 gap-y-10">
            <ul className="space-y-10 text-3xl font-bold">
              {(item.pairs ?? []).map((p) => (
                <li key={p.word}>{p.word} •</li>
              ))}
            </ul>
            <ul className="space-y-10 text-3xl">
              {[...(item.pairs ?? [])].reverse().map((p) => (
                <li key={p.word}>• {p.emoji}</li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {item.kind === "review" ? (
        <section className="space-y-10">
          <div className="avoid-break">
            <h2 className="mb-3 text-lg font-semibold">1. Trace as letras</h2>
            <div className="flex flex-wrap gap-8 text-6xl font-bold text-black/25">
              {(item.letters ?? []).map((l) => (
                <span key={l}>{l}</span>
              ))}
            </div>
          </div>
          <div className="avoid-break">
            <h2 className="mb-3 text-lg font-semibold">2. Copie as palavras</h2>
            <p className="mb-3 text-3xl font-bold tracking-widest">{(item.words ?? []).join("    ")}</p>
            <WriteLines count={2} />
          </div>
          <div className="avoid-break">
            <h2 className="mb-3 text-lg font-semibold">3. Faça um desenho</h2>
            <div className="h-64 w-full rounded-lg border-2 border-black/60" />
          </div>
        </section>
      ) : null}
    </article>
  );
}
