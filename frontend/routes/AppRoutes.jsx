import { Routes, Route } from 'react-router-dom'
import Homepage from '../src/pages/Homepage'
import Home from '../src/pages/Home'
import SendMoney from '../src/pages/SendMoney'
import Recipient from '../src/pages/Recipient'
import ReceiveMoney from '../src/pages/ReceiveMoney'
import AcceptPayment from '../src/pages/AcceptPayment'
import AddMoney from '../src/pages/AddMoney'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Homepage />} />
      <Route path="/send-money" element={<SendMoney />} />
      <Route path="/receive-money" element={<ReceiveMoney />} />
      <Route path="/recipient" element={<Recipient />} />
      <Route path="/accept-payment" element={<AcceptPayment />} />
      <Route path="/add-money" element={<AddMoney />} />
    </Routes>
  )
}

export default AppRoutes