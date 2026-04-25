// Halol Avlod — UZ lokalizatsiya (asosiy til)

export default {
  ui: {
    appName: 'Halol Avlod',
    appTagline: 'Kelajak poydevori',
    hotline: 'Ishonch telefoni',
    hotlineNumber: '1144',
    hackathonTag: 'Xakaton-prototip · O\'zbekiston Respublikasi Antikorrupsiya agentligi',
    intro: {
      kicker: '14 sahna · 60 soniya · 4 yakun',
      headline_pre: 'Sen nimani',
      headline_accent: 'tanlaysan',
      headline_post: '?',
      lead: 'Sen talabadan vazirga qadar yo\'l bosasan. Har qadamda — vasvasalar. Senda 1 daqiqa bor. Tanlovlaring raqamlarni emas — kim bo\'lishingni o\'zgartiradi.',
      ctaStart: 'Yo\'lni boshlash',
      ctaSubtitle: 'Ro\'yxatdan o\'tishsiz. Bir o\'yin — 15 daqiqa.',
      legendKicker: 'Statistikani qanday o\'qish kerak',
      timerKicker: 'Taymer',
      timerCopy: '60 soniya. Agar qaror qilmasang — sening o\'rningga hal qilishadi. Bu ham javob.',
    },
    stats: {
      integrity: 'Halollik',
      integrityHint: 'Obro\'. Barqarorlik va himoya beradi.',
      money: 'Resurs',
      moneyHint: 'Pul va aloqalar. Yo\'lni tezlashtiradi — lekin iz qoldiradi.',
      risk: 'Xavf',
      riskHint: 'Sening ortingdan kelish ehtimoli.',
    },
    timer: { label: 'Qaror vaqti' },
    scene: {
      sceneOf: '{n}/{total}-sahna',
      sceneCounter: '{n}-sahna',
      basedOnReal: 'Haqiqiy ishlarga asoslangan',
    },
    choiceType: {
      halol: 'Halol',
      gray: 'Kulrang',
      shortcut: 'Qisqa yo\'l',
      'risky-halol': 'Xatarli halol',
    },
    feedback: {
      kicker: 'Oqibat · {n}-sahna',
      changesKicker: 'O\'zgarishlar',
      next: 'Keyingi sahna',
      reveal: 'Yakunni bilish',
      timeoutBadge: 'Taym-aut',
      youStayedSilent: 'Sen jimding.',
      decision: 'Qaror',
    },
    ending: {
      finalCode: 'Yakun {code}',
      finalSummaryKicker: 'Yakuniy ko\'rsatkichlar',
      decisionsKicker: 'Sening qarorlaring',
      share: 'Ulashish',
      shared: 'Nusxa olindi',
      restart: 'Qaytadan o\'ynash',
      hotlineLink: 'Ishonch telefoni 1144 →',
      decisionTimeout: 'Taym-aut',
      expandDecisions: 'Barchasini ko\'rish',
      collapseDecisions: 'Qisqartirish',
    },
    toolbar: {
      themeLabel: 'Mavzu',
      themeLight: 'Yorug\'',
      themeDark: 'Qorong\'u',
      langLabel: 'Til',
    },
  },

  endings: {
    halol_leader: {
      title: 'Halol yetakchi',
      subtitle: 'Sen o\'zingni sotmay yo\'l bosding.',
      body: [
        'Sen nomingni saqlab qolding. Yoningdagilar — konvert orqali emas, o\'zlari kelganlar.',
        'Tezlikni yo\'qotding, pulning bir qismini ham. Lekin sotib bo\'lmaydigan narsani olding: xotirjamlik va obro\'.',
      ],
      stat: 'Halollik sekinroq, lekin ishonchliroq bo\'ldi.',
      share: 'Men «Halol Avlod» o\'yinini o\'tdim va halol yetakchi bo\'ldim. Sen-chi?',
    },
    wealthy_under_investigation: {
      title: 'Boy, lekin tergov ostida',
      subtitle: 'Sen pul yutding. Ular seni yutdi.',
      body: [
        'Kvartira, mashina, yaxshi restoran. Va tergovchining stolida — sening nomingdagi papka.',
        'Har bir «hal qilingan masala» iz qoldirdi. Izlar zanjirga aylandi. Zanjir — ayblovga.',
      ],
      stat: 'Korrupsiya unutmaydi. U yaxshi xotirali buxgalter.',
      share: 'Men «Halol Avlod» o\'yinini o\'tdim — va tergov ostiga tushdim. Sen-chi?',
    },
    imprisoned: {
      title: 'Qamoq',
      subtitle: 'Sen juda agressiv o\'ynading.',
      body: [
        'Sen bir vaqtning o\'zida xatarli harakatlar qilding. Tizim tushunmadi. U shunchaki eshikni yopdi.',
        'Balki ko\'p narsada haq eding. Lekin bitta noto\'g\'ri qadam qayerda uyg\'onishingni hal qiladi.',
      ],
      stat: 'Hatto to\'g\'ri yo\'l ham intizomni talab qiladi.',
      share: 'Men «Halol Avlod» o\'yinini o\'tdim — va panjaraga tushdim. Sen-chi?',
    },
    survived_but_broken: {
      title: 'Tirik, lekin singan',
      subtitle: 'Na bu yoqda, na u yoqda.',
      body: [
        'Sen o\'rta yo\'lni tanladim. Qayerda jimding. Qayerda bosh irg\'ading. Qayerda «har ehtimolga» imzo qo\'yding.',
        'Sen ishda qolding. Lekin ko\'zguda — o\'n sakkiz yoshingda mensimaydigan odam.',
      ],
      stat: 'Kulrang zona — eng gavjum joy.',
      share: 'Men «Halol Avlod» o\'yinini o\'tdim — tirik qoldim, lekin sindim. Sen-chi?',
    },
  },

  scenarios: {
    university_exam: {
      stage: 'BIRINCHI TANLOV',
      setting: 'Universitet, imtihon oldidan · 3-kurs',
      title: 'Imtihon',
      narrator: 'Uchinchi kurs. Huquq fanidan imtihonga o\'n daqiqa qoldi. Ikki kechadir uxlamadim. Katta kursdan bir yigit yaqinlashdi.',
      quote: '— Qara, bezovta bo\'lma. O\'qituvchi bilan «kelishilgan». Ikki yuz ming — va seni so\'rashmas ham. Hammamiz yigʻib berdik.',
      choices: {
        a: { label: 'O\'zim topshiraman', subtitle: 'Qonun shunday talab qiladi.', outcome: 'Imtihonni o\'tdim — zo\'rg\'a, lekin o\'zim. O\'qituvchi meni eslab qoldi. Keyingi sessiyada u menga imkoniyat berdi.' },
        b: { label: 'Hammaga qo\'shilaman', subtitle: 'Hamma shunday qilayapti.', outcome: 'Imtihon «o\'tdi». Lekin ichimda birinchi marta nimadir singan his qildim. Keyingi imtihonda ham to\'lash kerak bo\'ldi.' },
        c: { label: 'Diktofonga yozaman', subtitle: 'Isbotlarni yig\'aman.', outcome: 'Yozuv dekanga yetdi. O\'qituvchiga tanbeh berildi. Guruhda meni yoqtirmaydigan odamlar paydo bo\'ldi — lekin tizim o\'zgardi.' },
      },
    },

    internship: {
      stage: 'BIRINCHI MUROSA',
      setting: 'Davlat muassasasi, arxiv · yozgi amaliyot',
      title: 'Amaliyot',
      narrator: 'Men amaliyotdaman. Rahbarim — tajribali amaldor. U muntazam ravishda ba\'zi arizalarni «yo\'qotayotganini» payqadim. Odamlar oylab javob kutishadi.',
      quote: '— Qara, bu yerda hammasini ko\'rish shart emas. Ba\'zi qog\'ozlarni tegmasang yaxshi. Sen amaliyotchisan — o\'rgan va aralashma. Bir oydan ketasan — unutasan.',
      narratorByPrev: {
        a: 'Imtihonda halol yo\'l tanlaganimdan keyin amaliyotga ishonch bilan keldim. Lekin bu yerda boshqacha qoidalar bor edi. Rahbarim arizalarni «yo\'qotar» edi.',
        b: 'Imtihonda pulga «o\'tganimdan» keyin o\'zimga ishonchim kamaydi. Amaliyotda ham shunday sxemalar ko\'rdim — rahbarim arizalarni «yo\'qotar» edi.',
        c: 'Imtihonda diktofon yoqqanligim hali ham esimda. Amaliyotda yana sxema — rahbarim arizalarni «yo\'qotar» edi. Yana aralashishim kerakmi?',
      },
      choices: {
        a: { label: 'Rahbarimdan to\'g\'ri so\'rayman', subtitle: 'Ochiq gaplashaman.', outcome: 'U jahl qildi. Lekin bir haftada arizalar «topildi». Amaliyot xarakteristikam — «o\'jar, lekin halol».' },
        b: { label: 'Jimman va amaliyotni tugataman', subtitle: 'Boshim og\'rimasin.', outcome: 'Amaliyot tinch o\'tdi. Lekin har kuni arxivga kirganda, javob kutayotgan odamlarni eslardim.' },
        c: { label: 'Rahbariyatga anonim xabar beraman', subtitle: 'Ismim yashirin qoladi.', outcome: 'Tekshiruv keldi. Rahbarim ogohlantirildi. U meni gumon qildi — lekin isbotlay olmadi. Arizalar endi yo\'qolmadi.' },
      },
    },

    birinchi_kun_1: {
      stage: 'BIRINCHI KUN',
      setting: 'Davlat muassasasi, kichik ofis · 1-kun',
      title: 'Birinchi kun',
      narrator: 'Bu mening birinchi ish kunim. Rahbar tinch ovozda: «Qog\'ozlarda hammasi toza ko\'rinishi kerak». Yarim soatdan shoshilgan ayol kirdi. Uning hujjatida — mayda xato. Men darhol ko\'rdim.',
      quote: '— Iltimos, hujjatimni tezroq tasdiqlang. Bolam kasalxonada, pul kerak. Bugun kerak.',
      narratorByPrev: {
        a: 'Amaliyotda rahbarimga to\'g\'ri gap aytgan edim. Endi o\'z ish joyimda birinchi kunim. Shoshilgan ayol kirdi — hujjatida xato bor.',
        b: 'Amaliyotda jim qolgan edim. Endi yangi ish boshlanayapti. Birinchi kunim — shoshilgan ayol kirdi, hujjatida xato.',
        c: 'Amaliyotda anonim xabar yozgan edim. Endi yangi joyda birinchi kunim. Shoshilgan ayol kirdi — hujjatida xato bor.',
      },
      choices: {
        a: { label: 'Hujjatda xato bor, qayta rasmiylashtiring', subtitle: 'Qonun shunday talab qiladi.', outcome: 'Ayol g\'azablanib ketdi. Lekin ertasi kuni hujjat to\'g\'ri qaytdi va tasdiqlandi. Tizim meni ko\'rdi.' },
        b: { label: 'Mayli, o\'tkazaman', subtitle: 'Bolasi kasal-ku.', outcome: 'Ayol minnatdor bo\'lib ketdi. Hujjatda xato qoldi. Stolda — mening imzom.' },
        c: { label: 'Yordam bera olaman...', subtitle: 'Yashirin taklif.', outcome: 'U bir soniyada tushundi. Konvert stolda qoldi. Men birinchi marta qabul qildim.' },
      },
    },

    birinchi_kun_2: {
      stage: 'BIRINCHI KUN',
      setting: 'Rahbar kabineti · shu kun, 17:40',
      title: 'Rahbar chaqirdi',
      narrator: 'Bir necha soatdan keyin rahbar meni chaqirdi. Yuzida — tabassum yo\'q. Stolda — bir nechta hujjat. Ular orasida — ertalabki hujjat ham bor.',
      quote: '— Bugun shubhali hujjat o\'tgan. Tekshiruv bo\'lishi mumkin. Sen nimanidir eslaysanmi?',
      narratorByPrev: {
        a: 'Rahbar meni chaqirdi. «Bugun bir nechta xodim hujjatlarni shoshilib rasmiylashtirishdi. Tekshiruv bo\'lishi mumkin. Sen yangi odamsan, shuning uchun so\'rayman: bugun nima bo\'ldi?»',
        b: 'Rahbar meni chaqirdi. Stolda — mening imzom bilan ertalabki hujjat. «Tekshiruv bo\'lishi mumkin. Kim qilganini eslaysanmi?»',
        c: 'Rahbar meni chaqirdi. Stolda — mening imzom bilan hujjat. «Bu hujjat shubhali. Tekshiruv bo\'lishi mumkin. Birinchi kun — eslaysanmi?»',
      },
      choices: {
        a: { label: 'Bu mening xatom', subtitle: 'Haqiqatni aytaman.', outcome: 'Rahbar bosh chayqadi. Ogohlantirish oldim, lekin u mening yuzimni eslab qoldi. Qiyin yo\'l — lekin ortda toza sahifa qoldi.' },
        b: { label: 'Bilmayman, tizim xatosi', subtitle: 'O\'zimni yopaman.', outcome: 'Hozircha o\'tdi. Lekin bo\'limda «xavfli» yorlig\'i paydo bo\'ldi — hech kim aytmaydi, lekin hammasi biladi.' },
        c: { label: 'Buni boshqa xodim qilgan', subtitle: 'Boshqaga ag\'daraman.', outcome: 'Boshqa xodimni jazolashdi. Men saqlanib qoldim. Lekin ertaga ko\'zguga qaraganimda — u yerda boshqa odam.' },
      },
    },

    hr_envelope: {
      stage: 'BIRINCHI NARX',
      setting: 'Kadrlar bo\'limi, davlat muassasasi',
      title: 'Byudjetdagi o\'rin',
      narrator: 'Yarim yil ish qidirdim. Nihoyat — taklif. Kadrlar bo\'limi boshlig\'i eshikni yopdi, tabassum qildi.',
      quote: '— Yaxshi rezyume. Lekin xohlovchilar ko\'p. Uch ming dollar — va sening rezyumeng tepada bo\'ladi. Odatiy amaliyot.',
      narratorByPrev: {
        a: 'Rahbarga haqiqatni aytgan edim — ogohlantirish oldim. Endi yangi ish qidiryapman. Kadrlar boshlig\'i eshikni yopdi va tabassum qildi.',
        b: 'Rahbar oldida jim qolgan edim. Endi ish qidirib yurganman. Kadrlar boshlig\'i eshikni yopdi va taklif qildi.',
        c: 'Rahbar oldida boshqani ayblagan edim. Endi yangi joy qidiryapman. Kadrlar boshlig\'i eshikni yopdi va tabassum qildi.',
      },
      choices: {
        a: { label: 'Rad etaman va ketaman', subtitle: 'Qidirishni davom ettiraman.', outcome: 'Bir oyda boshqa joyga olishdi — kamroq maosh, lekin konvertsiz. Toza hisobdan boshladim.' },
        b: { label: 'To\'layman va joyni olaman', subtitle: 'Bu investitsiya.', outcome: 'Sen ishdasan. Lekin endi «qarzingdasan». Va bu oxirgi konvert emas.' },
        c: { label: 'Ishonch telefoniga xabar beraman', subtitle: '1144. Anonim.', outcome: 'Tekshiruv ikki haftada keldi. Seni bu ishga olmadi. Lekin kadrlar bo\'limi tarqatib yuborildi.' },
      },
    },

    road_stop: {
      stage: 'BIRINCHI QO\'RQUV',
      setting: 'A-373 trassa, 23:40',
      title: 'Yo\'l chetida to\'xtash',
      narrator: 'Bitiruv kechasidan uyga ketayapman. Biroz tezlikni oshirib yubordim. Qizil-ko\'k chiroqlar. Inspektor derazaga yaqinlashdi.',
      quote: '— Tezlikni 22 km/soatga oshirgansiz. Huquqni olish yoki 2.5 million jarima. Yoki... «kelishishingiz» mumkin. Besh yuz — va ketdingiz.',
      realStoryNote: 'Antikorrupsiya agentligining namunaviy ishlariga asoslangan.',
      narratorByPrev: {
        a: 'Kadrlar bo\'limida rad etgandim — toza hisobdan boshladim. Endi bitiruv kechasidan uyga haydayapman. Inspektor to\'xtatdi.',
        b: 'Ish uchun to\'lagan edim — endi tizim ichidaman. Bitiruv kechasidan uyga ketayapman. Inspektor to\'xtatdi.',
        c: 'Ishonch telefoniga xabar bergan edim — kadrlar tarqaldi. Endi uyga ketayapman. Inspektor to\'xtatdi.',
      },
      choices: {
        a: { label: 'Jarimani rasmiy to\'layman', subtitle: 'Bayonnoma, kvitansiya, hammasi qonun bo\'yicha.', outcome: 'Qirq daqiqadan ketdim. Jarima SMS orqali bir haftada keldi. Tinch uxladim.' },
        b: { label: 'Besh yuz ming beraman', subtitle: 'Tez, jim, uyga.', outcome: 'Inspektor kupyurani cho\'ntagiga yashirdi. Haydab ketdim. Keyingi postda meni eslashadi.' },
        c: { label: 'Telefonga yozib, shikoyat yozaman', subtitle: 'Cho\'ntagimda kamerani yoqaman.', outcome: 'Uyga yetdim. Keyingi hafta prokuraturadan qo\'ng\'iroq. Bo\'limda meni yoqtirmaydiganlar bor. Lekin bir inspektor — ishdan olindi.' },
      },
    },

    hospital: {
      stage: 'BIRINCHI OG\'RIQ',
      setting: 'Tuman kasalxonasi, jarrohlik bo\'limi',
      title: 'Ertaga operatsiya',
      narrator: 'Buvimni operatsiyaga tayyorlashyapti. Jarroh meni chetga olib, pastga qarab gaplashdi.',
      quote: '— Texnik jihatdan operatsiya bepul. Lekin... minnatdorchilik bor. Ikki million — va men shaxsan operatsiya qilaman. Aks holda — navbat, ikki oy.',
      realStoryNote: 'Har uchinchi fuqaro tibbiyotda «minnatdorchilik» bilan to\'qnashgan (2023 so\'rovi).',
      narratorByPrev: {
        a: 'Yo\'l inspektoriga jarimani rasmiy to\'lagan edim. Endi buvimnig operatsiyasi oldida turgan edim. Jarroh meni chetga chaqirdi.',
        b: 'Inspektorga «kelishgan» edim. Endi kasalxonada — buvim operatsiyaga tayyorlanayapti. Jarroh meni chetga olib gaplashdi.',
        c: 'Inspektorni yozib olgan edim. Endi kasalxonada — jarroh ham «kelishish» taklif qilyapti. Korrupsiya faqat ofisda emas ekan.',
      },
      choices: {
        a: { label: 'Rad etaman va navbatni kutaman', subtitle: 'Qonun mening tomonda.', outcome: 'Navbat ikki oy emas, uch hafta chiqdi. Buvimni boshqa jarroh operatsiya qildi. Hammasi yaxshi o\'tdi.' },
        b: { label: 'Pul beraman — bu yaqin odam-ku', subtitle: 'Tortishish vaqti emas.', outcome: 'Operatsiya ertaga bo\'ldi. Buvim tirik. Lekin bu tizimni sen hozirgina o\'z imzoing bilan to\'lading.' },
        c: { label: 'Qayd qilaman va shikoyat yozaman', subtitle: 'Operatsiyadan keyin. Anonim.', outcome: 'Shikoyat Sog\'liqni saqlash vazirligiga yetdi. Jarroh lavozimdan tushirildi. Bo\'limda endi ishonch telefoni raqami osilgan.' },
      },
    },

    small_favor: {
        stage: 'BIRINCHI ILTIMOS',
        setting: 'Ish joyi, tushlik · tanishdan qo\'ng\'iroq',
        title: 'O\'zimizniki-da',
        narrator: 'Mahalladan tanish qo\'ng\'iroq qildi. Uning qaynanasiga ma\'lumotnoma kerak, lekin qonun bo\'yicha — uch hafta navbat. U seni «tezlashtirishni» so\'rayapti.',
        quote: '— Aka, biz o\'zimizniki-ku. Bu pora emas, shunchaki tezlashtir. Men ham kerak bo\'lganda yordam beraman.',
        narratorByPrev: {
          a: 'Kasalxonada navbatni kutgan edim — hamma yaxshi o\'tdi. Endi ishda — tanish qo\'ng\'iroq qildi, ma\'lumotnoma tezlashtirishni so\'rayapti.',
          b: 'Jarrohga pul bergan edim. Endi yana shunga o\'xshash vaziyat — tanish «tezlashtir» deyapti. Bu safar pul emas, «o\'zimizniki».',
          c: 'Jarrohni shikoyat qilgan edim. Endi tanish qo\'ng\'iroq qilyapti — ma\'lumotnoma tezlashtirishni so\'rayapti. Korrupsiya kichikdan boshlanadi.',
        },
        choices: {
          a: { label: 'Rad etaman: hammadek kutsin', subtitle: 'Qonun hamma uchun bir.', outcome: 'Tanish xafa bo\'ldi. Lekin uch haftada hujjat tayyor bo\'ldi. Mahallada «qattiq» degan nom chiqdi — lekin hurmat qilishdi.' },
          b: { label: 'Tezlashtiraman — mayda narsa-ku', subtitle: 'O\'zimizniki-da.', outcome: 'Hujjat ikki kunda tayyor. Lekin endi «o\'zimizniki» yana qo\'ng\'iroq qiladi. Va yana. Bu to\'xtamaydi.' },
          c: { label: 'Tezlashtiraman, lekin «rahmat» so\'rayman', subtitle: 'Buning narxi bor.', outcome: 'Konvert keldi. Tanish mamnun. Sen endi navbatsiz «hal qiluvchi» bo\'lding. Nomi chiqqan odam — kuzatiladi.' },
        },
      },
  
      coworker_theft: {
        stage: 'BIRINCHI JIMLIK',
        setting: 'Ofis, juma, 17:30',
        title: 'Jimgina o\'g\'irlik',
        narrator: 'Hamkasbim Baxtiyor uchinchi oydir mavjud bo\'lmagan «xizmat safarlarini» rasmiylashtiryapti. Bo\'sh cheklar qaytaryapti. Men tasodifan hujjatlarni ko\'rdim.',
        quote: 'Baxtiyor: — Aka, senga nima kerak? Hammaning o\'z sxemasi bor. Sen chaqimchi emasmisan.',
        narratorByPrev: {
          a: 'Tanishning iltimosini rad etgan edim. Endi ofisda boshqa muammo — hamkasbim sxema yuritayapti. Men ko\'rdim.',
          b: 'Tanishga «tezlashtirgan» edim. Endi ofisda ko\'ryapman — hamkasbim ham sxema yuritayapti. Bir-birimizni qoplashni kutadi.',
          c: 'Tanishdan «rahmat» olgan edim. Endi ko\'ryapman — hamkasbim ham shunaqa sxema yuritayapti. Farqi nimada?',
        },
        choices: {
          a: { label: 'U bilan shaxsan gaplashaman', subtitle: 'Odamga o\'xshab.', outcome: 'U achchiqlanib ketdi. Lekin bir oyda xizmat safarlari to\'xtadi. U o\'zi ishdan ketdi. Biz endi gaplashmaymiz.' },
          b: { label: 'Jimman — mening ishim emas', subtitle: 'Boshim og\'rimasin.', outcome: 'Sxema yana yarim yil davom etdi. Ochilganda — HR hammani so\'roq qildi. Seni ham. Sen «ko\'rmadim».' },
          c: { label: 'Nazorat xizmatiga yozaman', subtitle: 'Ismsiz, faktlar bilan.', outcome: 'Tekshiruv. Ishdan bo\'shatish. Uning oilasi endi seni ayblayapti — u kim yozganini bildi. Sen haqsan, lekin yomon uxlaysan.' },
        },
      },
  
      fictitious_act: {
        stage: 'BIRINCHI IMZO',
        setting: 'Boshliq kabineti, juma kechqurun',
        title: 'Shunchaki imzo qo\'y',
        narrator: 'Boshliq oldimga bajarilgan ishlar dalolatnomasini qo\'ydi. Ishlar bo\'lmagan — men pudratchini bilaman, u qo\'shnim. Yonida — ruchka.',
        quote: '— Qara, tepada kelishilgan. Shunchaki imzo. Hech qanday savol bo\'lmaydi. Hech qachon.',
        narratorByPrev: {
          a: 'Hamkasbim bilan gaplashgan edim — u o\'zi ketdi. Endi boshliq o\'zi keldi — «shunchaki imzo qo\'y» deyapti. Lekin bu safar kattaroq.',
          b: 'Hamkasbimning sxemasini ko\'rib jimgan edim. Endi boshliq soxta dalolatnomaga imzo so\'rayapti. Jimlik — qatnashuvga aylanyaptimi?',
          c: 'Hamkasbimni nazoratga topshirgan edim. Endi boshliq soxta hujjatga imzo so\'rayapti. Jasorat kerak — yana.',
        },
        choices: {
          a: { label: 'Imzo qo\'yishdan bosh tortaman', subtitle: 'Ishdan olsalar ham.', outcome: 'Meni kamroq «qulay» lavozimga o\'tkazishdi. Dalolatnomaga boshqa birov imzo qo\'ydi. Bir yildan jinoiy ish boshlandi — mening familiyam yo\'q.' },
          b: { label: 'Imzo qo\'yaman va jimman', subtitle: 'Men qaror qilmayapman.', outcome: 'Qog\'oz ketdi. Bir yarim yildan tergovchi mening imzomni bayonnomada o\'qidi. «Hech qanday savol» o\'nlab savollarga aylandi.' },
          c: { label: 'Imzo qo\'yaman, lekin nusxasini saqlayman', subtitle: 'Har ehtimolga.', outcome: 'Sen tizim ichidasan. Nusxa seyfda yotibdi. Yomonroq uxlaysan — lekin hozircha butunsisan. Hozircha.' },
        },
      },
  
      school_tender: {
        stage: 'BIRINCHI SINOV',
        setting: 'Davlat xaridi: tumandagi maktab',
        title: 'Farqi — yarmiyarmi',
        narrator: 'Men maktab qurilishi tenderini boshqaraman. Shubhali past narx bilan pudratchi g\'olib chiqdi. Bir haftadan — restoranda uchrashuv.',
        quote: '— Sementni arzonroq olamiz. Armaturani — ingichkaroq. Farqi — olti yuz million. O\'ttiz foizi — seniki. Maktab o\'n besh yil turadi, shu yetadi.',
        realStoryNote: 'Surxondaryodagi maktab ishi (2021) ga o\'xshash.',
        narratorByPrev: {
          a: 'Soxta hujjatga imzo qo\'yishdan bosh tortgan edim. Endi tender boshqaraman — pudratchi restoranda «taklifini» qildi.',
          b: 'Soxta hujjatga imzo qo\'ygan edim. Endi tender meniki — pudratchi restoranda «yarmiyarmi» taklif qilyapti. Bu safar summa kattaroq.',
          c: 'Soxta hujjat nusxasini saqlab qo\'ygan edim. Endi tender — pudratchi «farqi yarmiyarmi» deyapti. Mening nusxam seyfda, lekin bu yangi sinov.',
        },
        choices: {
          a: { label: 'Rad etaman va spetsifikatsiya bo\'yicha talab qilaman', subtitle: 'Maktab 50 yil turishi kerak.', outcome: 'Pudratchi muddatni buzdi. Meni almashtirmoqchi bo\'lishdi. Pozitsiyamni saqladim. Maktab bir yilda ochildi — standartga mos.' },
          b: { label: '«O\'z ulushimni» qabul qilaman', subtitle: 'Bolalarga maktab baribir quriladi.', outcome: 'Pul konvertda keldi. Mashina sotib oldim. Maktab ochildi. To\'rt yildan tom qulab tushdi — xayriyatki, kechasi.' },
          c: { label: 'Qayd qilaman va Antikorga topshiraman', subtitle: 'Barcha xabarlar bilan.', outcome: 'Pudratchi ushlandi. Menga qarshi «obro\'sizlantirish» urinishi bo\'ldi. Lekin agentlik meni himoya qildi. Maktab halol qurildi.' },
        },
      },
  
      journalist_leak: {
        stage: 'BIRINCHI QAROR',
        setting: 'Yunusobaddagi kafe, 22:10',
        title: 'Jurnalist va fleshka',
        narrator: 'Ishongan jurnalistim ichki yozishmalarni so\'rayapti — o\'rinbosarimning firibgarlik isbotlari. Menda ruxsat bor.',
        quote: '— Agar men chop etmasam, buni ko\'mishadi. Bir oyda u yuqoriga ketadi. Va endi sudlarni emas, taqdirlarni hal qiladi.',
        narratorByPrev: {
          a: 'Tender spetsifikatsiyasini himoya qilgan edim — maktab halol qurildi. Endi katta masala: o\'rinbosarim firibgar, jurnalist isbotlarni so\'rayapti.',
          b: 'Tenderdan «ulush» olgan edim. Endi o\'rinbosarimning firibgarligi haqida jurnalist so\'rayapti. Qo\'lim toza emasligini bilaman.',
          c: 'Pudratcini Antikorga topshirgan edim. Endi jurnalist o\'rinbosarim haqida isbotlarni so\'rayapti. Rasmiy yoki tezkor?',
        },
        choices: {
          a: { label: 'Komplayens orqali topshiraman', subtitle: 'Rasmiy kanal bor.', outcome: 'Tekshiruv to\'rt oy davom etdi. O\'rinbosar chetlatildi. Jurnalist xafa — lekin men hujjat bilan himoyalanganman.' },
          b: { label: 'Jurnalistga beraman', subtitle: 'Tezroq va balandroq.', outcome: 'Ikki kunda — OAVda skandal. Bir haftada — oqim meni kuzatib topdi. Men haqman, lekin oshkor qilish moddasi ostida turaman.' },
          c: { label: 'Rad etaman va aralashmayman', subtitle: 'Bu mening ishim emas.', outcome: 'O\'rinbosar yuqoriga ketdi. Men ishlashda davom etdim. Bir yildan u menga bevosita ta\'sir qiladigan qaror imzoladi.' },
        },
      },
  
      elections: {
        stage: 'HOKIMIYAT TA\'MI',
        setting: 'Mahalla, saylov kuni',
        title: '«Tashkil etilgan» ovoz berish',
        narrator: 'Mendan mahallada «ishtirok va natijani ta\'minlash» so\'ralayapti. Tashviqotchilar uchun pul bilan konvert va «to\'g\'ri» byulletenlar ro\'yxati.',
        quote: '— Bu shunchaki ish. Barcha tumanlar shunday ishlaydi. Sen yangisan, hammadek qil.',
        realStoryNote: 'YXHT mintaqadagi saylovlarda o\'xshash sxemalarni qayd etgan.',
        narratorByPrev: {
          a: 'O\'rinbosarim ishini komplayens orqali hal qilgan edim. Endi saylov kuni — mendan «natijani ta\'minlash» so\'ralayapti.',
          b: 'Jurnalistga isbotlarni bergan edim — skandal bo\'ldi. Endi saylovda «tashkil etilgan» ovoz berish taklif qilinyapti.',
          c: 'O\'rinbosarimning firibgarligiga ko\'z yumgan edim. Endi saylov — «hammadek qil» deyishyapti.',
        },
        choices: {
          a: { label: 'Rad etaman va halol o\'tkazaman', subtitle: 'Ishtirok qancha bo\'lsa — shuncha.', outcome: 'Ishtirok 48%. Natijam tepada hech kimga yoqmadi. Ko\'tarilmadim. Lekin men viloyatda buzilishlar bo\'yicha da\'vosiz yagona odamman.' },
          b: { label: 'Sxemani qabul qilaman', subtitle: 'Birinchi marta — va oxirgisi.', outcome: 'Ishtirok 94%. Meni maqtashdi. Olti oydan o\'sha tumanda norozilik. Kameralar bo\'lmasligi kerak bo\'lgan narsani yozib oldi.' },
          c: { label: 'Bosimni hujjatlashtiraman', subtitle: 'Har bir qo\'ng\'iroqni yozib olaman.', outcome: 'Papka bank yacheykasida yotibdi. Men ikki tomonlama o\'yin o\'ynayapman. Bu himoya — va xavf. Lekin qo\'lim qo\'shninikidan toza.' },
        },
      },
  
      old_friend_minister: {
        stage: 'OXIRGI SINOV',
        setting: 'Vazir kabineti, kechqurun',
        title: 'Eshik oldida eski do\'st',
        narrator: 'Bolalikdagi do\'stim yozmасиз keldi. Uning kompaniyasi tekshiruv ostida. Hujjatlar — mening stolimda. Bitta so\'z — va tekshiruv «yopiladi».',
        quote: '— Aka. Biz birga o\'sdik. Sen uyimni bilasan. Bitta imzo — va men qutulaman. Men buni hech qachon unutmayman.',
        narratorByPrev: {
          a: 'Saylovni halol o\'tkazgan edim — ko\'tarilmadim, lekin da\'vosiz qoldim. Endi vazir kabinetimdaman. Bolalikdagi do\'stim eshik oldida.',
          b: 'Saylov sxemasini qabul qilgan edim — natija yaxshi, lekin kameralar bor. Endi vazir kabinetimdaman. Do\'stim yordam so\'rab keldi.',
          c: 'Saylov bosimini hujjatlashtirgan edim — papka yacheykada. Endi vazirman. Bolalikdagi do\'stim tekshiruv ostida — mening qo\'lim bilan hal qilsa bo\'ladi.',
        },
        choices: {
          a: { label: 'Rad etaman va ishni yuboraman', subtitle: 'Do\'stlik qonundan yuqori emas.', outcome: 'Do\'stim jimsiz chiqdi. Endi qo\'ng\'iroq qilmaydi. Kompaniyasi sudni yutqazdi. Va men — bunday iltimos bilan kelmaydigan vazir bo\'lib qoldim.' },
          b: { label: 'Do\'stimga yordam beraman', subtitle: 'Bir marta — tizim emas.', outcome: 'Tekshiruv yopildi. Sakkiz oydan jurnalist zanjirni chop etdi. Mening ismim — sarlavhada birinchi.' },
          c: { label: 'Mustaqil komissiyaga topshiraman', subtitle: 'Men hal qilmasligim uchun.', outcome: 'Komissiya qisman aybni topdi. Jarima, qamoqsiz. Do\'stim tushundi. Bir yildan u birinchi qo\'ng\'iroq qildi — minnatdorchilik bildirish uchun.' },
        },
      },
  },

  timeoutChoice: {
    label: 'Sen qaror qilmading',
    subtitle: 'Vaqt tugadi.',
    outcome: 'Sen jimding. Sening o\'rningga boshqalar hal qildi. Ba\'zan bu ham tanlov.',
  },
}
