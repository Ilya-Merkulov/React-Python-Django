# User manager

User manager is a Python test project.

## Usage
### Run Django api
- go to api folder
cd usermanager
#### using docker
- build docker container
```
docker build -t usermanager .
```
- launch docker container
```
docker run -dt -p 8000:8000 --name usermanager usermanager
```
#### using pipenv
- install packages
```
pipenv install
```
- launch pipenv shell
```
pipenv shell
```
- run server
```
python manage.py runserver
```


