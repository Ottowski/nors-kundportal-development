import { http, HttpResponse } from "msw";
import { describe, expect, it } from "vitest";
import { server } from "../mocks/node";
import { ApiError, NETWORK_ERROR_MESSAGE, VALIDATION_ERROR_MESSAGE } from "./apiError";
import {
  API_BASE_URL,
  createArende,
  getArende,
  listArenden,
  updateArende,
  updateStatus,
} from "./arendenApi";

const valid = { rubrik: "Ny", beskrivning: "Text", kategori: "Teknik", prioritet: "Hög" };

async function catchError(promise: Promise<unknown>): Promise<ApiError> {
  try {
    await promise;
  } catch (error) {
    return error as ApiError;
  }
  throw new Error("Expected promise to reject");
}

describe("arendenApi", () => {
  it("lists all cases", async () => {
    const arenden = await listArenden();
    expect(arenden.map((a) => a.rubrik)).toEqual([
      "Faktura saknas",
      "Kan inte logga in",
      "Fel på faktura",
    ]);
  });

  it("gets one case by id", async () => {
    expect((await getArende(2)).rubrik).toBe("Kan inte logga in");
  });

  it("maps 404 to the backend message (R10)", async () => {
    const error = await catchError(getArende(999));
    expect(error).toBeInstanceOf(ApiError);
    expect(error.status).toBe(404);
    expect(error.message).toBe("Ärendet hittades inte");
  });

  it("creates a case with status Nytt (R1)", async () => {
    const created = await createArende(valid);
    expect(created).toMatchObject({ ...valid, status: "Nytt" });
    expect(created.id).toBe(4);
    expect(created.skapad).toBeTruthy();
  });

  it("maps 422 to field errors and strips the pydantic prefix (R3)", async () => {
    const error = await catchError(createArende({ ...valid, rubrik: "   " }));
    expect(error.status).toBe(422);
    expect(error.message).toBe(VALIDATION_ERROR_MESSAGE);
    expect(error.fieldErrors).toEqual({ rubrik: "Får inte vara tomt eller bara mellanslag" });
  });

  it("maps network failure to a Swedish message", async () => {
    server.use(http.get(`${API_BASE_URL}/arenden`, () => HttpResponse.error()));
    const error = await catchError(listArenden());
    expect(error.status).toBe(0);
    expect(error.message).toBe(NETWORK_ERROR_MESSAGE);
  });

  it("maps a non-JSON server error to a generic message", async () => {
    server.use(
      http.get(`${API_BASE_URL}/arenden`, () => new HttpResponse("boom", { status: 500 })),
    );
    const error = await catchError(listArenden());
    expect(error.status).toBe(500);
    expect(error.message).toBe("Något gick fel. Försök igen.");
  });

  it("updates status and rejects invalid status (R8, R9)", async () => {
    expect((await updateStatus(1, "Pågående")).status).toBe("Pågående");
    // @ts-expect-error invalid status on purpose
    const error = await catchError(updateStatus(1, "Ogiltig"));
    expect(error.status).toBe(422);
    expect(error.fieldErrors.status).toBe("Ogiltig status");
  });
});

describe("arendenApi proposed editing (out of v1.0 scope, mock only)", () => {
  it("updates editable fields and keeps status, id and skapad", async () => {
    const before = await getArende(1);
    const updated = await updateArende(1, { ...valid, rubrik: "Ändrad rubrik" });
    expect(updated).toMatchObject({
      ...valid,
      rubrik: "Ändrad rubrik",
      id: 1,
      status: before.status,
    });
    expect(updated.skapad).toBe(before.skapad);
  });

  it("rejects invalid edit with field errors", async () => {
    const error = await catchError(updateArende(1, { ...valid, beskrivning: " " }));
    expect(error.status).toBe(422);
    expect(error.fieldErrors.beskrivning).toBeTruthy();
  });

  it("returns 404 when editing a missing case", async () => {
    expect((await catchError(updateArende(999, valid))).status).toBe(404);
  });
});
