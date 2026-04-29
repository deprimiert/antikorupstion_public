import { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { authFetch } from '../store/authStore'

const CHOICE_TYPES = ['halol', 'gray', 'shortcut', 'risky-halol']
const CHOICE_LABELS = { halol: 'Халол', gray: 'Серая зона', shortcut: 'Срез пути', 'risky-halol': 'Рискованный халол' }
const STATS = ['integrity', 'money', 'risk', 'reputation']
const STAT_LABELS = { integrity: 'Честность', money: 'Ресурс', risk: 'Риск', reputation: 'Репутация' }

const BADGE_PRESETS = [
  { label: 'Зелёный (лидер)', value: 'bg-halol/20 text-halol border-halol/40' },
  { label: 'Красный (арест)', value: 'bg-accent/15 text-accent border-accent/40' },
  { label: 'Жёлтый (риск)', value: 'bg-shadow/15 text-shadow border-shadow/40' },
  { label: 'Серый (нейтрал)', value: 'bg-ink-700 text-ink-100 border-ink-500' },
]

const DEFAULT_CHOICE = (key) => ({
  choice_key: key, type: 'halol', label: '', subtitle: '', outcome: '',
  delta_integrity: 0, delta_money: 0, delta_risk: 0, delta_reputation: 0,
})

const DEFAULT_ACT = () => ({
  stage: '', setting: '', title: '', narrator: '', quote: '',
  timer: 40, real_story: false, real_story_note: '', is_optional: false,
  choices: ['a', 'b', 'c'].map(DEFAULT_CHOICE),
  branches: [],
})

const DEFAULT_ENDING = () => ({
  ending_key: 'ending_' + Date.now(),
  title: '', subtitle: '', stat_quote: '', share_text: '',
  body: [''],
  badge_color: 'bg-ink-700 text-ink-100 border-ink-500',
  conditions: [],
  condition_order: 0,
})

export default function ScenarioBuilder() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [scenario, setScenario] = useState(null)
  const [acts, setActs] = useState([])
  const [endings, setEndings] = useState([])
  const [activeAct, setActiveAct] = useState(null)
  const [section, setSection] = useState('acts') // 'acts' | 'endings' | 'settings'
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const res = await authFetch(`/api/scenarios/${id}`)
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setScenario(data.scenario)
      setActs(data.acts.map((a) => ({
        ...a,
        choices: a.choices.map((c) => ({ ...c })),
        branches: a.branches.map((b) => ({ ...b })),
      })))
      setEndings(data.endings)
      if (data.acts.length > 0) setActiveAct(data.acts[0].id)
    } catch (err) {
      alert(err.message)
      navigate('/teacher')
    } finally {
      setLoading(false)
    }
  }, [id, navigate])

  useEffect(() => { load() }, [load])

  function showMsg(text) {
    setMsg(text)
    setTimeout(() => setMsg(''), 2500)
  }

  // ─── Акты ────────────────────────────────────────────────────────────────────

  async function addAct() {
    const draft = DEFAULT_ACT()
    draft.act_number = acts.length + 1
    try {
      const res = await authFetch(`/api/scenarios/${id}/acts`, {
        method: 'POST',
        body: JSON.stringify(draft),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      const newAct = { ...data.act, choices: ['a','b','c'].map(DEFAULT_CHOICE), branches: [] }
      setActs((prev) => [...prev, newAct])
      setActiveAct(data.act.id)
    } catch (err) { alert(err.message) }
  }

  async function deleteAct(actId) {
    if (!confirm('Удалить акт?')) return
    await authFetch(`/api/scenarios/${id}/acts/${actId}`, { method: 'DELETE' })
    setActs((prev) => prev.filter((a) => a.id !== actId))
    setActiveAct(acts.find((a) => a.id !== actId)?.id || null)
  }

  async function saveAct(act) {
    setSaving(true)
    try {
      // Сохраняем акт
      const actRes = await authFetch(`/api/scenarios/${id}/acts/${act.id}`, {
        method: 'PUT',
        body: JSON.stringify(act),
      })
      if (!actRes.ok) { const d = await actRes.json(); throw new Error(d.error) }

      // Сохраняем выборы
      await authFetch(`/api/scenarios/${id}/acts/${act.id}/choices`, {
        method: 'PUT',
        body: JSON.stringify({ choices: act.choices }),
      })

      // Сохраняем ветвление
      await authFetch(`/api/scenarios/${id}/acts/${act.id}/branches`, {
        method: 'PUT',
        body: JSON.stringify({ branches: act.branches }),
      })

      showMsg('Сохранено ✓')
    } catch (err) {
      alert(err.message)
    } finally {
      setSaving(false)
    }
  }

  function updateAct(actId, patch) {
    setActs((prev) => prev.map((a) => a.id === actId ? { ...a, ...patch } : a))
  }

  function updateChoice(actId, key, patch) {
    setActs((prev) => prev.map((a) => {
      if (a.id !== actId) return a
      return { ...a, choices: a.choices.map((c) => c.choice_key === key ? { ...c, ...patch } : c) }
    }))
  }

  function updateBranch(actId, idx, patch) {
    setActs((prev) => prev.map((a) => {
      if (a.id !== actId) return a
      const branches = [...a.branches]
      branches[idx] = { ...branches[idx], ...patch }
      return { ...a, branches }
    }))
  }

  function addBranch(actId) {
    setActs((prev) => prev.map((a) => {
      if (a.id !== actId) return a
      return { ...a, branches: [...a.branches, { condition_type: null, condition_value: null, to_act_id: null, priority: a.branches.length }] }
    }))
  }

  function removeBranch(actId, idx) {
    setActs((prev) => prev.map((a) => {
      if (a.id !== actId) return a
      return { ...a, branches: a.branches.filter((_, i) => i !== idx) }
    }))
  }

  // ─── Финалы ──────────────────────────────────────────────────────────────────

  async function saveEndings() {
    setSaving(true)
    try {
      const res = await authFetch(`/api/scenarios/${id}/endings`, {
        method: 'PUT',
        body: JSON.stringify({ endings }),
      })
      if (!res.ok) { const d = await res.json(); throw new Error(d.error) }
      showMsg('Финалы сохранены ✓')
    } catch (err) {
      alert(err.message)
    } finally {
      setSaving(false)
    }
  }

  async function saveSettings() {
    setSaving(true)
    try {
      const res = await authFetch(`/api/scenarios/${id}`, {
        method: 'PUT',
        body: JSON.stringify(scenario),
      })
      if (!res.ok) { const d = await res.json(); throw new Error(d.error) }
      showMsg('Настройки сохранены ✓')
    } catch (err) {
      alert(err.message)
    } finally {
      setSaving(false)
    }
  }

  const currentAct = acts.find((a) => a.id === activeAct)

  if (loading) {
    return (
      <div className="min-h-[100dvh] bg-ink-950 flex items-center justify-center text-ink-500">
        Загрузка...
      </div>
    )
  }

  return (
    <div className="min-h-[100dvh] bg-ink-950 text-ink-100 flex flex-col">
      {/* Header */}
      <header className="border-b border-ink-800/70 bg-ink-950/90 backdrop-blur-md shrink-0">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <Link to="/teacher" className="text-ink-500 hover:text-ink-300 text-sm">← Назад</Link>
            <span className="text-ink-700">/</span>
            <span className="font-medium truncate text-ink-100">{scenario?.title}</span>
          </div>
          <div className="flex items-center gap-3">
            {msg && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xs text-halol"
              >
                {msg}
              </motion.span>
            )}
            {section === 'acts' && currentAct && (
              <button
                onClick={() => saveAct(currentAct)}
                disabled={saving}
                className="btn-tactile rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-invert-fg disabled:opacity-50"
              >
                {saving ? 'Сохранение...' : 'Сохранить акт'}
              </button>
            )}
            {section === 'endings' && (
              <button
                onClick={saveEndings}
                disabled={saving}
                className="btn-tactile rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-invert-fg disabled:opacity-50"
              >
                {saving ? 'Сохранение...' : 'Сохранить финалы'}
              </button>
            )}
            {section === 'settings' && (
              <button
                onClick={saveSettings}
                disabled={saving}
                className="btn-tactile rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-invert-fg disabled:opacity-50"
              >
                {saving ? 'Сохранение...' : 'Сохранить'}
              </button>
            )}
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-52 shrink-0 border-r border-ink-800/60 bg-ink-900/40 flex flex-col">
          {/* Sections */}
          <div className="p-3 border-b border-ink-800/60">
            {[['acts', 'Акты'], ['endings', 'Финалы'], ['settings', 'Настройки']].map(([key, label]) => (
              <button
                key={key}
                onClick={() => setSection(key)}
                className={`w-full text-left rounded-lg px-3 py-2 text-sm mb-1 transition-colors ${
                  section === key ? 'bg-ink-800 text-ink-100' : 'text-ink-500 hover:text-ink-300 hover:bg-ink-800/40'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Acts list */}
          {section === 'acts' && (
            <div className="flex-1 overflow-y-auto p-3">
              {acts.map((a, i) => (
                <button
                  key={a.id}
                  onClick={() => setActiveAct(a.id)}
                  className={`group w-full text-left rounded-lg px-3 py-2.5 mb-1.5 transition-colors ${
                    a.id === activeAct
                      ? 'bg-accent/15 border border-accent/30 text-ink-100'
                      : 'border border-transparent text-ink-400 hover:text-ink-200 hover:bg-ink-800/40'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-ink-600">
                      Акт {a.act_number}
                    </span>
                    {a.is_optional && (
                      <span className="text-[9px] text-shadow">опц.</span>
                    )}
                  </div>
                  <div className="text-sm font-medium truncate mt-0.5">{a.title || '—'}</div>
                </button>
              ))}
              <button
                onClick={addAct}
                className="w-full rounded-lg border border-dashed border-ink-700 py-2 text-xs text-ink-600 hover:text-ink-400 hover:border-ink-600 transition-colors mt-2"
              >
                + Добавить акт
              </button>
            </div>
          )}
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-6">
          {section === 'acts' && currentAct && (
            <ActEditor
              act={currentAct}
              allActs={acts}
              onChange={(patch) => updateAct(currentAct.id, patch)}
              onChoiceChange={(key, patch) => updateChoice(currentAct.id, key, patch)}
              onAddBranch={() => addBranch(currentAct.id)}
              onBranchChange={(idx, patch) => updateBranch(currentAct.id, idx, patch)}
              onRemoveBranch={(idx) => removeBranch(currentAct.id, idx)}
              onDelete={() => deleteAct(currentAct.id)}
            />
          )}
          {section === 'acts' && !currentAct && (
            <div className="flex flex-col items-center justify-center h-full text-ink-500">
              <p className="mb-4">Выберите или создайте акт</p>
              <button onClick={addAct} className="btn-tactile rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-invert-fg">
                + Первый акт
              </button>
            </div>
          )}
          {section === 'endings' && (
            <EndingsEditor endings={endings} onChange={setEndings} />
          )}
          {section === 'settings' && scenario && (
            <SettingsEditor scenario={scenario} onChange={setScenario} />
          )}
        </main>
      </div>
    </div>
  )
}

// ─── Редактор акта ────────────────────────────────────────────────────────────

function ActEditor({ act, allActs, onChange, onChoiceChange, onAddBranch, onBranchChange, onRemoveBranch, onDelete }) {
  return (
    <div className="max-w-3xl space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl font-bold">Акт {act.act_number}</h2>
        <button onClick={onDelete} className="text-xs text-ink-600 hover:text-accent">Удалить акт</button>
      </div>

      {/* Мета */}
      <Section title="Основное">
        <div className="grid grid-cols-2 gap-4">
          <BuilderField label="Номер акта" type="number">
            <input type="number" min={1} value={act.act_number}
              onChange={(e) => onChange({ act_number: +e.target.value })}
              className={fieldCls} />
          </BuilderField>
          <BuilderField label="Таймер (сек)">
            <input type="number" min={10} max={120} value={act.timer}
              onChange={(e) => onChange({ timer: +e.target.value })}
              className={fieldCls} />
          </BuilderField>
        </div>
        <BuilderField label="Название сцены">
          <input type="text" value={act.title}
            onChange={(e) => onChange({ title: e.target.value })}
            placeholder="Экзамен" className={fieldCls} />
        </BuilderField>
        <BuilderField label="Подпись этапа (CAPS)">
          <input type="text" value={act.stage}
            onChange={(e) => onChange({ stage: e.target.value })}
            placeholder="ПЕРВЫЙ КОМПРОМИСС" className={fieldCls} />
        </BuilderField>
        <BuilderField label="Место действия">
          <input type="text" value={act.setting || ''}
            onChange={(e) => onChange({ setting: e.target.value })}
            placeholder="Юрфак, 3-й курс" className={fieldCls} />
        </BuilderField>
        <BuilderField label="Нарратор (основной текст)">
          <textarea rows={3} value={act.narrator}
            onChange={(e) => onChange({ narrator: e.target.value })}
            className={fieldCls + ' resize-none'} />
        </BuilderField>
        <BuilderField label="Цитата (выделенный блок)">
          <textarea rows={2} value={act.quote}
            onChange={(e) => onChange({ quote: e.target.value })}
            className={fieldCls + ' resize-none'} />
        </BuilderField>
        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={act.real_story}
              onChange={(e) => onChange({ real_story: e.target.checked })}
              className="rounded border-ink-700" />
            <span className="text-sm text-ink-300">Основано на реальных делах</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={act.is_optional}
              onChange={(e) => onChange({ is_optional: e.target.checked })}
              className="rounded border-ink-700" />
            <span className="text-sm text-ink-300">Опциональный акт</span>
          </label>
        </div>
        {act.real_story && (
          <BuilderField label="Примечание к реальному делу">
            <input type="text" value={act.real_story_note || ''}
              onChange={(e) => onChange({ real_story_note: e.target.value })}
              placeholder="Типовое дело Антикора, 2023" className={fieldCls} />
          </BuilderField>
        )}
      </Section>

      {/* Варианты выбора */}
      <Section title="Варианты выбора">
        {act.choices.map((choice) => (
          <ChoiceEditor key={choice.choice_key} choice={choice}
            onChange={(patch) => onChoiceChange(choice.choice_key, patch)} />
        ))}
      </Section>

      {/* Ветвление */}
      <Section title="Ветвление (следующий акт)">
        <p className="text-xs text-ink-500 mb-3">
          Если нет условий — акт по умолчанию идёт в финал (next = null).
          Добавьте правила: «если последний выбор был тип X → перейти в акт Y».
        </p>
        {act.branches.map((b, i) => (
          <BranchEditor key={i} branch={b} allActs={allActs.filter((a) => a.id !== act.id)}
            onChange={(patch) => onBranchChange(i, patch)}
            onRemove={() => onRemoveBranch(i)} />
        ))}
        <button
          onClick={onAddBranch}
          className="mt-2 rounded-lg border border-dashed border-ink-700 px-4 py-2 text-xs text-ink-600 hover:text-ink-400 transition-colors"
        >
          + Добавить правило ветвления
        </button>
      </Section>
    </div>
  )
}

function ChoiceEditor({ choice, onChange }) {
  const labels = { a: 'Вариант A', b: 'Вариант B', c: 'Вариант C' }
  return (
    <div className="rounded-2xl border border-ink-800 bg-ink-900/50 p-5 mb-4">
      <div className="flex items-center justify-between mb-4">
        <span className="font-mono text-xs uppercase tracking-widest text-ink-500">{labels[choice.choice_key]}</span>
        <select value={choice.type} onChange={(e) => onChange({ type: e.target.value })}
          className="rounded-lg border border-ink-700 bg-ink-800 px-2 py-1 text-xs text-ink-300">
          {CHOICE_TYPES.map((t) => <option key={t} value={t}>{CHOICE_LABELS[t]}</option>)}
        </select>
      </div>
      <div className="grid grid-cols-2 gap-3 mb-3">
        <BuilderField label="Кнопка выбора">
          <input type="text" value={choice.label} onChange={(e) => onChange({ label: e.target.value })}
            placeholder="Сдам сам" className={fieldCls} />
        </BuilderField>
        <BuilderField label="Подпись кнопки">
          <input type="text" value={choice.subtitle || ''} onChange={(e) => onChange({ subtitle: e.target.value })}
            placeholder="Так требует закон" className={fieldCls} />
        </BuilderField>
      </div>
      <BuilderField label="Последствие (текст после выбора)">
        <textarea rows={2} value={choice.outcome} onChange={(e) => onChange({ outcome: e.target.value })}
          className={fieldCls + ' resize-none'} />
      </BuilderField>
      <div className="mt-4 grid grid-cols-4 gap-3">
        {STATS.map((stat) => (
          <BuilderField key={stat} label={STAT_LABELS[stat]}>
            <input type="number" min={-100} max={100}
              value={choice[`delta_${stat}`]}
              onChange={(e) => onChange({ [`delta_${stat}`]: +e.target.value })}
              className={fieldCls + ' text-center'} />
          </BuilderField>
        ))}
      </div>
    </div>
  )
}

function BranchEditor({ branch, allActs, onChange, onRemove }) {
  return (
    <div className="flex flex-wrap items-center gap-3 rounded-xl border border-ink-800 bg-ink-900/40 p-4 mb-2">
      <span className="text-xs text-ink-500">Если тип выбора:</span>
      <select value={branch.condition_value || ''}
        onChange={(e) => onChange({ condition_type: e.target.value ? 'choice_type' : null, condition_value: e.target.value || null })}
        className="rounded-lg border border-ink-700 bg-ink-800 px-2 py-1.5 text-xs text-ink-300">
        <option value="">— (всегда)</option>
        {CHOICE_TYPES.map((t) => <option key={t} value={t}>{CHOICE_LABELS[t]}</option>)}
      </select>
      <span className="text-xs text-ink-500">→ перейти в:</span>
      <select value={branch.to_act_id || ''}
        onChange={(e) => onChange({ to_act_id: e.target.value || null })}
        className="rounded-lg border border-ink-700 bg-ink-800 px-2 py-1.5 text-xs text-ink-300">
        <option value="">Финал (конец)</option>
        {allActs.map((a) => <option key={a.id} value={a.id}>Акт {a.act_number}: {a.title || '—'}</option>)}
      </select>
      <button onClick={onRemove} className="ml-auto text-xs text-ink-600 hover:text-accent">✕</button>
    </div>
  )
}

// ─── Редактор финалов ─────────────────────────────────────────────────────────

function EndingsEditor({ endings, onChange }) {
  function add() {
    onChange([...endings, { ...DEFAULT_ENDING(), condition_order: endings.length }])
  }
  function remove(i) {
    if (!confirm('Удалить финал?')) return
    onChange(endings.filter((_, idx) => idx !== i))
  }
  function update(i, patch) {
    onChange(endings.map((e, idx) => idx === i ? { ...e, ...patch } : e))
  }

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl font-bold">Финалы</h2>
        <button onClick={add} className="btn-tactile rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-invert-fg">
          + Добавить
        </button>
      </div>
      <p className="text-sm text-ink-500">
        Условия проверяются по порядку. Первый совпавший финал выигрывает.
        Финал без условий — дефолтный (всегда последний).
      </p>
      {endings.map((ending, i) => (
        <EndingEditor key={i} ending={ending} index={i}
          onChange={(patch) => update(i, patch)} onRemove={() => remove(i)} />
      ))}
    </div>
  )
}

function EndingEditor({ ending, index, onChange, onRemove }) {
  function updateCondition(idx, patch) {
    const conditions = [...(ending.conditions || [])]
    conditions[idx] = { ...conditions[idx], ...patch }
    onChange({ conditions })
  }
  function addCondition() {
    onChange({ conditions: [...(ending.conditions || []), { field: 'integrity', op: '>=', value: 60 }] })
  }
  function removeCondition(idx) {
    onChange({ conditions: ending.conditions.filter((_, i) => i !== idx) })
  }
  function updateBody(idx, val) {
    const body = [...(ending.body || [])]
    body[idx] = val
    onChange({ body })
  }
  function addBodyParagraph() {
    onChange({ body: [...(ending.body || []), ''] })
  }
  function removeBody(idx) {
    onChange({ body: ending.body.filter((_, i) => i !== idx) })
  }

  return (
    <div className="rounded-2xl border border-ink-800 bg-ink-900/50 p-6 space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono uppercase tracking-widest text-ink-500">Финал #{index + 1}</span>
        <button onClick={onRemove} className="text-xs text-ink-600 hover:text-accent">Удалить</button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <BuilderField label="Ключ (латиница)">
          <input type="text" value={ending.ending_key}
            onChange={(e) => onChange({ ending_key: e.target.value })}
            placeholder="halol_leader" className={fieldCls} />
        </BuilderField>
        <BuilderField label="Порядок проверки (0 = первый)">
          <input type="number" min={0} value={ending.condition_order}
            onChange={(e) => onChange({ condition_order: +e.target.value })}
            className={fieldCls} />
        </BuilderField>
      </div>

      <BuilderField label="Заголовок финала">
        <input type="text" value={ending.title}
          onChange={(e) => onChange({ title: e.target.value })}
          placeholder="Честный лидер" className={fieldCls} />
      </BuilderField>
      <BuilderField label="Подзаголовок">
        <input type="text" value={ending.subtitle || ''}
          onChange={(e) => onChange({ subtitle: e.target.value })}
          className={fieldCls} />
      </BuilderField>

      {/* Абзацы */}
      <div>
        <label className={labelCls}>Текст финала (абзацы)</label>
        {(ending.body || []).map((p, i) => (
          <div key={i} className="flex gap-2 mb-2">
            <textarea rows={2} value={p} onChange={(e) => updateBody(i, e.target.value)}
              className={fieldCls + ' resize-none flex-1'} />
            <button onClick={() => removeBody(i)} className="text-ink-600 hover:text-accent text-xs">✕</button>
          </div>
        ))}
        <button onClick={addBodyParagraph} className="text-xs text-ink-600 hover:text-ink-400">+ Абзац</button>
      </div>

      <BuilderField label="Цитата-итог (курсив)">
        <input type="text" value={ending.stat_quote || ''}
          onChange={(e) => onChange({ stat_quote: e.target.value })}
          className={fieldCls} />
      </BuilderField>
      <BuilderField label="Текст для шаринга">
        <input type="text" value={ending.share_text || ''}
          onChange={(e) => onChange({ share_text: e.target.value })}
          className={fieldCls} />
      </BuilderField>

      {/* Цвет бейджа */}
      <div>
        <label className={labelCls}>Цвет бейджа</label>
        <div className="flex flex-wrap gap-2">
          {BADGE_PRESETS.map((p) => (
            <button key={p.value} onClick={() => onChange({ badge_color: p.value })}
              className={`text-xs px-3 py-1.5 rounded-full border transition-all ${p.value} ${
                ending.badge_color === p.value ? 'ring-1 ring-accent' : ''
              }`}>
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Условия */}
      <div>
        <label className={labelCls}>Условия срабатывания</label>
        {(ending.conditions || []).map((c, i) => (
          <div key={i} className="flex items-center gap-2 mb-2">
            <select value={c.field}
              onChange={(e) => updateCondition(i, { field: e.target.value })}
              className="rounded-lg border border-ink-700 bg-ink-800 px-2 py-1.5 text-xs text-ink-300">
              {STATS.map((s) => <option key={s} value={s}>{STAT_LABELS[s]}</option>)}
            </select>
            <select value={c.op}
              onChange={(e) => updateCondition(i, { op: e.target.value })}
              className="rounded-lg border border-ink-700 bg-ink-800 px-2 py-1.5 text-xs text-ink-300">
              {['>=', '<=', '>', '<', '=='].map((op) => <option key={op} value={op}>{op}</option>)}
            </select>
            <input type="number" min={0} max={100} value={c.value}
              onChange={(e) => updateCondition(i, { value: +e.target.value })}
              className="w-16 rounded-lg border border-ink-700 bg-ink-800 px-2 py-1.5 text-xs text-ink-300 text-center" />
            <button onClick={() => removeCondition(i)} className="text-ink-600 hover:text-accent text-xs">✕</button>
          </div>
        ))}
        <button onClick={addCondition} className="text-xs text-ink-600 hover:text-ink-400">+ Условие</button>
      </div>
    </div>
  )
}

// ─── Настройки сценария ───────────────────────────────────────────────────────

function SettingsEditor({ scenario, onChange }) {
  return (
    <div className="max-w-xl space-y-5">
      <h2 className="font-display text-2xl font-bold">Настройки сценария</h2>
      <BuilderField label="Название">
        <input type="text" value={scenario.title}
          onChange={(e) => onChange({ ...scenario, title: e.target.value })}
          className={fieldCls} />
      </BuilderField>
      <BuilderField label="Описание">
        <textarea rows={3} value={scenario.description || ''}
          onChange={(e) => onChange({ ...scenario, description: e.target.value })}
          className={fieldCls + ' resize-none'} />
      </BuilderField>
      <BuilderField label="Язык по умолчанию">
        <select value={scenario.lang}
          onChange={(e) => onChange({ ...scenario, lang: e.target.value })}
          className={fieldCls}>
          <option value="ru">Русский</option>
          <option value="uz">O'zbek</option>
          <option value="en">English</option>
        </select>
      </BuilderField>
      <label className="flex items-center gap-3 cursor-pointer">
        <input type="checkbox" checked={scenario.is_published}
          onChange={(e) => onChange({ ...scenario, is_published: e.target.checked })} />
        <span className="text-sm text-ink-300">Опубликован (виден студентам)</span>
      </label>
    </div>
  )
}

// ─── Утилиты ─────────────────────────────────────────────────────────────────

const fieldCls = 'w-full rounded-xl border border-ink-700 bg-ink-800/60 px-3 py-2.5 text-sm text-ink-100 focus:border-accent focus:outline-none transition-colors'
const labelCls = 'block text-[11px] font-mono uppercase tracking-[0.22em] text-ink-500 mb-1.5'

function BuilderField({ label, children }) {
  return (
    <div>
      <label className={labelCls}>{label}</label>
      {children}
    </div>
  )
}

function Section({ title, children }) {
  return (
    <div>
      <h3 className="font-display text-lg font-semibold mb-4 text-ink-200">{title}</h3>
      <div className="space-y-4">{children}</div>
    </div>
  )
}
