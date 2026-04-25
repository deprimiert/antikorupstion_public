import { create } from 'zustand'
import { SCENARIOS } from '../data/scenarios'
import { computeEnding } from '../data/endings'

const INITIAL_STATS = { integrity: 50, money: 20, risk: 10 }

const clamp = (n) => Math.max(0, Math.min(100, n))

function applyDeltas(stats, deltas) {
  return {
    integrity: clamp(stats.integrity + (deltas.integrity || 0)),
    money: clamp(stats.money + (deltas.money || 0)),
    risk: clamp(stats.risk + (deltas.risk || 0)),
  }
}

export const useGameStore = create((set, get) => ({
  phase: 'intro', // 'intro' | 'scene' | 'feedback' | 'ending'
  sceneIndex: 0,
  stats: { ...INITIAL_STATS },
  history: [], // [{ scenarioId, choiceId, deltas, outcome, timedOut }]
  lastChoice: null,

  start() {
    set({
      phase: 'scene',
      sceneIndex: 0,
      stats: { ...INITIAL_STATS },
      history: [],
      lastChoice: null,
    })
  },

  choose(choice, { timedOut = false } = {}) {
    const { stats, sceneIndex, history } = get()
    const scenario = SCENARIOS[sceneIndex]
    const nextStats = applyDeltas(stats, choice.deltas)
    const entry = {
      scenarioId: scenario.id,
      stage: scenario.stage,
      title: scenario.title,
      choiceId: choice.id,
      choiceLabel: choice.label,
      choiceType: choice.type,
      deltas: choice.deltas,
      outcome: choice.outcome,
      timedOut,
    }
    set({
      phase: 'feedback',
      stats: nextStats,
      history: [...history, entry],
      lastChoice: { ...choice, timedOut },
    })
  },

  timeoutChoice() {
    const { stats, sceneIndex, history } = get()
    const scenario = SCENARIOS[sceneIndex]
    // Тайм-аут = «не решил» — бьёт по integrity, добавляет немного risk.
    const timeoutChoice = {
      id: 'timeout',
      label: 'Ты не решил',
      subtitle: 'Время вышло.',
      type: 'gray',
      deltas: { integrity: -8, money: 0, risk: +6 },
      outcome:
        'Ты промолчал. За тебя решили другие. Иногда это и есть выбор.',
    }
    const nextStats = applyDeltas(stats, timeoutChoice.deltas)
    set({
      phase: 'feedback',
      stats: nextStats,
      history: [
        ...history,
        {
          scenarioId: scenario.id,
          stage: scenario.stage,
          title: scenario.title,
          choiceId: 'timeout',
          choiceLabel: timeoutChoice.label,
          choiceType: 'gray',
          deltas: timeoutChoice.deltas,
          outcome: timeoutChoice.outcome,
          timedOut: true,
        },
      ],
      lastChoice: { ...timeoutChoice, timedOut: true },
    })
  },

  next() {
    const { sceneIndex, stats, history } = get()
    const nextIndex = sceneIndex + 1
    if (nextIndex >= SCENARIOS.length) {
      const ending = computeEnding(stats, history)
      set({ phase: 'ending', ending })
      try {
        const key = 'halol_yol:badges'
        const raw = localStorage.getItem(key)
        const badges = raw ? JSON.parse(raw) : []
        if (!badges.includes(ending.id)) {
          badges.push(ending.id)
          localStorage.setItem(key, JSON.stringify(badges))
        }
      } catch {}
      return
    }
    set({ phase: 'scene', sceneIndex: nextIndex, lastChoice: null })
  },

  restart() {
    set({
      phase: 'intro',
      sceneIndex: 0,
      stats: { ...INITIAL_STATS },
      history: [],
      lastChoice: null,
      ending: null,
    })
  },

  ending: null,
}))

export function getBadges() {
  try {
    const raw = localStorage.getItem('halol_yol:badges')
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}
