"""API-tester för att registrera och hämta ärenden.

Varje test startar en egen server mot en egen databas i tmp_path.
"""

from datetime import datetime

from server import anrop, kor_server

GILTIGT = {
    "rubrik": "Fakturan saknas",
    "beskrivning": "Kunden har inte fått oktoberfakturan.",
    "kategori": "Fakturering",
    "prioritet": "Hög",
}


def test_a1_nytt_arende_far_status_nytt_och_syns_i_listan(tmp_path):
    with kor_server(tmp_path / "nors.db") as url:
        _, fore = anrop(f"{url}/arenden")
        status, skapat = anrop(f"{url}/arenden", GILTIGT)
        _, alla = anrop(f"{url}/arenden")

    assert fore == []
    assert status == 201
    assert {falt: skapat[falt] for falt in GILTIGT} == GILTIGT
    assert skapat["status"] == "Nytt"
    datetime.fromisoformat(skapat["skapad"])  # Kastar om skapad-tiden saknas eller är ogiltig.
    assert alla == [skapat]


def test_a10_okant_arende_ger_svenskt_besked(tmp_path):
    with kor_server(tmp_path / "nors.db") as url:
        status, svar = anrop(f"{url}/arenden/999")

    assert status == 404
    assert svar == {"detail": "Ärendet hittades inte"}
