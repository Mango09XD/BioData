const KEY = 'biodata.v4';
const defaults = () => ({
  schema: 1,
  theme: null,
  favorites: [],
  recent: [],
  read: [],
  scores: {},
  experiments: [],
  routes: [],
});
export function createStore(storage, onUnavailable = () => {}) {
  let state = defaults(),
    available = true;
  try {
    storage ??= globalThis.localStorage;
    const raw = storage.getItem(KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
      for (const key of ['favorites', 'read', 'experiments', 'routes'])
        if (Array.isArray(parsed[key]))
          state[key] = [...new Set(parsed[key].filter((x) => typeof x === 'string'))].slice(0, 500);
      if (Array.isArray(parsed.recent))
        state.recent = parsed.recent
          .filter(
            (x) =>
              x &&
              typeof x.id === 'string' &&
              typeof x.title === 'string' &&
              typeof x.date === 'string',
          )
          .slice(0, 20);
      if (['dark', 'light'].includes(parsed.theme)) state.theme = parsed.theme;
      if (parsed.scores && typeof parsed.scores === 'object')
        for (const [id, s] of Object.entries(parsed.scores)) {
          if (
            s &&
            Number.isInteger(s.correct) &&
            Number.isInteger(s.total) &&
            s.total > 0 &&
            s.correct >= 0 &&
            s.correct <= s.total
          )
            state.scores[id] = s;
        }
    }
    if (!raw) {
      const old = JSON.parse(storage.getItem('biodata.library.read') || '[]');
      if (Array.isArray(old)) state.read = old.filter((x) => typeof x === 'string' && x !== 'sql');
      const t = storage.getItem('biodata.v2.theme');
      if (['dark', 'light'].includes(t)) state.theme = t;
      const previous = JSON.parse(storage.getItem('biodata.v2.progress') || '[]');
      if (Array.isArray(previous)) {
        const mapping = {
          celulas: 'fundamentos',
          explorador: 'herencia',
          tabla: 'materia',
          organismos: 'ambiente',
        };
        state.routes = [...new Set(previous.map((id) => mapping[id]).filter(Boolean))];
      }
    }
  } catch {
    available = false;
  }
  const listeners = new Set();
  function save() {
    try {
      storage.setItem(KEY, JSON.stringify(state));
    } catch {
      if (available) onUnavailable();
      available = false;
    }
    listeners.forEach((fn) => fn());
  }
  return {
    get snapshot() {
      return structuredClone(state);
    },
    get available() {
      return available;
    },
    subscribe(fn) {
      listeners.add(fn);
      return () => listeners.delete(fn);
    },
    setTheme(theme) {
      state.theme = theme;
      save();
    },
    hasFavorite(id) {
      return state.favorites.includes(id);
    },
    toggleFavorite(id) {
      const found = state.favorites.includes(id);
      state.favorites = found ? state.favorites.filter((x) => x !== id) : [id, ...state.favorites];
      save();
      return !found;
    },
    visit(id, title) {
      state.recent = [
        { id, title, date: new Date().toISOString() },
        ...state.recent.filter((x) => x.id !== id),
      ].slice(0, 20);
      save();
    },
    markRead(id) {
      if (!state.read.includes(id)) state.read.push(id);
      save();
    },
    score(id, correct, total) {
      if (!state.scores[id] || correct / total > state.scores[id].correct / state.scores[id].total)
        state.scores[id] = { correct, total, date: new Date().toISOString() };
      save();
    },
    experiment(id) {
      if (!state.experiments.includes(id)) state.experiments.push(id);
      save();
    },
    toggleRoute(id) {
      state.routes = state.routes.includes(id)
        ? state.routes.filter((x) => x !== id)
        : [...state.routes, id];
      save();
    },
    clear() {
      const theme = state.theme;
      state = defaults();
      state.theme = theme;
      save();
    },
  };
}
