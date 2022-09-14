import { Routes, Route } from 'react-router-dom'
import { Home } from '../pages/Home'
import { History } from '../pages/History'
import { NotFound } from '../pages/NotFound'

export function Router() {
  return (
    <Routes>
      <Route path="*" element={<NotFound />} />
      <Route path="/" element={<Home />} />
      <Route path="/history" element={<History />} />
    </Routes>
  )
}
