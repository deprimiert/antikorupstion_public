// 5 базовых актов + 3 опциональные микро-сцены.
// Минимальный путь = 5 сцен, максимальный = 8 — зависит от выборов игрока.
// Тексты — в src/i18n/<lang>.js по ключу scenarios.<id>.*
// next({ last, history, stats }) возвращает id следующей сцены или null (=> финал).
// Сервер (server/) валидирует тот же граф и присылает следующую сцену в API-ответе.

export const SCENARIOS = {
  // ─── Акт 1. Университет ───
  exam: {
    id: 'exam',
    act: 1,
    realStory: false,
    timer: 50,
    choices: [
      { id: 'a', type: 'halol',       deltas: { integrity: +12, money:  -2, risk:   0, reputation:  +6 } },
      { id: 'b', type: 'shortcut',    deltas: { integrity: -15, money:  -8, risk: +10, reputation: -10 } },
      { id: 'c', type: 'risky-halol', deltas: { integrity: +18, money:   0, risk: +15, reputation: +12 } },
    ],
    next: () => 'archive',
  },

  // ─── Акт 2. Архив / Практика ───
  archive: {
    id: 'archive',
    act: 2,
    realStory: true,
    timer: 45,
    choices: [
      { id: 'a', type: 'halol',       deltas: { integrity: +10, money:   0, risk:  +5, reputation:  +6 } },
      { id: 'b', type: 'gray',        deltas: { integrity:  -8, money:  +4, risk:   0, reputation:  -8 } },
      { id: 'c', type: 'risky-halol', deltas: { integrity: +16, money:   0, risk: +18, reputation: +12 } },
    ],
    // Если игрок громко проявил себя (halol/risky) — антикор зовёт на разговор.
    // Если промолчал (gray) — пропускаем, схема его уже считает «своим».
    next: ({ last }) =>
      last && (last.type === 'halol' || last.type === 'risky-halol') ? 'archive_call' : 'first_job',
  },

  archive_call: {
    id: 'archive_call',
    act: 2,
    optional: true,
    realStory: false,
    timer: 35,
    choices: [
      { id: 'a', type: 'halol',       deltas: { integrity: +10, money:   0, risk: +10, reputation:  +8 } },
      { id: 'b', type: 'gray',        deltas: { integrity: -10, money:   0, risk:  -8, reputation:  -6 } },
      { id: 'c', type: 'risky-halol', deltas: { integrity: +18, money:   0, risk: +22, reputation: +14 } },
    ],
    next: () => 'first_job',
  },

  // ─── Акт 3. Первая работа ───
  first_job: {
    id: 'first_job',
    act: 3,
    realStory: true,
    timer: 40,
    choices: [
      { id: 'a', type: 'halol',       deltas: { integrity: +14, money:   0, risk:  +5, reputation:  +8 } },
      { id: 'b', type: 'gray',        deltas: { integrity: -10, money:   0, risk:  +6, reputation:  -6 } },
      { id: 'c', type: 'shortcut',    deltas: { integrity: -18, money: +12, risk: +15, reputation: -12 } },
    ],
    // Если взял конверт — схема втягивает дальше. Иначе сразу на семейный выбор.
    next: ({ last }) => (last && last.type === 'shortcut' ? 'first_job_pull' : 'family'),
  },

  first_job_pull: {
    id: 'first_job_pull',
    act: 3,
    optional: true,
    realStory: false,
    timer: 30,
    choices: [
      { id: 'a', type: 'halol',       deltas: { integrity: +18, money:  -5, risk: +20, reputation: +14 } },
      { id: 'b', type: 'shortcut',    deltas: { integrity: -22, money: +20, risk: +25, reputation: -18 } },
      { id: 'c', type: 'gray',        deltas: { integrity: -10, money:  +6, risk: +12, reputation:  -8 } },
    ],
    next: () => 'family',
  },

  // ─── Акт 4. Семья / больница / махалля ───
  family: {
    id: 'family',
    act: 4,
    realStory: true,
    timer: 35,
    choices: [
      { id: 'a', type: 'halol',       deltas: { integrity: +14, money: -10, risk:   0, reputation:  +8 } },
      { id: 'b', type: 'shortcut',    deltas: { integrity: -16, money:  -8, risk: +10, reputation: -10 } },
      { id: 'c', type: 'risky-halol', deltas: { integrity: +22, money: -12, risk: +22, reputation: +12 } },
    ],
    // Если поднял шум — пресса узнала, нужен новый ход. Иначе сразу к финалу.
    next: ({ last }) => (last && last.type === 'risky-halol' ? 'family_news' : 'power'),
  },

  family_news: {
    id: 'family_news',
    act: 4,
    optional: true,
    realStory: false,
    timer: 30,
    choices: [
      { id: 'a', type: 'halol',       deltas: { integrity: +20, money:   0, risk: +15, reputation: +18 } },
      { id: 'b', type: 'gray',        deltas: { integrity: -10, money:   0, risk:  -8, reputation: -10 } },
      { id: 'c', type: 'risky-halol', deltas: { integrity: +25, money:   0, risk: +25, reputation: +20 } },
    ],
    next: () => 'power',
  },

  // ─── Акт 5. Кабинет власти ───
  power: {
    id: 'power',
    act: 5,
    realStory: false,
    timer: 25,
    choices: [
      { id: 'a', type: 'halol',       deltas: { integrity: +30, money:   0, risk: +12, reputation: +20 } },
      { id: 'b', type: 'shortcut',    deltas: { integrity: -35, money: +25, risk: +35, reputation: -25 } },
      { id: 'c', type: 'risky-halol', deltas: { integrity: +25, money:   0, risk: +20, reputation: +18 } },
    ],
    next: () => null,
  },
}

// Базовая последовательность актов (для ProgressRail и счётчика «Акт N из 5»).
export const BASE_SEQUENCE = ['exam', 'archive', 'first_job', 'family', 'power']
export const TOTAL_ACTS = BASE_SEQUENCE.length

// Стартовая сцена.
export const START_SCENARIO_ID = 'exam'

export const CHOICE_TYPE_TONE = {
  halol: 'text-halol',
  gray: 'text-ink-300',
  shortcut: 'text-accent',
  'risky-halol': 'text-shadow',
}

// Найти прошлый выбор по сценарию для chained-нарратора.
export function findChoiceByScenarioId(history, scenarioId) {
  if (!scenarioId) return null
  for (let i = history.length - 1; i >= 0; i--) {
    if (history[i].scenarioId === scenarioId) return history[i]
  }
  return null
}

// Backward-compat: компонент Scene вызывает findChainPrevChoice — оставляем как алиас.
export const findChainPrevChoice = findChoiceByScenarioId

// Определить следующую сцену по текущему id, истории и stats.
export function pickNextScenarioId(currentId, history, stats) {
  const scenario = SCENARIOS[currentId]
  if (!scenario || typeof scenario.next !== 'function') return null
  const last = history[history.length - 1]
  return scenario.next({ last, history, stats })
}

// Из id сцены вернуть номер акта (1..5) — для UI.
export function actOf(scenarioId) {
  return SCENARIOS[scenarioId]?.act ?? 1
}
