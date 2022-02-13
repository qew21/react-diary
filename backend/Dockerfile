  
FROM python:3.8

RUN mkdir /backend
WORKDIR /backend

RUN apt update && \
    apt install -y vim sqlite3

COPY requirements.txt ./
RUN pip install -r requirements.txt

COPY app app
COPY run.bash .
RUN mkdir db
ENV PYTHONPATH .
ENV DATABASE_URL "sqlite:///db/sqlite3.ln"
CMD [ "python3", "app/main.py"]