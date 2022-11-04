# Exchange Rates App
Конвертер валют с визуализацией курса за последний год.
<p align='center'>
  <img src='./readme/app_screenshot.png?raw=true' width='987' height='auto' alt='App screenshot'>
</p>

## Версия окружения
Работает как минимум с `Node.js v16.13.2`

## Используемые технологии
- typescript
- react
- redux toolkit
- material ui
- recharts
- date-fns

## Структура папок и файлов
```
├── public/
│   ├── favicon.ico
│   └── index.html
│
└── src/                                # Исходники проекта
    ├── api/                            # api-сервисы
    │   ├── <API_SERVICE_NAME>/         # Реализация сервиса для конкретного бекенда
    │   │   ├── models/                 # Модели запросов/ответов
    │   │   └── index.ts                # Наследует базовый класс Fetcher
    │   └── fetcher.ts                  # Базовый класс для cоздания сервисов
    │
    ├── common/                         # Общий код (стили, хуки, вспомогательные функции и пр.)
    │
    ├── features/                       # Фичи и связанная с ними редакс-логика
    │   └── <FEATURE_NAME>/             # Директория фичи
    │       ├── <FEATURE_NAME>.slice    # RTK-slice
    │       └── index.ts                # Код компонента 
    │
    ├── store/                          # Конфигурация редакс-стора
    │
    ├── App.tsx/                        # Корневой компонент
    │
    └── index.tsx                       # Точка входа в приложение
```

## NPM-скрипты
В качестве шаблона проекта используется [Create React App](https://github.com/facebook/create-react-app).\
[Список всех скриптов из официальной документации](https://github.com/facebook/create-react-app#creating-an-app).

### `npm install`
Установка npm зависимостей.

### `npm start`
Запуск приложения в режиме разработки.\
Автоматически открывается [http://localhost:3000](http://localhost:3000) в браузере.

### `npm run build`
Сборка приложения для продакшена в папку `build`.
