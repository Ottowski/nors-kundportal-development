const API_URL = import.meta.env.VITE_API_URL ?? "http://127.0.0.1:8000";

async function request(path, options) {
  let response;
  try {
    response = await fetch(`${API_URL}${path}`, options);
  } catch {
    throw new Error("Kunde inte nå servern. Kontrollera att API:t är igång.");
  }
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("Ärendet hittades inte.");
    }
    if (response.status === 422) {
      throw new Error("Uppgifterna är ogiltiga. Kontrollera formuläret.");
    }
    throw new Error("Något gick fel. Försök igen.");
  }
  return response.json();
}

export function hamtaArenden() {
  return request("/arenden");
}

export function skapaArende(data) {
  return request("/arenden", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}
