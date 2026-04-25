// Логика определения финала на основе суммарных характеристик.
// integrity / money / risk — в диапазоне 0..100.

export const ENDINGS = {
  halol_leader: {
    id: 'halol_leader',
    title: 'Халол лидер',
    subtitle: 'Ты прошёл путь, не продав себя.',
    code: 'HL-01',
    badgeColor: 'bg-halol/20 text-halol border-halol/40',
    body: [
      'Ты сохранил имя, которое могут произносить вслух. Люди рядом — те, кто пришёл к тебе сами, а не через конверт.',
      'Ты потерял скорость и часть денег. Но получил то, что не купить: спокойствие и репутацию, которая работает за тебя.',
    ],
    stat: 'Честность оказалась медленнее, но надёжнее.',
    share: 'Я прошёл «Halol Yo‘l» и стал халол лидером. А ты?',
  },
  wealthy_under_investigation: {
    id: 'wealthy_under_investigation',
    title: 'Богач под следствием',
    subtitle: 'Ты выиграл деньги. Они выиграли тебя.',
    code: 'WU-02',
    badgeColor: 'bg-accent/15 text-accent border-accent/40',
    body: [
      'Квартира, машина, хороший ресторан. И папка с твоим именем на столе следователя.',
      'Каждый «решённый вопрос» оставил след. Следы сложили в цепь. Цепь — в обвинение.',
    ],
    stat: 'Коррупция не забывает. Она бухгалтер с хорошей памятью.',
    share: 'Я прошёл «Halol Yo‘l» — и попал под следствие. А ты?',
  },
  imprisoned: {
    id: 'imprisoned',
    title: 'Посадка',
    subtitle: 'Ты играл слишком агрессивно.',
    code: 'IM-03',
    badgeColor: 'bg-ink-700 text-ink-100 border-ink-500',
    body: [
      'Ты брал рискованные ходы одновременно — и халол, и шорткаты. Система не разобралась. Она просто закрыла дверь.',
      'Возможно, ты был прав во многом. Но один неверный ход решает, где ты проснёшься.',
    ],
    stat: 'Даже правильный путь требует дисциплины.',
    share: 'Я прошёл «Halol Yo‘l» — и оказался за решёткой. А ты?',
  },
  survived_but_broken: {
    id: 'survived_but_broken',
    title: 'Выжил, но сломлен',
    subtitle: 'Ни рыба, ни мясо.',
    code: 'SB-04',
    badgeColor: 'bg-shadow/15 text-shadow border-shadow/40',
    body: [
      'Ты выбирал средний путь. Где-то молчал. Где-то кивал. Где-то подписал «на всякий случай».',
      'Ты остался на работе. Но в зеркале — человек, которого ты в восемнадцать лет презирал бы.',
    ],
    stat: 'Серая зона — самая многолюдная.',
    share: 'Я прошёл «Halol Yo‘l» — и выжил, но сломлен. А ты?',
  },
}

export function computeEnding(stats, history) {
  const { integrity, money, risk } = stats

  if (risk >= 75) {
    return ENDINGS.imprisoned
  }
  if (integrity >= 65) {
    return ENDINGS.halol_leader
  }
  if (money >= 55 && integrity <= 35) {
    return ENDINGS.wealthy_under_investigation
  }
  if (integrity <= 30 && risk >= 55) {
    return ENDINGS.wealthy_under_investigation
  }
  return ENDINGS.survived_but_broken
}
