from fastapi import Request
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse

PREFIX = "Value error, "
# Prefix som används för tekniska felmeddelanden från FastAPI.
def _svensk_text(fel: dict) -> str:
    if fel["type"] == "missing":
        return "Måste fyllas i"
    if fel["type"] == "value_error":
        return fel["msg"].removeprefix(PREFIX)
    return "Ogiltigt värde"


async def hantera_valideringsfel(
    _: Request, exc: RequestValidationError
) -> JSONResponse:
    detail = [
        {"type": fel["type"], "loc": list(fel["loc"]), "msg": _svensk_text(fel)}
        for fel in exc.errors()
    ]
    return JSONResponse(status_code=422, content={"detail": detail})
