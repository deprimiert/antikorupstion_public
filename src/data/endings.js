// Финалы — структура без текста. Тексты в i18n: endings.<id>.title/subtitle/body/stat/share

export const ENDINGS = {
  halol_leader: {
    id: 'halol_leader',
    code: 'HL-01',
    badgeColor: 'bg-halol/20 text-halol border-halol/40',
  },
  wealthy_under_investigation: {
    id: 'wealthy_under_investigation',
    code: 'WU-02',
    badgeColor: 'bg-accent/15 text-accent border-accent/40',
  },
  imprisoned: {
    id: 'imprisoned',
    code: 'IM-03',
    badgeColor: 'bg-ink-700 text-ink-100 border-ink-500',
  },
  survived_but_broken: {
    id: 'survived_but_broken',
    code: 'SB-04',
    badgeColor: 'bg-shadow/15 text-shadow border-shadow/40',
  },
}

export function computeEnding(stats) {
  const { integrity, money, risk } = stats

  if (risk >= 75) return ENDINGS.imprisoned
  if (integrity >= 65) return ENDINGS.halol_leader
  if (money >= 55 && integrity <= 35) return ENDINGS.wealthy_under_investigation
  if (integrity <= 30 && risk >= 55) return ENDINGS.wealthy_under_investigation
  return ENDINGS.survived_but_broken
}
