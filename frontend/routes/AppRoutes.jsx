import { Routes, Route } from 'react-router-dom'
import Homepage from '../src/pages/Homepage'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<Homepage />} />
    </Routes>
  )
}

export default AppRoutes