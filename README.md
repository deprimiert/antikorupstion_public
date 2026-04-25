# Halol Yo‘l — Путь честности

Интерактивная анти-коррупционная игра-новелла для хакатона.
10 сцен · 10 секунд на решение · 4 финала.

## Стек

- React 18 + Vite 5
- Tailwind CSS 3
- Framer Motion (анимации, таймер, staggered reveals)
- Zustand (game state)
- Geist Sans (через Google Fonts)

Дизайн следует гайдам taste-skill:
нейтральная палитра Zinc, один акцент (crimson), асимметричная grid-раскладка,
Framer Motion вместо CSS-only анимаций, cubic-bezier `(0.16, 1, 0.3, 1)`,
отсутствие Inter / AI-фиолетового / неона.

## Локальный запуск

```bash
npm install
npm run dev
```

Откроется на `http://localhost:5173`.

## Production-сборка

```bash
npm run build
npm run start
```

`start` поднимает `vite preview` на `$PORT` (по умолчанию 3000).

## Деплой на Railway

1. Залить код в GitHub-репу.
2. На Railway: **New Project → Deploy from GitHub**, выбрать репу.
3. Railway автоматически подхватит `railway.json` / `nixpacks.toml`:
   - собирает: `npm ci && npm run build`
   - запускает: `npm run start` (Vite preview на `$PORT`)
4. Переменная `PORT` пробрасывается Railway автоматически — править ничего не нужно.
5. Готово. Railway выдаст публичный URL.

## Структура

```
src/
  App.jsx                 — роутинг фаз (intro / scene / feedback / ending)
  index.css               — Tailwind + grain + vignette + tactile
  data/
    scenarios.js          — 10 сцен с вариантами (контент)
    endings.js            — 4 финала + функция computeEnding()
  store/
    gameStore.js          — Zustand: stats, history, переходы фаз
  components/
    Intro.jsx             — стартовый экран
    Scene.jsx             — сцена + таймер + выборы
    Timer.jsx             — 10-секундный таймер (Framer Motion)
    Choices.jsx           — карточки выборов
    Feedback.jsx          — экран последствий с дельтами
    Ending.jsx            — финал + share + история решений
    StatsBar.jsx          — pill-бейджи с ring-прогрессом
    ProgressRail.jsx      — точки прогресса сцен
```

## Игровая логика

Начальные характеристики: `integrity: 50, money: 20, risk: 10`.
Каждый выбор применяет дельты (клемпятся в `0..100`).

Финалы определяются в `src/data/endings.js::computeEnding`:

| Условие | Финал |
|---|---|
| `risk ≥ 75` | Посадка |
| `integrity ≥ 65` | Халол лидер |
| `money ≥ 55 && integrity ≤ 35` | Богач под следствием |
| иначе | Выжил, но сломлен |

Тайм-аут = `-8 integrity / +6 risk` и текст «Ты промолчал».

## Что добавить после хакатона (nice-to-have)

- Supabase/Firebase для глобальной статистики «какой % выбрал этот ответ»
- OG image generation per ending (Satori)
- Узбекский перевод интерфейса (i18n)
- 5–6 дополнительных сценариев с разветвлением
- Аудио-эффекты при таймере и выборе (Howler.js)
