import { create } from 'zustand'
import { SCENARIOS } from '../data/scenarios'
import { computeEnding } from '../data/endings'

const INITIAL_STATS = { integrity: 50, money: 20, risk: 10 }

// Behavior tags: track player patterns for "memory system"
const TAG_RULES = [
  { tag: 'briber',       when: (c) => c.type === 'shortcut' && (c.deltas.money > 0 || c.deltas.integrity < -10) },
  { tag: 'whistleblower',when: (c) => c.type === 'risky-halol' },
  { tag: 'silent',       when: (c) => c.type === 'gray' },
  { tag: 'principled',   when: (c) => c.type === 'halol' },
]

function computeTags(history) {
  const counts = { briber: 0, whistleblower: 0, silent: 0, principled: 0 }
  for (const h of history) {
    if (h.timedOut) { counts.silent++; continue }
    for (const rule of TAG_RULES) {
      if (rule.when(h)) counts[rule.tag]++
    }
  }
  // Return the dominant tag (most frequent behavior)
  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1])
  return {
    dominant: sorted[0][1] > 0 ? sorted[0][0] : 'neutral',
    counts,
  }
}

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
  phase: 'intro', // 'intro' | 'scene' | 'feedback' | 'pre-ending' | 'ending'
  sceneIndex: 0,
  stats: { ...INITIAL_STATS },
  history: [], // [{ scenarioId, choiceId, type, deltas, timedOut }]
  lastEntry: null,
  ending: null,
  playerName: '',
  behaviorTags: { dominant: 'neutral', counts: {} },

  setPlayerName(name) {
    set({ playerName: name })
  },

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
    const { sceneIndex, stats, history } = get()
    const nextIndex = sceneIndex + 1
    if (nextIndex >= SCENARIOS.length) {
      const ending = computeEnding(stats)
      const tags = computeTags(history)
      set({ phase: 'pre-ending', ending, behaviorTags: tags })
      return
    }
    set({ phase: 'scene', sceneIndex: nextIndex, lastEntry: null })
  },

  finishToEnding() {
    const { ending } = get()
    try {
      const key = 'halol_avlod:badges'
      const raw = localStorage.getItem(key)
      const badges = raw ? JSON.parse(raw) : []
      if (!badges.includes(ending.id)) {
        badges.push(ending.id)
        localStorage.setItem(key, JSON.stringify(badges))
      }
    } catch {}
    set({ phase: 'ending' })
  },

  restart() {
    set({
      phase: 'intro',
      sceneIndex: 0,
      stats: { ...INITIAL_STATS },
      history: [],
      lastEntry: null,
      ending: null,
      behaviorTags: { dominant: 'neutral', counts: {} },
    })
  },
}))

export function getBadges() {
  try {
    const raw = localStorage.getItem('halol_avlod:badges')
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}
