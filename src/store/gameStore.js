import { create } from 'zustand'
import { SCENARIOS, START_SCENARIO_ID, pickNextScenarioId } from '../data/scenarios'
import { computeEnding } from '../data/endings'

// Reputation — 4-я скрытая стата. В StatsBar её нет, открывается только в финале.
const INITIAL_STATS = { integrity: 50, money: 20, risk: 10, reputation: 50 }

const TAG_RULES = [
  { tag: 'briber',        when: (c) => c.type === 'shortcut' && (c.deltas.money > 0 || c.deltas.integrity < -10) },
  { tag: 'whistleblower', when: (c) => c.type === 'risky-halol' },
  { tag: 'silent',        when: (c) => c.type === 'gray' },
  { tag: 'principled',    when: (c) => c.type === 'halol' },
]

function computeTags(history) {
  const counts = { briber: 0, whistleblower: 0, silent: 0, principled: 0 }
  for (const h of history) {
    if (h.timedOut) { counts.silent++; continue }
    for (const rule of TAG_RULES) {
      if (rule.when(h)) counts[rule.tag]++
    }
  }
  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1])
  return {
    dominant: sorted[0][1] > 0 ? sorted[0][0] : 'neutral',
    counts,
  }
}

const clamp = (n) => Math.max(0, Math.min(100, n))

function applyDeltas(stats, deltas) {
  return {
    integrity:  clamp(stats.integrity  + (deltas.integrity  || 0)),
    money:      clamp(stats.money      + (deltas.money      || 0)),
    risk:       clamp(stats.risk       + (deltas.risk       || 0)),
    reputation: clamp(stats.reputation + (deltas.reputation || 0)),
  }
}

const TIMEOUT_DELTAS = { integrity: -8, money: 0, risk: +6, reputation: -6 }

export const useGameStore = create((set, get) => ({
  phase: 'intro', // 'intro' | 'scene' | 'feedback' | 'pre-ending' | 'ending'
  sceneIndex: 0,            // порядковый номер шага (для AnimatePresence ключей и UI-счётчика)
  currentScenarioId: null,  // id текущей сцены (новая логика)
  scenePath: [],            // [id1, id2, ...] пройденные сцены
  stats: { ...INITIAL_STATS },
  history: [],              // [{ scenarioId, choiceId, type, deltas, timedOut }]
  lastEntry: null,
  ending: null,
  playerName: '',
  behaviorTags: { dominant: 'neutral', counts: {} },
  sessionId: null,          // server session id (заполняется при /api/session)

  setPlayerName(name) {
    set({ playerName: name })
  },

  setSessionId(id) {
    set({ sessionId: id })
  },

  start() {
    set({
      phase: 'scene',
      sceneIndex: 0,
      currentScenarioId: START_SCENARIO_ID,
      scenePath: [START_SCENARIO_ID],
      stats: { ...INITIAL_STATS },
      history: [],
      lastEntry: null,
      ending: null,
    })
  },

  choose(choice) {
    const { stats, currentScenarioId, history } = get()
    const nextStats = applyDeltas(stats, choice.deltas)
    const entry = {
      scenarioId: currentScenarioId,
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
    const { stats, currentScenarioId, history } = get()
    const nextStats = applyDeltas(stats, TIMEOUT_DELTAS)
    const entry = {
      scenarioId: currentScenarioId,
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
    const { currentScenarioId, history, stats, sceneIndex, scenePath } = get()
    const nextId = pickNextScenarioId(currentScenarioId, history, stats)
    if (!nextId) {
      const ending = computeEnding(stats)
      const tags = computeTags(history)
      set({ phase: 'pre-ending', ending, behaviorTags: tags })
      return
    }
    set({
      phase: 'scene',
      sceneIndex: sceneIndex + 1,
      currentScenarioId: nextId,
      scenePath: [...scenePath, nextId],
      lastEntry: null,
    })
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
      currentScenarioId: null,
      scenePath: [],
      stats: { ...INITIAL_STATS },
      history: [],
      lastEntry: null,
      ending: null,
      sessionId: null,
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
