import { useEffect, useState } from "react";
import { allActivities } from "./curriculum";

export type ProgressState = {
  completedActivities: string[];
  completedModules: string[];
  lastActivity: string | null;
  stars: number;
  streakDays: number;
  lastDay: string | null;
  started: boolean;
};

const KEY = "aprender-progresso-v1";

const empty: ProgressState = {
  completedActivities: [],
  completedModules: [],
  lastActivity: null,
  stars: 0,
  streakDays: 0,
  lastDay: null,
  started: false,
};

let state: ProgressState = empty;
let loaded = false;
const listeners = new Set<() => void>();

function read(): ProgressState {
  if (typeof window === "undefined") return empty;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return empty;
    return { ...empty, ...(JSON.parse(raw) as Partial<ProgressState>) };
  } catch {
    return empty;
  }
}

function write(next: ProgressState) {
  state = next;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* armazenamento indisponível */
  }
  listeners.forEach((l) => l());
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

/** Hook de progresso persistido no localStorage. */
export function useProgress() {
  const [snapshot, setSnapshot] = useState<ProgressState>(state);

  useEffect(() => {
    if (!loaded) {
      loaded = true;
      state = read();
    }
    setSnapshot(state);
    const listener = () => setSnapshot({ ...state });
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  const total = allActivities.length;
  const done = snapshot.completedActivities.length;

  return {
    ...snapshot,
    total,
    done,
    percent: total === 0 ? 0 : Math.round((done / total) * 100),
    isCompleted: (id: string) => snapshot.completedActivities.includes(id),
    isUnlocked: (id: string) => {
      const index = allActivities.findIndex((a) => a.id === id);
      if (index <= 0) return true;
      const previous = allActivities[index - 1];
      return previous ? snapshot.completedActivities.includes(previous.id) : true;
    },
    markStarted: () => write({ ...state, started: true }),
    visit: (id: string) => write({ ...state, lastActivity: id, started: true }),
    complete: (id: string) => {
      const already = state.completedActivities.includes(id);
      const completedActivities = already
        ? state.completedActivities
        : [...state.completedActivities, id];
      const completedModules = Array.from(
        new Set(
          allActivities
            .map((a) => a.moduleId)
            .filter((moduleId) =>
              allActivities
                .filter((a) => a.moduleId === moduleId)
                .every((a) => completedActivities.includes(a.id)),
            ),
        ),
      );
      const day = today();
      const streakDays =
        state.lastDay === day
          ? Math.max(1, state.streakDays)
          : state.lastDay === null
            ? 1
            : state.streakDays + 1;
      write({
        ...state,
        completedActivities,
        completedModules,
        lastActivity: id,
        stars: already ? state.stars : state.stars + 1,
        streakDays,
        lastDay: day,
        started: true,
      });
    },
    reset: () => write({ ...empty }),
  };
}
