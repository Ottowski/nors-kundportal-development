import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterAll, afterEach, beforeAll, beforeEach, vi } from "vitest";
import { db } from "../mocks/handlers";
import { server } from "../mocks/node";

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
// Tests run with edit/delete on, as in `npm run dev:mock`. Tests for the off state stub it to false.
beforeEach(() => vi.stubEnv("VITE_ENABLE_EDIT_DELETE", "true"));
afterEach(() => {
  cleanup();
  vi.unstubAllEnvs();
  server.resetHandlers();
  db.reset();
});
afterAll(() => server.close());
