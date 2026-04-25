# Halol Avlod — Поколение честности

Интерактивная анти-коррупционная игра-новелла для хакатона.
14 сцен в 4 актах · индивидуальный таймер на каждую сцену · 4 финала · 3 языка.

## Стек

- React 18 + Vite 5
- Tailwind CSS 3 (светлая/тёмная тема через `darkMode: 'class'`)
- Framer Motion (анимации, таймер, staggered reveals, AnimatePresence)
- Zustand 5 (game state + UI state)
- i18n собственного производства (uz / ru / en)
- Geist Sans / Geist Mono / Cabinet Grotesk (через Google Fonts)
- Node + `serve-handler` для production-раздачи статики

Дизайн следует гайдам taste-skill:
нейтральная палитра Zinc (через CSS-переменные `--ink-*`), один акцент (crimson),
асимметричная grid-раскладка, Framer Motion вместо CSS-only анимаций,
cubic-bezier `(0.16, 1, 0.3, 1)`, отсутствие Inter / AI-фиолетового / неона.

## Локальный запуск

```bash
npm install
npm run dev
```

Откроется на `http://localhost:5173` (Vite с `--host`, доступно из локальной сети).

## Production-сборка

```bash
npm run build
npm run start
```

`start` поднимает Node-сервер (`server.js`) на `serve-handler`:
раздаёт `dist/`, делает SPA-rewrite на `index.html`, кэширует `assets/**` на год.
Слушает `$PORT` (по умолчанию 3000) на `0.0.0.0`.

`npm run preview` поднимает родной `vite preview` на порту 3000 — для быстрой проверки сборки.

## Деплой на Railway

1. Залить код в GitHub-репу.
2. На Railway: **New Project → Deploy from GitHub**, выбрать репу.
3. Railway автоматически подхватит `railway.json` + `nixpacks.toml`:
   - install: `npm ci --include=dev`
   - build: `npm run build`
   - start: `npm run start` (Node-сервер на `$PORT`)
4. Переменная `PORT` пробрасывается Railway автоматически.
5. Готово. Railway выдаст публичный URL.

## Структура

```
src/
  App.jsx                 — фазы: intro / scene / feedback / pre-ending / ending
  main.jsx                — точка входа
  index.css               — Tailwind + CSS-переменные палитры + grain + vignette + tactile
  data/
    scenarios.js          — 14 сцен (id, choices, deltas, timer, chainPrev/Next, realStory)
    endings.js            — 4 финала + computeEnding(stats)
  store/
    gameStore.js          — Zustand: phase, stats, history, behaviorTags, ending, playerName
    uiStore.js            — Zustand: theme (light/dark), lang (uz/ru/en) + persist в localStorage
  i18n/
    index.js              — useT(), tFor(lang, key, params), интерполяция {name}
    uz.js, ru.js, en.js   — словари (UI + сценарии + финалы)
  components/
    Intro.jsx             — стартовый экран + ввод имени
    Scene.jsx             — сцена + таймер + выборы + chained-нарратор
    Timer.jsx             — таймер (Framer Motion), индивидуальный лимит на сцену
    Choices.jsx           — карточки выборов
    Feedback.jsx          — экран последствий с дельтами
    PreEnding.jsx         — кинематографичная подводка к финалу (3 строки + tag)
    Ending.jsx            — финал + share + история решений + badge
    StatsBar.jsx          — pill-бейджи с ring-прогрессом
    ProgressRail.jsx      — точки прогресса по 14 сценам
    Toolbar.jsx           — переключатель языка + theme toggle (sun/moon)
server.js                 — production static-сервер (serve-handler, SPA-rewrite, cache headers)
railway.json + nixpacks.toml — конфиг деплоя
```

## Игровая логика

Начальные характеристики: `integrity: 50, money: 20, risk: 10`.
Каждый выбор применяет дельты, значения клемпятся в `0..100`.

### 14 сцен в 4 актах

1. **Акт 1. Первое столкновение** — university_exam → internship → birinchi_kun_1 → birinchi_kun_2
2. **Акт 2. Личная жизнь против закона** — hr_envelope → road_stop → hospital → small_favor
3. **Акт 3. Соучастие** — coworker_theft → fictitious_act → school_tender
4. **Акт 4. Борьба с системой** — journalist_leak → elections → old_friend_minister

Сцены связаны цепочкой через `chainPrev` / `chainNext` — нарратор следующей сцены меняется
в зависимости от типа предыдущего выбора. Часть сцен помечены `realStory: true` —
это реальные кейсы из узбекских СМИ.

Типы выборов: `halol` (честный), `gray` (серая зона), `shortcut` (срезать угол),
`risky-halol` (честный, но рискованный путь — например, открытое разоблачение).

### Таймеры

Индивидуально на сцену (поле `timer` в секундах): 50 → 45 → 40 → 35 → 30 → 25 — давление нарастает.
Тайм-аут = `-8 integrity / +6 risk` и текст «Ты промолчал» / `timeoutChoice` из i18n.

### Финалы

`src/data/endings.js::computeEnding`:

| Условие | Финал |
|---|---|
| `risk ≥ 75` | `imprisoned` (Посадка) |
| `integrity ≥ 65` | `halol_leader` (Халол лидер) |
| `money ≥ 55 && integrity ≤ 35` | `wealthy_under_investigation` (Богач под следствием) |
| `integrity ≤ 30 && risk ≥ 55` | `wealthy_under_investigation` |
| иначе | `survived_but_broken` (Выжил, но сломлен) |

### Поведенческие теги

После последней сцены `gameStore.computeTags(history)` определяет доминирующий паттерн игрока:
`briber` (часто платил), `whistleblower` (рискованный честный путь), `silent` (молчал/таймауты),
`principled` (стабильно честный), либо `neutral`. Тег показывается в `PreEnding`.

### Badges

Полученный `ending.id` сохраняется в `localStorage['halol_avlod:badges']`.
Накопленные финалы видны на экране Intro / Ending.

## Интернационализация

- Языки: **uz** (узбекский, дефолтный), **ru** (русский), **en** (английский).
- Стартовый язык: из `localStorage['halol_avlod:lang']` или из `navigator.language`, иначе `uz`.
- Переключение — через Toolbar в шапке. Атрибут `<html lang="...">` синхронизируется автоматически.
- Все тексты UI / сценариев / финалов — в `src/i18n/<lang>.js`. Поддерживается интерполяция `{name}`.

## Тема

- `light` / `dark`, переключение в Toolbar.
- Стартовая тема: из `localStorage['halol_avlod:theme']` или из `prefers-color-scheme`, иначе `dark`.
- Реализация — `darkMode: 'class'` + класс `light` на `<html>`, цвета через CSS-переменные `--ink-*`.

## Что добавить после хакатона (nice-to-have)

- Supabase/Firebase для глобальной статистики «какой % выбрал этот ответ»
- OG image generation per ending (Satori) для красивого share
- 5–6 дополнительных сценариев с реальными ветвлениями (не только chained-нарратор)
- Аудио-эффекты при таймере и выборе (Howler.js)
- Дополнительные локализации (kaa, tj)
