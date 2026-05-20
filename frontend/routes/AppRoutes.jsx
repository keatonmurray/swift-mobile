import { Routes, Route } from 'react-router-dom'
import Homepage from '../src/pages/Homepage'
import Home from '../src/pages/Home'
import SendMoney from '../src/pages/SendMoney'
import Recipient from '../src/pages/Recipient'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Homepage />} />
      <Route path="/send-money" element={<SendMoney />} />
      <Route path="/recipient" element={<Recipient />} />
    </Routes>
  )
}

export default AppRoutes