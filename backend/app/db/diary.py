import time

from fastapi import HTTPException, status
from sqlalchemy.orm import Session
import typing as t
from loguru import logger
from . import models, schemas
from app.core.security import get_password_hash
from datetime import datetime
from copy import deepcopy
import json

defaultOption = {
    'title': {
      'text': ''
    },
    'tooltip': {
      'trigger': 'axis'
    },
    'legend': {
      'data': ['sleep', 'exercise', 'study', 'entertainment', 'other']
    },
    'grid': {
      'left': '3%',
      'right': '4%',
      'bottom': '3%',
      'containLabel': True
    },
    'toolbox': {
      'feature': {
        'saveAsImage': {}
      }
    },
    'xAxis': {
      'type': 'category',
      'boundaryGap': False,
      'data': ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    'yAxis': {
      'type': 'value',
      'splitLine':{'show': False},
    },
    'series': [
      {
        'name': 'sleep',
        'type': 'line',
        'data': [8, 8, 8, 7, 9, 7, 7]
      },
      {
        'name': 'exercise',
        'type': 'line',
        'data': [1, 0, 1, 0, 1, 0, 0]
      },
      {
        'name': 'study',
        'type': 'line',
        'data': [2, 3, 2, 1, 2, 3, 1]
      },
      {
        'name': 'entertainment',
        'type': 'line',
        'data': [2, 3, 2, 1, 2, 3, 1]
      },
      {
        'name': 'other',
        'type': 'line',
        'data': [2, 3, 2, 1, 2, 3, 1]
      }
    ]
  }


def get_diary(db: Session, email: str, date: str):
    result = db.query(models.Diary).filter(models.Diary.email == email, models.Diary.date == date).first()
    if result:
        logger.info(f"email={email}, date={date}, result={result.note}")
        return result
    else:
        return None


def get_diary_by_email(db: Session, email: str) -> schemas.UserBase:
    return db.query(models.Diary).filter(models.Diary.email == email).first()


@logger.catch
def build_option(date_list, times_list):
    option = deepcopy(defaultOption)
    option['xAxis']['data'] = [datetime.strptime(i, '%Y-%m-%d').strftime('%m-%d') for i in date_list]
    key_list = ['sleep', 'exercise', 'study', 'entertainment', 'other']
    default_value = {'sleep': 8, 'exercise': 1, 'study': 1, 'entertainment': 1, 'other': 0}
    times_dict = {key: [] for key in key_list}

    for times in times_list:
        for key in key_list:
            times_dict[key].append(times.get(key, default_value[key]))
    series = [{
        'name': key,
        'type': 'line',
        'data': times_dict[key]
      } for key in times_dict]
    option['series'] = series
    logger.debug(option)
    return option


def get_date_by_month(db: Session, email: str, month: str):
    result = db.query(models.Diary).filter(models.Diary.email == email)\
        .filter(models.Diary.date.like(f'{month}%')).order_by(models.Diary.date.asc()).all()
    if not result:
        raise HTTPException(status_code=404, detail="Diary not found")
    else:
        logger.info(f"email={email}, month={month}, count={len(result)}")
    date_list = []
    times_list = []
    for record in result:
        date_list.append(record.date)
        times_list.append(json.loads(record.times) if record.times else {})
    return date_list, build_option(date_list, times_list)


def create_diary(db: Session, email: str, note: str, times: str, date: str):
    db_diary = get_diary(db, email, date)
    now = datetime.now()
    if db_diary is not None:
        db_diary.note = note
        db_diary.times = times
        db_diary.updated_at = now
    else:

        logger.debug(f"email={email}, note={note}, date={date}, times={times}, created_at={now}")
        db_diary = models.Diary(
            email=email,
            note=note,
            date=date,
            times=times,
            created_at=now,
            updated_at=now,
        )
        db.add(db_diary)
    db.commit()
    db.refresh(db_diary)
    return db_diary




