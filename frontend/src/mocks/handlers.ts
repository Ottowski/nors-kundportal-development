import { http, HttpResponse } from "msw";
import { API_BASE_URL } from "../api/arendenApi";
import { STATUSAR } from "../constants/arende";
import type { Arende, ArendeCreate, ArendeStatus } from "../types/arende";
import { seedArenden } from "./data";

// In-memory store that mirrors backend/app/repositories/arende_repository.py.
export const db = {
  arenden: seedArenden(),
  reset(arenden: Arende[] = seedArenden()) {
    this.arenden = arenden;
  },
};

const NOT_FOUND = { detail: "Ärendet hittades inte" };
const TEXT_FIELDS = ["rubrik", "beskrivning", "kategori", "prioritet"] as const;

function validationError(field: string, msg: string) {
  return HttpResponse.json(
    { detail: [{ type: "value_error", loc: ["body", field], msg }] },
    { status: 422 },
  );
}

// Same rules as ArendeCreate in backend/app/schemas/arende.py.
function validateCreate(input: unknown): ArendeCreate | Response {
  const body = (input ?? {}) as Partial<Record<keyof ArendeCreate, unknown>>;
  for (const field of TEXT_FIELDS) {
    if (typeof body[field] !== "string") {
      return validationError(field, "Field required");
    }
  }
  const values = body as ArendeCreate;
  for (const field of ["rubrik", "beskrivning"] as const) {
    if (!values[field].trim()) {
      return validationError(field, "Value error, Får inte vara tomt eller bara mellanslag");
    }
  }
  return {
    rubrik: values.rubrik.trim(),
    beskrivning: values.beskrivning.trim(),
    kategori: values.kategori,
    prioritet: values.prioritet,
  };
}

export const handlers = [
  http.get(`${API_BASE_URL}/arenden`, () => HttpResponse.json(db.arenden)),

  http.get(`${API_BASE_URL}/arenden/:id`, ({ params }) => {
    const arende = db.arenden.find((a) => a.id === Number(params.id));
    return arende ? HttpResponse.json(arende) : HttpResponse.json(NOT_FOUND, { status: 404 });
  }),

  http.post(`${API_BASE_URL}/arenden`, async ({ request }) => {
    const result = validateCreate(await request.json());
    if (result instanceof Response) {
      return result;
    }
    const arende: Arende = {
      id: Math.max(0, ...db.arenden.map((a) => a.id)) + 1,
      ...result,
      status: "Nytt",
      skapad: new Date().toISOString(),
    };
    db.arenden.push(arende);
    return HttpResponse.json(arende, { status: 201 });
  }),

  // Proposed, outside v1.0 scope: edit all fields except status, id and skapad.
  http.put(`${API_BASE_URL}/arenden/:id`, async ({ params, request }) => {
    const index = db.arenden.findIndex((a) => a.id === Number(params.id));
    if (index === -1) {
      return HttpResponse.json(NOT_FOUND, { status: 404 });
    }
    const result = validateCreate(await request.json());
    if (result instanceof Response) {
      return result;
    }
    const updated = { ...db.arenden[index], ...result };
    db.arenden[index] = updated;
    return HttpResponse.json(updated);
  }),

  // Proposed endpoint, not built in the backend yet.
  http.post(`${API_BASE_URL}/arenden/:id/status`, async ({ params, request }) => {
    const index = db.arenden.findIndex((a) => a.id === Number(params.id));
    if (index === -1) {
      return HttpResponse.json(NOT_FOUND, { status: 404 });
    }
    const { status } = (await request.json()) as { status?: string };
    if (!STATUSAR.includes(status as ArendeStatus)) {
      return validationError("status", "Ogiltig status");
    }
    const updated = { ...db.arenden[index], status: status as ArendeStatus };
    db.arenden[index] = updated;
    return HttpResponse.json(updated);
  }),
];
