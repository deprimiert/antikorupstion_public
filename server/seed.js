import { query } from './db.js'
import bcrypt from 'bcryptjs'

const SYSTEM_EMAIL = 'system@halol-avlod.app'

const ACT_KEY_MAP = { 1:'exam', 2:'archive', 3:'archive_call', 4:'first_job', 5:'first_job_pull', 6:'family', 7:'family_news', 8:'power' }

const ACT_TEXTS = {
  exam: {
    uz: {
      stage: 'BIRINCHI MUROSA',
      setting: 'Yuridik fakultet, 3-kurs · imtihondan oldin',
      title: 'Imtihon',
      narrator: 'Jinoyat huquqi imtihoniga o\'n daqiqa qoldi. Ikki kechadan beri uxlamayapman. Yo\'lakda — guruh sardor konvert bilan.',
      quote: '— Qara, qiynalma. O\'qituvchi bilan «kelishilgan». Ikki yuz ming so\'m — va sendan so\'rashmaydi ham. Butun guruh pul yig\'di.',
      realStoryNote: null, narratorByPrev: {}, narratorByType: {},
    },
    ru: {
      stage: 'ПЕРВЫЙ КОМПРОМИСС',
      setting: 'Юрфак, 3-й курс · перед экзаменом',
      title: 'Экзамен',
      narrator: 'До экзамена по уголовному праву десять минут. Я не спал две ночи. В коридоре — староста с конвертом.',
      quote: '— Слушай, не парься. С преподом «решено». Двести тысяч — и тебя даже спрашивать не станут. Скинулась вся группа.',
      realStoryNote: null, narratorByPrev: {}, narratorByType: {},
    },
    en: {
      stage: 'FIRST COMPROMISE',
      setting: 'Law school, year 3 · before the exam',
      title: 'The exam',
      narrator: 'Ten minutes left before the criminal law exam. I haven\'t slept for two nights. The group rep is in the hallway with an envelope.',
      quote: '— Don\'t worry. It\'s «arranged» with the professor. Two hundred thousand som — and they won\'t even ask you. The whole group chipped in.',
      realStoryNote: null, narratorByPrev: {}, narratorByType: {},
    },
  },

  archive: {
    uz: {
      stage: 'BIRINCHI NAVBAT',
      setting: 'Tuman hokimiyati, arxiv bo\'limi · yozgi amaliyot',
      title: 'Yo\'qolgan papka',
      narrator: 'Hokimiyatda amaliyotdaman. Mahalladan ayollar har kuni ma\'lumotnoma uchun keladi — ularga «ertaga keling» deyiladi. Tasodifan stol tagidagi ariza papkalarini topib oldim.',
      quote: '— Qara, hamma narsani ko\'rishing shart emas. Ba\'zi qog\'ozlarga tegmagan ma\'qul. Sen amaliyotchisan — o\'rgan, ortiqcha aralashma. Bir oydan keyin ketasan — unutasan.',
      realStoryNote: null,
      narratorByPrev: {
        a: 'Halol imtihondan keyin amaliyotga ishonch bilan keldim. Lekin bu yerda o\'z qoidalari bor. Kuratorning eng pastki tortmasida — mahallaning unutilgan arizalari.',
        b: 'Imtihonda hammaga qo\'shilganimdan beri qoidalarga ishonchim qolmadi. Amaliyotda yana o\'sha sxema — kurator arizalarni «yo\'qotyapti».',
        c: 'Imtihondagi yozuv hali telefonimda. Endi keyingi qatlamni ko\'ryapman — kurator odamlarning qog\'ozlarini «yo\'qotyapti». Yana shovqin ko\'taraymi?',
      },
      narratorByType: {},
    },
    ru: {
      stage: 'ПЕРВАЯ ОЧЕРЕДЬ',
      setting: 'Районный hokimiyat, отдел архива · летняя практика',
      title: 'Папка, которая «потерялась»',
      narrator: 'Я на практике в hokimiyat. Каждый день женщины из махалли приходят за справками — им говорят «приходите завтра». Я случайно нашёл их заявления в нижнем ящике стола куратора.',
      quote: '— Послушай, тут не всё нужно видеть. Некоторые бумаги лучше не трогать. Ты практикант — учись и не лезь. Через месяц уйдёшь — забудешь.',
      realStoryNote: null,
      narratorByPrev: {
        a: 'После честного экзамена я пришёл на практику с уверенностью. Но тут свои правила. В нижнем ящике куратора — забытые заявления махалли.',
        b: 'Скинувшись на экзамене, я перестал верить в правила. На практике та же схема — куратор «теряет» заявления. Ничего нового.',
        c: 'Запись с экзамена ещё в моём телефоне. Теперь я вижу следующий слой — куратор «теряет» бумаги людей. Снова поднимать шум?',
      },
      narratorByType: {},
    },
    en: {
      stage: 'FIRST QUEUE',
      setting: 'District hokimiyat, archive · summer internship',
      title: 'The lost folder',
      narrator: 'I\'m interning at the hokimiyat. Women from the mahalla come every day for a certificate — they\'re told «come tomorrow». I accidentally found their applications in the bottom drawer of my supervisor\'s desk.',
      quote: '— Look, you don\'t need to see everything here. Some papers are better left untouched. You\'re an intern — learn and stay out. In a month you\'ll leave and forget.',
      realStoryNote: null,
      narratorByPrev: {
        a: 'After the honest exam I came to the internship with confidence. But here — its own rules. The supervisor\'s bottom drawer hides the mahalla\'s forgotten paperwork.',
        b: 'After chipping in at the exam I stopped trusting the rules. Same scheme here — the supervisor «loses» applications.',
        c: 'The exam recording is still on my phone. Now I see the next layer — the supervisor «loses» people\'s papers. Raise the alarm again?',
      },
      narratorByType: {},
    },
  },

  archive_call: {
    uz: {
      stage: 'TIZIM SENI PAYQADI',
      setting: 'Hokimiyat boshlig\'i kabineti · bir hafta o\'tib',
      title: 'Seni yuqoriga chaqirishyapti',
      narrator: 'Mening qadamimdan keyin bo\'lim boshlig\'i o\'zi kabinetiga taklif qildi. Eshik yopiq. Stolda — tavsifnomam va arizachilar ro\'yxati.',
      quote: '— Qara, sen yoshsan. Istiqbolli. Faqat… har bir tortmaga aralashma. Diplomdan keyin seni o\'zimga olishim mumkin. Lekin syurprizsiz.',
      realStoryNote: null,
      narratorByPrev: {
        a: 'Kurator bilan ochiq gaplashganimdan keyin boshliq o\'zi chaqirdi. Eshik yopiq. Stolda — mening tavsifnomam.',
        c: 'Anonim shikoyat unchalik anonim emas ekan. Boshliq taxmin qildi. Eshik yopiq. Stolda — arizachilar ro\'yxati.',
      },
      narratorByType: {},
    },
    ru: {
      stage: 'СИСТЕМА ТЕБЯ ЗАМЕТИЛА',
      setting: 'Кабинет руководителя hokimiyat · через неделю',
      title: 'Тебя вызывают наверх',
      narrator: 'После моего шага руководитель отдела сам пригласил меня в кабинет. Дверь закрыта. На столе — моя характеристика и список заявителей.',
      quote: '— Слушай, ты молодой. Перспективный. Просто… не лезь в каждый ящик. Я тебя могу взять к себе после диплома. Но без сюрпризов.',
      realStoryNote: null,
      narratorByPrev: {
        a: 'После моего разговора с куратором руководитель сам вызвал меня. Дверь закрыта. На столе — моя характеристика.',
        c: 'Анонимка не такая уж и анонимка. Руководитель догадался. Дверь закрыта. На столе — мой список заявителей.',
      },
      narratorByType: {},
    },
    en: {
      stage: 'THE SYSTEM NOTICED',
      setting: 'Hokimiyat head\'s office · a week later',
      title: 'They call you upstairs',
      narrator: 'After my move, the head of the department invited me himself. Door closed. On the desk — my evaluation and a list of applicants.',
      quote: '— You\'re young. Promising. Just… don\'t poke into every drawer. After your diploma I can take you on. But no surprises.',
      realStoryNote: null,
      narratorByPrev: {
        a: 'After my talk with the supervisor, the head called me himself. Door closed. On the desk — my evaluation.',
        c: 'The anonymous report wasn\'t so anonymous. The head guessed. Door closed. On the desk — the list of applicants.',
      },
      narratorByType: {},
    },
  },

  first_job: {
    uz: {
      stage: 'BIRINCHI KONVERT',
      setting: 'Davlat xizmatlari markazi (DXM), qabul oynasi · birinchi hafta',
      title: 'Oynacha orqali',
      narrator: 'Birinchi ishim — DXMda operator. Navbat soat oltidan boshlanadi. Oynaga erkak yaqinlashdi, hujjatida — kichik xato. Qonunga ko\'ra — qaytadan rasmiylashtirish, bir hafta kutish.',
      quote: '— Aka, bola kasalxonada. Bugun kerak. Senga nima zarar? Minnatdor bo\'laman. Hech kim bilmaydi.',
      realStoryNote: 'Antikorrupsiya agentligining tipik ishi, 2023.',
      narratorByPrev: {
        a: 'Hokimiyatdagi taklifdan voz kechgach, DXMga toza varaq bilan keldim. Birinchi hafta — birinchi konvert.',
        b: 'Yuqoridagi rozilikdan keyin DXMga oldim. Birinchi hafta — va sinov: tashrifchi «tezroq» qilishni so\'rayapti.',
        c: 'Boshliq bilan suhbat yozuvi bulutda. DXMdaman — va o\'z sinovim: tashrifchi iltimos bilan keldi.',
      },
      narratorByType: {
        gray: 'Amaliyotda jim qolib, DXMga ishga kirdim. Jim turish odati qoldi — endi oynacha oldida yolg\'izman. Tashrifchi yaqinlashdi.',
      },
    },
    ru: {
      stage: 'ПЕРВЫЙ КОНВЕРТ',
      setting: 'ЦГУ, окошко приёма документов · первая неделя',
      title: 'Через окошко',
      narrator: 'Моя первая работа — оператор в ЦГУ. Очередь с шести утра. К окну подошёл мужчина, в его документе — мелкая ошибка. По закону нужно переоформление, неделя ожидания.',
      quote: '— Брат, ребёнок в больнице. Сегодня. Что тебе стоит? Я отблагодарю. Никто не узнает.',
      realStoryNote: 'Типовое дело Антикора, 2023.',
      narratorByPrev: {
        a: 'После отказа в hokimiyat я начал с чистого листа в ЦГУ. Первая неделя — и уже первый конверт у окошка.',
        b: 'После согласия наверху меня взяли в ЦГУ. Первая неделя — и сразу проверка: посетитель просит «по-быстрому».',
        c: 'Запись разговора с руководителем у меня в облаке. Я в ЦГУ — и тут уже своя проверка: посетитель с просьбой.',
      },
      narratorByType: {
        gray: 'Промолчав на практике, я устроился в ЦГУ. Привычка молчать осталась — но теперь у окошка я один. Подошёл посетитель.',
      },
    },
    en: {
      stage: 'FIRST ENVELOPE',
      setting: 'Public Service Center, intake window · first week',
      title: 'Through the window',
      narrator: 'My first job — operator at the public service center. The queue starts at 6 a.m. A man at my window — a small mistake on his document. Legally that\'s a re-filing, a week of waiting.',
      quote: '— Brother, my child is in the hospital. I need it today. What do you lose? I\'ll thank you. No one will know.',
      realStoryNote: 'A typical Anti-corruption case, 2023.',
      narratorByPrev: {
        a: 'After refusing the offer at the hokimiyat, I started fresh at the center. First week — first envelope.',
        b: 'After agreeing upstairs, I got the job. First week — and a test: a visitor wants it «fast».',
        c: 'The recording with the head sits in my cloud. I\'m at the center now — and my own test: a visitor with a request.',
      },
      narratorByType: {
        gray: 'I stayed silent at the internship and got the job here. The habit of silence stayed — but at the window I\'m alone now. A visitor approached.',
      },
    },
  },

  first_job_pull: {
    uz: {
      stage: 'SXEMA SENI ICHIGA TORTYAPTI',
      setting: 'O\'sha DXM · ikki hafta o\'tib',
      title: 'Sen «o\'zimiznikisan»',
      narrator: 'Gap tarqaldi. Endi mening oynamga «tanish» orqali kelishadi. Smena boshlig\'i meni yordamchi xonaga chaqirdi.',
      quote: '— Yashagin, ko\'nikding. Bu yerda umumiy kassa bor — haftada bir yig\'amiz. Yigirma foiz seniki, sakson — yuqoriga. Hamma shunaqa ishlaydi.',
      realStoryNote: null,
      narratorByPrev: {
        c: 'O\'sha konvertdan keyin meni eslab qolishdi. Mening oynamga endi «tanish» navbat keladi. Smena boshlig\'i yordamchi xonaga chaqirdi.',
      },
      narratorByType: {},
    },
    ru: {
      stage: 'СХЕМА ВТЯГИВАЕТ',
      setting: 'Тот же ЦГУ · через две недели',
      title: 'Ты «свой»',
      narrator: 'Слух пошёл. К моему окошку теперь идут «по-знакомству». Начальник смены позвал меня в подсобку.',
      quote: '— Молодец, освоился. У нас тут общая касса — раз в неделю собираем. Двадцать процентов твои, восемьдесят — выше. Все так работают.',
      realStoryNote: null,
      narratorByPrev: {
        c: 'После того конверта меня запомнили. К моему окну теперь стоит «знакомая» очередь. Начальник смены позвал в подсобку.',
      },
      narratorByType: {},
    },
    en: {
      stage: 'THE SCHEME PULLS YOU IN',
      setting: 'Same center · two weeks later',
      title: 'You\'re «one of us»',
      narrator: 'Word got around. People come to my window «through acquaintance» now. The shift manager called me to the back room.',
      quote: '— Good job, you\'ve adapted. We have a common pot here — collected weekly. Twenty percent yours, eighty goes up. Everyone works like this.',
      realStoryNote: null,
      narratorByPrev: {
        c: 'After that envelope they remembered me. A «familiar» queue lines up at my window now. The shift manager called me to the back room.',
      },
      narratorByType: {},
    },
  },

  family: {
    uz: {
      stage: 'BIRINCHI BAHO',
      setting: 'Tuman shifoxonasi, jarrohlik · oqshom',
      title: 'Ertaga operatsiya',
      narrator: 'Buvimni operatsiyaga tayyorlashyapti. Jarroh meni yo\'lakka olib chiqib, ko\'zlarini yashirdi.',
      quote: '— Texnik jihatdan — bepul. Lekin… minnatdorchilik bor. Ikki million — va men o\'zim operatsiya qilaman. Aks holda — umumiy navbat, ikki oy.',
      realStoryNote: 'Har uchinchi fuqaro tibbiyotda «minnatdorchilik»ka duch keldi (2023 so\'rov).',
      narratorByPrev: {},
      narratorByType: {
        halol: 'Ishdagi barcha rad javoblardan keyin shifoxonadaman. Buvimni operatsiyaga tayyorlashyapti. Jarroh yo\'lakda yaqinlashdi.',
        shortcut: 'Sxemadan kelgan pul kerak bo\'ldi — lekin boshqacha shaklda. Buvimni operatsiyaga tayyorlashyapti. Jarroh taklif bilan kelmoqda.',
        gray: 'Jim turish odati menga qimmatga tushdi — hamyon ham jim. Buvimni operatsiyaga tayyorlashyapti. Jarroh yaqinlashdi.',
        'risky-halol': 'Baland qadamlarimdan keyin meni ism bilan bilishadi. Lekin shifoxonada bu yordam bermaydi. Jarroh taklif bilan keldi.',
      },
    },
    ru: {
      stage: 'ПЕРВАЯ ЦЕНА',
      setting: 'Районная больница, хирургия · вечер',
      title: 'Завтра операция',
      narrator: 'Бабушку готовят к операции. Хирург отвёл меня в коридор и опустил глаза.',
      quote: '— Технически — бесплатно. Но… есть благодарность. Два миллиона — и я оперирую сам. Иначе — общая очередь, два месяца.',
      realStoryNote: 'Каждый третий житель сталкивался с «благодарностью» в медицине (опрос 2023 г.).',
      narratorByPrev: {},
      narratorByType: {
        halol: 'После всех отказов на работе я в больнице. Бабушку готовят к операции. Хирург подошёл ко мне в коридоре.',
        shortcut: 'Деньги от схемы пригодились — но не в том виде. Бабушку готовят к операции. Хирург подошёл с предложением.',
        gray: 'Привычка молчать вышла мне боком — кошелёк тоже молчит. Бабушку готовят к операции. Хирург подошёл.',
        'risky-halol': 'После моих громких ходов меня знают по имени. Но в больнице это не помогает. Хирург подошёл с предложением.',
      },
    },
    en: {
      stage: 'FIRST PRICE',
      setting: 'District hospital, surgery wing · evening',
      title: 'Surgery tomorrow',
      narrator: 'They\'re prepping grandma for surgery. The surgeon pulled me into the corridor and looked down.',
      quote: '— Technically — free. But… there\'s gratitude. Two million — and I operate myself. Otherwise — public queue, two months.',
      realStoryNote: 'Every third citizen has faced «gratitude» in healthcare (2023 survey).',
      narratorByPrev: {},
      narratorByType: {
        halol: 'After all the refusals at work, I\'m at the hospital. They\'re prepping grandma for surgery. The surgeon approached in the corridor.',
        shortcut: 'Money from the scheme came in handy — but in a different way. They\'re prepping grandma for surgery. The surgeon approached with an offer.',
        gray: 'The habit of silence cost me — my wallet stays silent too. They\'re prepping grandma. The surgeon approached.',
        'risky-halol': 'After my loud moves they know me by name. But it doesn\'t help in the hospital. The surgeon came with an offer.',
      },
    },
  },

  family_news: {
    uz: {
      stage: 'MATBUOT BILDI',
      setting: 'Chilonzordagi kafe, 22:10 · ikki hafta o\'tib',
      title: 'Jurnalist va flesh',
      narrator: 'Shifoxona voqeasi Telegramga tushdi. Jurnalist — mening kursdoshim — jarroh yozishmalarini so\'rayapti. Menda kirish bor.',
      quote: '— Agar men chop etmasam, ish to\'xtatiladi. Bir oydan keyin u «yuqoriga» ketadi. Bitta post — va jamiyat biladi.',
      realStoryNote: null,
      narratorByPrev: {
        c: 'Shifoxona voqeasi allaqachon Telegramda. Jurnalist — kursdoshim — yana material so\'rayapti.',
      },
      narratorByType: {},
    },
    ru: {
      stage: 'ПРЕССА УЗНАЛА',
      setting: 'Кафе на Чиланзаре, 22:10 · через две недели',
      title: 'Журналист и флешка',
      narrator: 'История с больницей попала в Telegram. Журналист — мой однокурсник — просит флешку с перепиской хирурга. У меня есть доступ.',
      quote: '— Если я не опубликую, дело замнут. Через месяц он уйдёт «на повышение». Один пост — и общество знает.',
      realStoryNote: null,
      narratorByPrev: {
        c: 'История с больницей уже в Telegram. Журналист — мой однокурсник — просит больше материала.',
      },
      narratorByType: {},
    },
    en: {
      stage: 'THE PRESS FOUND OUT',
      setting: 'Café in Chilanzar, 22:10 · two weeks later',
      title: 'A journalist and a flash drive',
      narrator: 'The hospital story hit Telegram. A journalist — my classmate — wants the surgeon\'s correspondence. I have access.',
      quote: '— If I don\'t publish, the case dies. In a month he\'ll get «promoted». One post — and society knows.',
      realStoryNote: null,
      narratorByPrev: {
        c: 'The hospital story is already on Telegram. The journalist — my classmate — asks for more.',
      },
      narratorByType: {},
    },
  },

  power: {
    uz: {
      stage: 'OXIRGI SINOV',
      setting: 'Vazirlik kabineti, kech oqshom',
      title: 'Eski do\'st ostonada',
      narrator: 'Bolalikdagi do\'stim yozuvsiz keldi. Uning kompaniyasi tekshirilmoqda. Hujjatlar — mening stolimda. Bitta so\'z — va tekshirish «yopiladi».',
      quote: '— Aka. Biz birga o\'sganmiz. Sen mening uyimni, onamni bilasan. Bitta imzo — va men qutulaman. Buni hech qachon unutmayman.',
      realStoryNote: null,
      narratorByPrev: {},
      narratorByType: {
        halol: 'Bu yerga rad javoblar va tamoyillar orqali keldim. Bolalikdagi do\'stim yozuvsiz keldi. Uning kompaniyasi hujjatlari mening stolimda.',
        shortcut: 'Men «masalalarni yopish»ni bilaman — buni butun karera o\'rgatdi. Bolalikdagi do\'stim yozuvsiz keldi.',
        gray: 'Bu yerga jim, ortiqcha harakat qilmasdan keldim. Bolalikdagi do\'stim yozuvsiz keldi. Endi jim turolmayman.',
        'risky-halol': 'Har bir baland qadamni o\'zimga oldim — va bu yerga keldim. Bolalikdagi do\'stim yozuvsiz keldi. Uning hujjatlari stolimda.',
      },
    },
    ru: {
      stage: 'ПОСЛЕДНЕЕ ИСПЫТАНИЕ',
      setting: 'Кабинет в министерстве, поздний вечер',
      title: 'Старый друг у порога',
      narrator: 'Друг детства пришёл без записи. Его компания под проверкой. Документы — на моём столе. Одно слово — и проверку «закроют».',
      quote: '— Брат. Мы вместе росли. Ты знаешь мой дом, мою маму. Одна подпись — и я спасён. Я этого никогда не забуду.',
      realStoryNote: null,
      narratorByPrev: {},
      narratorByType: {
        halol: 'Я дошёл сюда через отказы и принципы. Друг детства пришёл без записи. Документы его компании — на моём столе.',
        shortcut: 'Я знаю, как «закрывать вопросы» — этому меня научила вся карьера. Друг детства пришёл без записи.',
        gray: 'Я дошёл сюда тихо, не делая лишних движений. Друг детства пришёл без записи. Молчать дальше уже не получится.',
        'risky-halol': 'Каждый громкий шаг я брал на себя — и дошёл досюда. Друг детства пришёл без записи. Документы его компании на моём столе.',
      },
    },
    en: {
      stage: 'THE FINAL TEST',
      setting: 'Ministry office, late evening',
      title: 'An old friend at the door',
      narrator: 'A childhood friend showed up without an appointment. His company is under inspection. The papers — on my desk. One word — and the inspection «closes».',
      quote: '— Brother. We grew up together. You know my home, my mother. One signature — and I\'m saved. I\'ll never forget this.',
      realStoryNote: null,
      narratorByPrev: {},
      narratorByType: {
        halol: 'I got here through refusals and principles. A childhood friend showed up without an appointment. His company\'s papers are on my desk.',
        shortcut: 'I know how to «close issues» — my whole career taught me. A childhood friend showed up without an appointment.',
        gray: 'I got here quietly, without making waves. A childhood friend showed up. Staying silent isn\'t an option anymore.',
        'risky-halol': 'I owned every loud move — and got here. A childhood friend at the door. His company\'s papers on my desk.',
      },
    },
  },
}

const CHOICE_TEXTS = {
  exam: {
    a: { uz:{label:'O\'zim topshiraman',subtitle:'Qonun shuni talab qiladi.',outcome:'«Qoniqarli» olib topshirdim. O\'qituvchi meni eslab qoldi. Keyingi imtihonda u menga shans berdi.'}, ru:{label:'Сдам сам',subtitle:'Так требует закон.',outcome:'Сдал на «удовлетворительно». Преподаватель меня запомнил. На следующем экзамене он дал шанс.'}, en:{label:'I\'ll take it myself',subtitle:'That\'s what the law requires.',outcome:'Got a «satisfactory». The professor remembered me. Next exam he gave me a chance.'} },
    b: { uz:{label:'Hammaga qo\'shilaman',subtitle:'Hamma shunaqa qiladi.',outcome:'Imtihon «o\'tdi». Lekin ichimda birinchi marta nimadir sindi. Keyingi sessiyada ham to\'lashga to\'g\'ri keldi.'}, ru:{label:'Скинусь со всеми',subtitle:'Все так делают.',outcome:'Экзамен «прошёл». Но внутри впервые что-то сломалось. На следующей сессии тоже пришлось платить.'}, en:{label:'I\'ll chip in with the group',subtitle:'Everyone does it.',outcome:'The exam «passed». But something inside broke for the first time. Next session I had to pay too.'} },
    c: { uz:{label:'Diktofonga yozaman',subtitle:'Dalil yig\'aman.',outcome:'Yozuv dekanga yetib bordi. O\'qituvchi ishdan bo\'shatildi. Guruh meni yomon ko\'rdi — lekin tizim titradi.'}, ru:{label:'Запишу на диктофон',subtitle:'Соберу доказательства.',outcome:'Запись попала к декану. Преподавателя уволили. Группа меня возненавидела — но система вздрогнула.'}, en:{label:'I\'ll record it',subtitle:'Gather evidence.',outcome:'The recording reached the dean. The professor was fired. The group hated me — but the system flinched.'} },
  },
  archive: {
    a: { uz:{label:'Kuratorga to\'g\'ridan-to\'g\'ri aytaman',subtitle:'Ochiq gaplashaman.',outcome:'U jahli chiqdi. Bir hafta o\'tib arizalar «topildi». Mening tavsifnomam — «o\'jar, lekin halol».'}, ru:{label:'Скажу куратору в лицо',subtitle:'Поговорю открыто.',outcome:'Он разозлился. Но через неделю заявления «нашлись». Моя характеристика — «упрямый, но честный».'}, en:{label:'Confront the supervisor',subtitle:'Speak up openly.',outcome:'He got angry. A week later the applications «turned up». My evaluation read «stubborn but honest».'} },
    b: { uz:{label:'Jim turaman, amaliyotni tugataman',subtitle:'Mening ishim emas.',outcome:'Amaliyot xotirjam o\'tdi. Har kuni yo\'lakdagi ayollarning yuziga qaray olmadim.'}, ru:{label:'Промолчу и закончу практику',subtitle:'Не моё дело.',outcome:'Практика прошла спокойно. Каждое утро я смотрел на лица женщин в коридоре и не поднимал глаз.'}, en:{label:'Stay silent, finish the internship',subtitle:'Not my business.',outcome:'The internship passed quietly. Every morning I avoided the women\'s eyes in the hallway.'} },
    c: { uz:{label:'Antikorrupsiyaga anonim yozaman',subtitle:'1144 orqali.',outcome:'Ikki haftadan keyin tekshirish keldi. Kurator lavozimi pasaytirildi. U menga shubha qildi — isbotlay olmadi.'}, ru:{label:'Напишу в Антикор анонимно',subtitle:'Через 1144.',outcome:'Через две недели приехала проверка. Куратора понизили. Он подозревал меня — доказать не смог.'}, en:{label:'Anonymously report to the Anti-corruption Agency',subtitle:'Through 1144.',outcome:'Two weeks later an inspection arrived. The supervisor was demoted. He suspected me — couldn\'t prove it.'} },
  },
  archive_call: {
    a: { uz:{label:'Rahmat aytaman, rad etaman',subtitle:'Qarz bo\'lib qolmayman.',outcome:'U bosh irg\'adi. Hokimiyat bo\'ylab gap tarqaladi: «yangisi noqulay». Meni eslab qolishdi — lekin chaqirishmadi.'}, ru:{label:'Поблагодарю и откажусь',subtitle:'Не буду должен.',outcome:'Он кивнул. Слух пошёл по hokimiyat: «новичок неудобный». Меня запомнили — и не позвали.'}, en:{label:'Thank and refuse',subtitle:'I won\'t owe him.',outcome:'He nodded. Word spread across the hokimiyat: «the new one is awkward». They remembered me — and didn\'t call.'} },
    b: { uz:{label:'Roziman, jim turaman',subtitle:'Nima uchun xavf?',outcome:'U jilmaydi. Diplomdan keyin ish oldim. Lekin birinchi topshiriq — «ko\'z yumish».'}, ru:{label:'Соглашусь и промолчу',subtitle:'Зачем рисковать?',outcome:'Он улыбнулся. После диплома я получил место. Но первое же поручение — «закрыть глаза».'}, en:{label:'Agree and stay silent',subtitle:'Why risk it?',outcome:'He smiled. After the diploma I got the job. The first task — «look the other way».'} },
    c: { uz:{label:'Suhbatni telefonga yozaman',subtitle:'Har holatga.',outcome:'Fayl bulutda saqlandi. Men chiqdim. Bir oy o\'tib bu suhbat yangiliklarda chiqdi — lekin ismimsiz.'}, ru:{label:'Запишу разговор на телефон',subtitle:'На всякий случай.',outcome:'Файл сохранён в облаке. Я ушёл. Через месяц этот разговор всплыл в новостях — но без моего имени.'}, en:{label:'Record the conversation',subtitle:'Just in case.',outcome:'The file is in the cloud. I left. A month later this conversation hit the news — without my name.'} },
  },
  first_job: {
    a: { uz:{label:'Qaytadan rasmiylashtirishga yuboraman',subtitle:'Qonun — qonun.',outcome:'Erkak g\'azablanib chiqdi. Ikki kundan keyin to\'g\'ri hujjat qaytdi — va tasdiqlandi. Navbat sezmadi.'}, ru:{label:'Отправлю на переоформление',subtitle:'Закон есть закон.',outcome:'Мужчина ушёл в гневе. Через два дня документ вернулся правильный — и был утверждён. Очередь не заметила.'}, en:{label:'Send him to re-file',subtitle:'The law is the law.',outcome:'He left furious. Two days later the correct document came back — and was approved. The queue didn\'t notice.'} },
    b: { uz:{label:'Sezmaganga olaman',subtitle:'Qog\'oz o\'zi o\'tib ketadi.',outcome:'Hujjat yuqoriga ketdi. Imzomda — xato. Ertaga kimdir buni ko\'radi.'}, ru:{label:'Сделаю вид, что не заметил',subtitle:'Бумага сама пройдёт.',outcome:'Документ ушёл наверх. На моей подписи — ошибка. Завтра кто-то её увидит.'}, en:{label:'Pretend I didn\'t notice',subtitle:'The paper will pass on its own.',outcome:'The document went up. With a mistake on my signature. Tomorrow someone will see it.'} },
    c: { uz:{label:'Konvertni olaman',subtitle:'Bir marta. Bola haqida.',outcome:'Konvert stolda qoldi. Birinchi marta oldim. Ertaga u yana keladi — endi kimga borishni biladi.'}, ru:{label:'Возьму конверт',subtitle:'Один раз. Ради ребёнка.',outcome:'Конверт остался на столе. Я впервые взял. Завтра он подойдёт снова — он теперь знает, к кому идти.'}, en:{label:'Take the envelope',subtitle:'Once. For the kid.',outcome:'The envelope stayed on the desk. I took it for the first time. Tomorrow he\'ll be back — now he knows where to go.'} },
  },
  first_job_pull: {
    a: { uz:{label:'Rad etaman, ariza yozaman',subtitle:'Bu yerdan ketaman.',outcome:'Meni jamoadan siqib chiqarishdi. Bir oy o\'tib — «qisqartirish» bo\'yicha ishdan ketdim. Lekin Antikor stolida arizam yotibdi.'}, ru:{label:'Откажусь и подам заявление',subtitle:'Уйду от этого.',outcome:'Меня вытолкнули из коллектива. Через месяц — увольнение «по сокращению». Но в Антикоре моё заявление уже лежит.'}, en:{label:'Refuse and file a report',subtitle:'I\'ll leave this.',outcome:'They pushed me out of the team. A month later — fired «due to staff cuts». But my report is already at the Agency.'} },
    b: { uz:{label:'Kassaga kiraman',subtitle:'Bir marta — sinab ko\'raman.',outcome:'Birinchi to\'lov ikki yuz dollar konvertda keldi. Bir yildan keyin bu «tinch» daromad edi. Va har bir hujjatda iz.'}, ru:{label:'Войду в кассу',subtitle:'Один раз — попробую.',outcome:'Первая выплата пришла в конверте на двести долларов. Через год это был «спокойный» доход. И след в каждом документе.'}, en:{label:'Join the pot',subtitle:'Once — to try.',outcome:'First payout — two hundred dollars in an envelope. A year later it was a «quiet» income. And a trace on every document.'} },
    c: { uz:{label:'Roziman, lekin olmayman',subtitle:'O\'zimni tutaman.',outcome:'Bosh irg\'adim, konvertlarni tegmasdan o\'tkazib yubordim. Boshliq sezdi. Sovuqroq bo\'ldi, lekin qo\'lim toza.'}, ru:{label:'Соглашусь, но не буду брать',subtitle:'Сделаю вид.',outcome:'Я кивнул, но конверты передавал дальше нетронутыми. Начальник заметил. Стало холоднее, но руки чистые.'}, en:{label:'Agree but don\'t take',subtitle:'Just play along.',outcome:'I nodded but passed envelopes through untouched. The manager noticed. It got colder, but my hands stay clean.'} },
  },
  family: {
    a: { uz:{label:'Rad etaman, navbat kutaman',subtitle:'Qonun mening tomonimda.',outcome:'Navbat ikki oy emas, uch haftada keldi. Boshqa jarroh operatsiya qildi. Hammasi yaxshi o\'tdi.'}, ru:{label:'Откажусь и буду ждать очередь',subtitle:'Закон на моей стороне.',outcome:'Очередь подошла не через два месяца, а через три недели. Оперировал другой хирург. Всё прошло хорошо.'}, en:{label:'Refuse and wait the queue',subtitle:'The law is on my side.',outcome:'The queue came not in two months but in three weeks. Another surgeon operated. All went well.'} },
    b: { uz:{label:'To\'layman. Yaqin odam-ku',subtitle:'Bahslashish vaqti emas.',outcome:'Operatsiya ertaga. Buvi tirik. Lekin bu tizimni hozir o\'z imzom bilan to\'lading.'}, ru:{label:'Заплачу. Это близкий человек',subtitle:'Не время спорить.',outcome:'Операция назавтра. Бабушка жива. Но эту систему ты только что оплатил своей подписью.'}, en:{label:'I\'ll pay. It\'s my family',subtitle:'No time to argue.',outcome:'Surgery is tomorrow. Grandma is alive. But you just paid for this system with your signature.'} },
    c: { uz:{label:'Qayd etaman va Antikorga boraman',subtitle:'Operatsiyadan keyin.',outcome:'Shikoyat Sog\'liqni saqlash vazirligiga yetib bordi. Jarroh lavozimi pasaytirildi. Bo\'limda 1144 raqami osilgan. Buvimni boshqa shifokor — muvaffaqiyatli operatsiya qildi.'}, ru:{label:'Зафиксирую и пойду в Антикор',subtitle:'После операции.',outcome:'Жалоба дошла до Минздрава. Хирурга понизили. В отделении теперь висит номер 1144. Бабушку оперировал другой врач — успешно.'}, en:{label:'Document it and go to the Agency',subtitle:'After the surgery.',outcome:'The complaint reached the Ministry of Health. The surgeon was demoted. The 1144 number now hangs in the ward. Grandma was operated by another doctor — successfully.'} },
  },
  family_news: {
    a: { uz:{label:'Komplaens orqali yuboraman',subtitle:'Rasmiy yo\'l bor.',outcome:'Tekshirish to\'rt oy davom etdi. Jarrohni jim qildirib chetlashtirishdi. Jurnalist xafa — lekin men qog\'oz bilan himoyalanganman.'}, ru:{label:'Передам через комплаенс',subtitle:'Есть официальный канал.',outcome:'Проверка шла четыре месяца. Хирурга отстранили тихо. Журналист обижен — но я прикрыт бумагой.'}, en:{label:'Send through compliance',subtitle:'There\'s an official channel.',outcome:'The check ran for four months. The surgeon was quietly removed. The journalist is offended — but I\'m covered by paper.'} },
    b: { uz:{label:'Endi aralashmayman',subtitle:'Etarli qildim.',outcome:'Ish cho\'zildi. Bir yil o\'tib jarroh xususiy klinika ochdi. Ba\'zan uni avtobus oynasidan ko\'raman.'}, ru:{label:'Не буду больше лезть',subtitle:'И так уже сделал.',outcome:'Дело тянули. Через год хирург открыл частную клинику. Иногда я её вижу из окна автобуса.'}, en:{label:'Stay out now',subtitle:'I did enough.',outcome:'The case dragged. A year later the surgeon opened a private clinic. I see it sometimes from the bus window.'} },
    c: { uz:{label:'Fleshni beraman',subtitle:'Baland va darrov.',outcome:'OAVda janjal. Bir hafta o\'tib menga «oshkor qilish» bo\'yicha nazorat xizmati keldi. Haqman, lekin moddamdaman.'}, ru:{label:'Отдам флешку',subtitle:'Громко и сразу.',outcome:'Скандал в СМИ. Через неделю на меня вышла служба контроля — за «разглашение». Я прав, но под статьёй.'}, en:{label:'Hand over the drive',subtitle:'Loud and now.',outcome:'A media scandal. A week later compliance came after me — for «disclosure». I\'m right but under article.'} },
  },
  power: {
    a: { uz:{label:'Rad etaman, ishni davom ettiraman',subtitle:'Do\'stlik qonundan ustun emas.',outcome:'Do\'stim jim chiqib ketdi. Boshqa qo\'ng\'iroq qilmaydi. Uning kompaniyasi sudni yutqazdi. Men esa shunday iltimoslar bilan kelishmaydigan vazir bo\'lib qoldim.'}, ru:{label:'Откажу и дам ход делу',subtitle:'Дружба не выше закона.',outcome:'Друг ушёл молча. Больше не звонит. Его компания проиграла суд. А я остался министром, к которому больше не приходят с такими просьбами.'}, en:{label:'Refuse and let the case go',subtitle:'Friendship isn\'t above the law.',outcome:'My friend left in silence. He doesn\'t call anymore. His company lost in court. And I became the minister no one comes to with such requests.'} },
    b: { uz:{label:'Do\'stga yordam beraman',subtitle:'Bir marta — tizim emas.',outcome:'Tekshirish yopildi. Sakkiz oy o\'tib jurnalist zanjirni chop etdi. Mening ismim — sarlavhada birinchi.'}, ru:{label:'Помогу другу',subtitle:'Один раз — не система.',outcome:'Проверку закрыли. Через восемь месяцев журналист опубликовал цепочку. Моё имя — первое в заголовке.'}, en:{label:'Help the friend',subtitle:'Once — not a system.',outcome:'The case was closed. Eight months later a journalist published the chain. My name — first in the headline.'} },
    c: { uz:{label:'Mustaqil komissiyaga beraman',subtitle:'Men hal qilmasligim uchun.',outcome:'Komissiya qisman ayb topdi. Jarima, qamoqsiz. Do\'stim hammasini tushundi. Bir yildan keyin o\'zi qo\'ng\'iroq qildi — rahmat aytish uchun.'}, ru:{label:'Передам в независимую комиссию',subtitle:'Чтобы не я решал.',outcome:'Комиссия нашла часть вины. Штраф, без тюрьмы. Друг всё понял. Через год позвонил первым — сказать спасибо.'}, en:{label:'Pass to an independent commission',subtitle:'So I don\'t decide.',outcome:'The commission found partial fault. Fine, no prison. My friend understood. A year later he called first — to thank me.'} },
  },
}

const ENDING_TEXTS = {
  halol_leader: {
    uz: { title:'Halol rahbar', subtitle:'Sen o\'zingni sotmasdan yo\'l bosding.', body:['Sen ismingni saqlading. Yoningdagilar konvert orqali emas — o\'zlari kelishdi.','Sen tezlikda va pulda yutqazding. Lekin sotib bo\'lmaydigan narsani topding: tinch uyqu va haqiqiy obro\'.'], stat:'Halollik sekinroq, lekin ishonchliroq bo\'lib chiqdi.', share:'Men «Halol Avlod»ni o\'tib, halol rahbar bo\'ldim. Sen-chi?' },
    ru: { title:'Честный лидер', subtitle:'Ты прошёл путь, не продав себя.', body:['Ты сохранил имя. Те, кто рядом — пришли не через конверт, а сами.','Ты потерял в скорости и в части возможных денег. Но получил то, что нельзя купить: спокойный сон и реальный авторитет.'], stat:'Честность оказалась медленнее, но надёжнее.', share:'Я прошёл «Halol Avlod» и стал честным лидером. А ты?' },
    en: { title:'Honest leader', subtitle:'You walked the path without selling yourself.', body:['You kept your name. The people next to you came on their own — not through an envelope.','You lost speed and some money. But you got something money can\'t buy: a quiet sleep and real authority.'], stat:'Honesty turned out slower — but more reliable.', share:'I finished «Halol Avlod» as an honest leader. And you?' },
  },
  wealthy_under_investigation: {
    uz: { title:'Boy, lekin tergovda', subtitle:'Sen pulda yutding. Ular sening o\'zingni yutdi.', body:['Kvartira, mashina, yaxshi restoranlar. Va sening isming yozilgan papka — tergovchi stolida.','Har bir «hal qilingan masala» iz qoldirgan. Izlar zanjirga aylangan. Zanjir — ayblovga.'], stat:'Korrupsiya unutmaydi. U — yaxshi xotirali buxgalter.', share:'Men «Halol Avlod»ni o\'tib — tergov ostiga tushdim. Sen-chi?' },
    ru: { title:'Богат, но под следствием', subtitle:'Ты выиграл в деньгах. Они выиграли тебя.', body:['Квартира, машина, хорошие рестораны. И папка с твоим именем на столе у следователя.','Каждый «решённый вопрос» оставлял след. Следы сложились в цепочку. Цепочка — в обвинение.'], stat:'Коррупция не забывает. Она — бухгалтер с хорошей памятью.', share:'Я прошёл «Halol Avlod» — и попал под следствие. А ты?' },
    en: { title:'Rich, but under investigation', subtitle:'You won the money. They won you.', body:['Apartment, car, good restaurants. And a folder with your name on the prosecutor\'s desk.','Each «solved issue» left a trace. The traces formed a chain. The chain formed an indictment.'], stat:'Corruption never forgets. It\'s an accountant with a long memory.', share:'I finished «Halol Avlod» — under investigation. And you?' },
  },
  imprisoned: {
    uz: { title:'Qamoq', subtitle:'Sen juda agressiv o\'ynading.', body:['Sen birin-ketin xavfli qadamlar tashlading. Tizim tushunishni xohlamadi. U shunchaki eshikni yopdi.','Ehtimol ko\'p narsalarda haq edingsan. Lekin bitta noto\'g\'ri qadam ertangi kuningni hal qildi.'], stat:'Hatto to\'g\'ri yo\'l ham intizom talab qiladi.', share:'Men «Halol Avlod»ni o\'tib — panjara ortida qoldim. Sen-chi?' },
    ru: { title:'Тюрьма', subtitle:'Ты играл слишком агрессивно.', body:['Ты совершал рискованные ходы один за другим. Система не стала разбираться. Она просто захлопнула дверь.','Возможно, во многом ты был прав. Но один неверный шаг решил, где ты проснёшься завтра.'], stat:'Даже праведный путь требует дисциплины.', share:'Я прошёл «Halol Avlod» — и оказался за решёткой. А ты?' },
    en: { title:'Prison', subtitle:'You played too aggressive.', body:['You took risky steps one after another. The system didn\'t bother to investigate. It just slammed the door.','Maybe you were right about a lot. But one wrong step decided where you wake up tomorrow.'], stat:'Even the righteous path needs discipline.', share:'I finished «Halol Avlod» — behind bars. And you?' },
  },
  survived_but_broken: {
    uz: { title:'Omon qoldi, lekin sindi', subtitle:'Na u, na bu.', body:['Sen o\'rtacha yo\'lni tanlading. Bir joyda jim qolding. Bir joyda bosh irg\'ading. Bir joyda «har holda» imzo qo\'yding.','Sen kresloda qolding. Lekin oynada — o\'n sakkiz yoshda nafratlanadigan odamingni ko\'ryapsan.'], stat:'Kulrang zona — eng gavjum joy.', share:'Men «Halol Avlod»ni o\'tib — omon qoldim, lekin sindim. Sen-chi?' },
    ru: { title:'Выжил, но сломался', subtitle:'Ни там, ни тут.', body:['Ты выбрал серединный путь. Где-то промолчал. Где-то кивнул. Где-то подписал «на всякий случай».','Ты остался в кресле. Но в зеркале — человек, которого ты бы презирал в свои восемнадцать.'], stat:'Серая зона — самое людное место.', share:'Я прошёл «Halol Avlod» — выжил, но сломался. А ты?' },
    en: { title:'Survived but broken', subtitle:'Neither here nor there.', body:['You picked the middle path. Stayed silent here. Nodded there. Signed a paper «just in case».','You kept the chair. But in the mirror — a person your eighteen-year-old self would despise.'], stat:'The gray zone is the most crowded place.', share:'I finished «Halol Avlod» — survived but broken. And you?' },
  },
}

const ACTS = [
  { act_number:1, is_optional:false, act_key:'exam',           timer:50, real_story:false,
    stage:'BIRINCHI MUROSA',             setting:'Yuridik fakultet, 3-kurs · imtihondan oldin',
    title:'Imtihon',                     narrator:'Jinoyat huquqi imtihoniga o\'n daqiqa qoldi. Ikki kechadan beri uxlamayapman. Yo\'lakda — guruh sardor konvert bilan.',
    quote:'— Qara, qiynalma. O\'qituvchi bilan «kelishilgan». Ikki yuz ming so\'m — va sendan so\'rashmaydi ham. Butun guruh pul yig\'di.',
    choices:[
      {choice_key:'a',type:'halol',      delta_integrity:12,  delta_money:-2,  delta_risk:0,  delta_reputation:6},
      {choice_key:'b',type:'shortcut',   delta_integrity:-15, delta_money:-8,  delta_risk:10, delta_reputation:-10},
      {choice_key:'c',type:'risky-halol',delta_integrity:18,  delta_money:0,   delta_risk:15, delta_reputation:12},
    ],
    branches:[{condition_type:null,condition_value:null,to_act_id:'__act2__',priority:0}],
  },
  { act_number:2, is_optional:false, act_key:'archive',        timer:45, real_story:true,
    stage:'BIRINCHI NAVBAT',             setting:'Tuman hokimiyati, arxiv bo\'limi · yozgi amaliyot',
    title:'Yo\'qolgan papka',            narrator:'Hokimiyatda amaliyotdaman. Mahalladan ayollar har kuni ma\'lumotnoma uchun keladi. Tasodifan stol tagidagi ariza papkalarini topib oldim.',
    quote:'— Qara, hamma narsani ko\'rishing shart emas. Ba\'zi qog\'ozlarga tegmagan ma\'qul. Sen amaliyotchisan — o\'rgan, aralashma.',
    choices:[
      {choice_key:'a',type:'halol',      delta_integrity:10, delta_money:0,  delta_risk:5,   delta_reputation:6},
      {choice_key:'b',type:'gray',       delta_integrity:-8, delta_money:4,  delta_risk:0,   delta_reputation:-8},
      {choice_key:'c',type:'risky-halol',delta_integrity:16, delta_money:0,  delta_risk:18,  delta_reputation:12},
    ],
    branches:[
      {condition_type:'choice_type',condition_value:'halol',      to_act_id:'__act2b__',priority:0},
      {condition_type:'choice_type',condition_value:'risky-halol',to_act_id:'__act2b__',priority:1},
      {condition_type:null,         condition_value:null,          to_act_id:'__act3__', priority:2},
    ],
  },
  { act_number:3, is_optional:true,  act_key:'archive_call',   timer:35, real_story:false,
    stage:'TIZIM SENI PAYQADI',          setting:'Hokimiyat boshlig\'i kabineti · bir hafta o\'tib',
    title:'Seni yuqoriga chaqirishyapti',narrator:'Mening qadamimdan keyin bo\'lim boshlig\'i o\'zi kabinetiga taklif qildi. Eshik yopiq.',
    quote:'— Qara, sen yoshsan. Istiqbolli. Faqat… har bir tortmaga aralashma. Diplomdan keyin seni o\'zimga olishim mumkin.',
    choices:[
      {choice_key:'a',type:'halol',      delta_integrity:10,  delta_money:0, delta_risk:10,  delta_reputation:8},
      {choice_key:'b',type:'gray',       delta_integrity:-10, delta_money:0, delta_risk:-8,  delta_reputation:-6},
      {choice_key:'c',type:'risky-halol',delta_integrity:18,  delta_money:0, delta_risk:22,  delta_reputation:14},
    ],
    branches:[{condition_type:null,condition_value:null,to_act_id:'__act3__',priority:0}],
  },
  { act_number:4, is_optional:false, act_key:'first_job',      timer:40, real_story:true,
    stage:'BIRINCHI KONVERT',            setting:'Davlat xizmatlari markazi (DXM), qabul oynasi · birinchi hafta',
    title:'Oynacha orqali',              narrator:'Birinchi ishim — DXMda operator. Navbat soat oltidan boshlanadi. Oynaga erkak yaqinlashdi, hujjatida — kichik xato.',
    quote:'— Aka, bola kasalxonada. Bugun kerak. Senga nima zarar? Minnatdor bo\'laman. Hech kim bilmaydi.',
    choices:[
      {choice_key:'a',type:'halol',      delta_integrity:14,  delta_money:0,   delta_risk:5,  delta_reputation:8},
      {choice_key:'b',type:'gray',       delta_integrity:-10, delta_money:0,   delta_risk:6,  delta_reputation:-6},
      {choice_key:'c',type:'shortcut',   delta_integrity:-18, delta_money:12,  delta_risk:15, delta_reputation:-12},
    ],
    branches:[
      {condition_type:'choice_type',condition_value:'shortcut',to_act_id:'__act4b__',priority:0},
      {condition_type:null,         condition_value:null,       to_act_id:'__act5__', priority:1},
    ],
  },
  { act_number:5, is_optional:true,  act_key:'first_job_pull', timer:30, real_story:false,
    stage:'SXEMA SENI ICHIGA TORTYAPTI', setting:'O\'sha DXM · ikki hafta o\'tib',
    title:'Sen «o\'zimiznikisan»',        narrator:'Gap tarqaldi. Endi mening oynamga «tanish» orqali kelishadi. Smena boshlig\'i meni yordamchi xonaga chaqirdi.',
    quote:'— Yashagin, ko\'nikding. Bu yerda umumiy kassa bor — haftada bir yig\'amiz. Yigirma foiz seniki, sakson — yuqoriga.',
    choices:[
      {choice_key:'a',type:'halol',      delta_integrity:18,  delta_money:-5,  delta_risk:20, delta_reputation:14},
      {choice_key:'b',type:'shortcut',   delta_integrity:-22, delta_money:20,  delta_risk:25, delta_reputation:-18},
      {choice_key:'c',type:'gray',       delta_integrity:-10, delta_money:6,   delta_risk:12, delta_reputation:-8},
    ],
    branches:[{condition_type:null,condition_value:null,to_act_id:'__act5__',priority:0}],
  },
  { act_number:6, is_optional:false, act_key:'family',         timer:35, real_story:true,
    stage:'BIRINCHI BAHO',               setting:'Tuman shifoxonasi, jarrohlik · oqshom',
    title:'Ertaga operatsiya',           narrator:'Buvimni operatsiyaga tayyorlashyapti. Jarroh meni yo\'lakka olib chiqib, ko\'zlarini yashirdi.',
    quote:'— Texnik jihatdan — bepul. Lekin… minnatdorchilik bor. Ikki million — va men o\'zim operatsiya qilaman. Aks holda — umumiy navbat, ikki oy.',
    choices:[
      {choice_key:'a',type:'halol',      delta_integrity:14,  delta_money:-10, delta_risk:0,  delta_reputation:8},
      {choice_key:'b',type:'shortcut',   delta_integrity:-16, delta_money:-8,  delta_risk:10, delta_reputation:-10},
      {choice_key:'c',type:'risky-halol',delta_integrity:22,  delta_money:-12, delta_risk:22, delta_reputation:12},
    ],
    branches:[
      {condition_type:'choice_type',condition_value:'risky-halol',to_act_id:'__act6b__',priority:0},
      {condition_type:null,         condition_value:null,           to_act_id:'__act7__', priority:1},
    ],
  },
  { act_number:7, is_optional:true,  act_key:'family_news',    timer:30, real_story:false,
    stage:'MATBUOT BILDI',               setting:'Chilonzordagi kafe, 22:10 · ikki hafta o\'tib',
    title:'Jurnalist va flesh',          narrator:'Shifoxona voqeasi Telegramga tushdi. Jurnalist — mening kursdoshim — jarroh yozishmalarini so\'rayapti.',
    quote:'— Agar men chop etmasam, ish to\'xtatiladi. Bir oydan keyin u «yuqoriga» ketadi. Bitta post — va jamiyat biladi.',
    choices:[
      {choice_key:'a',type:'halol',      delta_integrity:20,  delta_money:0, delta_risk:15,  delta_reputation:18},
      {choice_key:'b',type:'gray',       delta_integrity:-10, delta_money:0, delta_risk:-8,  delta_reputation:-10},
      {choice_key:'c',type:'risky-halol',delta_integrity:25,  delta_money:0, delta_risk:25,  delta_reputation:20},
    ],
    branches:[{condition_type:null,condition_value:null,to_act_id:'__act7__',priority:0}],
  },
  { act_number:8, is_optional:false, act_key:'power',          timer:25, real_story:false,
    stage:'OXIRGI SINOV',                setting:'Vazirlik kabineti, kech oqshom',
    title:'Eski do\'st ostonada',         narrator:'Bolalikdagi do\'stim yozuvsiz keldi. Uning kompaniyasi tekshirilmoqda. Hujjatlar — mening stolimda.',
    quote:'— Aka. Biz birga o\'sganmiz. Sen mening uyimni, onamni bilasan. Bitta imzo — va men qutulaman.',
    choices:[
      {choice_key:'a',type:'halol',      delta_integrity:30,  delta_money:0,   delta_risk:12, delta_reputation:20},
      {choice_key:'b',type:'shortcut',   delta_integrity:-35, delta_money:25,  delta_risk:35, delta_reputation:-25},
      {choice_key:'c',type:'risky-halol',delta_integrity:25,  delta_money:0,   delta_risk:20, delta_reputation:18},
    ],
    branches:[{condition_type:null,condition_value:null,to_act_id:null,priority:0}],
  },
]

const ENDINGS_DATA = [
  { ending_key:'imprisoned',              badge_color:'bg-ink-700 text-ink-100 border-ink-500',   conditions:[{field:'risk',op:'>=',value:75}],                                                       condition_order:0  },
  { ending_key:'wealthy_under_investigation', badge_color:'bg-accent/15 text-accent border-accent/40', conditions:[{field:'money',op:'>=',value:55},{field:'integrity',op:'<=',value:35}],              condition_order:1  },
  { ending_key:'halol_leader',            badge_color:'bg-halol/20 text-halol border-halol/40',   conditions:[{field:'integrity',op:'>=',value:65},{field:'reputation',op:'>=',value:55}],             condition_order:2  },
  { ending_key:'survived_but_broken',     badge_color:'bg-shadow/15 text-shadow border-shadow/40',conditions:[],                                                                                       condition_order:99 },
]

export async function seedBuiltIn() {
  try {
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

    const existing = await query(
      'SELECT id FROM scenarios WHERE title=$1 AND teacher_id=$2',
      ['Halol Avlod', ownerId]
    )

    if (existing.rows.length > 0) {
      const scenarioId = existing.rows[0].id
      // Check if already has act_key/texts
      const firstAct = await query('SELECT act_key FROM acts WHERE scenario_id=$1 LIMIT 1', [scenarioId])
      if (firstAct.rows[0]?.act_key) {
        console.log('[seed] Halol Avlod already seeded with multilingual texts, skipping')
        return
      }
      // Update existing acts/choices/endings with texts and act_key
      await updateTexts(scenarioId)
      return
    }

    // Create fresh scenario with all data
    const scenRes = await query(
      `INSERT INTO scenarios (teacher_id,title,description,lang,is_published)
       VALUES ($1,$2,$3,'uz',true) RETURNING id`,
      [ownerId, 'Halol Avlod', 'Asosiy ssenariy: 5 akt, 3 ixtiyoriy mikro-sahna. Kichik murosadan vazirlikka qadar.']
    )
    const scenarioId = scenRes.rows[0].id

    const actIdMap = {}
    for (const act of ACTS) {
      const texts = ACT_TEXTS[act.act_key]
      const r = await query(
        `INSERT INTO acts (scenario_id,act_number,is_optional,act_key,stage,setting,title,narrator,quote,timer,real_story,texts)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING id`,
        [scenarioId, act.act_number, act.is_optional, act.act_key,
         act.stage, act.setting, act.title, act.narrator, act.quote,
         act.timer, act.real_story, JSON.stringify(texts)]
      )
      actIdMap[act.act_number] = r.rows[0].id
    }

    const resolveActId = (placeholder) => {
      if (!placeholder) return null
      const m = placeholder.match(/__act(\d+[b]?)__/)
      if (!m) return null
      const numMap = { '2b':3, '3':4, '4b':5, '5':6, '6b':7, '7':8 }
      const key = m[1]
      return actIdMap[numMap[key] ?? parseInt(key)] ?? null
    }

    for (const act of ACTS) {
      const actId = actIdMap[act.act_number]
      const choiceTexts = CHOICE_TEXTS[act.act_key] || {}
      for (const c of act.choices) {
        const ct = choiceTexts[c.choice_key] || {}
        const label = ct.uz?.label || ''
        const subtitle = ct.uz?.subtitle || null
        const outcome = ct.uz?.outcome || ''
        await query(
          `INSERT INTO choices (act_id,choice_key,type,label,subtitle,outcome,delta_integrity,delta_money,delta_risk,delta_reputation,texts)
           VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)`,
          [actId, c.choice_key, c.type, label, subtitle, outcome,
           c.delta_integrity, c.delta_money, c.delta_risk, c.delta_reputation,
           JSON.stringify(ct)]
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

    for (const e of ENDINGS_DATA) {
      const et = ENDING_TEXTS[e.ending_key]
      await query(
        `INSERT INTO scenario_endings (scenario_id,ending_key,title,subtitle,body,stat_quote,share_text,badge_color,conditions,condition_order,texts)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)`,
        [scenarioId, e.ending_key,
         et.uz.title, et.uz.subtitle, et.uz.body, et.uz.stat, et.uz.share,
         e.badge_color, JSON.stringify(e.conditions), e.condition_order,
         JSON.stringify(et)]
      )
    }

    console.log('[seed] Built-in scenario seeded with multilingual texts:', scenarioId)
  } catch (err) {
    console.error('[seed] Error seeding built-in scenario:', err.message)
  }
}

async function updateTexts(scenarioId) {
  const actsRes = await query('SELECT * FROM acts WHERE scenario_id=$1 ORDER BY act_number', [scenarioId])
  for (const act of actsRes.rows) {
    const actKey = ACT_KEY_MAP[act.act_number]
    if (!actKey) continue
    const texts = ACT_TEXTS[actKey]
    await query('UPDATE acts SET act_key=$1, texts=$2 WHERE id=$3', [actKey, JSON.stringify(texts), act.id])

    const choicesRes = await query('SELECT * FROM choices WHERE act_id=$1', [act.id])
    const choiceTexts = CHOICE_TEXTS[actKey] || {}
    for (const ch of choicesRes.rows) {
      const ct = choiceTexts[ch.choice_key]
      if (!ct) continue
      await query('UPDATE choices SET texts=$1 WHERE id=$2', [JSON.stringify(ct), ch.id])
    }
  }

  const endingsRes = await query('SELECT * FROM scenario_endings WHERE scenario_id=$1', [scenarioId])
  for (const e of endingsRes.rows) {
    const et = ENDING_TEXTS[e.ending_key]
    if (!et) continue
    await query('UPDATE scenario_endings SET texts=$1 WHERE id=$2', [JSON.stringify(et), e.id])
  }
  console.log('[seed] Updated multilingual texts for Halol Avlod scenario')
}
