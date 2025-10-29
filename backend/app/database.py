import uuid
from sqlmodel import Field, SQLModel, create_engine
import os


class UserBase(SQLModel):
    #id: int | None = Field(default=None, primary_key=True)
    id: uuid.UUID = Field(default_factory=uuid.uuid7, primary_key=True)
    username: str

class User(UserBase, table=True):
    hashed_password: str

class UserCreate(UserBase):
    password: str


# Get from environment or create in-memory database
database_url = os.environ.get("DATABASE_URL") or "sqlite://"

print("Using URL: ", database_url)

engine = create_engine(database_url, echo=True)


def create_db_and_tables():
    SQLModel.metadata.create_all(engine)
