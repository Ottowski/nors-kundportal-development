import type { Arende } from "../types/arende";
import { formatDate } from "../utils/formatDate";
import { EDIT_DELETE_UNAVAILABLE, isEditDeleteEnabled } from "../constants/features";
import { DeleteIcon, EditIcon } from "./icons";
import { StatusBadge } from "./StatusBadge";

interface Props {
  arenden: readonly Arende[];
  hasFilter: boolean;
  selectedId: number | null;
  onSelect: (id: number) => void;
  onEdit: (arende: Arende) => void;
  onDelete: (id: number) => void;
}

export function ArendeList({ arenden, hasFilter, selectedId, onSelect, onEdit, onDelete }: Props) {
  const editDelete = isEditDeleteEnabled();

  if (arenden.length === 0) {
    return (
      <p className="empty" role="status">
        {hasFilter ? "Inga ärenden matchar" : "Inga ärenden ännu"}
      </p>
    );
  }

  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Rubrik</th>
          <th scope="col">Status</th>
          <th scope="col">Prioritet</th>
          <th scope="col">Skapad</th>
          <th scope="col" className="table__actions">
            Åtgärder
          </th>
        </tr>
      </thead>
      <tbody>
        {arenden.map((arende) => {
          const selected = arende.id === selectedId;
          return (
            // Whole row is clickable for mouse users; the title button gives keyboard access.
            <tr
              key={arende.id}
              className={selected ? "table__row table__row--selected" : "table__row"}
              onClick={() => onSelect(arende.id)}
            >
              <td>
                <button
                  type="button"
                  className="link"
                  aria-current={selected ? "true" : undefined}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelect(arende.id);
                  }}
                >
                  {arende.rubrik}
                </button>
              </td>
              <td>
                <StatusBadge status={arende.status} />
              </td>
              <td>{arende.prioritet}</td>
              <td>
                <time dateTime={arende.skapad}>{formatDate(arende.skapad)}</time>
              </td>
              <td className="table__actions">
                <button
                  type="button"
                  className="icon-button icon-button--small"
                  aria-label={`Redigera ${arende.rubrik}`}
                  title={editDelete ? "Redigera" : EDIT_DELETE_UNAVAILABLE}
                  disabled={!editDelete}
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(arende);
                  }}
                >
                  <EditIcon />
                </button>
                <button
                  type="button"
                  className="icon-button icon-button--small icon-button--danger"
                  aria-label={`Ta bort ${arende.rubrik}`}
                  title={editDelete ? "Ta bort" : EDIT_DELETE_UNAVAILABLE}
                  disabled={!editDelete}
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(arende.id);
                  }}
                >
                  <DeleteIcon />
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
