from abc import ABC, abstractmethod
from datetime import datetime, timezone
from threading import Lock

from app.schemas.arende import Arende, ArendeCreate, ArendeStatus


class ArendeRepository(ABC):
    """Kontrakt för lagring av ärenden. Implementera mot databasen senare."""

    @abstractmethod
    def create(self, data: ArendeCreate) -> Arende: ...

    @abstractmethod
    def get_all(self) -> list[Arende]: ...

    @abstractmethod
    def get_by_id(self, arende_id: int) -> Arende | None: ...


class InMemoryArendeRepository(ArendeRepository):
    """Tillfällig lagring i minnet tills databaskopplingen finns."""

    def __init__(self) -> None:
        self._arenden: dict[int, Arende] = {}
        self._next_id = 1
        self._lock = Lock()

    def create(self, data: ArendeCreate) -> Arende:
        with self._lock:
            arende = Arende(
                id=self._next_id,
                **data.model_dump(),
                status=ArendeStatus.NYTT,
                skapad=datetime.now(timezone.utc),
            )
            self._arenden[arende.id] = arende
            self._next_id += 1
            return arende

    def get_all(self) -> list[Arende]:
        with self._lock:
            return list(self._arenden.values())

    def get_by_id(self, arende_id: int) -> Arende | None:
        with self._lock:
            return self._arenden.get(arende_id)


_repository: ArendeRepository = InMemoryArendeRepository()


def get_arende_repository() -> ArendeRepository:
    return _repository
