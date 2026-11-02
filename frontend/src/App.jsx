import { useEffect, useState } from "react";
import "./App.css";
import { hamtaArenden, skapaArende } from "./api";

const KATEGORIER = ["Fakturering", "Teknik", "Leverans", "Övrigt"];
const PRIORITETER = ["Låg", "Medel", "Hög"];
const TOMT_FORMULAR = {
  rubrik: "",
  beskrivning: "",
  kategori: "",
  prioritet: "",
};

function formateraTid(iso) {
  return new Date(iso).toLocaleString("sv-SE");
}

function App() {
  const [arenden, setArenden] = useState([]);
  const [laddar, setLaddar] = useState(true);
  const [listfel, setListfel] = useState("");
  const [formular, setFormular] = useState(TOMT_FORMULAR);
  const [formfel, setFormfel] = useState("");
  const [sparar, setSparar] = useState(false);

  async function laddaArenden() {
    try {
      setArenden(await hamtaArenden());
      setListfel("");
    } catch (error) {
      setListfel(error.message);
    } finally {
      setLaddar(false);
    }
  }

  useEffect(() => {
    laddaArenden();
  }, []);

  function andra(event) {
    const { name, value } = event.target;
    setFormular((tidigare) => ({ ...tidigare, [name]: value }));
  }

  async function skicka(event) {
    event.preventDefault();
    const saknas = Object.values(formular).some((v) => !v.trim());
    if (saknas) {
      setFormfel("Fyll i rubrik, beskrivning, kategori och prioritet.");
      return;
    }
    setSparar(true);
    try {
      await skapaArende(formular);
      setFormular(TOMT_FORMULAR);
      setFormfel("");
      await laddaArenden();
    } catch (error) {
      setFormfel(error.message);
    } finally {
      setSparar(false);
    }
  }

  return (
    <main className="portal">
      <h1>Kundserviceportalen</h1>

      <section className="card">
        <h2>Nytt ärende</h2>
        <form onSubmit={skicka} noValidate>
          <label>
            Rubrik
            <input name="rubrik" value={formular.rubrik} onChange={andra} />
          </label>
          <label>
            Beskrivning
            <textarea
              name="beskrivning"
              rows={3}
              value={formular.beskrivning}
              onChange={andra}
            />
          </label>
          <label>
            Kategori
            <select name="kategori" value={formular.kategori} onChange={andra}>
              <option value="" disabled>
                Välj kategori
              </option>
              {KATEGORIER.map((k) => (
                <option key={k}>{k}</option>
              ))}
            </select>
          </label>
          <label>
            Prioritet
            <select
              name="prioritet"
              value={formular.prioritet}
              onChange={andra}
            >
              <option value="" disabled>
                Välj prioritet
              </option>
              {PRIORITETER.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
          </label>
          {formfel && (
            <p className="error" role="alert">
              {formfel}
            </p>
          )}
          <button type="submit" disabled={sparar}>
            {sparar ? "Sparar…" : "Skapa ärende"}
          </button>
        </form>
      </section>

      <section className="card">
        <h2>Ärenden</h2>
        {laddar && <p>Laddar…</p>}
        {listfel && (
          <p className="error" role="alert">
            {listfel}
          </p>
        )}
        {!laddar && !listfel && arenden.length === 0 && (
          <p>Inga ärenden ännu.</p>
        )}
        {arenden.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>Rubrik</th>
                <th>Status</th>
                <th>Prioritet</th>
                <th>Skapad</th>
              </tr>
            </thead>
            <tbody>
              {arenden.map((a) => (
                <tr key={a.id}>
                  <td>{a.rubrik}</td>
                  <td>{a.status}</td>
                  <td>{a.prioritet}</td>
                  <td>{formateraTid(a.skapad)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </main>
  );
}

export default App;
