## simple imageBoard
#### Current version: 0.2.0!

> This project, a small imageboard on node js

To deploy the project run
1. ``npm install``
2. Create a database in mysql with any name
create an .env file and fill it as in ``.env-example``
#### ``.env`` structure
- ``HOST_ADDRESS`` The address you want to use
- ``HOST_PORT`` The port where the project will be located
- ``DB_NAME`` The name of the database you created
- ``DB_LOGIN`` Your database username
- ``DB_PASSWORD`` Your database password

3. On the first run, you need to run the command,
``node index format-db``
OR
``npm formatDB``
 open the server using your port, open it in the browser and exit.
[Video guide](youtube.com/).

4. To start, run the following command in the root of the project:
``node index``
OR
``npm start``

If you want to delete all entries in the database, then call the command
``node index format-db``
OR
``npm formatDB``

RoadMap: 

@m8eight