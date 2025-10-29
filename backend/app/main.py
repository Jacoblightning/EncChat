from fastapi import FastAPI


from .routers import users, chat
from .database import create_db_and_tables
from . import security


app = FastAPI(root_path="/api")


app.include_router(users.router)
app.include_router(chat.router)
app.include_router(security.router)


@app.on_event("startup")
def on_startup():
    create_db_and_tables()
