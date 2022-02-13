import jwt
from fastapi.security import OAuth2PasswordBearer
from passlib.context import CryptContext
from datetime import datetime, timedelta
from functools import lru_cache

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/token")

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

SECRET_KEY = "super_secret"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 360


def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


def create_access_token(*, data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def certify_token(token, user, debug=False):
    r'''
        @Args:
            key: str
            token: str
        @Returns:
            boolean
    '''
    try:
        token_data = jwt.decode(token, SECRET_KEY, algorithm=ALGORITHM)
        if debug:
            print(token_data)
        if token_data and user == token_data['sub']:
            return True
    except Exception:
        return False


if __name__ == "__main__":
    s = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyQDIuY29tIiwicGVybWlzc2lvbnMiOiJ1c2VyIiwiZXhw" \
        "IjoxNjM1ODgxNTEwfQ.RwlC_z23uP-ZVoUWH6d5RtABSx1EoYdomb0AvrTIFzM"
    print(certify_token(s, '2@2.com', debug=True))

