import { Routes, Route } from 'react-router-dom'
import Homepage from '../src/pages/Homepage'
import Home from '../src/pages/Home'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<Homepage />} />
      <Route path="/" element={<Home />} />
    </Routes>
  )
}

export default AppRoutes