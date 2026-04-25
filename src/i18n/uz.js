// Halol Avlod — UZ (asosiy til). 5 akt + 3 ixtiyoriy mikro-sahna.

export default {
  ui: {
    appName: 'Halol Avlod',
    appTagline: 'Halollik avlodi',
    hotline: 'Ishonch telefoni',
    hotlineNumber: '1144',
    hackathonTag: 'Xakaton-prototip · O\'zbekiston Respublikasi Korrupsiyaga qarshi kurashish agentligi',
    intro: {
      kicker: '5 akt · sening yo\'ling · 4 yakun',
      headline_pre: 'Sen nimani',
      headline_accent: 'tanlaysan',
      headline_post: '?',
      lead: 'Talaba. Amaliyotchi. Yosh mutaxassis. Bo\'lim boshlig\'i. Vazir. Har qadamda — vasvasa. Tanlovlaring raqamlarni emas — kim bo\'lishingni o\'zgartiradi. Va tizim har bir harakatingni eslab qoladi.',
      heroMotivation: 'Men har doim tizimda ishlashni va uni o\'zgartirishni xohlardim. Hammasi odamlarga bog\'liqdek tuyulardi. Bugun birinchi marta tushundim — tizim seni tezroq o\'zgartiradi.',
      nameLabel: 'Sening isming',
      namePlaceholder: 'Ismingni kiriting...',
      ctaStart: 'Yo\'lni boshlash',
      ctaSubtitle: 'Ro\'yxatdan o\'tishsiz. Bir o\'yin — 8–10 daqiqa.',
      legendKicker: 'Statistikani qanday o\'qish kerak',
      timerKicker: 'Taymer',
      timerCopy: 'Har sahnada o\'z chegarasi bor. Agar qaror qilmasang — sening o\'rningga hal qilishadi. Bu ham javob.',
    },
    stats: {
      integrity: 'Halollik',
      integrityHint: 'Obro\'. Barqarorlik va himoya beradi.',
      money: 'Resurs',
      moneyHint: 'Pul va aloqalar. Yo\'lni tezlashtiradi — lekin iz qoldiradi.',
      risk: 'Xavf',
      riskHint: 'Sening ortingdan kelish ehtimoli.',
      reputation: 'Tizim ishonchi',
      reputationHint: 'Yashirin ko\'rsatkich. Faqat yakunda ochiladi.',
    },
    timer: { label: 'Qaror vaqti' },
    scene: {
      sceneOf: '{n}-akt / {total} dan',
      sceneCounter: '{n}-akt',
      basedOnReal: 'Haqiqiy ishlarga asoslangan',
    },
    choiceType: {
      halol: 'Halol',
      gray: 'Kulrang',
      shortcut: 'Qisqa yo\'l',
      'risky-halol': 'Xatarli halol',
    },
    feedback: {
      kicker: 'Oqibat · {n}-akt',
      changesKicker: 'O\'zgarishlar',
      next: 'Keyingi sahna',
      reveal: 'Yakunni bilish',
      timeoutBadge: 'Taym-aut',
      youStayedSilent: 'Sen jim qolding.',
      decision: 'Qaror',
    },
    ending: {
      finalCode: 'Yakun {code}',
      finalSummaryKicker: 'Yakuniy ko\'rsatkichlar',
      decisionsKicker: 'Sening qarorlaring',
      reputationReveal: 'Tizim ishonchi — yashirin ko\'rsatkich. Endi sen uni ko\'ryapsan.',
      share: 'Ulashish',
      shared: 'Nusxa olindi',
      restart: 'Qaytadan o\'ynash',
      hotlineLink: 'Ishonch telefoni 1144 →',
      decisionTimeout: 'Taym-aut',
      expandDecisions: 'Hammasini ko\'rsatish',
      collapseDecisions: 'Yopish',
    },
    toolbar: {
      themeLabel: 'Mavzu',
      themeLight: 'Yorug\'',
      themeDark: 'Qorong\'i',
      langLabel: 'Til',
    },
    preEnding: {
      defaultName: 'Do\'st',
      reveal: 'Yakunni bilish',
      honor: {
        line1: '{name}, seni sahnaga taklif qilishyapti.',
        line2: 'Yo\'l og\'ir bo\'ldi. Lekin sen yurding.',
        line3: 'Sen oynaga qarayapsan. U yerda — tanish odam.',
      },
      danger: {
        line1: '{name}, seni chaqirishyapti. Ogohlantirishsiz.',
        line2: 'Sen juda ko\'p tavakkal qilding. Tizim sabrsiz.',
        line3: 'Eshik orqasida kim turganini bilmaysan.',
      },
      corrupt: {
        line1: '{name}, hammasi yaxshi ketyapti. Juda yaxshi.',
        line2: 'Pul bor. Aloqa bor. Lekin telefon jiringladi.',
        line3: 'Raqam notanish. Ovoz — rasmiy.',
      },
      gray: {
        line1: '{name}, sen yolg\'iz o\'tiribsan.',
        line2: 'Hech kim qo\'ng\'iroq qilmaydi. Hech kim kutmaydi.',
        line3: 'Bu yo\'lni o\'zing tanladingmi yoki seni tanlashdimi?',
      },
      tags: {
        briber: 'Tizim seni eslaydi: «murosaga moyil»',
        whistleblower: 'Tizim seni eslaydi: «oshkor qiladi»',
        silent: 'Tizim seni eslaydi: «jim turadi»',
        principled: 'Tizim seni eslaydi: «tamoyilli»',
        neutral: '',
      },
    },
  },

  endings: {
    halol_leader: {
      title: 'Halol rahbar',
      subtitle: 'Sen o\'zingni sotmasdan yo\'l bosding.',
      body: [
        'Sen ismingni saqlading. Yoningdagilar konvert orqali emas — o\'zlari kelishdi.',
        'Sen tezlikda va pulda yutqazding. Lekin sotib bo\'lmaydigan narsani topding: tinch uyqu va haqiqiy obro\'.',
      ],
      stat: 'Halollik sekinroq, lekin ishonchliroq bo\'lib chiqdi.',
      share: 'Men «Halol Avlod»ni o\'tib, halol rahbar bo\'ldim. Sen-chi?',
    },
    wealthy_under_investigation: {
      title: 'Boy, lekin tergovda',
      subtitle: 'Sen pulda yutding. Ular sening o\'zingni yutdi.',
      body: [
        'Kvartira, mashina, yaxshi restoranlar. Va sening isming yozilgan papka — tergovchi stolida.',
        'Har bir «hal qilingan masala» iz qoldirgan. Izlar zanjirga aylangan. Zanjir — ayblovga.',
      ],
      stat: 'Korrupsiya unutmaydi. U — yaxshi xotirali buxgalter.',
      share: 'Men «Halol Avlod»ni o\'tib — tergov ostiga tushdim. Sen-chi?',
    },
    imprisoned: {
      title: 'Qamoq',
      subtitle: 'Sen juda agressiv o\'ynading.',
      body: [
        'Sen birin-ketin xavfli qadamlar tashlading. Tizim tushunishni xohlamadi. U shunchaki eshikni yopdi.',
        'Ehtimol ko\'p narsalarda haq edingsan. Lekin bitta noto\'g\'ri qadam ertangi kuningni hal qildi.',
      ],
      stat: 'Hatto to\'g\'ri yo\'l ham intizom talab qiladi.',
      share: 'Men «Halol Avlod»ni o\'tib — panjara ortida qoldim. Sen-chi?',
    },
    survived_but_broken: {
      title: 'Omon qoldi, lekin sindi',
      subtitle: 'Na u, na bu.',
      body: [
        'Sen o\'rtacha yo\'lni tanlading. Bir joyda jim qolding. Bir joyda bosh irg\'ading. Bir joyda «har holda» imzo qo\'yding.',
        'Sen kresloda qolding. Lekin oynada — o\'n sakkiz yoshda nafratlanadigan odamingni ko\'ryapsan.',
      ],
      stat: 'Kulrang zona — eng gavjum joy.',
      share: 'Men «Halol Avlod»ni o\'tib — omon qoldim, lekin sindim. Sen-chi?',
    },
  },

  scenarios: {
    exam: {
      stage: 'BIRINCHI MUROSA',
      setting: 'Yuridik fakultet, 3-kurs · imtihondan oldin',
      title: 'Imtihon',
      narrator: 'Jinoyat huquqi imtihoniga o\'n daqiqa qoldi. Ikki kechadan beri uxlamayapman. Yo\'lakda — guruh sardor konvert bilan.',
      quote: '— Qara, qiynalma. O\'qituvchi bilan «kelishilgan». Ikki yuz ming so\'m — va sendan so\'rashmaydi ham. Butun guruh pul yig\'di.',
      choices: {
        a: { label: 'O\'zim topshiraman', subtitle: 'Qonun shuni talab qiladi.', outcome: '«Qoniqarli» olib topshirdim. O\'qituvchi meni eslab qoldi. Keyingi imtihonda u menga shans berdi.' },
        b: { label: 'Hammaga qo\'shilaman', subtitle: 'Hamma shunaqa qiladi.', outcome: 'Imtihon «o\'tdi». Lekin ichimda birinchi marta nimadir sindi. Keyingi sessiyada ham to\'lashga to\'g\'ri keldi.' },
        c: { label: 'Diktofonga yozaman', subtitle: 'Dalil yig\'aman.', outcome: 'Yozuv dekanga yetib bordi. O\'qituvchi ishdan bo\'shatildi. Guruh meni yomon ko\'rdi — lekin tizim titradi.' },
      },
    },

    archive: {
      stage: 'BIRINCHI NAVBAT',
      setting: 'Tuman hokimiyati, arxiv bo\'limi · yozgi amaliyot',
      title: 'Yo\'qolgan papka',
      narrator: 'Hokimiyatda amaliyotdaman. Mahalladan ayollar har kuni ma\'lumotnoma uchun keladi — ularga «ertaga keling» deyiladi. Tasodifan stol tagidagi ariza papkalarini topib oldim.',
      quote: '— Qara, hamma narsani ko\'rishing shart emas. Ba\'zi qog\'ozlarga tegmagan ma\'qul. Sen amaliyotchisan — o\'rgan, ortiqcha aralashma. Bir oydan keyin ketasan — unutasan.',
      narratorByPrev: {
        a: 'Halol imtihondan keyin amaliyotga ishonch bilan keldim. Lekin bu yerda o\'z qoidalari bor. Kuratorning eng pastki tortmasida — mahallaning unutilgan arizalari.',
        b: 'Imtihonda hammaga qo\'shilganimdan beri qoidalarga ishonchim qolmadi. Amaliyotda yana o\'sha sxema — kurator arizalarni «yo\'qotyapti».',
        c: 'Imtihondagi yozuv hali telefonimda. Endi keyingi qatlamni ko\'ryapman — kurator odamlarning qog\'ozlarini «yo\'qotyapti». Yana shovqin ko\'taraymi?',
      },
      choices: {
        a: { label: 'Kuratorga to\'g\'ridan-to\'g\'ri aytaman', subtitle: 'Ochiq gaplashaman.', outcome: 'U jahli chiqdi. Bir hafta o\'tib arizalar «topildi». Mening tavsifnomam — «o\'jar, lekin halol».' },
        b: { label: 'Jim turaman, amaliyotni tugataman', subtitle: 'Mening ishim emas.', outcome: 'Amaliyot xotirjam o\'tdi. Har kuni yo\'lakdagi ayollarning yuziga qaray olmadim.' },
        c: { label: 'Antikorrupsiyaga anonim yozaman', subtitle: '1144 orqali.', outcome: 'Ikki haftadan keyin tekshirish keldi. Kurator lavozimi pasaytirildi. U menga shubha qildi — isbotlay olmadi.' },
      },
    },

    archive_call: {
      stage: 'TIZIM SENI PAYQADI',
      setting: 'Hokimiyat boshlig\'i kabineti · bir hafta o\'tib',
      title: 'Seni yuqoriga chaqirishyapti',
      narrator: 'Mening qadamimdan keyin bo\'lim boshlig\'i o\'zi kabinetiga taklif qildi. Eshik yopiq. Stolda — tavsifnomam va arizachilar ro\'yxati.',
      quote: '— Qara, sen yoshsan. Istiqbolli. Faqat… har bir tortmaga aralashma. Diplomdan keyin seni o\'zimga olishim mumkin. Lekin syurprizsiz.',
      narratorByPrev: {
        a: 'Kurator bilan ochiq gaplashganimdan keyin boshliq o\'zi chaqirdi. Eshik yopiq. Stolda — mening tavsifnomam.',
        c: 'Anonim shikoyat unchalik anonim emas ekan. Boshliq taxmin qildi. Eshik yopiq. Stolda — arizachilar ro\'yxati.',
      },
      choices: {
        a: { label: 'Rahmat aytaman, rad etaman', subtitle: 'Qarz bo\'lib qolmayman.', outcome: 'U bosh irg\'adi. Hokimiyat bo\'ylab gap tarqaladi: «yangisi noqulay». Meni eslab qolishdi — lekin chaqirishmadi.' },
        b: { label: 'Roziman, jim turaman', subtitle: 'Nima uchun xavf?', outcome: 'U jilmaydi. Diplomdan keyin ish oldim. Lekin birinchi topshiriq — «ko\'z yumish».' },
        c: { label: 'Suhbatni telefonga yozaman', subtitle: 'Har holatga.', outcome: 'Fayl bulutda saqlandi. Men chiqdim. Bir oy o\'tib bu suhbat yangiliklarda chiqdi — lekin ismimsiz.' },
      },
    },

    first_job: {
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
      choices: {
        a: { label: 'Qaytadan rasmiylashtirishga yuboraman', subtitle: 'Qonun — qonun.', outcome: 'Erkak g\'azablanib chiqdi. Ikki kundan keyin to\'g\'ri hujjat qaytdi — va tasdiqlandi. Navbat sezmadi.' },
        b: { label: 'Sezmaganga olaman', subtitle: 'Qog\'oz o\'zi o\'tib ketadi.', outcome: 'Hujjat yuqoriga ketdi. Imzomda — xato. Ertaga kimdir buni ko\'radi.' },
        c: { label: 'Konvertni olaman', subtitle: 'Bir marta. Bola haqida.', outcome: 'Konvert stolda qoldi. Birinchi marta oldim. Ertaga u yana keladi — endi kimga borishni biladi.' },
      },
    },

    first_job_pull: {
      stage: 'SXEMA SENI ICHIGA TORTYAPTI',
      setting: 'O\'sha DXM · ikki hafta o\'tib',
      title: 'Sen «o\'zimiznikisan»',
      narrator: 'Gap tarqaldi. Endi mening oynamga «tanish» orqali kelishadi. Smena boshlig\'i meni yordamchi xonaga chaqirdi.',
      quote: '— Yashagin, ko\'nikding. Bu yerda umumiy kassa bor — haftada bir yig\'amiz. Yigirma foiz seniki, sakson — yuqoriga. Hamma shunaqa ishlaydi.',
      narratorByPrev: {
        c: 'O\'sha konvertdan keyin meni eslab qolishdi. Mening oynamga endi «tanish» navbat keladi. Smena boshlig\'i yordamchi xonaga chaqirdi.',
      },
      choices: {
        a: { label: 'Rad etaman, ariza yozaman', subtitle: 'Bu yerdan ketaman.', outcome: 'Meni jamoadan siqib chiqarishdi. Bir oy o\'tib — «qisqartirish» bo\'yicha ishdan ketdim. Lekin Antikor stolida arizam yotibdi.' },
        b: { label: 'Kassaga kiraman', subtitle: 'Bir marta — sinab ko\'raman.', outcome: 'Birinchi to\'lov ikki yuz dollar konvertda keldi. Bir yildan keyin bu «tinch» daromad edi. Va har bir hujjatda iz.' },
        c: { label: 'Roziman, lekin olmayman', subtitle: 'O\'zimni tutaman.', outcome: 'Bosh irg\'adim, konvertlarni tegmasdan o\'tkazib yubordim. Boshliq sezdi. Sovuqroq bo\'ldi, lekin qo\'lim toza.' },
      },
    },

    family: {
      stage: 'BIRINCHI BAHO',
      setting: 'Tuman shifoxonasi, jarrohlik · oqshom',
      title: 'Ertaga operatsiya',
      narrator: 'Buvimni operatsiyaga tayyorlashyapti. Jarroh meni yo\'lakka olib chiqib, ko\'zlarini yashirdi.',
      quote: '— Texnik jihatdan — bepul. Lekin… minnatdorchilik bor. Ikki million — va men o\'zim operatsiya qilaman. Aks holda — umumiy navbat, ikki oy.',
      realStoryNote: 'Har uchinchi fuqaro tibbiyotda «minnatdorchilik»ka duch keldi (2023 so\'rov).',
      narratorByType: {
        halol: 'Ishdagi barcha rad javoblardan keyin shifoxonadaman. Buvimni operatsiyaga tayyorlashyapti. Jarroh yo\'lakda yaqinlashdi.',
        shortcut: 'Sxemadan kelgan pul kerak bo\'ldi — lekin boshqacha shaklda. Buvimni operatsiyaga tayyorlashyapti. Jarroh taklif bilan kelmoqda.',
        gray: 'Jim turish odati menga qimmatga tushdi — hamyon ham jim. Buvimni operatsiyaga tayyorlashyapti. Jarroh yaqinlashdi.',
        'risky-halol': 'Baland qadamlarimdan keyin meni ism bilan bilishadi. Lekin shifoxonada bu yordam bermaydi. Jarroh taklif bilan keldi.',
      },
      choices: {
        a: { label: 'Rad etaman, navbat kutaman', subtitle: 'Qonun mening tomonimda.', outcome: 'Navbat ikki oy emas, uch haftada keldi. Boshqa jarroh operatsiya qildi. Hammasi yaxshi o\'tdi.' },
        b: { label: 'To\'layman. Yaqin odam-ku', subtitle: 'Bahslashish vaqti emas.', outcome: 'Operatsiya ertaga. Buvi tirik. Lekin bu tizimni hozir o\'z imzom bilan to\'lading.' },
        c: { label: 'Qayd etaman va Antikorga boraman', subtitle: 'Operatsiyadan keyin.', outcome: 'Shikoyat Sog\'liqni saqlash vazirligiga yetib bordi. Jarroh lavozimi pasaytirildi. Bo\'limda 1144 raqami osilgan. Buvimni boshqa shifokor — muvaffaqiyatli operatsiya qildi.' },
      },
    },

    family_news: {
      stage: 'MATBUOT BILDI',
      setting: 'Chilonzordagi kafe, 22:10 · ikki hafta o\'tib',
      title: 'Jurnalist va flesh',
      narrator: 'Shifoxona voqeasi Telegramga tushdi. Jurnalist — mening kursdoshim — jarroh yozishmalarini so\'rayapti. Menda kirish bor.',
      quote: '— Agar men chop etmasam, ish to\'xtatiladi. Bir oydan keyin u «yuqoriga» ketadi. Bitta post — va jamiyat biladi.',
      narratorByPrev: {
        c: 'Shifoxona voqeasi allaqachon Telegramda. Jurnalist — kursdoshim — yana material so\'rayapti.',
      },
      choices: {
        a: { label: 'Komplaens orqali yuboraman', subtitle: 'Rasmiy yo\'l bor.', outcome: 'Tekshirish to\'rt oy davom etdi. Jarrohni jim qildirib chetlashtirishdi. Jurnalist xafa — lekin men qog\'oz bilan himoyalanganman.' },
        b: { label: 'Endi aralashmayman', subtitle: 'Etarli qildim.', outcome: 'Ish cho\'zildi. Bir yil o\'tib jarroh xususiy klinika ochdi. Ba\'zan uni avtobus oynasidan ko\'raman.' },
        c: { label: 'Fleshni beraman', subtitle: 'Baland va darrov.', outcome: 'OAVda janjal. Bir hafta o\'tib menga «oshkor qilish» bo\'yicha nazorat xizmati keldi. Haqman, lekin moddamdaman.' },
      },
    },

    power: {
      stage: 'OXIRGI SINOV',
      setting: 'Vazirlik kabineti, kech oqshom',
      title: 'Eski do\'st ostonada',
      narrator: 'Bolalikdagi do\'stim yozuvsiz keldi. Uning kompaniyasi tekshirilmoqda. Hujjatlar — mening stolimda. Bitta so\'z — va tekshirish «yopiladi».',
      quote: '— Aka. Biz birga o\'sganmiz. Sen mening uyimni, onamni bilasan. Bitta imzo — va men qutulaman. Buni hech qachon unutmayman.',
      narratorByType: {
        halol: 'Bu yerga rad javoblar va tamoyillar orqali keldim. Bolalikdagi do\'stim yozuvsiz keldi. Uning kompaniyasi hujjatlari mening stolimda.',
        shortcut: 'Men «masalalarni yopish»ni bilaman — buni butun karera o\'rgatdi. Bolalikdagi do\'stim yozuvsiz keldi.',
        gray: 'Bu yerga jim, ortiqcha harakat qilmasdan keldim. Bolalikdagi do\'stim yozuvsiz keldi. Endi jim turolmayman.',
        'risky-halol': 'Har bir baland qadamni o\'zimga oldim — va bu yerga keldim. Bolalikdagi do\'stim yozuvsiz keldi. Uning hujjatlari stolimda.',
      },
      choices: {
        a: { label: 'Rad etaman, ishni davom ettiraman', subtitle: 'Do\'stlik qonundan ustun emas.', outcome: 'Do\'stim jim chiqib ketdi. Boshqa qo\'ng\'iroq qilmaydi. Uning kompaniyasi sudni yutqazdi. Men esa shunday iltimoslar bilan kelishmaydigan vazir bo\'lib qoldim.' },
        b: { label: 'Do\'stga yordam beraman', subtitle: 'Bir marta — tizim emas.', outcome: 'Tekshirish yopildi. Sakkiz oy o\'tib jurnalist zanjirni chop etdi. Mening ismim — sarlavhada birinchi.' },
        c: { label: 'Mustaqil komissiyaga beraman', subtitle: 'Men hal qilmasligim uchun.', outcome: 'Komissiya qisman ayb topdi. Jarima, qamoqsiz. Do\'stim hammasini tushundi. Bir yildan keyin o\'zi qo\'ng\'iroq qildi — rahmat aytish uchun.' },
      },
    },
  },
  timeoutChoice: {
    label: 'Sen qaror qabul qilmading',
    subtitle: 'Vaqt tugadi.',
    outcome: 'Sen jim qolding. Sening o\'rningga boshqalar qaror qildi. Bu ham tanlov.',
  },
}
