from fastapi.security import OAuth2PasswordRequestForm
from fastapi import APIRouter, Depends, HTTPException, status, Header
from pydantic import BaseModel
from datetime import timedelta

from app.db.session import get_db
from app.core.security import certify_token
import time
from typing import  Optional
from app.db.diary import create_diary, get_diary, get_date_by_month
from loguru import logger

diary_router = r = APIRouter()


class NoteItem(BaseModel):
    email: str
    note: str
    times: str
    date: str


@r.post("/diary")
async def diary(
        request: NoteItem, db=Depends(get_db), token: Optional[str] = Header(None)
):
    logger.debug(f"email is {request.email}, note is {request.note}, time is  {request.times}, date is {request.date}, token is {token}")
    if certify_token(token, request.email):
        result = create_diary(db, request.email, request.note, request.times, request.date)
        if result:
            return result
    else:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="invalid token"
        )
    return {}


class DateItem(BaseModel):
    email: str
    date: str


@r.get("/diary/{email}/{date}")
async def diary(
        email, date, db=Depends(get_db), token: Optional[str] = Header(None)
):
    logger.debug(f"email is {email}, date is {date}, token is {token}")
    if certify_token(token, email):
        result = get_diary(db, email, date)
        if result:
            return {'note': result.note, 'times': result.times}
    else:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="invalid token"
        )
    return {}


@r.get("/date/{email}/{month}")
async def diary(
        email, month, db=Depends(get_db), token: Optional[str] = Header(None)
):
    logger.debug(f"email is {email}, month is {month}, token is {token}")
    if certify_token(token, email):
        result, option = get_date_by_month(db, email, month)
        if result:
            return {'date': result, 'option': option}
    else:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="invalid token"
        )
    return {}

