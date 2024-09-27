# simple imageBoard

> This project, a small imageboard on node js

To deploy the project run
1. ``npm install``
2. Create a database in mysql with any name
3. Create an .env file and fill it as in ``.env-example``
#### ``.env`` structure
- ``HOST_ADDRESS`` The address you want to use
- ``HOST_PORT`` The port where the project will be located
- ``DB_NAME`` The name of the database you created
- ``DB_LOGIN`` Your database username
- ``DB_PASSWORD`` Your database password

4. Run the command: 
``node index format-db``
OR
``npm run formatDB``,
open public server at the address and port you have chosen, go to the "boards" section and close the page.
[Video guide](https://youtu.be/eSe7ta88ZBs).

5. To start, run the following command in the root of the project:
``node index``
OR
``npm start``

If you want to delete all entries in the database, then call the command
``node index format-db``
OR
``npm run formatDB``

RoadMap: 
to translate into other languages
make images zoom in when you click on them
unload by files, index.js file
