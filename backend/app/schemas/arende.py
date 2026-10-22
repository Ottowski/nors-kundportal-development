from datetime import datetime
from enum import Enum

from pydantic import BaseModel, ConfigDict, field_validator


class ArendeStatus(str, Enum):
    NYTT = "Nytt"
    PAGAENDE = "Pågående"
    VANTAR_PA_KUND = "Väntar på kund"
    AVSLUTAT = "Avslutat"


TILLATNA_KATEGORIER: set[str] = set()
TILLATNA_PRIORITETER: set[str] = set()


class ArendeCreate(BaseModel):
    """Det handläggaren anger vid skapande. Status och skapad sätts automatiskt."""

    rubrik: str
    beskrivning: str
    kategori: str
    prioritet: str

    @field_validator("rubrik", "beskrivning")
    @classmethod
    def inte_tom(cls, value: str) -> str:
        value = value.strip()
        if not value:
            raise ValueError("Får inte vara tomt eller bara mellanslag")
        return value

    @field_validator("kategori")
    @classmethod
    def giltig_kategori(cls, value: str) -> str:
        if TILLATNA_KATEGORIER and value not in TILLATNA_KATEGORIER:
            raise ValueError(
                f"Ogiltig kategori. Tillåtna värden: {sorted(TILLATNA_KATEGORIER)}"
            )
        return value

    @field_validator("prioritet")
    @classmethod
    def giltig_prioritet(cls, value: str) -> str:
        if TILLATNA_PRIORITETER and value not in TILLATNA_PRIORITETER:
            raise ValueError(
                f"Ogiltig prioritet. Tillåtna värden: {sorted(TILLATNA_PRIORITETER)}"
            )
        return value


class Arende(BaseModel):
    """Ett sparat ärende. Oföränderligt, så 'skapad' kan aldrig ändras."""

    model_config = ConfigDict(frozen=True)

    id: int
    rubrik: str
    beskrivning: str
    kategori: str
    prioritet: str
    status: ArendeStatus
    skapad: datetime
