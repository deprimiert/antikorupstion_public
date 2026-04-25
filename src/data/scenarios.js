// 14 сцен в 4 актах. Все сцены связаны цепочкой: chainPrev/chainNext.
// narrator каждой следующей сцены меняется в зависимости от выбора в предыдущей.
// Тексты — в src/i18n/<lang>.js по ключу scenarios.<id>.*

export const SCENARIOS = [
  // ─── Акт 1. Первое столкновение ───
  {
    id: 'university_exam',
    chainNext: 'internship',
    realStory: false,
    timer: 50,
    choices: [
      { id: 'a', type: 'halol', deltas: { integrity: +12, money: -2, risk: 0 } },
      { id: 'b', type: 'shortcut', deltas: { integrity: -15, money: -8, risk: +10 } },
      { id: 'c', type: 'risky-halol', deltas: { integrity: +18, money: 0, risk: +15 } },
    ],
  },
  {
    id: 'internship',
    chainPrev: 'university_exam',
    chainNext: 'birinchi_kun_1',
    realStory: false,
    timer: 50,
    choices: [
      { id: 'a', type: 'halol', deltas: { integrity: +10, money: 0, risk: +5 } },
      { id: 'b', type: 'gray', deltas: { integrity: -8, money: +4, risk: 0 } },
      { id: 'c', type: 'risky-halol', deltas: { integrity: +16, money: 0, risk: +18 } },
    ],
  },
  {
    id: 'birinchi_kun_1',
    chainPrev: 'internship',
    chainNext: 'birinchi_kun_2',
    realStory: false,
    timer: 45,
    choices: [
      { id: 'a', type: 'halol', deltas: { integrity: +14, money: 0, risk: 0 } },
      { id: 'b', type: 'gray', deltas: { integrity: -10, money: 0, risk: +10 } },
      { id: 'c', type: 'shortcut', deltas: { integrity: -18, money: +12, risk: +20 } },
    ],
  },
  {
    id: 'birinchi_kun_2',
    chainPrev: 'birinchi_kun_1',
    chainNext: 'hr_envelope',
    realStory: false,
    timer: 45,
    choices: [
      { id: 'a', type: 'halol', deltas: { integrity: +18, money: 0, risk: +5 } },
      { id: 'b', type: 'gray', deltas: { integrity: -12, money: 0, risk: +12 } },
      { id: 'c', type: 'shortcut', deltas: { integrity: -22, money: 0, risk: +18 } },
    ],
  },

  // ─── Акт 2. Личная жизнь против закона ───
  {
    id: 'hr_envelope',
    chainPrev: 'birinchi_kun_2',
    chainNext: 'road_stop',
    realStory: false,
    timer: 40,
    choices: [
      { id: 'a', type: 'halol', deltas: { integrity: +15, money: -6, risk: 0 } },
      { id: 'b', type: 'shortcut', deltas: { integrity: -18, money: -15, risk: +15 } },
      { id: 'c', type: 'risky-halol', deltas: { integrity: +22, money: -6, risk: +22 } },
    ],
  },
  {
    id: 'road_stop',
    chainPrev: 'hr_envelope',
    chainNext: 'hospital',
    realStory: true,
    timer: 40,
    choices: [
      { id: 'a', type: 'halol', deltas: { integrity: +10, money: -12, risk: 0 } },
      { id: 'b', type: 'shortcut', deltas: { integrity: -10, money: -4, risk: +8 } },
      { id: 'c', type: 'risky-halol', deltas: { integrity: +20, money: -12, risk: +20 } },
    ],
  },
  {
    id: 'hospital',
    chainPrev: 'road_stop',
    chainNext: 'small_favor',
    realStory: true,
    timer: 35,
    choices: [
      { id: 'a', type: 'halol', deltas: { integrity: +8, money: 0, risk: 0 } },
      { id: 'b', type: 'shortcut', deltas: { integrity: -12, money: -10, risk: +5 } },
      { id: 'c', type: 'risky-halol', deltas: { integrity: +20, money: 0, risk: +12 } },
    ],
  },
  {
    id: 'small_favor',
    chainPrev: 'hospital',
    chainNext: 'coworker_theft',
    realStory: false,
    timer: 35,
    choices: [
      { id: 'a', type: 'halol', deltas: { integrity: +10, money: -4, risk: +3 } },
      { id: 'b', type: 'gray', deltas: { integrity: -12, money: +6, risk: +8 } },
      { id: 'c', type: 'shortcut', deltas: { integrity: -18, money: +14, risk: +15 } },
    ],
  },

  // ─── Акт 3. Соучастие ───
  {
    id: 'coworker_theft',
    chainPrev: 'small_favor',
    chainNext: 'fictitious_act',
    realStory: false,
    timer: 30,
    choices: [
      { id: 'a', type: 'halol', deltas: { integrity: +10, money: 0, risk: +3 } },
      { id: 'b', type: 'gray', deltas: { integrity: -8, money: 0, risk: +6 } },
      { id: 'c', type: 'risky-halol', deltas: { integrity: +15, money: 0, risk: +10 } },
    ],
  },
  {
    id: 'fictitious_act',
    chainPrev: 'coworker_theft',
    chainNext: 'school_tender',
    realStory: false,
    timer: 30,
    choices: [
      { id: 'a', type: 'halol', deltas: { integrity: +22, money: -10, risk: +8 } },
      { id: 'b', type: 'shortcut', deltas: { integrity: -22, money: +8, risk: +25 } },
      { id: 'c', type: 'gray', deltas: { integrity: -10, money: +4, risk: +15 } },
    ],
  },
  {
    id: 'school_tender',
    chainPrev: 'fictitious_act',
    chainNext: 'journalist_leak',
    realStory: true,
    timer: 30,
    choices: [
      { id: 'a', type: 'halol', deltas: { integrity: +20, money: 0, risk: +5 } },
      { id: 'b', type: 'shortcut', deltas: { integrity: -25, money: +35, risk: +25 } },
      { id: 'c', type: 'risky-halol', deltas: { integrity: +28, money: 0, risk: +30 } },
    ],
  },

  // ─── Акт 4. Борьба с системой ───
  {
    id: 'journalist_leak',
    chainPrev: 'school_tender',
    chainNext: 'elections',
    realStory: false,
    timer: 25,
    choices: [
      { id: 'a', type: 'halol', deltas: { integrity: +15, money: 0, risk: +8 } },
      { id: 'b', type: 'risky-halol', deltas: { integrity: +8, money: 0, risk: +28 } },
      { id: 'c', type: 'gray', deltas: { integrity: -12, money: +4, risk: -4 } },
    ],
  },
  {
    id: 'elections',
    chainPrev: 'journalist_leak',
    chainNext: 'old_friend_minister',
    realStory: true,
    timer: 25,
    choices: [
      { id: 'a', type: 'halol', deltas: { integrity: +25, money: -8, risk: +15 } },
      { id: 'b', type: 'shortcut', deltas: { integrity: -20, money: +15, risk: +30 } },
      { id: 'c', type: 'risky-halol', deltas: { integrity: +18, money: -4, risk: +25 } },
    ],
  },
  {
    id: 'old_friend_minister',
    chainPrev: 'elections',
    realStory: false,
    timer: 25,
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
