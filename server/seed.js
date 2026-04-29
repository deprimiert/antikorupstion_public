// Импортирует встроенный сценарий Halol Avlod в БД если его ещё нет.
// Создаёт системного пользователя-владельца с ролью admin если нужно.
import { query } from './db.js'
import bcrypt from 'bcryptjs'

const SYSTEM_EMAIL = 'system@halol-avlod.app'

const BUILT_IN_SCENARIO = {
  title: 'Halol Avlod',
  description: 'Asosiy ssenariy: 5 akt, 3 ixtiyoriy mikro-sahna. Kichik murosadan vazirlikka qadar.',
  lang: 'uz',
}

const ACTS = [
  {
    act_number: 1, is_optional: false,
    stage: 'BIRINCHI MUROSA', setting: 'Yuridik fakultet, 3-kurs · imtihondan oldin',
    title: 'Imtihon', timer: 50, real_story: false,
    narrator: 'Jinoyat huquqi imtihoniga o\'n daqiqa qoldi. Ikki kechadan beri uxlamayapman. Yo\'lakda — guruh sardor konvert bilan.',
    quote: '— Qara, qiynalma. O\'qituvchi bilan «kelishilgan». Ikki yuz ming so\'m — va sendan so\'rashmaydi ham. Butun guruh pul yig\'di.',
    choices: [
      { choice_key:'a', type:'halol',       label:'O\'zim topshiraman',   subtitle:'Qonun shuni talab qiladi.', outcome:'«Qoniqarli» olib topshirdim. O\'qituvchi meni eslab qoldi.', delta_integrity:12,  delta_money:-2,  delta_risk:0,   delta_reputation:6  },
      { choice_key:'b', type:'shortcut',    label:'Hammaga qo\'shilaman', subtitle:'Hamma shunaqa qiladi.',    outcome:'Imtihon «o\'tdi». Lekin ichimda birinchi marta nimadir sindi.', delta_integrity:-15, delta_money:-8,  delta_risk:10,  delta_reputation:-10 },
      { choice_key:'c', type:'risky-halol', label:'Diktofonga yozaman',   subtitle:'Dalil yig\'aman.',         outcome:'Yozuv dekanga yetib bordi. O\'qituvchi ishdan bo\'shatildi.', delta_integrity:18,  delta_money:0,   delta_risk:15,  delta_reputation:12 },
    ],
    branches: [{ condition_type: null, condition_value: null, to_act_id: '__act2__', priority: 0 }],
  },
  {
    act_number: 2, is_optional: false,
    stage: 'BIRINCHI NAVBAT', setting: 'Tuman hokimiyati, arxiv bo\'limi · yozgi amaliyot',
    title: 'Yo\'qolgan papka', timer: 45, real_story: true,
    narrator: 'Hokimiyatda amaliyotdaman. Mahalladan ayollar har kuni ma\'lumotnoma uchun keladi. Tasodifan stol tagidagi ariza papkalarini topib oldim.',
    quote: '— Qara, hamma narsani ko\'rishing shart emas. Ba\'zi qog\'ozlarga tegmagan ma\'qul. Sen amaliyotchisan — o\'rgan, aralashma.',
    choices: [
      { choice_key:'a', type:'halol',       label:'Kuratorga to\'g\'ridan-to\'g\'ri aytaman', subtitle:'Ochiq gaplashaman.', outcome:'U jahli chiqdi. Bir hafta o\'tib arizalar «topildi».', delta_integrity:10, delta_money:0,  delta_risk:5,   delta_reputation:6  },
      { choice_key:'b', type:'gray',        label:'Jim turaman, amaliyotni tugataman',       subtitle:'Mening ishim emas.',  outcome:'Amaliyot xotirjam o\'tdi. Har kuni yo\'lakdagi ayollarning yuziga qaray olmadim.', delta_integrity:-8, delta_money:4,  delta_risk:0,   delta_reputation:-8 },
      { choice_key:'c', type:'risky-halol', label:'Antikorrupsiyaga anonim yozaman',         subtitle:'1144 orqali.',        outcome:'Ikki haftadan keyin tekshirish keldi. Kurator lavozimi pasaytirildi.', delta_integrity:16, delta_money:0,  delta_risk:18,  delta_reputation:12 },
    ],
    branches: [
      { condition_type:'choice_type', condition_value:'halol',       to_act_id:'__act2b__', priority:0 },
      { condition_type:'choice_type', condition_value:'risky-halol', to_act_id:'__act2b__', priority:1 },
      { condition_type:null,          condition_value:null,           to_act_id:'__act3__',  priority:2 },
    ],
  },
  {
    act_number: 3, is_optional: true,
    stage: 'TIZIM SENI PAYQADI', setting: 'Hokimiyat boshlig\'i kabineti · bir hafta o\'tib',
    title: 'Seni yuqoriga chaqirishyapti', timer: 35, real_story: false,
    narrator: 'Mening qadamimdan keyin bo\'lim boshlig\'i o\'zi kabinetiga taklif qildi. Eshik yopiq.',
    quote: '— Qara, sen yoshsan. Istiqbolli. Faqat… har bir tortmaga aralashma. Diplomdan keyin seni o\'zimga olishim mumkin.',
    choices: [
      { choice_key:'a', type:'halol',       label:'Rahmat aytaman, rad etaman', subtitle:'Qarz bo\'lib qolmayman.', outcome:'U bosh irg\'adi. «Yanisi noqulay» degan gap tarqaldi.', delta_integrity:10, delta_money:0, delta_risk:10, delta_reputation:8  },
      { choice_key:'b', type:'gray',        label:'Roziman, jim turaman',       subtitle:'Nima uchun xavf?',        outcome:'U jilmaydi. Diplomdan keyin ish oldim. Lekin birinchi topshiriq — «ko\'z yumish».', delta_integrity:-10, delta_money:0, delta_risk:-8, delta_reputation:-6 },
      { choice_key:'c', type:'risky-halol', label:'Suhbatni telefonga yozaman', subtitle:'Har holatga.',            outcome:'Fayl bulutda saqlandi. Bir oy o\'tib bu suhbat yangiliklarda chiqdi.', delta_integrity:18, delta_money:0, delta_risk:22, delta_reputation:14 },
    ],
    branches: [{ condition_type:null, condition_value:null, to_act_id:'__act3__', priority:0 }],
  },
  {
    act_number: 4, is_optional: false,
    stage: 'BIRINCHI KONVERT', setting: 'Davlat xizmatlari markazi (DXM), qabul oynasi · birinchi hafta',
    title: 'Oynacha orqali', timer: 40, real_story: true,
    narrator: 'Birinchi ishim — DXMda operator. Navbat soat oltidan boshlanadi. Oynaga erkak yaqinlashdi, hujjatida — kichik xato.',
    quote: '— Aka, bola kasalxonada. Bugun kerak. Senga nima zarar? Minnatdor bo\'laman. Hech kim bilmaydi.',
    choices: [
      { choice_key:'a', type:'halol',       label:'Qaytadan rasmiylashtirishga yuboraman', subtitle:'Qonun — qonun.', outcome:'Erkak g\'azablanib chiqdi. Ikki kundan keyin to\'g\'ri hujjat qaytdi.', delta_integrity:14, delta_money:0,   delta_risk:5,  delta_reputation:8  },
      { choice_key:'b', type:'gray',        label:'Sezmaganga olaman',                    subtitle:'Qog\'oz o\'zi o\'tib ketadi.', outcome:'Hujjat yuqoriga ketdi. Imzomda — xato. Ertaga kimdir buni ko\'radi.', delta_integrity:-10, delta_money:0,  delta_risk:6,  delta_reputation:-6 },
      { choice_key:'c', type:'shortcut',    label:'Konvertni olaman',                     subtitle:'Bir marta. Bola haqida.', outcome:'Birinchi marta oldim. Ertaga u yana keladi — endi kimga borishni biladi.', delta_integrity:-18, delta_money:12, delta_risk:15, delta_reputation:-12 },
    ],
    branches: [
      { condition_type:'choice_type', condition_value:'shortcut', to_act_id:'__act4b__', priority:0 },
      { condition_type:null,          condition_value:null,        to_act_id:'__act5__',  priority:1 },
    ],
  },
  {
    act_number: 5, is_optional: true,
    stage: 'SXEMA SENI ICHIGA TORTYAPTI', setting: 'O\'sha DXM · ikki hafta o\'tib',
    title: 'Sen «o\'zimiznikisan»', timer: 30, real_story: false,
    narrator: 'Gap tarqaldi. Endi mening oynamga «tanish» orqali kelishadi. Smena boshlig\'i meni yordamchi xonaga chaqirdi.',
    quote: '— Yashagin, ko\'nikding. Bu yerda umumiy kassa bor — haftada bir yig\'amiz. Yigirma foiz seniki, sakson — yuqoriga.',
    choices: [
      { choice_key:'a', type:'halol',    label:'Rad etaman, ariza yozaman', subtitle:'Bu yerdan ketaman.', outcome:'Meni jamoadan siqib chiqarishdi. Lekin Antikor stolida arizam yotibdi.', delta_integrity:18, delta_money:-5,  delta_risk:20, delta_reputation:14 },
      { choice_key:'b', type:'shortcut', label:'Kassaga kiraman',           subtitle:'Bir marta — sinab ko\'raman.', outcome:'Birinchi to\'lov ikki yuz dollar konvertda keldi. Bir yildan keyin bu «tinch» daromad edi.', delta_integrity:-22, delta_money:20, delta_risk:25, delta_reputation:-18 },
      { choice_key:'c', type:'gray',     label:'Roziman, lekin olmayman',   subtitle:'O\'zimni tutaman.', outcome:'Bosh irg\'adim, konvertlarni tegmasdan o\'tkazib yubordim. Qo\'lim toza.', delta_integrity:-10, delta_money:6,  delta_risk:12, delta_reputation:-8  },
    ],
    branches: [{ condition_type:null, condition_value:null, to_act_id:'__act5__', priority:0 }],
  },
  {
    act_number: 6, is_optional: false,
    stage: 'BIRINCHI BAHO', setting: 'Tuman shifoxonasi, jarrohlik · oqshom',
    title: 'Ertaga operatsiya', timer: 35, real_story: true,
    narrator: 'Buvimni operatsiyaga tayyorlashyapti. Jarroh meni yo\'lakka olib chiqib, ko\'zlarini yashirdi.',
    quote: '— Texnik jihatdan — bepul. Lekin… minnatdorchilik bor. Ikki million — va men o\'zim operatsiya qilaman. Aks holda — umumiy navbat, ikki oy.',
    choices: [
      { choice_key:'a', type:'halol',       label:'Rad etaman, navbat kutaman',      subtitle:'Qonun mening tomonimda.', outcome:'Navbat uch haftada keldi. Boshqa jarroh operatsiya qildi. Hammasi yaxshi o\'tdi.', delta_integrity:14, delta_money:-10, delta_risk:0,  delta_reputation:8  },
      { choice_key:'b', type:'shortcut',    label:'To\'layman. Yaqin odam-ku',       subtitle:'Bahslashish vaqti emas.', outcome:'Operatsiya ertaga. Buvi tirik. Lekin bu tizimni hozir o\'z imzom bilan to\'lading.', delta_integrity:-16, delta_money:-8, delta_risk:10, delta_reputation:-10 },
      { choice_key:'c', type:'risky-halol', label:'Qayd etaman va Antikorga boraman',subtitle:'Operatsiyadan keyin.', outcome:'Shikoyat Sog\'liqni saqlash vazirligiga yetib bordi. Jarroh lavozimi pasaytirildi.', delta_integrity:22, delta_money:-12, delta_risk:22, delta_reputation:12 },
    ],
    branches: [
      { condition_type:'choice_type', condition_value:'risky-halol', to_act_id:'__act6b__', priority:0 },
      { condition_type:null,          condition_value:null,           to_act_id:'__act7__',  priority:1 },
    ],
  },
  {
    act_number: 7, is_optional: true,
    stage: 'MATBUOT BILDI', setting: 'Chilonzordagi kafe, 22:10 · ikki hafta o\'tib',
    title: 'Jurnalist va flesh', timer: 30, real_story: false,
    narrator: 'Shifoxona voqeasi Telegramga tushdi. Jurnalist — mening kursdoshim — jarroh yozishmalarini so\'rayapti.',
    quote: '— Agar men chop etmasam, ish to\'xtatiladi. Bir oydan keyin u «yuqoriga» ketadi. Bitta post — va jamiyat biladi.',
    choices: [
      { choice_key:'a', type:'halol',       label:'Komplaens orqali yuboraman', subtitle:'Rasmiy yo\'l bor.', outcome:'Tekshirish to\'rt oy davom etdi. Jarrohni jim qildirib chetlashtirishdi.', delta_integrity:20, delta_money:0, delta_risk:15, delta_reputation:18 },
      { choice_key:'b', type:'gray',        label:'Endi aralashmayman',         subtitle:'Etarli qildim.',    outcome:'Ish cho\'zildi. Bir yil o\'tib jarroh xususiy klinika ochdi.', delta_integrity:-10, delta_money:0, delta_risk:-8, delta_reputation:-10 },
      { choice_key:'c', type:'risky-halol', label:'Fleshni beraman',            subtitle:'Baland va darrov.', outcome:'OAVda janjal. Bir hafta o\'tib menga «oshkor qilish» bo\'yicha nazorat xizmati keldi.', delta_integrity:25, delta_money:0, delta_risk:25, delta_reputation:20 },
    ],
    branches: [{ condition_type:null, condition_value:null, to_act_id:'__act7__', priority:0 }],
  },
  {
    act_number: 8, is_optional: false,
    stage: 'OXIRGI SINOV', setting: 'Vazirlik kabineti, kech oqshom',
    title: 'Eski do\'st ostonada', timer: 25, real_story: false,
    narrator: 'Bolalikdagi do\'stim yozuvsiz keldi. Uning kompaniyasi tekshirilmoqda. Hujjatlar — mening stolimda.',
    quote: '— Aka. Biz birga o\'sganmiz. Sen mening uyimni, onamni bilasan. Bitta imzo — va men qutulaman.',
    choices: [
      { choice_key:'a', type:'halol',       label:'Rad etaman, ishni davom ettiraman', subtitle:'Do\'stlik qonundan ustun emas.', outcome:'Do\'stim jim chiqib ketdi. Men esa shunday iltimoslar bilan kelishmaydigan vazir bo\'lib qoldim.', delta_integrity:30, delta_money:0,   delta_risk:12, delta_reputation:20 },
      { choice_key:'b', type:'shortcut',    label:'Do\'stga yordam beraman',           subtitle:'Bir marta — tizim emas.',       outcome:'Tekshirish yopildi. Sakkiz oy o\'tib jurnalist zanjirni chop etdi. Mening ismim — sarlavhada birinchi.', delta_integrity:-35, delta_money:25, delta_risk:35, delta_reputation:-25 },
      { choice_key:'c', type:'risky-halol', label:'Mustaqil komissiyaga beraman',      subtitle:'Men hal qilmasligim uchun.',    outcome:'Komissiya qisman ayb topdi. Jarima, qamoqsiz. Do\'stim hammasini tushundi.', delta_integrity:25, delta_money:0,   delta_risk:20, delta_reputation:18 },
    ],
    branches: [{ condition_type:null, condition_value:null, to_act_id:null, priority:0 }],
  },
]

const ENDINGS = [
  {
    ending_key:'imprisoned', title:'Qamoq', subtitle:'Sen juda agressiv o\'ynading.',
    body:['Sen birin-ketin xavfli qadamlar tashlading. Tizim tushunishni xohlamadi. U shunchaki eshikni yopdi.','Ehtimol ko\'p narsalarda haq edingsan. Lekin bitta noto\'g\'ri qadam ertangi kuningni hal qildi.'],
    stat_quote:'Hatto to\'g\'ri yo\'l ham intizom talab qiladi.',
    share_text:'Men «Halol Avlod»ni o\'tib — panjara ortida qoldim. Sen-chi?',
    badge_color:'bg-ink-700 text-ink-100 border-ink-500',
    conditions:[{field:'risk',op:'>=',value:75}], condition_order:0,
  },
  {
    ending_key:'wealthy_under_investigation', title:'Boy, lekin tergovda', subtitle:'Sen pulda yutding. Ular sening o\'zingni yutdi.',
    body:['Kvartira, mashina, yaxshi restoranlar. Va sening isming yozilgan papka — tergovchi stolida.','Har bir «hal qilingan masala» iz qoldirgan. Izlar zanjirga aylangan.'],
    stat_quote:'Korrupsiya unutmaydi. U — yaxshi xotirali buxgalter.',
    share_text:'Men «Halol Avlod»ni o\'tib — tergov ostiga tushdim. Sen-chi?',
    badge_color:'bg-accent/15 text-accent border-accent/40',
    conditions:[{field:'money',op:'>=',value:55},{field:'integrity',op:'<=',value:35}], condition_order:1,
  },
  {
    ending_key:'halol_leader', title:'Halol rahbar', subtitle:'Sen o\'zingni sotmasdan yo\'l bosding.',
    body:['Sen ismingni saqlading. Yoningdagilar konvert orqali emas — o\'zlari kelishdi.','Sen tezlikda va pulda yutqazding. Lekin sotib bo\'lmaydigan narsani topding.'],
    stat_quote:'Halollik sekinroq, lekin ishonchliroq bo\'lib chiqdi.',
    share_text:'Men «Halol Avlod»ni o\'tib, halol rahbar bo\'ldim. Sen-chi?',
    badge_color:'bg-halol/20 text-halol border-halol/40',
    conditions:[{field:'integrity',op:'>=',value:65},{field:'reputation',op:'>=',value:55}], condition_order:2,
  },
  {
    ending_key:'survived_but_broken', title:'Omon qoldi, lekin sindi', subtitle:'Na u, na bu.',
    body:['Sen o\'rtacha yo\'lni tanlading. Bir joyda jim qolding. Bir joyda bosh irg\'ading.','Sen kresloda qolding. Lekin oynada — o\'n sakkiz yoshda nafratlanadigan odamingni ko\'ryapsan.'],
    stat_quote:'Kulrang zona — eng gavjum joy.',
    share_text:'Men «Halol Avlod»ni o\'tib — omon qoldim, lekin sindim. Sen-chi?',
    badge_color:'bg-shadow/15 text-shadow border-shadow/40',
    conditions:[], condition_order:99,
  },
]

export async function seedBuiltIn() {
  try {
    // Проверяем есть ли уже встроенный сценарий
    const existing = await query(
      'SELECT id FROM scenarios WHERE title=$1 AND teacher_id IN (SELECT id FROM users WHERE email=$2)',
      [BUILT_IN_SCENARIO.title, SYSTEM_EMAIL]
    )
    if (existing.rows.length > 0) return

    // Системный пользователь-владелец
    let sysUser = await query('SELECT id FROM users WHERE email=$1', [SYSTEM_EMAIL])
    if (sysUser.rows.length === 0) {
      const hash = await bcrypt.hash('system_no_login_' + Date.now(), 10)
      sysUser = await query(
        `INSERT INTO users (email,password_hash,first_name,last_name,birth_date,role)
         VALUES ($1,$2,'System','Bot','2000-01-01','admin') RETURNING id`,
        [SYSTEM_EMAIL, hash]
      )
    }
    const ownerId = sysUser.rows[0].id

    // Создаём сценарий
    const scenRes = await query(
      `INSERT INTO scenarios (teacher_id,title,description,lang,is_published)
       VALUES ($1,$2,$3,$4,true) RETURNING id`,
      [ownerId, BUILT_IN_SCENARIO.title, BUILT_IN_SCENARIO.description, BUILT_IN_SCENARIO.lang]
    )
    const scenarioId = scenRes.rows[0].id

    // Создаём акты и собираем их id по номеру
    const actIdMap = {}
    for (const act of ACTS) {
      const r = await query(
        `INSERT INTO acts (scenario_id,act_number,is_optional,stage,setting,title,narrator,quote,timer,real_story)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING id`,
        [scenarioId, act.act_number, act.is_optional, act.stage, act.setting,
         act.title, act.narrator, act.quote, act.timer, act.real_story]
      )
      actIdMap[act.act_number] = r.rows[0].id
    }

    // Карта замены __actN__ → реальный uuid
    const resolveActId = (placeholder) => {
      if (!placeholder) return null
      const m = placeholder.match(/__act(\d+[b]?)__/)
      if (!m) return null
      const key = m[1]
      // act2b = акт 3 (опц), act3 = акт 4, act4b = акт 5 (опц), act5 = акт 6, act6b = акт 7 (опц), act7 = акт 8
      const numMap = { '2b':3, '3':4, '4b':5, '5':6, '6b':7, '7':8 }
      return actIdMap[numMap[key] ?? parseInt(key)] ?? null
    }

    // Создаём выборы и ветвление
    for (const act of ACTS) {
      const actId = actIdMap[act.act_number]
      for (const c of act.choices) {
        await query(
          `INSERT INTO choices (act_id,choice_key,type,label,subtitle,outcome,delta_integrity,delta_money,delta_risk,delta_reputation)
           VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,
          [actId, c.choice_key, c.type, c.label, c.subtitle, c.outcome,
           c.delta_integrity, c.delta_money, c.delta_risk, c.delta_reputation]
        )
      }
      for (const b of act.branches) {
        const toActId = resolveActId(b.to_act_id)
        await query(
          `INSERT INTO act_branches (from_act_id,condition_type,condition_value,to_act_id,priority)
           VALUES ($1,$2,$3,$4,$5)`,
          [actId, b.condition_type, b.condition_value, toActId, b.priority]
        )
      }
    }

    // Создаём финалы
    for (const e of ENDINGS) {
      await query(
        `INSERT INTO scenario_endings (scenario_id,ending_key,title,subtitle,body,stat_quote,share_text,badge_color,conditions,condition_order)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,
        [scenarioId, e.ending_key, e.title, e.subtitle, e.body,
         e.stat_quote, e.share_text, e.badge_color,
         JSON.stringify(e.conditions), e.condition_order]
      )
    }

    console.log('[seed] Built-in scenario seeded:', scenarioId)
  } catch (err) {
    console.error('[seed] Error seeding built-in scenario:', err.message)
  }
}
