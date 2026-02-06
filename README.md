URSTAR — backend
REST API для маркетплейса одежды: пользователи, продукты, образы (outfits), отзывы, корзина, аутентификация и роль‑базированный доступ.
Стек: Node.js, Express, Mongoose (MongoDB), JWT, bcrypt, multer, multer-storage-cloudinary, dotenv, cookie‑parser, cors.

Структура папок:
routers/ — маршруты API (под префиксом /api).
controllers/ — обработчики логики запросов.
models/ — Mongoose‑модели: User, Product, Outfit, Review.
middleware/ — аутентификация, проверка ролей, загрузка файлов.
helpers/ — вспомогательные функции и мапперы.
uploads/ — временное/локальное хранение файлов (статические файлы доступны по /uploads).

Основные API:
POST /api/auth/register — регистрация.
POST /api/auth/login — вход, выдача JWT и/или cookie.
GET /api/products — список продуктов (фильтрация, пагинация).
POST /api/products — создание продукта (роль admin).
PUT/DELETE /api/products/:id — редактирование/удаление продукта (role‑based).
POST /api/outfits — создать outfit.
GET /api/users/:id — профиль пользователя.
POST /api/reviews — оставить отзыв.
