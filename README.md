# Todo Notes App ([English](docs/README.en.md))

SPA-приложение для заметок с todo-списками, реализованное на Nuxt 4 (Composition API).

## Стек

- **Nuxt 4** (Vue 3, Composition API, TypeScript)
- **Pinia** — менеджер состояния + persistedstate (localStorage)
- **PrimeVue** — UI-компоненты (карточки, кнопки, модальные окна)
- **SCSS** — стилизация
- **VueUse** — `useRefHistory` для undo/redo

## Функционал

**Главная страница:**
- Список всех заметок с превью todo
- Создание, редактирование, удаление заметки

**Страница редактирования:**
- Редактирование названия и todo
- Добавление / удаление / редактирование todo
- Отметка todo как выполненных
- Undo / Redo (Ctrl+Z / Ctrl+Shift+Z)
- Сохранение / отмена редактирования / удаление (с подтверждением)

**Прочее:**
- Состояние сохраняется в localStorage (данные доступны после перезагрузки)
- Адаптивная вёрстка (мобильная / десктопная)

## Запуск через Docker

```bash
docker-compose up
```

Приложение будет доступно на [http://localhost:3000](http://localhost:3000).

## Запуск локально

```bash
npm install
npm run dev
```

## Сборка

```bash
npm run generate
```

Результат — статические файлы в `.output/public`.
