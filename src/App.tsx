import { HashRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Reader from './pages/Reader'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doc/:slug" element={<Reader />} />
      </Routes>
    </HashRouter>
  )
}
