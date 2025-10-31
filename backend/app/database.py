from typing import Annotated, Generator

import uuid
from sqlmodel import Field, SQLModel, create_engine, Session
from fastapi import Depends
import os


class UserBase(SQLModel):
    # id: int | None = Field(default=None, primary_key=True)
    id: uuid.UUID = Field(default_factory=uuid.uuid7, primary_key=True)
    username: str = Field(index=True, unique=True)


class User(UserBase, table=True):
    hashed_password: str


class UserCreate(UserBase):
    password: str

class UserPublic(UserBase):
    pass


# Get from environment or create in-memory database
database_url = os.environ.get("DATABASE_URL") or "postgresql+psycopg2://encchat:encchat@localhost:5432/encchat"

assert database_url

print("Using URL: ", database_url)

engine = create_engine(database_url, echo=True)


def create_db_and_tables() -> None:
    SQLModel.metadata.create_all(engine)


def get_session() -> Generator[Session, None, None]:
    with Session(engine) as session:
        yield session


SessionDep = Annotated[Session, Depends(get_session)]
