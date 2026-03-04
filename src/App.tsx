import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Reader from './pages/Reader'

export default function App() {
  return (
    <BrowserRouter basename="/tech-docs-v2">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doc/:slug" element={<Reader />} />
      </Routes>
    </BrowserRouter>
  )
}
