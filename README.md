# new-explorer-api

## Итоговый образовательный проект - сервис, в котором можно найти новости по запросу и сохранить в личном кабинете.

#### Бэкенд:

### API для аутентификации пользователей и сохранения статей

Запросы:

* GET /users/me - возвращает информацию о пользователе (email и имя) 

* GET /articles - возвращает все сохранённые пользователем статьи

* POST /articles - создаёт статью с переданными в теле (keyword, title, text, date, source, link и image)

* DELETE /articles/articleId - удаляет сохранённую статью  по _id

* POST /signup - создаёт пользователя с переданными в теле (email, password и name)

* POST /signin - проверяет переданные в теле почту и пароль и возвращает JWT

Приложение доступно по адресу api.news-explorer82.ru

Шифрование осуществляется при помощи SSL сертификата, есть возможность обратиться к серверу по https.

Публичный IP - 84.201.129.234

Чтобы запустить сервер локально (на порту 3000), клонируйте репозиторий, установите зависимости. Запустить сервер можно командами:

* npm run start

* npm run dev (с поддержкой HOT RELOAD)
