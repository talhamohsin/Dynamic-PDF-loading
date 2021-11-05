# Dynamic PDF loading using Flask


### PDF Visualization
- To run the project in the development environment, please execute the following commands into the terminal in the respective folder:
**export FLASK_APP=app.py** <br />
**export FLASK_ENV=development** <br />
**flask run**
- This will start the server and the application runs by default on localhost:5000.
- The above commands should not be executed if the application is to run by starting the docker container since the commands have already been put inside the Dockerfile.
- In order to insert any particular pdf that can be viewed on to the webpage, add the desired pdf in "/static/pdfs/" folder. This will show the pdf on the dropdown list and hence can be viewed in the web application.

### Docker Commands
- Docker and docker-compose files have been added.
- The requirements for this project are stored inside "requirements.txt" file and can be installed using the command: **pip install -r requirements.txt**.
- Once the docker container is started, the webpage can be viewed on localhost:5000.
- To build the docker deployment, execute the command **docker-compose build**.
- To start the docker container use the command **docker-compose up**.
- To stop the docker container use the command **docker-compose stop**.
