// Структура сцен — без текстов. Тексты живут в src/i18n/<lang>.js по ключу scenarios.<id>.*
// Каждая сцена: id, optional realStory, optional chainNext/chainPrev, choices[].
// Каждый choice: id ('a'|'b'|'c'), type, deltas. Текст label/subtitle/outcome — в i18n.

export const SCENARIOS = [
  {
    id: 'birinchi_kun_1',
    chainNext: 'birinchi_kun_2',
    realStory: false,
    choices: [
      { id: 'a', type: 'halol', deltas: { integrity: +14, money: 0, risk: 0 } },
      { id: 'b', type: 'gray', deltas: { integrity: -10, money: 0, risk: +10 } },
      { id: 'c', type: 'shortcut', deltas: { integrity: -18, money: +12, risk: +20 } },
    ],
  },
  {
    id: 'birinchi_kun_2',
    chainPrev: 'birinchi_kun_1',
    realStory: false,
    choices: [
      { id: 'a', type: 'halol', deltas: { integrity: +18, money: 0, risk: +5 } },
      { id: 'b', type: 'gray', deltas: { integrity: -12, money: 0, risk: +12 } },
      { id: 'c', type: 'shortcut', deltas: { integrity: -22, money: 0, risk: +18 } },
    ],
  },
  {
    id: 'road_stop',
    realStory: true,
    choices: [
      { id: 'a', type: 'halol', deltas: { integrity: +10, money: -12, risk: 0 } },
      { id: 'b', type: 'shortcut', deltas: { integrity: -10, money: -4, risk: +8 } },
      { id: 'c', type: 'risky-halol', deltas: { integrity: +20, money: -12, risk: +20 } },
    ],
  },
  {
    id: 'hr_envelope',
    realStory: false,
    choices: [
      { id: 'a', type: 'halol', deltas: { integrity: +15, money: -6, risk: 0 } },
      { id: 'b', type: 'shortcut', deltas: { integrity: -18, money: -15, risk: +15 } },
      { id: 'c', type: 'risky-halol', deltas: { integrity: +22, money: -6, risk: +22 } },
    ],
  },
  {
    id: 'hospital',
    realStory: true,
    choices: [
      { id: 'a', type: 'halol', deltas: { integrity: +8, money: 0, risk: 0 } },
      { id: 'b', type: 'shortcut', deltas: { integrity: -12, money: -10, risk: +5 } },
      { id: 'c', type: 'risky-halol', deltas: { integrity: +20, money: 0, risk: +12 } },
    ],
  },
  {
    id: 'coworker_theft',
    realStory: false,
    choices: [
      { id: 'a', type: 'halol', deltas: { integrity: +10, money: 0, risk: +3 } },
      { id: 'b', type: 'gray', deltas: { integrity: -8, money: 0, risk: +6 } },
      { id: 'c', type: 'risky-halol', deltas: { integrity: +15, money: 0, risk: +10 } },
    ],
  },
  {
    id: 'school_tender',
    realStory: true,
    choices: [
      { id: 'a', type: 'halol', deltas: { integrity: +20, money: 0, risk: +5 } },
      { id: 'b', type: 'shortcut', deltas: { integrity: -25, money: +35, risk: +25 } },
      { id: 'c', type: 'risky-halol', deltas: { integrity: +28, money: 0, risk: +30 } },
    ],
  },
  {
    id: 'fictitious_act',
    realStory: false,
    choices: [
      { id: 'a', type: 'halol', deltas: { integrity: +22, money: -10, risk: +8 } },
      { id: 'b', type: 'shortcut', deltas: { integrity: -22, money: +8, risk: +25 } },
      { id: 'c', type: 'gray', deltas: { integrity: -10, money: +4, risk: +15 } },
    ],
  },
  {
    id: 'journalist_leak',
    realStory: false,
    choices: [
      { id: 'a', type: 'halol', deltas: { integrity: +15, money: 0, risk: +8 } },
      { id: 'b', type: 'risky-halol', deltas: { integrity: +8, money: 0, risk: +28 } },
      { id: 'c', type: 'gray', deltas: { integrity: -12, money: +4, risk: -4 } },
    ],
  },
  {
    id: 'elections',
    realStory: true,
    choices: [
      { id: 'a', type: 'halol', deltas: { integrity: +25, money: -8, risk: +15 } },
      { id: 'b', type: 'shortcut', deltas: { integrity: -20, money: +15, risk: +30 } },
      { id: 'c', type: 'risky-halol', deltas: { integrity: +18, money: -4, risk: +25 } },
    ],
  },
  {
    id: 'old_friend_minister',
    realStory: false,
    choices: [
      { id: 'a', type: 'halol', deltas: { integrity: +30, money: 0, risk: +5 } },
      { id: 'b', type: 'shortcut', deltas: { integrity: -35, money: +20, risk: +40 } },
      { id: 'c', type: 'risky-halol', deltas: { integrity: +22, money: 0, risk: +10 } },
    ],
  },
]

export const CHOICE_TYPE_TONE = {
  halol: 'text-halol',
  gray: 'text-ink-300',
  shortcut: 'text-accent',
  'risky-halol': 'text-shadow',
}

// Helper: previous choice id from history for chained scenes.
export function findChainPrevChoice(history, chainPrevId) {
  if (!chainPrevId) return null
  for (let i = history.length - 1; i >= 0; i--) {
    if (history[i].scenarioId === chainPrevId) return history[i]
  }
  return null
}
