import { useCallback, useEffect, useMemo, useState } from "react";
import "./App.css";
import { ApiError, UNKNOWN_ERROR_MESSAGE } from "./api/apiError";
import { listArenden } from "./api/arendenApi";
import { ArendeDetail } from "./components/ArendeDetail";
import { ArendeForm } from "./components/ArendeForm";
import { ArendeList } from "./components/ArendeList";
import { SearchFilterBar } from "./components/SearchFilterBar";
import type { Arende, ArendeFilter } from "./types/arende";
import { filterArenden, sortNewestFirst } from "./utils/filterArenden";

type ListState =
  { kind: "loading" } | { kind: "error"; message: string } | { kind: "loaded"; arenden: Arende[] };

type Panel =
  | { kind: "closed" }
  | { kind: "view"; id: number; confirmDelete?: boolean }
  | { kind: "edit"; arende: Arende }
  | { kind: "create" };

const PANEL_LABEL: Record<Exclude<Panel["kind"], "closed">, string> = {
  view: "Ärendedetaljer",
  edit: "Redigera ärende",
  create: "Nytt ärende",
};

function App() {
  const [list, setList] = useState<ListState>({ kind: "loading" });
  const [filter, setFilter] = useState<ArendeFilter>({});
  const [panel, setPanel] = useState<Panel>({ kind: "closed" });
  const [notice, setNotice] = useState<string | null>(null);

  const load = useCallback(() => {
    setList({ kind: "loading" });
    listArenden()
      .then((arenden) => setList({ kind: "loaded", arenden }))
      .catch((error: unknown) =>
        setList({
          kind: "error",
          message: error instanceof ApiError ? error.message : UNKNOWN_ERROR_MESSAGE,
        }),
      );
  }, []);

  useEffect(load, [load]);

  // Keep local list in sync from API responses instead of refetching.
  const upsert = useCallback((arende: Arende) => {
    setList((prev) =>
      prev.kind === "loaded"
        ? { kind: "loaded", arenden: [...prev.arenden.filter((a) => a.id !== arende.id), arende] }
        : prev,
    );
  }, []);

  function open(next: Panel) {
    setNotice(null);
    setPanel(next);
  }

  function handleSaved(arende: Arende) {
    upsert(arende);
    open({ kind: "view", id: arende.id });
  }

  function handleDeleted(id: number) {
    setList((prev) =>
      prev.kind === "loaded"
        ? { kind: "loaded", arenden: prev.arenden.filter((a) => a.id !== id) }
        : prev,
    );
    setPanel({ kind: "closed" });
    setNotice("Ärendet togs bort.");
  }

  const close = () => setPanel({ kind: "closed" });

  const visible = useMemo(
    () => (list.kind === "loaded" ? sortNewestFirst(filterArenden(list.arenden, filter)) : []),
    [list, filter],
  );
  const hasFilter = Boolean(
    filter.q?.trim() || filter.status || filter.kategori || filter.prioritet,
  );
  const selectedId =
    panel.kind === "view" ? panel.id : panel.kind === "edit" ? panel.arende.id : null;

  return (
    <div className="app">
      <header className="app__header">
        <div>
          <p className="eyebrow">NORS · Kundserviceportalen</p>
          <h1>Alla ärenden</h1>
        </div>
        <button type="button" className="button" onClick={() => open({ kind: "create" })}>
          <span aria-hidden="true">+</span> Nytt ärende
        </button>
      </header>

      <div className={panel.kind === "closed" ? "layout" : "layout layout--with-panel"}>
        <main className="card">
          <SearchFilterBar onChange={setFilter} />
          {notice && (
            <p role="status" className="notice">
              {notice}
            </p>
          )}
          {list.kind === "loading" && <p role="status">Laddar ärenden…</p>}
          {list.kind === "error" && (
            <div role="alert" className="alert">
              <p>{list.message}</p>
              <button type="button" className="button button--secondary" onClick={load}>
                Försök igen
              </button>
            </div>
          )}
          {list.kind === "loaded" && (
            <ArendeList
              arenden={visible}
              hasFilter={hasFilter}
              selectedId={selectedId}
              onSelect={(id) => open({ kind: "view", id })}
              onEdit={(arende) => open({ kind: "edit", arende })}
              onDelete={(id) => open({ kind: "view", id, confirmDelete: true })}
            />
          )}
        </main>

        {panel.kind !== "closed" && (
          <aside className="card panel" aria-label={PANEL_LABEL[panel.kind]}>
            {panel.kind === "view" && (
              <ArendeDetail
                id={panel.id}
                confirmDelete={panel.confirmDelete}
                onClose={close}
                onChanged={upsert}
                onEdit={(arende) => open({ kind: "edit", arende })}
                onDeleted={handleDeleted}
              />
            )}
            {panel.kind === "edit" && (
              <ArendeForm
                key={panel.arende.id}
                arende={panel.arende}
                onSaved={handleSaved}
                onCancel={() => open({ kind: "view", id: panel.arende.id })}
              />
            )}
            {panel.kind === "create" && <ArendeForm onSaved={handleSaved} onCancel={close} />}
          </aside>
        )}
      </div>
    </div>
  );
}

export default App;
