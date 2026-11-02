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
**GET `/arenden/{arende_id}`** för att hämta ett ärende. Ärendena lagras i en
SQLite-fil (`backend/app/data/nors.db`, eller sökvägen i `NORS_DB_PATH`) och
finns kvar när API-servern startas om.

Stoppa servern genom att gå till terminalen där den körs och trycka **Ctrl+C**.

## Kör frontenden

I en andra terminal, från projektets rot:

```powershell
cd frontend
npm install
npm run dev
```

Öppna den lokala adressen som Vite skriver ut (normalt <http://localhost:5173>).

Frontenden anropar API:t på `http://127.0.0.1:8000`.

## Kör hela programmet

Frontenden hämtar och sparar ärenden via API:t, så båda delarna måste vara
igång samtidigt. Öppna två terminaler från projektets rot.

Terminal 1, backend. **Första gången** måste du skapa den virtuella miljön och
installera beroendena (det behöver bara göras en gång):

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
python -m uvicorn app.main:app --reload
```

**Senare gånger** räcker det att aktivera miljön och starta servern:

```powershell
cd backend
.\.venv\Scripts\Activate.ps1
python -m uvicorn app.main:app --reload
```

Om PowerShell vägrar köra `Activate.ps1` (felet "running scripts is disabled"),
kör `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` en gång och försök
igen. Du ser att miljön är aktiv när `(.venv)` står först på kommandoraden. På
macOS och Linux aktiverar du med `source .venv/bin/activate`.

Terminal 2, frontend:

```powershell
cd frontend
npm install
npm run dev
```

Öppna sedan <http://localhost:5173>. Där kan du skapa ärenden och se listan
över ärenden. Om sidan visar "Kunde inte nå servern" är backenden inte igång.
Frontenden måste köras på port 5173, annars blockerar CORS anropen (se
`allow_origins` i `backend/app/main.py`).

## Kör testerna

Med backendmiljön aktiverad, från `backend`:

```powershell
python -m pytest
```

Testerna startar en egen API-server mot en temporär databas, så servern behöver
inte vara igång och `nors.db` ändras inte. Vilka tester som finns och vad de
kontrollerar står i [docs/verifieringsplan.md](docs/verifieringsplan.md).

## Utveckling i teamet

- Lägg API-kod i `backend/app` och UI-kod i `frontend/src`.
- Skapa och aktivera Pythons virtuella miljö innan du installerar
  backendberoenden.
- Committa inte virtuella miljöer, `node_modules` eller lokala `.env`-filer;
  de ignoreras av Git.
- Lägg till beroenden i `backend/requirements.txt` eller
  `frontend/package.json` så att resten av teamet kan installera dem.
