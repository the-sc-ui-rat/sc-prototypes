import { useState, useEffect } from 'react'
import { AdminSettingsScreen } from './screens/AdminSettingsScreen'
import { WelcomeScreen } from './screens/WelcomeScreen'
import { LoginScreen } from './screens/LoginScreen'
import { PasswordScreen } from './screens/PasswordScreen'
import { EmailPasswordScreen } from './screens/EmailPasswordScreen'
import { ForgotScreen } from './screens/ForgotScreen'
import { LoadingScreen } from './screens/LoadingScreen'
import { HomeScreen } from './screens/HomeScreen'
import { UsersScreen } from './screens/UsersScreen'

type Screen = 'admin' | 'welcome' | 'login' | 'password' | 'email-password' | 'forgot' | 'loading' | 'home' | 'users'

export default function App() {
  const params = new URLSearchParams(window.location.search)
  const flow = params.get('flow')
  const [screen, setScreen] = useState<Screen>(
    flow === 'admin' ? 'admin' : flow === 'invite' ? 'login' : flow === 'users' ? 'users' : 'welcome'
  )
  const [username, setUsername] = useState('')

  // Auto-advance from loading → home after 1.5 s
  useEffect(() => {
    if (screen !== 'loading') return
    const t = setTimeout(() => setScreen('home'), 1500)
    return () => clearTimeout(t)
  }, [screen])

  return (
    <div className="h-[100dvh] flex flex-col overflow-hidden">
      <div className="flex-1 min-h-0 overflow-y-auto">
        {screen === 'admin' ? (
          <AdminSettingsScreen onToggle={() => setScreen('admin')} />
        ) : screen === 'welcome' ? (
          <WelcomeScreen
            onSignUp={() => setScreen('login')}
            onLogin={() => setScreen('login')}
          />
        ) : screen === 'login' ? (
          <LoginScreen
            onContinue={(u) => {
              setUsername(u)
              setScreen(u.includes('@') ? 'email-password' : 'password')
            }}
          />
        ) : screen === 'email-password' ? (
          <EmailPasswordScreen
            email={username}
            onBack={() => setScreen('login')}
            onForgot={() => setScreen('forgot')}
            onLogin={() => setScreen('loading')}
            onLoginWithCode={() => setScreen('loading')}
          />
        ) : screen === 'password' ? (
          <PasswordScreen
            onBack={() => setScreen('login')}
            onForgot={() => setScreen('forgot')}
            onLogin={() => setScreen('loading')}
            username={username}
            company={flow === 'invite' ? 'Woolworths' : ''}
            orgId={flow === 'invite' ? '93463472' : ''}
          />
        ) : screen === 'forgot' ? (
          <ForgotScreen onReturn={() => setScreen('login')} />
        ) : screen === 'loading' ? (
          <LoadingScreen />
        ) : screen === 'users' ? (
          <UsersScreen />
        ) : (
          <HomeScreen />
        )}
      </div>
    </div>
  )
}
