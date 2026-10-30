# Kundserviceportalen NORS

Ett startprojekt för teamet NORS, med backend i Python/FastAPI och frontend i
React/JavaScript.

All projektdokumentation finns i [docs/](docs/README.md).

## Krav

- Python 3.10 eller senare
- Node.js 20.19+ eller 22.12+
- npm

## Kör API:t

Från projektets rot, sätt upp backendmiljön och starta API:t:

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
python -m uvicorn app.main:app --reload
```

På macOS och Linux aktiverar du miljön med `source .venv/bin/activate` i
stället för `.\.venv\Scripts\Activate.ps1`.

Den virtuella miljön och beroendena behöver bara skapas första gången.
Senare räcker det att öppna en terminal i projektets rot och köra:

```powershell
cd backend
.\.venv\Scripts\Activate.ps1
python -m uvicorn app.main:app --reload
```

API:t finns på <http://127.0.0.1:8000>. För att prova det interaktivt, öppna
<http://127.0.0.1:8000/docs>. Fäll ut **POST `/arenden`**, klicka på
**Try it out**, fyll i ett exempel och klicka på **Execute**:

```json
{
  "rubrik": "Problem med inloggning",
  "beskrivning": "Användaren kan inte logga in.",
  "kategori": "Support",
  "prioritet": "Normal"
}
```

Svaret ska ha status `201 Created`. API:t sätter id, status och
skapad-tid automatiskt. Använd **GET `/arenden`** för att lista ärenden eller
**GET `/arenden/{arende_id}`** för att hämta ett ärende. Ärendena lagras i
minnet och försvinner när API-servern stoppas.
The response should have status `201 Created`. The API sets the ID, status, and
creation time automatically. Use **GET `/arenden`** to list cases or
**GET `/arenden/{arende_id}`** to retrieve one case. Cases are stored in a
SQLite file (`backend/app/data/nors.db`, or the path in `NORS_DB_PATH`) and
remain after the API server restarts.

Stoppa servern genom att gå till terminalen där den körs och trycka **Ctrl+C**.

## Run tests

With the backend environment activated, from `backend`:

```powershell
python -m pytest
```

The tests start their own API server against a temporary database, so the
server does not need to be running and `nors.db` is not changed.

## Run the frontend

I en andra terminal, från projektets rot:

```powershell
cd frontend
npm install
npm run dev
```

Öppna den lokala adressen som Vite skriver ut (normalt <http://localhost:5173>).

## Kör testerna

Det finns inga automatiserade tester ännu. När de finns står kommandona här och
i [docs/verifieringsplan.md](docs/verifieringsplan.md).

## Utveckling i teamet

- Lägg API-kod i `backend/app` och UI-kod i `frontend/src`.
- Skapa och aktivera Pythons virtuella miljö innan du installerar
  backendberoenden.
- Committa inte virtuella miljöer, `node_modules` eller lokala `.env`-filer;
  de ignoreras av Git.
- Lägg till beroenden i `backend/requirements.txt` eller
  `frontend/package.json` så att resten av teamet kan installera dem.
