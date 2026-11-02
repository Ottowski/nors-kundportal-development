"""Ett skapat ärende ska finnas kvar efter att servern startats om.

Testet startar den riktiga servern (uvicorn) mot en temporär databasfil,
skapar ett ärende, stoppar servern, startar en ny server och hämtar ärendet.
Den riktiga databasen (app/data/nors.db) rörs inte.
"""

import json
import os
import socket
import subprocess
import sys
import time
import urllib.request
from contextlib import contextmanager
from pathlib import Path

BACKEND_DIR = Path(__file__).resolve().parent.parent
STARTTID_SEKUNDER = 15


def _ledig_port() -> int:
    with socket.socket() as s:
        s.bind(("127.0.0.1", 0))
        return s.getsockname()[1]


def _anrop(url: str, data: dict | None = None) -> tuple[int, object]:
    body = json.dumps(data).encode() if data is not None else None
    request = urllib.request.Request(
        url, data=body, headers={"Content-Type": "application/json"}
    )
    with urllib.request.urlopen(request, timeout=5) as response:
        return response.status, json.loads(response.read())


def _stoppa(process: subprocess.Popen) -> str:
    process.terminate()
    try:
        _, stderr = process.communicate(timeout=10)
    except subprocess.TimeoutExpired:
        process.kill()
        _, stderr = process.communicate()
    return stderr.decode(errors="replace")


@contextmanager
def kor_server(db_path: Path):
    port = _ledig_port()
    process = subprocess.Popen(
        [sys.executable, "-m", "uvicorn", "app.main:app",
         "--port", str(port), "--log-level", "warning"],
        cwd=BACKEND_DIR,
        env={**os.environ, "NORS_DB_PATH": str(db_path)},
        stdout=subprocess.DEVNULL,
        stderr=subprocess.PIPE,
    )
    url = f"http://127.0.0.1:{port}"
    try:
        deadline = time.monotonic() + STARTTID_SEKUNDER
        while True:
            if process.poll() is not None:
                raise RuntimeError(f"Servern avslutades vid start:\n{_stoppa(process)}")
            try:
                _anrop(f"{url}/health")
                break
            except OSError:
                if time.monotonic() > deadline:
                    raise RuntimeError(
                        f"Servern svarade inte inom {STARTTID_SEKUNDER} s:\n{_stoppa(process)}"
                    )
                time.sleep(0.1)
        yield url
    finally:
        if process.poll() is None:
            _stoppa(process)


def test_arende_finns_kvar_efter_omstart(tmp_path):
    db_path = tmp_path / "nors.db"

    with kor_server(db_path) as url:
        status, skapat = _anrop(
            f"{url}/arenden",
            {
                "rubrik": "Fakturan saknas",
                "beskrivning": "Kunden har inte fått oktoberfakturan.",
                "kategori": "Faktura",
                "prioritet": "Hög",
            },
        )
        assert status == 201

    with kor_server(db_path) as url:
        status, hamtat = _anrop(f"{url}/arenden/{skapat['id']}")
        assert status == 200
        _, alla = _anrop(f"{url}/arenden")

    assert hamtat == skapat
    assert alla == [skapat]
