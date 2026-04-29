import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import BottomNav from './BottomNav'
import HomeScreen from './HomeScreen'
import StoryScreen from './StoryScreen'
import QuizScreen from './QuizScreen'
import ProfileScreen from './ProfileScreen'

const SCREEN_TITLES = {
  home:    'Bosh sahifa',
  learn:   'Darslar',
  story:   'Hikoyalar',
  quiz:    'Testlar',
  profile: 'Profil',
}

function NotifIcon() {
  return (
    <div className="proto-notif">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#424242" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
        <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
      </svg>
      <div className="proto-notif-dot" />
    </div>
  )
}

export default function MobileApp() {
  const [screen, setScreen] = useState('home')

  function renderScreen() {
    switch (screen) {
      case 'story':   return <StoryScreen />
      case 'quiz':    return <QuizScreen />
      case 'profile': return <ProfileScreen />
      default:        return <HomeScreen onNav={setScreen} />
    }
  }

  return (
    <div className="proto-shell">
      <div className="proto-phone">
        {/* Top bar */}
        <div className="proto-topbar">
          <div className="proto-logo">
            <span>HALOL </span>
            <span>AVLOD</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 12, color: '#9E9E9E' }}>{SCREEN_TITLES[screen]}</span>
            <NotifIcon />
          </div>
        </div>

        {/* Main content */}
        <div className="proto-screen">
          <AnimatePresence mode="wait">
            <motion.div
              key={screen}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            >
              {renderScreen()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom nav */}
        <BottomNav
          active={screen === 'learn' ? 'learn' : screen === 'quiz' ? 'learn' : screen}
          onNav={setScreen}
        />
      </div>
    </div>
  )
}
