# URSTAR — Backend
---
REST API для маркетплейса одежды: пользователи, продукты, образы (outfits), отзывы, корзина, аутентификация и роль‑базированный доступ.

Роль
---
Проектирование и реализация серверной части, API, моделей данных, middleware и интеграции облачного хранения медиа.

Стек
---
- Node.js, Express
- MongoDB, Mongoose
- JWT, bcrypt (аутентификация)
- multer, multer-storage-cloudinary (загрузка медиа)
- dotenv, cookie-parser, cors

Структура (кратко)
---
- `routers/` — маршруты API (префикс `/api`)
- `controllers/` — логика обработчиков
- `models/` — Mongoose‑схемы (`User`, `Product`, `Outfit`, `Review`)
- `middleware/` — аутентификация, проверка ролей, загрузка файлов
- `helpers/` — утилиты и мапперы данных
- `uploads/` — локальные статические файлы (доступны по `/uploads`)

Основные эндпоинты
---
- `POST /api/auth/register` — регистрация
- `POST /api/auth/login` — вход (JWT / cookie)
- `GET /api/products` — список продуктов (фильтрация, пагинация)
- `POST /api/products` — создать продукт (admin)
- `POST /api/outfits` — создать outfit
- `POST /api/reviews` — оставить отзыв
