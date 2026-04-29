import { useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useAuth } from './store/authStore'
import { useUI } from './store/uiStore'
import AuthPage from './pages/AuthPage.jsx'
import TeacherDashboard from './pages/TeacherDashboard.jsx'
import ScenarioBuilder from './pages/ScenarioBuilder.jsx'
import SessionRoom from './pages/SessionRoom.jsx'
import App from './App.jsx'

export default function Root() {
  const { user, loading, hydrate } = useAuth()
  const hydrateUI = useUI((s) => s.hydrate)

  useEffect(() => {
    hydrate()
    hydrateUI()
  }, [hydrate, hydrateUI])

  if (loading) {
    return (
      <div className="min-h-[100dvh] bg-ink-950 flex items-center justify-center">
        <span className="h-2 w-2 rounded-full bg-accent animate-breath" />
      </div>
    )
  }

  return (
    <Routes>
      <Route path="/auth" element={<AuthPage />} />

      {/* Учительские маршруты */}
      <Route path="/teacher" element={
        <RequireRole role="teacher" user={user}>
          <TeacherDashboard />
        </RequireRole>
      } />
      <Route path="/teacher/scenario/:id" element={
        <RequireRole role="teacher" user={user}>
          <ScenarioBuilder />
        </RequireRole>
      } />
      <Route path="/teacher/session/:id" element={
        <RequireRole role="teacher" user={user}>
          <SessionRoom />
        </RequireRole>
      } />

      {/* Игровой маршрут (студенты + учителя) */}
      <Route path="/play" element={
        <RequireAuth user={user}>
          <App />
        </RequireAuth>
      } />

      {/* Корень — редирект по роли */}
      <Route path="/" element={<SmartRedirect user={user} />} />
      <Route path="*" element={<SmartRedirect user={user} />} />
    </Routes>
  )
}

function RequireAuth({ user, children }) {
  const location = useLocation()
  if (!user) return <Navigate to="/auth" state={{ from: location }} replace />
  return children
}

function RequireRole({ role, user, children }) {
  const location = useLocation()
  if (!user) return <Navigate to="/auth" state={{ from: location }} replace />
  if (user.role !== role && user.role !== 'admin') {
    return <Navigate to="/play" replace />
  }
  return children
}

function SmartRedirect({ user }) {
  if (!user) return <Navigate to="/auth" replace />
  if (user.role === 'teacher' || user.role === 'admin') return <Navigate to="/teacher" replace />
  return <Navigate to="/play" replace />
}
