FROM python:3.6.9-alpine
WORKDIR /code

RUN apk --update --upgrade add --no-cache  gcc musl-dev jpeg-dev zlib-dev libffi-dev cairo-dev pango-dev gdk-pixbuf-dev

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt
EXPOSE 5000
ENV FLASK_RUN_HOST=0.0.0.0
COPY . .
RUN export FLASK_APP=app.py
RUN export FLASK_ENV=development
CMD [ "flask", "run" ]