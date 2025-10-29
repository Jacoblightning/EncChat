from typing import Annotated

from fastapi import APIRouter, Depends

from ..database import SessionDep, UserCreate, User, UserPublic
from ..security import hash_password, oauth2_scheme, get_current_user
from sqlmodel import Session
from sqlalchemy.exc import IntegrityError


router = APIRouter(prefix="/users")


@router.get("/me")
async def get_me(user: Annotated[User, Depends(get_current_user)]):
    return UserPublic.model_validate(user)


@router.delete("/me")
async def delete_me():
    return "NO"


@router.post("/create")
def create_user(user: UserCreate, session: SessionDep):
    hashed_password = hash_password(user.password)
    db_user = User.model_validate(user, update={"hashed_password": hashed_password})
    session.add(db_user)
    try:
        session.commit()
    except IntegrityError:
        return {"status": "Error", "description": "Username taken"}
    return {"status": "success"}
