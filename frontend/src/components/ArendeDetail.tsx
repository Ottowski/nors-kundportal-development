import { useEffect, useRef, useState } from "react";
import { ApiError, UNKNOWN_ERROR_MESSAGE } from "../api/apiError";
import { deleteArende, getArende } from "../api/arendenApi";
import type { Arende } from "../types/arende";
import { formatDate } from "../utils/formatDate";
import { EDIT_DELETE_UNAVAILABLE_NOTE, isEditDeleteEnabled } from "../constants/features";
import { StatusBadge } from "./StatusBadge";
import { StatusSelect } from "./StatusSelect";

interface Props {
  id: number;
  onClose: () => void;
  onChanged: (arende: Arende) => void;
  onEdit: (arende: Arende) => void;
  onDeleted: (id: number) => void;
  // Open with the delete confirmation shown (row delete icon).
  confirmDelete?: boolean;
}

type State =
  { kind: "loading" } | { kind: "error"; message: string } | { kind: "loaded"; arende: Arende };

function errorMessage(error: unknown): string {
  return error instanceof ApiError ? error.message : UNKNOWN_ERROR_MESSAGE;
}

export function ArendeDetail({
  id,
  onClose,
  onChanged,
  onEdit,
  onDeleted,
  confirmDelete = false,
}: Props) {
  const editDelete = isEditDeleteEnabled();
  const [state, setState] = useState<State>({ kind: "loading" });
  const [confirming, setConfirming] = useState(confirmDelete && editDelete);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const currentId = useRef(id);
  currentId.current = id;

  useEffect(() => {
    let active = true;
    setState({ kind: "loading" });
    setConfirming(confirmDelete && editDelete);
    setDeleteError(null);
    getArende(id)
      .then((arende) => active && setState({ kind: "loaded", arende }))
      .catch(
        (error: unknown) => active && setState({ kind: "error", message: errorMessage(error) }),
      );
    return () => {
      active = false;
    };
  }, [id, confirmDelete, editDelete]);

  function handleChanged(arende: Arende) {
    // The user may have opened another case while the status request was in flight.
    if (arende.id === currentId.current) {
      setState({ kind: "loaded", arende });
    }
    onChanged(arende);
  }

  async function handleDelete() {
    setDeleting(true);
    setDeleteError(null);
    try {
      await deleteArende(id);
      onDeleted(id);
    } catch (error) {
      setDeleteError(errorMessage(error));
      setDeleting(false);
    }
  }

  return (
    <div className="detail">
      <div className="panel__top">
        <p className="eyebrow">Ärende #{id}</p>
        <button type="button" className="icon-button" onClick={onClose} aria-label="Stäng">
          ×
        </button>
      </div>

      {state.kind === "loading" && <p role="status">Laddar ärende…</p>}

      {state.kind === "error" && (
        <p role="alert" className="alert">
          {state.message}
        </p>
      )}

      {state.kind === "loaded" && (
        <>
          <h2>{state.arende.rubrik}</h2>
          <dl className="details">
            <dt>Id</dt>
            <dd>{state.arende.id}</dd>
            <dt>Status</dt>
            <dd>
              <StatusBadge status={state.arende.status} />
            </dd>
            <dt>Kategori</dt>
            <dd>{state.arende.kategori}</dd>
            <dt>Prioritet</dt>
            <dd>{state.arende.prioritet}</dd>
            <dt>Skapad</dt>
            <dd>
              <time dateTime={state.arende.skapad}>{formatDate(state.arende.skapad)}</time>
            </dd>
            <dt>Beskrivning</dt>
            <dd className="details__text">{state.arende.beskrivning}</dd>
          </dl>

          <StatusSelect arende={state.arende} onChanged={handleChanged} />

          {confirming ? (
            <div className="confirm" role="group" aria-label="Bekräfta borttagning">
              <p>Vill du ta bort ärendet? Det går inte att ångra.</p>
              <div className="actions">
                <button
                  type="button"
                  className="button button--danger"
                  onClick={handleDelete}
                  disabled={deleting}
                >
                  {deleting ? "Tar bort…" : "Ja, ta bort"}
                </button>
                <button
                  type="button"
                  className="button button--secondary"
                  onClick={() => setConfirming(false)}
                  disabled={deleting}
                >
                  Avbryt
                </button>
              </div>
            </div>
          ) : (
            <div className="actions">
              <button
                type="button"
                className="button"
                onClick={() => onEdit(state.arende)}
                disabled={!editDelete}
              >
                Redigera
              </button>
              <button
                type="button"
                className="button button--danger-outline"
                onClick={() => setConfirming(true)}
                disabled={!editDelete}
              >
                Ta bort
              </button>
            </div>
          )}

          {!editDelete && <p className="hint">{EDIT_DELETE_UNAVAILABLE_NOTE}</p>}

          {deleteError && (
            <p role="alert" className="alert">
              {deleteError}
            </p>
          )}
        </>
      )}
    </div>
  );
}
