from typing import Annotated

from fastapi import APIRouter, Depends

from ..database import engine, UserCreate, User
from ..security import hash_password, oauth2_scheme
from sqlmodel import Session


router = APIRouter(prefix="/users")


@router.get("/me")
async def get_me(token: Annotated[str, Depends(oauth2_scheme)]):
    return {"me": "yes"}


@router.delete("/me")
async def delete_me():
    return "NO"


@router.post("/create")
def create_user(user: UserCreate):
    hashed_password = hash_password(user.password)
    db_user = User.model_validate(user, update={"hashed_password": hashed_password})
    with Session(engine) as session:
        session.add(db_user)
        session.commit()
    return {"status": "success"}
