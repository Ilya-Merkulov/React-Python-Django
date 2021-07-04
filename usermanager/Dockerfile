FROM python:3.9

EXPOSE 8000
ENV PYTHONUNBUFFERED=1
ADD Pipfile /
ADD Pipfile.lock /
ADD manage.py /

RUN pip install pipenv
RUN pipenv lock --keep-outdated --requirements > requirements.txt
RUN pip install -r requirements.txt

COPY . .

CMD [ "python", "./manage.py", "runserver", "0.0.0.0:8000"]