from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers.arende_router import router as arende_router

app = FastAPI(
    title="Kundserviceportalen NORS API",
    description="Backend API for the Kundserviceportalen NORS team project.",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(arende_router)


@app.get("/")
def read_root() -> dict[str, str]:
    return {"message": "Welcome to Kundserviceportalen NORS API"}


@app.get("/health")
def health_check() -> dict[str, str]:
    return {"status": "ok"}
