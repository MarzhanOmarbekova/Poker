import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Rules from './pages/Rules'
import Lobby from './pages/Lobby'
import Navbar from './components/Navbar'
import JoinRoom from './pages/JoinRoom'
import GamePage from './pages/GamePage'

export default function App() {
  return (
    <div className='min-h-screen from-slate-900 via-indigo-900 to-black text-white'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/rules' element={<Rules />} />
        <Route path='/lobby/:id' element={<Lobby />} />
        <Route path='/join' element={<JoinRoom />} />
        <Route path="/game/:id" element={<GamePage />} />
      </Routes>
    </div>
  )
}