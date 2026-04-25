// UZ — asosiy til. Boshqa tillarda topilmasa, fallback shu yerga tushadi.

export default {
  ui: {
    appName: 'Halol Yo‘l',
    appTagline: 'Halollik yo‘li',
    hotline: 'Ishonch telefoni',
    hotlineNumber: '1144',
    hackathonTag: 'Xakaton-prototipi · O‘zR Antikorrupsiya agentligi',

    intro: {
      kicker: '11 sahna · 10 soniya · 4 yakun',
      headline_pre: 'Sen',
      headline_accent: 'nimani',
      headline_post: 'tanlaysan?',
      lead:
        'Sen talabalikdan vazirlikkacha bo‘lgan yo‘lni bosib o‘tasan. Har qadamda — vasvasa. Har bir qaror uchun o‘n soniyaga vaqting bor. Sening tanlovlaring nafaqat raqamlarni o‘zgartiradi — ular sening yakuniy qiyofangni o‘zgartiradi.',
      ctaStart: 'Yo‘lni boshlash',
      ctaSubtitle: 'Ro‘yxatdan o‘tishsiz. Bir o‘yin — 5 daqiqa.',
      legendKicker: 'Statistikani qanday o‘qiymiz',
      timerKicker: 'Taymer',
      timerCopy: '10 soniya. Agar qaror qilmasang — sen o‘rningga boshqalar qaror qiladi. Bu ham javob.',
    },

    stats: {
      integrity: 'Halollik',
      integrityHint: 'Obro‘. Barqarorlik va himoya beradi.',
      money: 'Resurs',
      moneyHint: 'Pul va tanish. Yo‘lni tezlashtiradi — lekin iz qoldiradi.',
      risk: 'Xavf',
      riskHint: 'Sen uchun kelishlari ehtimoli.',
    },

    timer: {
      label: 'Qarorga vaqt',
    },

    scene: {
      sceneOf: 'Sahna {n} / {total}',
      sceneCounter: 'Sahna {n}',
      basedOnReal: 'Haqiqiy ishlardan olingan',
    },

    choiceType: {
      halol: 'Halol',
      gray: 'Kulrang',
      shortcut: 'Qisqa yo‘l',
      'risky-halol': 'Xavfli halol',
    },

    feedback: {
      kicker: 'Oqibat · Sahna {n}',
      changesKicker: 'O‘zgarishlar',
      next: 'Keyingi sahna',
      reveal: 'Yakunni bilish',
      timeoutBadge: 'Vaqt tugadi',
      youStayedSilent: 'Sen jim qolding.',
      decision: 'Qaror',
    },

    ending: {
      finalCode: 'Yakun {code}',
      finalSummaryKicker: 'Yakuniy ko‘rsatkichlar',
      decisionsKicker: 'Sening qarorlaring',
      share: 'Ulashish',
      shared: 'Nusxalandi',
      restart: 'Qaytadan o‘tish',
      hotlineLink: 'Ishonch telefoni 1144 →',
      decisionTimeout: 'Vaqt tugadi',
    },

    toolbar: {
      themeLabel: 'Tema',
      themeLight: 'Yorug‘',
      themeDark: 'Qorong‘i',
      langLabel: 'Til',
    },
  },

  endings: {
    halol_leader: {
      title: 'Halol yetakchi',
      subtitle: 'Sen yo‘ldan o‘tding va o‘zingni sotmading.',
      body: [
        'Sen ovoz chiqarib aytsa bo‘ladigan ismni saqlab qolding. Yoningdagilar — konvert orqali emas, o‘zlari kelganlar.',
        'Sen tezlikni va bir qism pulni yo‘qotding. Lekin sotib bo‘lmaydigan narsani topding: tinch uyqu va o‘zing uchun ishlaydigan obro‘.',
      ],
      stat: 'Halollik sekinroq, lekin ishonchliroq.',
      share: 'Men «Halol Yo‘l»ni o‘tdim va halol yetakchi bo‘ldim. Sen-chi?',
    },
    wealthy_under_investigation: {
      title: 'Tergov ostidagi boy',
      subtitle: 'Sen pulni yutding. Ular esa seni yutdi.',
      body: [
        'Kvartira, mashina, yaxshi restoran. Va tergovchi stolida sening isming yozilgan papka.',
        'Har bir «hal qilingan masala» iz qoldirdi. Izlar zanjirga ulandi. Zanjir — ayblovga aylandi.',
      ],
      stat: 'Korrupsiya unutmaydi. U yaxshi xotirali buxgalter.',
      share: 'Men «Halol Yo‘l»ni o‘tdim va tergov ostida qoldim. Sen-chi?',
    },
    imprisoned: {
      title: 'Qamoq',
      subtitle: 'Sen haddan tashqari shoshma-shosharlik bilan o‘ynading.',
      body: [
        'Sen xavfli qadamlarni birgalikda olding — halol va shorkat ham. Tizim farqlamadi. U shunchaki eshikni yopdi.',
        'Ehtimol, sen ko‘pgina narsada haq eding. Lekin bitta noto‘g‘ri qadam qaerda uyg‘onishingni hal qiladi.',
      ],
      stat: 'Hatto to‘g‘ri yo‘l ham intizom talab qiladi.',
      share: 'Men «Halol Yo‘l»ni o‘tdim — va panjara ortida qoldim. Sen-chi?',
    },
    survived_but_broken: {
      title: 'Tirik qoldi, lekin sindi',
      subtitle: 'Na baliq, na go‘sht.',
      body: [
        'Sen o‘rtacha yo‘lni tanlading. Bir joyda jim qolding. Bir joyda bosh egib turding. Bir joyda «har ehtimolga qarshi» imzo qo‘yding.',
        'Sen ishda qolding. Lekin oynada — o‘n sakkiz yoshingda nafratlanadigan odam.',
      ],
      stat: 'Kulrang zona — eng gavjum joy.',
      share: 'Men «Halol Yo‘l»ni o‘tdim — tirik qoldim, lekin sindim. Sen-chi?',
    },
  },

  scenarios: {
    birinchi_kun_1: {
      stage: 'YANGI XODIM',
      setting: 'Davlat idorasi, kichik ofis · 1-kun',
      title: 'Birinchi kun',
      narrator:
        'Bu sening ishga kirgan birinchi kuning. Rahbar sokin ovozda gapirdi: «Hammasi qog‘ozda toza ko‘rinishi kerak». Yarim soatdan keyin shoshilgan ayol kiradi. Hujjatda kichik xato bor — sen darhol ko‘rasan.',
      quote:
        '— Iltimos, hujjatimni tezroq tasdiqlab bering. Bolam kasalxonada, pul kerak. Bugun bo‘lishi kerak.',
      choices: {
        a: {
          label: 'Hujjat noto‘g‘ri, tuzatib keling',
          subtitle: 'Qonun shunday talab qiladi.',
          outcome:
            'Ayol jahli chiqib chiqib ketdi. Lekin hujjat keyingi kuni to‘g‘ri kelib tasdiqlandi. Tizim seni ko‘rdi.',
        },
        b: {
          label: 'Mayli, o‘tkazib yuboraman',
          subtitle: 'Bola kasal-ku.',
          outcome:
            'Ayol minnatdor bo‘lib chiqib ketdi. Hujjatda kichik xato qoldi. Stol ustida sening imzoyong.',
        },
        c: {
          label: 'Yordam berishim mumkin...',
          subtitle: 'Implitsit taklif.',
          outcome:
            'Ayol bir lahzada tushundi. Konvertcha stolda qoldirildi. Sen birinchi marotaba qabul qilding.',
        },
      },
    },

    birinchi_kun_2: {
      stage: 'YANGI XODIM',
      setting: 'Rahbar kabineti · o‘sha kun, 17:40',
      title: 'Rahbar chaqirdi',
      narrator:
        'Bir necha soatdan keyin rahbar chaqirdi. Yuzida tabassum yo‘q. Stolda bir nechta hujjat — orasida ertalabki o‘sha varaqa.',
      quote: '— Bugun bitta hujjat shubhali o‘tdi. Tekshiruv bo‘lishi mumkin. Sen biror narsani esladingmi?',
      narratorByPrev: {
        a: 'Bir necha soatdan keyin rahbar chaqirdi. «Bugun bir nechta xodim hujjatlarni shoshilinch o‘tkazgan. Tekshiruv bo‘lishi mumkin. Sen — yangi yuz, sendan so‘rashim kerak: bugun nima bo‘ldi?»',
        b: 'Bir necha soatdan keyin rahbar chaqirdi. Stolda — sening bugungi imzoying bilan o‘sha hujjat. «Tekshiruv bo‘lishi mumkin. Esladingmi, kim qilgan?»',
        c: 'Bir necha soatdan keyin rahbar chaqirdi. Stolda — sening bugungi imzoying bilan o‘sha hujjat. «Bu hujjat shubhali. Tekshiruv bo‘lishi mumkin. Birinchi kuning — esladingmi?»',
      },
      choices: {
        a: {
          label: 'Bu mening xatoyim',
          subtitle: 'Rost gapirish.',
          outcome:
            'Rahbar bosh chayqadi. Ogohlantirish oldim, lekin u sening yuzingni esladi. Qiyin yo‘l, lekin ortda toza varaqa qoldi.',
        },
        b: {
          label: 'Bilmayman, tizim xatosi',
          subtitle: 'Yopib qo‘yish.',
          outcome:
            'Hozircha qutuldim. Lekin bo‘limda «xavfli» degan yorliq paydo bo‘ldi — hech kim aytmaydi, lekin hamma biladi.',
        },
        c: {
          label: 'Boshqa xodim qilgan',
          subtitle: 'Boshqaga ag‘darish.',
          outcome:
            'Boshqa xodim jazo oldi. Sen saqlanding. Lekin ertaga sen oynaga qaraganingda — ichkarida kim borligi avvalgidan farq qiladi.',
        },
      },
    },

    road_stop: {
      stage: 'BITIRUVCHI',
      setting: 'A-373 trassasi, 23:40',
      title: 'Yo‘l chetida to‘xtatish',
      narrator:
        'Sen bitiruvdan keyin uyga ketyapsan. Tezlikdan biroz oshirding. Qizil-ko‘k chiroqlar. Inspektor deraza oldiga keladi.',
      quote:
        '— Tezlikni 22 km/soatga oshirib qo‘ydingiz. Yoki haqiqiy 2.5 mln so‘m, yoki «kelishasiz» — 500 ming so‘m va davom etasiz.',
      realStory: true,
      realStoryNote: 'Antikorrupsiya agentligining tipik ishlariga asoslangan.',
      choices: {
        a: {
          label: 'Rasmiy jarima to‘lash',
          subtitle: 'Bayonnoma, kvitansiya, qonuniy yo‘l.',
          outcome:
            'Qirq daqiqadan keyin yo‘lga chiqasan. Jarima haftadan keyin SMS bilan keladi. Tunda tinch uyquga ketding.',
        },
        b: {
          label: 'Besh yuz mingni berish',
          subtitle: 'Tez, jim, uyga.',
          outcome:
            'Inspektor pulni cho‘ntakka soladi. Davom etasan. Keyingi postda sening yuzingni eslab qoladilar.',
        },
        c: {
          label: 'Telefonga olib, rapport berish',
          subtitle: 'Cho‘ntakdagi kamerani yoqyapsan.',
          outcome:
            'Yetib bording. Keyingi haftada prokuraturadan qo‘ng‘iroq. Bo‘limda hammasi seni yoqtirmaydi. Lekin bitta inspektor — ishdan haydaldi.',
        },
      },
    },

    hr_envelope: {
      stage: 'IZLOVCHI',
      setting: 'Kadrlar bo‘limi, davlat idorasi',
      title: 'Byudjetdagi joy',
      narrator:
        'Sen yarim yildan beri ish izlayapsan. Va nihoyat — taklif. Kadrlar boshlig‘i eshikni yopadi va jilmayadi.',
      quote:
        '— Yaxshi rezyume. Lekin xohlovchilar ko‘p. Uch ming dollar — va sening rezyumeng eng tepada bo‘ladi. Oddiy amaliyot.',
      choices: {
        a: {
          label: 'Rad etib chiqib ketish',
          subtitle: 'Yana izlayman.',
          outcome:
            'Bir oydan keyin boshqa joyga olishdi — kamroq pulga, lekin konvertsiz. Sen toza varaqdan boshlading.',
        },
        b: {
          label: 'To‘lash va joyni olish',
          subtitle: 'Bu — sarmoya.',
          outcome:
            'Ish boshladim. Lekin endi men «qarzdor»man. Bu — oxirgi konvert emas.',
        },
        c: {
          label: '1144 ga anonim yozish',
          subtitle: 'Ishonch telefoni.',
          outcome:
            'Ikki haftadan keyin tekshiruv keldi. Bu ishga meni olishmadi. Lekin kadrlar bo‘limi tarqatib yuborildi.',
        },
      },
    },

    hospital: {
      stage: 'YOSH MUTAXASSIS',
      setting: 'Tuman shifoxonasi, jarrohlik bo‘limi',
      title: 'Operatsiya — ertaga',
      narrator:
        'Buvingni operatsiyaga tayyorlashyapti. Jarroh seni chetga olib, polga qarab past ovozda gapiradi.',
      quote:
        '— Texnik jihatdan operatsiya bepul. Lekin... rahmati bor. Ikki million — va men shaxsan operatsiya qilaman. Aks holda navbat — ikki oy.',
      realStory: true,
      realStoryNote: 'Har uchinchi fuqaro tibbiyotda «rahmat»ga duch kelgan (2023 so‘rov).',
      choices: {
        a: {
          label: 'Rad etib navbat kutish',
          subtitle: 'Qonun mening tomonimda.',
          outcome:
            'Navbat ikki oy emas, uch hafta bo‘ldi. Buvini boshqa jarroh operatsiya qildi. Hammasi yaxshi o‘tdi.',
        },
        b: {
          label: 'Berib qo‘yish — bu o‘z odam',
          subtitle: 'Bahslashish vaqti emas.',
          outcome:
            'Operatsiya ertaga o‘tdi. Buvi tirik. Lekin sen bu tizimni shu bilan o‘z imzoying bilan to‘ladingni.',
        },
        c: {
          label: 'Operatsiyadan keyin shikoyat berish',
          subtitle: 'Anonim, lekin yozma.',
          outcome:
            'Shikoyat Sog‘liqni saqlash vazirligigacha yetdi. Jarroh pasaytirildi. Bo‘limda ishonch telefoni raqamli ilon osildi.',
        },
      },
    },

    coworker_theft: {
      stage: 'HAMKASB',
      setting: 'Open space, juma 17:30',
      title: 'Jim o‘g‘rilik',
      narrator:
        'Hamkasbing Baxtiyor uchinchi oydir bor bo‘lmagan «xizmat safarlari»ni rasmiylashtiryapti. Bo‘sh cheklar qaytaradi. Sen tasodifan hujjatlarni ko‘rding.',
      quote: 'Baxtiyor: — Aka, senga ko‘pmi? Hamma o‘z sxemasiga ega. Sen «sotuvchi» emassan-ku.',
      choices: {
        a: {
          label: 'U bilan shaxsan gaplashish',
          subtitle: 'Insoniylik bilan.',
          outcome:
            'U asabiylashdi. Lekin bir oydan keyin xizmat safarlari to‘xtadi. O‘zi ishdan ketdi. Endi muloqot yo‘q.',
        },
        b: {
          label: 'Jim qolish — meni qiziqtirmaydi',
          subtitle: 'Boshim og‘rimasin.',
          outcome:
            'Sxema yana yarim yil davom etdi. Yorilganda HR hammani so‘roq qildi. Jumladan seni. Sen «sezmadingni».',
        },
        c: {
          label: 'Ichki nazoratga yozish',
          subtitle: 'Ismsiz, faktlar bilan.',
          outcome:
            'Tekshiruv. Ishdan ketkazish. Uning oilasi seni ayblaydi — kim yozganini topdi. Sen haqsan, lekin yomon uxlaysan.',
        },
      },
    },

    school_tender: {
      stage: 'MUTAXASSIS',
      setting: 'Davlat xaridi: maktab tumanda',
      title: 'Farq — yarmiga',
      narrator:
        'Sen maktab qurilishi tenderini olib boryapsan. Shubhali pastlikda taklif qilgan pudratchi g‘alaba qiladi. Bir haftadan keyin — restoranda uchrashuv.',
      quote:
        '— Sementni arzonroq olamiz. Armaturni yupqaroq. Farq — olti yuz million. Uch o‘nlik foiz — sening. Maktab o‘n besh yil turadi, yetadi.',
      realStory: true,
      realStoryNote: '2021-yilgi Surxondaryodagi maktab ishiga o‘xshash.',
      choices: {
        a: {
          label: 'Rad etib spetsifikatsiya bo‘yicha talab qilish',
          subtitle: 'Maktab 50 yil turishi kerak.',
          outcome:
            'Pudratchi muddatlarni buzdi. Seni almashtirishga harakat qilishyapti. Sen pozitsiyani saqladingni. Maktab bir yildan keyin ochildi — va standartni tutadi.',
        },
        b: {
          label: '«O‘z ulush»ni qabul qilish',
          subtitle: 'Bolalarga maktab baribir quriladi.',
          outcome:
            'Pul konvertda keldi. Mashina sotib oldim. Maktab ochildi. To‘rt yildan keyin tom qulab tushdi — yaxshiyamki kechqurun.',
        },
        c: {
          label: 'Hammasini Antikorga topshirish',
          subtitle: 'Hujjatlar bilan.',
          outcome:
            'Pudratchi qamaldi. Senga qarshi — «obro‘sizlantirish» urinishi. Lekin agentlik seni himoya qildi. Maktab halol qurildi.',
        },
      },
    },

    fictitious_act: {
      stage: 'BO‘LIM RAHBARI',
      setting: 'Boshliq kabineti, juma kechi',
      title: 'Imzo qo‘y',
      narrator:
        'Boshliq oldingda bajarilgan ishlar haqidagi akt qo‘yadi. Hech qanday ish bo‘lmagan — sen pudratchini bilasan, u sening qo‘shning. Yonida ruchka.',
      quote: '— Eshit, hammasi yuqorida tasdiqlangan. Faqat imzo. Hech qanday savollar bo‘lmaydi. Hech qachon.',
      choices: {
        a: {
          label: 'Imzolashdan rad etish',
          subtitle: 'Hatto ishdan ketkazsalar ham.',
          outcome:
            'Meni «qulay bo‘lmagan» lavozimga ko‘chirdilar. Aktni baribir kimdir imzoladi. Bir yildan keyin jinoiy ish boshlanadi — mening familiyamsiz.',
        },
        b: {
          label: 'Imzolab, jim turish',
          subtitle: 'Men qaror qabul qilmayman.',
          outcome:
            'Qog‘oz ketdi. Bir yarim yildan keyin tergovchi sening imzoyongni protokolda o‘qiydi. «Hech qanday savollar» o‘nlab savollarga aylandi.',
        },
        c: {
          label: 'Imzolayman, lekin nusxa olib qo‘yaman',
          subtitle: 'Har ehtimolga qarshi.',
          outcome:
            'Sen tizim ichidasan. Nusxa seyfda. Yomon uxlayapsan — lekin hozircha jonlisan. Hozircha.',
        },
      },
    },

    journalist_leak: {
      stage: 'DIREKTOR',
      setting: 'Yunusobod kafesida, 22:10',
      title: 'Jurnalist va flesh',
      narrator:
        'Sen ishonadigan jurnalist ichki yozishmalarni so‘raydi — sening o‘rinbosaring mahinatsiyasining isboti. Senda kirish bor.',
      quote:
        '— Agar men buni e’lon qilmasam, ko‘mib qo‘yadi. Bir oydan keyin u yuqoriga ketadi. Va kontraktlarni emas, taqdirlarni hal qiladi.',
      choices: {
        a: {
          label: 'Ichki komplaens orqali topshirish',
          subtitle: 'Rasmiy kanal bor.',
          outcome:
            'Tekshiruv to‘rt oy davom etdi. O‘rinbosar chetlatildi. Jurnalist xafa — lekin sen hujjat bilan himoyalangansan.',
        },
        b: {
          label: 'Jurnalistga sirti tashlash',
          subtitle: 'Tezroq va qattiqroq.',
          outcome:
            'Ikki kundan keyin — OAVda janjal. Bir haftadan keyin sirti senga qaytib bog‘langan. Sen haqsan, lekin sirni oshkor qilish moddasi ostidasan.',
        },
        c: {
          label: 'Rad etish va aralashmaslik',
          subtitle: 'Bu mening ishim emas.',
          outcome:
            'O‘rinbosar yuqoriga ketdi. Bir yildan keyin u senga to‘g‘ridan-to‘g‘ri tegadigan qaror imzoladi.',
        },
      },
    },

    elections: {
      stage: 'HOKIM O‘RINBOSARI',
      setting: 'Mahalla, saylov kuni',
      title: '«Tashkillangan» ovoz berish',
      narrator:
        'Sendan «ishtirok va natijani ta’minlash»ni so‘rashyapti. Agitatorlar uchun konvert va «to‘g‘ri» byulleten ro‘yxati.',
      quote: '— Bu shunchaki ish. Hamma tumanlar shunday ishlaydi. Sen yangi, faqat hammadek qil.',
      realStory: true,
      realStoryNote: 'Mintaqada YEXHTga o‘xshash sxemalar qayd etilgan.',
      choices: {
        a: {
          label: 'Rad etib saylovni halol o‘tkazish',
          subtitle: 'Ishtirok qancha bo‘lsa, shuncha.',
          outcome:
            'Ishtirok 48%. Yuqoriga natija yoqmadi. Meni ko‘tarmadilar. Lekin men — viloyatda buzilishlar bo‘yicha hech qanday da’vo bo‘lmagan yagona shaxs.',
        },
        b: {
          label: 'Sxemani qabul qilish',
          subtitle: 'Birinchi marta — va oxirgi.',
          outcome:
            'Ishtirok 94%. Maqtashdi. Yarim yildan keyin o‘sha hududda — norozilik. Kameralar bo‘lmasligi kerak narsalarni suratga oldi.',
        },
        c: {
          label: 'O‘tkazish, lekin bosimni hujjatlash',
          subtitle: 'Har bir qo‘ng‘iroqni yozib olish.',
          outcome:
            'Papka bank yacheykasida. Sen ikki tomonlama o‘yin o‘ynaysan. Bu — himoya va xavf. Lekin qo‘ling qo‘shninikidan tozaroq.',
        },
      },
    },

    old_friend_minister: {
      stage: 'VAZIR',
      setting: 'Vazir kabineti, kech soat',
      title: 'Eshik oldidagi eski do‘st',
      narrator:
        'Bolaligingdagi do‘sting yozilmasdan kirdi. Uning kompaniyasi tekshiruv ostida. Hujjatlar — sening stolingda. Bir so‘z — va tekshiruv «to‘xtaydi».',
      quote:
        '— Aka. Biz birga o‘sganmiz. Sen mening uyimni bilasan. Bitta imzo — va men qutuldim. Buni hech qachon unutmayman.',
      choices: {
        a: {
          label: 'Rad etib ishni davom ettirish',
          subtitle: 'Do‘stlik qonundan baland emas.',
          outcome:
            'Do‘st jim chiqib ketdi. Boshqa qo‘ng‘iroq qilmaydi. Kompaniyasi sudni boy berdi. Sen esa — bunday so‘rov bilan kelmaydigan vazir bo‘lib qolasan.',
        },
        b: {
          label: 'Do‘stga yordam berish',
          subtitle: 'Bir marta — tizim emas.',
          outcome:
            'Tekshiruv yopildi. Sakkiz oydan keyin jurnalist zanjirni e’lon qildi. Sening isming sarlavhada birinchi.',
        },
        c: {
          label: 'Mustaqil komissiyaga topshirish',
          subtitle: 'Sen hal qilmasligingiz uchun.',
          outcome:
            'Komissiya qisman aybni topdi. Jarima, qamalishsiz. Do‘st tushundi. Bir yildan keyin u birinchi qo‘ng‘iroq qildi — minnatdorchilik bildirdi.',
        },
      },
    },
  },

  timeoutChoice: {
    label: 'Sen qaror qilmading',
    subtitle: 'Vaqt tugadi.',
    outcome:
      'Sen jim qolding. Sen o‘rningga boshqalar qaror qildi. Ba’zan bu ham tanlovning bir turi.',
  },
}
