from app.repositories import sqlite_arende_repository
from app.schemas.arende import ArendeCreate, ArendeStatus

# Testfall för att kontrollera att statussvar inte påverkas av senare ändring.
def test_a8_statussvar_paverkas_inte_av_senare_andring(tmp_path, monkeypatch):
    db_path = str(tmp_path / "nors.db")
    repo = sqlite_arende_repository.SqliteArendeRepository(db_path)
    arende = repo.create(
        ArendeCreate(
            rubrik="Test",
            beskrivning="Beskrivning",
            kategori="Teknik",
            prioritet="Medel",
        )
    )
    get_connection = sqlite_arende_repository.get_connection
    
# Skapar en klass som simulerar en samtidig ändring av status i databasen.
    class ConnectionMedSamtidigAndring:
        def __init__(self, connection):
            self.connection = connection

        def __getattr__(self, name):
            return getattr(self.connection, name)

        def commit(self):
            self.connection.commit()
            other = get_connection(db_path)
            try:
                other.execute(
                    "UPDATE arenden SET status = ? WHERE id = ?",
                    (ArendeStatus.AVSLUTAT.value, arende.id),
                )
                other.commit()
            finally:
                other.close()

    monkeypatch.setattr(
        sqlite_arende_repository,
        "get_connection",
        lambda path: ConnectionMedSamtidigAndring(get_connection(path)),
    )

    uppdaterat = repo.update_status(arende.id, ArendeStatus.PAGAENDE)

    assert uppdaterat == arende.model_copy(update={"status": ArendeStatus.PAGAENDE})
    assert repo.get_by_id(arende.id).status == ArendeStatus.AVSLUTAT
