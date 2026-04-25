export default {
  ui: {
    appName: 'Halol Yo‘l',
    appTagline: 'The Path of Integrity',
    hotline: 'Hotline',
    hotlineNumber: '1144',
    hackathonTag: 'Hackathon prototype · Anti-Corruption Agency of Uzbekistan',

    intro: {
      kicker: '11 scenes · 10 seconds · 4 endings',
      headline_pre: 'What would',
      headline_accent: 'you',
      headline_post: 'choose?',
      lead:
        'You will walk a path from student to minister. Every step — a temptation. You have ten seconds to decide. Your choices change more than numbers — they change who you become by the end.',
      ctaStart: 'Begin the journey',
      ctaSubtitle: 'No sign-up. One run — 5 minutes.',
      legendKicker: 'Reading the stats',
      timerKicker: 'Timer',
      timerCopy:
        '10 seconds. If you don’t decide — others decide for you. That’s an answer too.',
    },

    stats: {
      integrity: 'Integrity',
      integrityHint: 'Reputation. Stability and protection over time.',
      money: 'Resource',
      moneyHint: 'Money and connections. Speed up the path — but leave a trail.',
      risk: 'Risk',
      riskHint: 'Likelihood that someone comes for you.',
    },

    timer: {
      label: 'Time to decide',
    },

    scene: {
      sceneOf: 'Scene {n} of {total}',
      sceneCounter: 'Scene {n}',
      basedOnReal: 'Based on real cases',
    },

    choiceType: {
      halol: 'Halol',
      gray: 'Gray',
      shortcut: 'Shortcut',
      'risky-halol': 'Risky halol',
    },

    feedback: {
      kicker: 'Consequence · Scene {n}',
      changesKicker: 'Changes',
      next: 'Next scene',
      reveal: 'See the ending',
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
      hotlineLink: 'Hotline 1144 →',
      decisionTimeout: 'Timeout',
    },

    toolbar: {
      themeLabel: 'Theme',
      themeLight: 'Light',
      themeDark: 'Dark',
      langLabel: 'Language',
    },
  },

  endings: {
    halol_leader: {
      title: 'Halol Leader',
      subtitle: 'You walked the path without selling yourself.',
      body: [
        'You kept a name people can say out loud. The people next to you came on their own — not through an envelope.',
        'You lost speed and some money. But you gained what can’t be bought: peace of mind, and a reputation that works for you.',
      ],
      stat: 'Integrity is slower — but more durable.',
      share: 'I finished “Halol Yo‘l” as a Halol Leader. Your move.',
    },
    wealthy_under_investigation: {
      title: 'Wealthy, Under Investigation',
      subtitle: 'You won the money. They won you.',
      body: [
        'An apartment, a car, a good restaurant. And a folder with your name on the investigator’s desk.',
        'Every “handled issue” left a trace. The traces became a chain. The chain became an indictment.',
      ],
      stat: 'Corruption doesn’t forget. It’s a bookkeeper with a long memory.',
      share: 'I finished “Halol Yo‘l” — and ended up under investigation. Your move.',
    },
    imprisoned: {
      title: 'Imprisoned',
      subtitle: 'You played too aggressively.',
      body: [
        'You took risky moves at the same time — halol and shortcuts. The system didn’t bother sorting it out. It just shut the door.',
        'You may have been right about a lot. But one wrong move decides where you wake up.',
      ],
      stat: 'Even the right path needs discipline.',
      share: 'I finished “Halol Yo‘l” — and ended up behind bars. Your move.',
    },
    survived_but_broken: {
      title: 'Survived, but Broken',
      subtitle: 'Neither fish nor flesh.',
      body: [
        'You picked the middle path. Stayed quiet here. Nodded there. Signed “just in case” somewhere else.',
        'You kept your job. But the person in the mirror is the one your eighteen-year-old self would have despised.',
      ],
      stat: 'The gray zone is the most crowded place.',
      share: 'I finished “Halol Yo‘l” — survived, but broken. Your move.',
    },
  },

  scenarios: {
    birinchi_kun_1: {
      stage: 'NEW EMPLOYEE',
      setting: 'Government office, small room · Day 1',
      title: 'First Day',
      narrator:
        'Your first day on the job. The boss said it quietly: “Everything has to look clean on paper.” Half an hour later a hurried woman walks in. There’s a small error in her document — you spot it immediately.',
      quote:
        '— Please process my document quickly. My child is in hospital, I need the money. It has to be today.',
      choices: {
        a: {
          label: 'Reject — fix it and come back',
          subtitle: 'That’s what the law requires.',
          outcome:
            'She left angry. But the next day the document came back correct and was signed. The system has noticed you.',
        },
        b: {
          label: 'Fine, I’ll let it through',
          subtitle: 'Her child is sick.',
          outcome:
            'She left thanking you. The small error stayed. Your signature is on it.',
        },
        c: {
          label: 'I might be able to help...',
          subtitle: 'An implicit offer.',
          outcome:
            'She understood in a second. A small envelope was left on the desk. You accepted for the first time.',
        },
      },
    },

    birinchi_kun_2: {
      stage: 'NEW EMPLOYEE',
      setting: 'Boss’s office · same day, 17:40',
      title: 'The Boss Calls You In',
      narrator:
        'A few hours later the boss calls you in. No smile. A few documents on the desk — including the one from this morning.',
      quote:
        '— A suspicious document went through today. There may be an audit. Do you remember anything?',
      narratorByPrev: {
        a: 'A few hours later the boss calls you in. “Several people pushed paperwork through fast today. There may be an audit. You’re the new face — so I’ll ask you: what happened today?”',
        b: 'A few hours later the boss calls you in. On the desk — that morning’s document with your signature. “There may be an audit. Do you remember who handled it?”',
        c: 'A few hours later the boss calls you in. On the desk — that morning’s document with your signature. “This one’s suspicious. There may be an audit. First day — do you remember?”',
      },
      choices: {
        a: {
          label: 'It was my mistake',
          subtitle: 'Tell the truth.',
          outcome:
            'The boss shakes his head. You got a warning, but he remembered your face. A hard road — but the page behind you is clean.',
        },
        b: {
          label: 'I don’t know — system error',
          subtitle: 'Close it down.',
          outcome:
            'You got away for now. But the “risky one” label appeared in the office — nobody says it, everyone knows it.',
        },
        c: {
          label: 'It was someone else',
          subtitle: 'Pin it on a coworker.',
          outcome:
            'The other employee was punished. You stayed safe. But tomorrow, when you look in the mirror — there’s a different person inside.',
        },
      },
    },

    road_stop: {
      stage: 'GRADUATE',
      setting: 'A-373 highway, 23:40',
      title: 'Pulled Over',
      narrator:
        'You’re driving home from your graduation. Slightly over the limit. Red and blue lights. The officer comes up to your window.',
      quote:
        '— 22 km/h over the limit. License suspension or a 2.5-million fine. Or… we can “settle.” Five hundred and you drive on.',
      realStory: true,
      realStoryNote: 'Based on standard cases handled by the Anti-Corruption Agency.',
      choices: {
        a: {
          label: 'Pay the official fine',
          subtitle: 'Report, receipt, by the book.',
          outcome:
            'You drive off forty minutes later. The fine arrives by SMS a week later. You sleep fine.',
        },
        b: {
          label: 'Hand over five hundred',
          subtitle: 'Quick, quiet, home.',
          outcome:
            'The officer pockets the bill. You drive on. At the next checkpoint they’ll remember your face.',
        },
        c: {
          label: 'Record it and file a report',
          subtitle: 'Pocket camera on.',
          outcome:
            'You made it home. A call from the prosecutor’s office the next week. Not everyone in the precinct likes you. But one officer is fired.',
        },
      },
    },

    hr_envelope: {
      stage: 'JOB SEEKER',
      setting: 'HR department, government agency',
      title: 'A Spot in the Budget',
      narrator:
        'Six months of looking. Finally, a callback. The HR head closes the door and smiles.',
      quote:
        '— Nice CV. But there are many candidates. Three thousand dollars and your CV ends up on top. Standard practice.',
      choices: {
        a: {
          label: 'Decline and walk out',
          subtitle: 'I’ll keep looking.',
          outcome:
            'A month later you got hired elsewhere — for less money, but no envelope. You started with a clean slate.',
        },
        b: {
          label: 'Pay and take the job',
          subtitle: 'Call it an investment.',
          outcome:
            'You’re in. But now you “owe.” And this won’t be the last envelope you carry.',
        },
        c: {
          label: 'Report it to 1144',
          subtitle: 'Anonymous tip line.',
          outcome:
            'An audit came two weeks later. You didn’t get the job. But the HR department was disbanded.',
        },
      },
    },

    hospital: {
      stage: 'JUNIOR SPECIALIST',
      setting: 'District hospital, surgical ward',
      title: 'Surgery Tomorrow',
      narrator:
        'Your grandmother is being prepped for surgery. The surgeon pulls you aside, looks at the floor, lowers his voice.',
      quote:
        '— Technically the surgery is free. But… there’s a “thank you.” Two million and I’ll personally operate. Otherwise — two-month queue.',
      realStory: true,
      realStoryNote: '1 in 3 citizens has met an unofficial “gratitude” in healthcare (2023 survey).',
      choices: {
        a: {
          label: 'Refuse and wait the queue',
          subtitle: 'The law is on my side.',
          outcome:
            'The queue turned out to be three weeks, not two months. Another surgeon operated. It went well.',
        },
        b: {
          label: 'Pay — it’s family',
          subtitle: 'No time to argue.',
          outcome:
            'Surgery happened tomorrow. Grandma is alive. But you just paid into this system with your own signature.',
        },
        c: {
          label: 'Document it and file a complaint',
          subtitle: 'After the surgery. Anonymous.',
          outcome:
            'The complaint reached the Ministry of Health. The surgeon was demoted. The ward now has a hotline poster on the wall.',
        },
      },
    },

    coworker_theft: {
      stage: 'COWORKER',
      setting: 'Open space, Friday 17:30',
      title: 'Quiet Theft',
      narrator:
        'Your colleague Bakhtiyor has been writing fake “business trips” for three months. Returns blank receipts. You saw the documents by accident.',
      quote: 'Bakhtiyor: — Brother, what do you need? Everyone has a scheme. You’re not a snitch.',
      choices: {
        a: {
          label: 'Talk to him directly',
          subtitle: 'Like a human.',
          outcome:
            'He blew up. But a month later the trips stopped. He resigned on his own. You don’t talk anymore.',
        },
        b: {
          label: 'Stay quiet — not my business',
          subtitle: 'Don’t take the headache.',
          outcome:
            'The scheme ran for another six months. When it broke, HR questioned everyone. Including you. You “didn’t notice.”',
        },
        c: {
          label: 'Report to internal control',
          subtitle: 'No names, just facts.',
          outcome:
            'Audit. Dismissal. His family blames you — he figured out who reported. You’re right, but you sleep badly.',
        },
      },
    },

    school_tender: {
      stage: 'SPECIALIST',
      setting: 'Public procurement: a district school',
      title: 'Half the Difference',
      narrator:
        'You’re running a school construction tender. A contractor wins with a suspiciously low bid. A week later — a meeting at a restaurant.',
      quote:
        '— Cheaper cement. Thinner rebar. Six hundred million in savings. Thirty percent goes to you. The school will stand fifteen years — that’s enough.',
      realStory: true,
      realStoryNote: 'Similar to the 2021 Surxondaryo school case.',
      choices: {
        a: {
          label: 'Reject and demand to spec',
          subtitle: 'A school must stand 50 years.',
          outcome:
            'The contractor misses deadlines. They try to replace you. You hold your ground. The school opened a year later — and it holds the standard.',
        },
        b: {
          label: 'Take your cut',
          subtitle: 'They’ll build it anyway.',
          outcome:
            'Cash came in an envelope. You bought a car. The school opened. Four years later the roof collapsed — luckily at night.',
        },
        c: {
          label: 'Document it, hand to the Anti-Corruption Agency',
          subtitle: 'With every message.',
          outcome:
            'The contractor was arrested. A “discredit” campaign came at you. The Agency protected you. The school was built honestly.',
        },
      },
    },

    fictitious_act: {
      stage: 'DEPARTMENT HEAD',
      setting: 'Boss’s office, Friday evening',
      title: 'Just Sign It',
      narrator:
        'The boss puts a completion certificate in front of you. The work was never done — you know the contractor, he’s your neighbor. There’s a pen.',
      quote: '— Listen, it’s all approved upstairs. Just a signature. No questions, ever.',
      choices: {
        a: {
          label: 'Refuse to sign',
          subtitle: 'Even if I get fired.',
          outcome:
            'You were moved to a less “convenient” role. Someone else signed it anyway. A criminal case opened a year later — without your name.',
        },
        b: {
          label: 'Sign and stay quiet',
          subtitle: 'I’m not the decider.',
          outcome:
            'The paper went out. Eighteen months later an investigator reads your signature out loud in the protocol. “No questions” turned into dozens of questions.',
        },
        c: {
          label: 'Sign, but keep a copy',
          subtitle: 'Just in case.',
          outcome:
            'You’re inside the system. The copy sits in a safe. You sleep worse — but you’re still standing. For now.',
        },
      },
    },

    journalist_leak: {
      stage: 'DIRECTOR',
      setting: 'A café in Yunusabad, 22:10',
      title: 'A Journalist and a Flash Drive',
      narrator:
        'A journalist you trust asks you to leak internal correspondence — proof of your deputy’s schemes. You have access.',
      quote:
        '— If I don’t publish this, it gets buried. In a month he goes higher. Then he decides futures, not contracts.',
      choices: {
        a: {
          label: 'Hand it through compliance',
          subtitle: 'There’s an official channel.',
          outcome:
            'The audit took four months. The deputy was suspended. The journalist is unhappy — but you’re protected by paper.',
        },
        b: {
          label: 'Leak it to the journalist',
          subtitle: 'Faster and louder.',
          outcome:
            'A media scandal in two days. A week later the leak was traced back to you. You’re right, but you’re facing a disclosure charge.',
        },
        c: {
          label: 'Refuse and stay out',
          subtitle: 'Not my problem.',
          outcome:
            'The deputy went up the ladder. A year later he signed a decision that hit you directly.',
        },
      },
    },

    elections: {
      stage: 'DEPUTY HOKIM',
      setting: 'Mahalla, election day',
      title: '“Organized” Voting',
      narrator:
        'You’re asked to “secure turnout and result” in your mahalla. An envelope of cash for canvassers and a list of the “correct” ballots.',
      quote: '— It’s just work. Every district works this way. You’re new — just do as everyone does.',
      realStory: true,
      realStoryNote: 'Similar schemes were documented by OSCE observers in the region.',
      choices: {
        a: {
          label: 'Refuse and run it cleanly',
          subtitle: 'Whatever turnout shows.',
          outcome:
            'Turnout 48%. Nobody upstairs liked your number. You weren’t promoted. But you’re the only one in the region without violation complaints.',
        },
        b: {
          label: 'Run the scheme',
          subtitle: 'Just this once.',
          outcome:
            'Turnout 94%. Praise from above. Six months later — a protest in the same district. The cameras caught what shouldn’t exist.',
        },
        c: {
          label: 'Run it but document the pressure',
          subtitle: 'Every call recorded.',
          outcome:
            'A folder sits in a bank vault. You’re playing both sides. It’s defense and risk. But your hands are cleaner than your neighbor’s.',
        },
      },
    },

    old_friend_minister: {
      stage: 'MINISTER',
      setting: 'Minister’s office, late evening',
      title: 'An Old Friend at the Door',
      narrator:
        'Your childhood friend showed up unannounced. His company is under investigation. The papers are on your desk. One word — and the audit “closes.”',
      quote:
        '— Brother. We grew up together. You know my home. One signature — and I’m saved. I won’t forget. Ever.',
      choices: {
        a: {
          label: 'Refuse and let the case proceed',
          subtitle: 'Friendship doesn’t outrank the law.',
          outcome:
            'He walked out without a word. He doesn’t call anymore. His company lost in court. And you — remain a minister no one asks for these favors.',
        },
        b: {
          label: 'Help your friend',
          subtitle: 'Once isn’t a system.',
          outcome:
            'The audit closed. Eight months later a journalist published the chain. Your name was first in the headline.',
        },
        c: {
          label: 'Send it to an independent commission',
          subtitle: 'So you don’t decide.',
          outcome:
            'The commission found partial guilt. A fine, no jail. Your friend understood. A year later he was the first to call — to thank you.',
        },
      },
    },
  },

  timeoutChoice: {
    label: 'You didn’t decide',
    subtitle: 'Time’s up.',
    outcome:
      'You stayed silent. Others decided for you. Sometimes that is a choice too.',
  },
}
