from pwdlib import PasswordHash
from pwdlib.hashers.argon2 import Argon2Hasher

def hash_password(password: str) -> str:
    password_hash = PasswordHash((
        Argon2Hasher(),
    ))
    return password_hash.hash(password)
    
