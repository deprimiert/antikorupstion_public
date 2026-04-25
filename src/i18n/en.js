// Halol Avlod — EN localization (PART 1: UI + endings + scenes 1-7)

export default {
  ui: {
    appName: 'Halol Avlod',
    appTagline: 'Foundation of the future',
    hotline: 'Helpline',
    hotlineNumber: '1144',
    hackathonTag: 'Hackathon Prototype · Anti-Corruption Agency of the Republic of Uzbekistan',
    intro: {
      kicker: '14 scenes · 60 seconds · 4 endings',
      headline_pre: 'What will',
      headline_accent: 'you',
      headline_post: ' choose?',
      lead: 'You will walk the path from student to minister. Temptations at every step. Your choices don\'t change numbers — they change who you become.',
      heroMotivation: 'I always wanted to work in the system and change it. I thought everything depended on people. Today I realized for the first time — the system changes you faster.',
      nameLabel: 'Your name',
      namePlaceholder: 'Enter your name...',
      ctaStart: 'Start the journey',
      ctaSubtitle: 'No registration. One game — 15 minutes.',
      legendKicker: 'How to read stats',
      timerKicker: 'Timer',
      timerCopy: 'Time on each scene is limited. If you don\'t decide — they will decide for you. That is also an answer.',
    },
    stats: {
      integrity: 'Integrity',
      integrityHint: 'Reputation. Provides stability and protection.',
      money: 'Resources',
      moneyHint: 'Money and connections. Speeds up the path — but leaves a trace.',
      risk: 'Risk',
      riskHint: 'The probability that they will come for you.',
    },
    timer: { label: 'Time to decide' },
    scene: {
      sceneOf: 'Scene {n} of {total}',
      sceneCounter: 'Scene {n}',
      basedOnReal: 'Based on true events',
    },
    choiceType: {
      halol: 'Halol',
      gray: 'Gray Zone',
      shortcut: 'Shortcut',
      'risky-halol': 'Risky Halol',
    },
    feedback: {
      kicker: 'Consequence · Scene {n}',
      changesKicker: 'Changes',
      next: 'Next scene',
      reveal: 'Reveal ending',
      timeoutBadge: 'Timeout',
      youStayedSilent: 'You stayed silent.',
      decision: 'Decision',
    },
    ending: {
      finalCode: 'Ending {code}',
      finalSummaryKicker: 'Final stats',
      decisionsKicker: 'Your decisions',
      share: 'Share',
      shared: 'Copied',
      restart: 'Play again',
      hotlineLink: 'Helpline 1144 →',
      decisionTimeout: 'Timeout',
      expandDecisions: 'Show all',
      collapseDecisions: 'Collapse',
    },
    toolbar: {
      themeLabel: 'Theme',
      themeLight: 'Light',
      themeDark: 'Dark',
      langLabel: 'Language',
    },
    preEnding: {
      defaultName: 'Friend',
      reveal: 'Reveal the ending',
      honor: {
        line1: '{name}, you are being invited to the stage.',
        line2: 'The path was hard. But you walked it.',
        line3: 'You stand before the mirror. And there — a familiar face.',
      },
      danger: {
        line1: '{name}, they are calling you in. No warning.',
        line2: 'You risked too often. The system is impatient.',
        line3: 'You don\'t know who is behind the door.',
      },
      corrupt: {
        line1: '{name}, things are going well. Too well.',
        line2: 'Money is there. Connections are there. But the phone rang.',
        line3: 'Unknown number. Official voice.',
      },
      gray: {
        line1: '{name}, you are sitting alone.',
        line2: 'Nobody is calling. Nobody is waiting.',
        line3: 'You chose this path yourself. Or it chose you.',
      },
      tags: {
        briber: 'The system remembers you: "prone to compromise"',
        whistleblower: 'The system remembers you: "reports"',
        silent: 'The system remembers you: "stays silent"',
        principled: 'The system remembers you: "principled"',
        neutral: '',
      },
    },
  },

  endings: {
    halol_leader: {
      title: 'Honest Leader',
      subtitle: 'You walked the path without selling yourself.',
      body: [
        'You kept your name. Those around you came by themselves, not through an envelope.',
        'You lost in speed, lost some potential money. But you gained what cannot be bought: peaceful sleep and real authority.',
      ],
      stat: 'Honesty proved slower, but more reliable.',
      share: 'I completed the "Halol Avlod" game and became an honest leader. What about you?',
    },
    wealthy_under_investigation: {
      title: 'Wealthy, but Under Investigation',
      subtitle: 'You won in money. They won you.',
      body: [
        'An apartment, a car, nice restaurants. And a folder with your name on the investigator\'s desk.',
        'Every "resolved issue" left a mark. The marks formed a chain. The chain formed an indictment.',
      ],
      stat: 'Corruption does not forget. It is an accountant with a good memory.',
      share: 'I completed the "Halol Avlod" game — and ended up under investigation. What about you?',
    },
    imprisoned: {
      title: 'Prison',
      subtitle: 'You played too aggressively.',
      body: [
        'You made risky moves one after another. The system didn\'t bother to figure it out. It simply closed the door.',
        'Perhaps you were right in many ways. But one wrong step decided where you wake up tomorrow.',
      ],
      stat: 'Even the righteous path requires discipline.',
      share: 'I completed the "Halol Avlod" game — and ended up behind bars. What about you?',
    },
    survived_but_broken: {
      title: 'Survived, but Broken',
      subtitle: 'Neither here nor there.',
      body: [
        'You chose the middle path. You stayed silent somewhere. You nodded somewhere. You signed "just in case" somewhere.',
        'You kept your seat. But in the mirror is a person you would have despised at eighteen.',
      ],
      stat: 'The gray zone is the most crowded place.',
      share: 'I completed the "Halol Avlod" game — survived, but broken. What about you?',
    },
  },

  scenarios: {
    university_exam: {
      stage: 'FIRST CHOICE',
      setting: 'University, before an exam · 3rd year',
      title: 'The Exam',
      narrator: 'Third year. Ten minutes before the law exam. I haven\'t slept for two nights. A senior student approaches.',
      quote: '— Listen, don\'t sweat it. It\'s "solved" with the professor. Two hundred thousand — and they won\'t even ask you. Our whole group chipped in.',
      choices: {
        a: { label: 'I\'ll pass it myself', subtitle: 'The law requires it.', outcome: 'I passed — barely, but by myself. The professor remembered me. In the next session, he gave me a chance.' },
        b: { label: 'Chip in with everyone', subtitle: 'Everyone does it.', outcome: 'The exam "passed". But inside, something broke for the first time. I had to pay on the next exam too.' },
        c: { label: 'Record on dictaphone', subtitle: 'Gather evidence.', outcome: 'The recording reached the dean. The professor got a reprimand. Some in the group dislike me now — but the system flinched.' },
      },
    },

    internship: {
      stage: 'FIRST COMPROMISE',
      setting: 'State agency, archive · summer internship',
      title: 'Internship',
      narrator: 'I\'m on an internship. My supervisor is an experienced official. I noticed he regularly "loses" certain applications. People wait months for an answer.',
      quote: '— Listen, you don\'t need to see everything here. Better not touch some papers. You\'re an intern — learn and don\'t interfere. You\'ll leave in a month and forget.',
      narratorByPrev: {
        a: 'After making an honest choice at the exam, I came to the internship with confidence. But there were different rules here. My supervisor was "losing" applications.',
        b: 'Having chipped in at the exam, I believed less in the rules. On the internship, I saw similar schemes — my supervisor was "losing" applications.',
        c: 'I still remember turning on the dictaphone at the exam. Now, on the internship, another scheme — my supervisor is "losing" applications. Should I interfere again?',
      },
      choices: {
        a: { label: 'Ask the supervisor directly', subtitle: 'Talk openly.', outcome: 'He got angry. But a week later the applications were "found". My internship evaluation — "stubborn, but honest".' },
        b: { label: 'Stay silent and finish the internship', subtitle: 'Let it be.', outcome: 'The internship went smoothly. But every day, entering the archive, I remembered the people waiting for an answer.' },
        c: { label: 'Write an anonymous tip to management', subtitle: 'My name stays hidden.', outcome: 'An inspection came. The supervisor was warned. He suspected me — but couldn\'t prove it. Applications were no longer lost.' },
      },
    },

    birinchi_kun_1: {
      stage: 'FIRST DAY',
      setting: 'State agency, small office · Day 1',
      title: 'First Day',
      narrator: 'My first day at work. The boss said in a quiet voice: "Everything in the papers must look clean." Half an hour later, a rushed woman walked in. There\'s a minor error in her document. I noticed it immediately.',
      quote: '— Please, approve it quickly. My child is in the hospital, we need the money. We need it today.',
      narratorByPrev: {
        a: 'I told the truth to my supervisor during the internship. Now it\'s my first day at a new job. A woman walked in — there\'s an error in her document.',
        b: 'I stayed silent during the internship. Now a new job begins. First day — a rushed woman walks in, there\'s an error in her document.',
        c: 'I wrote an anonymous tip during the internship. Now it\'s my first day at a new place. A woman walked in — there\'s an error in her document.',
      },
      choices: {
        a: { label: 'There\'s an error, please reissue', subtitle: 'The law requires it.', outcome: 'The woman left in anger. But the next day the document returned corrected and was approved. The system noticed me.' },
        b: { label: 'Okay, I\'ll pass it', subtitle: 'Her child is sick.', outcome: 'The woman left with gratitude. The error remained in the document. My signature is on the desk.' },
        c: { label: 'I can help...', subtitle: 'A hidden offer.', outcome: 'She understood in a second. An envelope remained on the desk. I took it for the first time.' },
      },
    },

    birinchi_kun_2: {
      stage: 'FIRST DAY',
      setting: 'Boss\'s office · same day, 17:40',
      title: 'Summoned by the Boss',
      narrator: 'A few hours later, the boss called me in. No smile. There are several documents on the desk. Among them — the one from this morning.',
      quote: '— A suspicious document went through today. There might be an inspection. Do you remember anything?',
      narratorByPrev: {
        a: 'The boss called me in. "Several employees were hastily processing documents today. There might be an inspection. You\'re new, so I\'m asking: what happened this morning?"',
        b: 'The boss called me in. On the desk — the morning document with my signature. "There might be an inspection. Remember who did this?"',
        c: 'The boss called me in. On the desk — the document with my signature. "The document is suspicious. There might be an inspection. First day — do you remember?"',
      },
      choices: {
        a: { label: 'It\'s my mistake', subtitle: 'I\'ll tell the truth.', outcome: 'The boss shook his head. I got a reprimand, but he remembered my face. A hard path — but a clean slate behind me.' },
        b: { label: 'I don\'t know, a system glitch', subtitle: 'I\'ll cover up.', outcome: 'It blew over for now. But I got the "dangerous" label in the department — nobody says it, but everyone knows.' },
        c: { label: 'Another employee did it', subtitle: 'Blame someone else.', outcome: 'Another employee was punished. I survived. But tomorrow, looking in the mirror — I will see a different person.' },
      },
    },

    hr_envelope: {
      stage: 'FIRST PRICE',
      setting: 'HR Department, state agency',
      title: 'A Budget Spot',
      narrator: 'I spent half a year looking for a job. Finally — an offer. The head of HR closed the door and smiled.',
      quote: '— Good resume. But there are many applicants. Three thousand dollars — and your resume will be at the top. Standard practice.',
      narratorByPrev: {
        a: 'I told the truth to the boss — got a reprimand. Now I\'m looking for a new job. The head of HR closed the door and smiled.',
        b: 'I stayed silent in front of the boss. Now I\'m looking for a new job. The head of HR closed the door and made an offer.',
        c: 'I blamed another employee. Now I\'m looking for a new place. The head of HR closed the door and smiled.',
      },
      choices: {
        a: { label: 'Refuse and leave', subtitle: 'Continue the search.', outcome: 'A month later I was hired elsewhere — lower salary, but no envelope. Started with a clean slate.' },
        b: { label: 'Pay and get the spot', subtitle: 'It\'s an investment.', outcome: 'You are on staff. But now you "owe". And this isn\'t the last envelope.' },
        c: { label: 'Report to the helpline', subtitle: '1144. Anonymous.', outcome: 'An inspection came in two weeks. You weren\'t hired for this job. But the HR department was disbanded.' },
      },
    },

    road_stop: {
      stage: 'FIRST FEAR',
      setting: 'Highway A-373, 23:40',
      title: 'Pulled Over',
      narrator: 'Driving home from a graduation party. Slightly exceeded the speed limit. Red and blue flashing lights. An inspector approaches the window.',
      quote: '— Exceeded by 22 km/h. License suspension or a 2.5 million fine. Or... we can "agree". Five hundred — and you\'re good to go.',
      realStoryNote: 'Based on typical cases of the Anti-Corruption Agency.',
      narratorByPrev: {
        a: 'I refused at the HR department — started with a clean slate. Now driving home from graduation. An inspector pulled me over.',
        b: 'I paid for the job — now I\'m in the system. Driving home from graduation. An inspector pulled me over.',
        c: 'I called the helpline — HR was disbanded. Now driving home. An inspector pulled me over.',
      },
      choices: {
        a: { label: 'Pay the fine officially', subtitle: 'Protocol, receipt, all by the book.', outcome: 'Left in forty minutes. The fine arrived via SMS a week later. Slept peacefully.' },
        b: { label: 'Give five hundred thousand', subtitle: 'Quick, quiet, home.', outcome: 'The inspector hid the bill in his pocket. I drove away. They\'ll remember me at the next post.' },
        c: { label: 'Record on phone and file a complaint', subtitle: 'Turn on the camera in my pocket.', outcome: 'Got home. Next week a call from the prosecutor\'s office. They don\'t like me at the precinct. But one inspector — is fired.' },
      },
    },

    hospital: {
      stage: 'FIRST PAIN',
      setting: 'District Hospital, surgery',
      title: 'Surgery Tomorrow',
      narrator: 'My grandmother is being prepared for surgery. The surgeon pulled me aside, looking down.',
      quote: '— Technically, the surgery is free. But... there is gratitude. Two million — and I operate personally. Otherwise — wait in line, two months.',
      realStoryNote: 'Every third citizen has faced "gratitude" in medicine (2023 survey).',
      narratorByPrev: {
        a: 'I officially paid the fine to the inspector. Now standing before my grandmother\'s surgery. The surgeon pulled me aside.',
        b: 'I "agreed" with the inspector. Now in the hospital — grandmother is being prepped. The surgeon pulled me aside.',
        c: 'I recorded the inspector on video. Now in the hospital — the surgeon also offers an "agreement". Corruption isn\'t only in offices.',
      },
      choices: {
        a: { label: 'Refuse and wait in line', subtitle: 'The law is on my side.', outcome: 'The turn came not in two months, but in three weeks. Another surgeon operated on my grandmother. Everything went well.' },
        b: { label: 'Pay — it\'s a loved one', subtitle: 'Not the time to argue.', outcome: 'The surgery happened the next day. Grandmother is alive. But you just paid for this system with your signature.' },
        c: { label: 'Record and write a complaint', subtitle: 'After the surgery. Anonymous.', outcome: 'The complaint reached the Ministry of Health. The surgeon was demoted. The helpline number now hangs in the department.' },
      },
    },

    small_favor: {
      stage: 'FIRST FAVOR',
      setting: 'Workplace, lunch · call from an acquaintance',
      title: 'Our Own People',
      narrator: 'An acquaintance from the neighborhood called. His mother-in-law needs a certificate, but by law there\'s a three-week wait. He asks to "speed it up".',
      quote: '— Brother, we\'re our own people. It\'s not a bribe, just push it through faster. I\'ll help you too when you need it.',
      narratorByPrev: {
        a: 'I waited in line at the hospital — everything went well. Now at work — an acquaintance calls, asks to speed up a certificate.',
        b: 'I paid the surgeon. Now a similar situation — an acquaintance asks to "speed up". This time not money, but "as our own".',
        c: 'I filed a complaint against the surgeon. Now an acquaintance asks to speed up a certificate. Corruption starts small.',
      },
      choices: {
        a: { label: 'Refuse: let him wait in line like everyone', subtitle: 'The law is the same for all.', outcome: 'The acquaintance took offense. But in three weeks the document was ready. A rumor spread in the neighborhood that I am "strict" — but they respected me.' },
        b: { label: 'Speed it up — it\'s a small thing', subtitle: 'Our people.', outcome: 'The certificate is ready in two days. But now "our guy" will call again. And again. It won\'t stop.' },
        c: { label: 'Speed it up, but ask for "gratitude"', subtitle: 'This has a price.', outcome: 'The envelope was received. The acquaintance is satisfied. Now you are a "fixer" out of line. People like that get watched.' },
      },
    },

    coworker_theft: {
      stage: 'FIRST SILENCE',
      setting: 'Office, Friday, 17:30',
      title: 'Quiet Theft',
      narrator: 'My colleague Bakhtiyor has been processing non-existent "business trips" for the third month. He submits blank receipts. I accidentally saw the documents.',
      quote: 'Bakhtiyor: — Brother, what do you need? Everyone has their own scheme. You\'re not a snitch, are you.',
      narratorByPrev: {
        a: 'I refused the acquaintance. Now in the office there\'s another problem — a colleague is running a scheme. I saw it.',
        b: 'I "sped up" the paper for the acquaintance. Now I see — a colleague is also running a scheme. He expects us to cover each other.',
        c: 'I received "gratitude" from the acquaintance. Now I see — a colleague is running a similar scheme. What\'s the difference?',
      },
      choices: {
        a: { label: 'Talk to him personally', subtitle: 'Human to human.', outcome: 'He got mad. But a month later the fake business trips stopped. He quit on his own. We don\'t talk anymore.' },
        b: { label: 'Stay silent — none of my business', subtitle: 'Let it be.', outcome: 'The scheme worked for another half a year. When it was uncovered — HR interrogated everyone. Including you. You "didn\'t see".' },
        c: { label: 'Write to the control service', subtitle: 'Anonymous, with facts.', outcome: 'Inspection. Dismissal. His family now blames you — he found out who wrote it. You are right, but you sleep poorly.' },
      },
    },

    fictitious_act: {
      stage: 'FIRST SIGNATURE',
      setting: 'Boss\'s office, Friday evening',
      title: 'Just Sign It',
      narrator: 'The boss put a certificate of completion in front of me. The work wasn\'t done — I know the contractor, it\'s his neighbor. Next to it is a pen.',
      quote: '— Listen, everything is approved at the top. Just a signature. There will be no questions for you. Never.',
      narratorByPrev: {
        a: 'I talked to my colleague — he left on his own. Now the boss came — "just sign". But the stakes are higher here.',
        b: 'I stayed silent, seeing the colleague\'s scheme. Now the boss asks to sign a fake act. Does silence become complicity?',
        c: 'I turned my colleague over to control. Now the boss asks to sign a forgery. I need courage again.',
      },
      choices: {
        a: { label: 'Refuse to sign', subtitle: 'Even if I get fired.', outcome: 'I was transferred to a less "comfortable" position. The act was signed by someone else. A year later a criminal case was opened — my last name isn\'t there.' },
        b: { label: 'Sign and stay silent', subtitle: 'I\'m not the one deciding.', outcome: 'The paper went through. A year and a half later, an investigator read my signature in the protocol. "No questions" turned into dozens.' },
        c: { label: 'Sign, but keep a copy', subtitle: 'Just in case.', outcome: 'You are in the system. The copy is in the safe. You sleep worse — but you are safe for now. For now.' },
      },
    },

    school_tender: {
      stage: 'FIRST TEST',
      setting: 'Public procurement: a school in the district',
      title: 'The Difference — Split',
      narrator: 'I\'m managing a tender for building a school. A contractor with a suspiciously low price wins. A week later — a meeting in a restaurant.',
      quote: '— We\'ll get cheaper cement. Thinner rebar. The difference is six hundred million. Thirty percent is yours. The school will stand for fifteen years, that\'s enough.',
      realStoryNote: 'The case of schools in Surkhandarya (2021) is similar to this scenario.',
      narratorByPrev: {
        a: 'I refused to sign the fake act. Now I\'m managing a tender — the contractor made an "offer" in a restaurant.',
        b: 'I signed the fake act. Now it\'s my tender — the contractor in the restaurant offers to "split". This time the amount is huge.',
        c: 'I kept a copy of the fake act. Now a tender — the contractor offers a cut. My copy is in the safe, but this is a new test.',
      },
      choices: {
        a: { label: 'Refuse and demand per specification', subtitle: 'The school must stand for 50 years.', outcome: 'The contractor missed the deadlines. They tried to replace me. I held my ground. The school opened a year later — to standard.' },
        b: { label: 'Accept "my share"', subtitle: 'The school will be built for the kids anyway.', outcome: 'The money came in an envelope. Bought a car. The school opened. Four years later the roof collapsed — fortunately, at night.' },
        c: { label: 'Record and hand over to Anti-Corruption', subtitle: 'With all correspondence.', outcome: 'The contractor was caught red-handed. They tried to organize a "leak" against me. But the Agency protected me. The school was built honestly.' },
      },
    },

    journalist_leak: {
      stage: 'FIRST RESOLVE',
      setting: 'Cafe in Yunusabad, 22:10',
      title: 'The Journalist and the Flash Drive',
      narrator: 'A familiar journalist is asking for internal correspondence — evidence of my deputy\'s fraud. I have access.',
      quote: '— If I don\'t publish this, the case will be buried. In a month he will be promoted. And he will be deciding not just cases, but fates.',
      narratorByPrev: {
        a: 'I defended the specification at the tender — the school was built honestly. Now a bigger matter: my deputy is a fraud, a journalist is asking for a leak.',
        b: 'I took a cut from the tender. Now a journalist asks for dirt on my deputy. I know my hands aren\'t clean either.',
        c: 'I turned the contractor over to Anti-Corruption. Now a journalist asks for dirt on the deputy. The official way or head-on?',
      },
      choices: {
        a: { label: 'Pass it through compliance', subtitle: 'There is an official channel.', outcome: 'The investigation took four months. The deputy was suspended quietly. The journalist is offended — but I\'m covered by paper.' },
        b: { label: 'Give it to the journalist', subtitle: 'Faster and louder.', outcome: 'Two days later — a media scandal. A week later — the chain led to me. I am right, but I\'m under the article on disclosure.' },
        c: { label: 'Refuse and stay out of it', subtitle: 'This is not my war.', outcome: 'The deputy got promoted. I stayed at my job. A year later he signed a decision that hit me directly.' },
      },
    },

    elections: {
      stage: 'TASTE OF POWER',
      setting: 'Mahalla, election day',
      title: '"Organized" Voting',
      narrator: 'They demand that I "ensure turnout and result" in the district. In the envelope — money for campaigners and a list of "correct" ballots.',
      quote: '— It\'s just work. All districts work like this. You\'re new, do as everyone else does.',
      realStoryNote: 'The OSCE noted similar schemes during elections in the region.',
      narratorByPrev: {
        a: 'I resolved the deputy\'s case through compliance. Now it\'s election day — they demand a "result".',
        b: 'I leaked dirt to the journalist — there was a scandal. Now they offer "organized" voting at the elections.',
        c: 'I turned a blind eye to the deputy\'s fraud. Now elections — they tell me "do as everyone else".',
      },
      choices: {
        a: { label: 'Refuse and hold it honestly', subtitle: 'Whatever the turnout is — that\'s it.', outcome: 'Turnout 48%. Nobody at the top liked my result. I wasn\'t promoted. But I am the only one in the region with no complaints about violations.' },
        b: { label: 'Accept the scheme', subtitle: 'Once — and never again.', outcome: 'Turnout 94%. I was praised. Six months later there are protests in the same district. Cameras recorded what they shouldn\'t have.' },
        c: { label: 'Document the pressure', subtitle: 'Record every call.', outcome: 'The folder is in a safe deposit box. I\'m playing a double game. It\'s protection — and risk. But my hands are cleaner than my neighbor\'s.' },
      },
    },

    old_friend_minister: {
      stage: 'THE FINAL TEST',
      setting: 'Minister\'s office, late evening',
      title: 'Old Friend at the Door',
      narrator: 'My childhood friend came without an appointment. His company is under inspection. The documents are on my desk. One word — and the inspection is "closed".',
      quote: '— Brother. We grew up together. You know my house. One signature — and I\'m saved. I will never forget this.',
      narratorByPrev: {
        a: 'I held the elections honestly — didn\'t get promoted, but stayed without complaints. Now I\'m in the minister\'s chair. My friend is at the door.',
        b: 'I accepted the election scheme — the result is good, but there are cameras. Now I\'m a minister. My friend came for help.',
        c: 'I documented the pressure at the elections — the folder is in a safe. Now I\'m a minister. My friend is under inspection — decided by my hand.',
      },
      choices: {
        a: { label: 'Refuse and let the case proceed', subtitle: 'Friendship is not above the law.', outcome: 'My friend left silently. He doesn\'t call anymore. His company lost the court case. And I became a minister to whom people no longer come with such requests.' },
        b: { label: 'Help my friend', subtitle: 'Once is not a system.', outcome: 'The inspection was closed. Eight months later a journalist published the chain. My name is first in the headline.' },
        c: { label: 'Transfer to an independent commission', subtitle: 'So I don\'t decide.', outcome: 'The commission found partial guilt. A fine, no jail. My friend understood everything. A year later he called first — to say thank you.' },
      },
    },
  },
  timeoutChoice: {
    label: 'You made no decision',
    subtitle: 'Time is up.',
    outcome: 'You stayed silent. Others decided for you. Sometimes that is also a choice.',
  },
}