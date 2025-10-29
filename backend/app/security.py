from pwdlib import PasswordHash
from pwdlib.hashers.argon2 import Argon2Hasher

from fastapi.security import OAuth2PasswordBearer


def hash_password(password: str) -> str:
    password_hash = PasswordHash((Argon2Hasher(),))
    return password_hash.hash(password)


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
