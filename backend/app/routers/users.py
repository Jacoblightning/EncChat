from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException

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
def create_user(user: UserCreate, session: SessionDep) -> UserPublic:
    hashed_password = hash_password(user.password)
    db_user = User.model_validate(user, update={"hashed_password": hashed_password})
    session.add(db_user)
    try:
        session.commit()
    except IntegrityError:
        # This could also trigger for a UUID conflict but that is exceedingly unlikely.
        raise HTTPException(status_code=409, detail="Username taken")

    # Automatically changed into a UserPublic due to the typing
    return user
