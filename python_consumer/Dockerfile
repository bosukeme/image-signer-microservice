FROM python:3.13-slim AS builder

WORKDIR /app

RUN apt update && apt install -y --no-install-recommends --no-install-suggests \
    build-essential python3-dev libgl1 libglib2.0-0  \
    && rm -rf /var/lib/apt/lists/* \
    && pip install --no-cache-dir --upgrade pip


COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

ENV PYTHONUNBUFFERED=1

COPY . .

CMD [ "python3", "consumer.py" ]
