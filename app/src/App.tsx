import { Routes, Route } from 'react-router'
import { AuthProvider } from './contexts/AuthContext'
import { Layout } from './components/Layout'
import Home from './pages/Home'
import Login from './pages/Login'
import Professionals from './pages/Professionals'
import Assessment from './pages/Assessment'
import Resources from './pages/Resources'
import Community from './pages/Community'
import Journal from './pages/Journal'

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/professionnels" element={<Professionals />} />
          <Route path="/evaluation" element={<Assessment />} />
          <Route path="/ressources" element={<Resources />} />
          <Route path="/communaute" element={<Community />} />
          <Route path="/journal" element={<Journal />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </AuthProvider>
  )
}
