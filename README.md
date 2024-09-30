# simple imageBoard

> Этот проект это маленький имиджборд на nodeJS

Для запуска проекта с помощью docker выполните следующие действия
1. Выполните ``npm i`` в проекте
2. Выполните в терминале ``docker container run --rm --name mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=1234 -e MYSQL_DATABASE=filmsbase -d mysql:9.0.1``
(Запускается mysql демон с параметрами MYSQL_ROOT_PASSWORD=1234, MYSQL_DATABASE=imageboard, Имя пользователя = root)
5. Преименуйте ``.env-example`` в .env
6. Старт с помощью npm start

#### Структура .env
- ``HOST_ADDRESS`` Адрес сервера
- ``HOST_PORT`` Порт сервера
- ``DB_NAME`` Имя базы данных
- ``DB_LOGIN`` Имя пользователя для бд
- ``DB_PASSWORD`` Пароль от имя бользователя бд

Для транкейта базы данных программа запускается с помощью команды:
``node index format-db``
OR
``npm run formatDB``
