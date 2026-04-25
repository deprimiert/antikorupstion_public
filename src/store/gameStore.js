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

// Тайм-аут (общий, без текста — он берётся из i18n.timeoutChoice).
const TIMEOUT_DELTAS = { integrity: -8, money: 0, risk: +6 }

export const useGameStore = create((set, get) => ({
  phase: 'intro', // 'intro' | 'scene' | 'feedback' | 'ending'
  sceneIndex: 0,
  stats: { ...INITIAL_STATS },
  history: [], // [{ scenarioId, choiceId, type, deltas, timedOut }]
  lastEntry: null,
  ending: null,

  start() {
    set({
      phase: 'scene',
      sceneIndex: 0,
      stats: { ...INITIAL_STATS },
      history: [],
      lastEntry: null,
      ending: null,
    })
  },

  choose(choice) {
    const { stats, sceneIndex, history } = get()
    const scenario = SCENARIOS[sceneIndex]
    const nextStats = applyDeltas(stats, choice.deltas)
    const entry = {
      scenarioId: scenario.id,
      choiceId: choice.id,
      type: choice.type,
      deltas: choice.deltas,
      timedOut: false,
    }
    set({
      phase: 'feedback',
      stats: nextStats,
      history: [...history, entry],
      lastEntry: entry,
    })
  },

  timeout() {
    const { stats, sceneIndex, history } = get()
    const scenario = SCENARIOS[sceneIndex]
    const nextStats = applyDeltas(stats, TIMEOUT_DELTAS)
    const entry = {
      scenarioId: scenario.id,
      choiceId: 'timeout',
      type: 'gray',
      deltas: TIMEOUT_DELTAS,
      timedOut: true,
    }
    set({
      phase: 'feedback',
      stats: nextStats,
      history: [...history, entry],
      lastEntry: entry,
    })
  },

  next() {
    const { sceneIndex, stats } = get()
    const nextIndex = sceneIndex + 1
    if (nextIndex >= SCENARIOS.length) {
      const ending = computeEnding(stats)
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
    set({ phase: 'scene', sceneIndex: nextIndex, lastEntry: null })
  },

  restart() {
    set({
      phase: 'intro',
      sceneIndex: 0,
      stats: { ...INITIAL_STATS },
      history: [],
      lastEntry: null,
      ending: null,
    })
  },
}))

export function getBadges() {
  try {
    const raw = localStorage.getItem('halol_yol:badges')
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}
