import { Routes, Route } from 'react-router-dom'
import Homepage from '../src/pages/Homepage'
import Home from '../src/pages/Home'
import SendMoney from '../src/pages/SendMoney'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Homepage />} />
      <Route path="/send-money" element={<SendMoney />} />
    </Routes>
  )
}

export default AppRoutes