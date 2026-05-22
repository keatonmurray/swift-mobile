import { Routes, Route } from 'react-router-dom'
import Homepage from '../src/pages/Homepage'
import Home from '../src/pages/Home'
import SendMoney from '../src/pages/SendMoney'
import Recipient from '../src/pages/Recipient'
import ReceiveMoney from '../src/pages/ReceiveMoney'
import AcceptPayment from '../src/pages/AcceptPayment'
import AddMoney from '../src/pages/AddMoney'
import Convert from '../src/pages/Convert'
import Login from '../src/pages/Login'
import Register from '../src/pages/Register'
import CreateWallet from '../src/pages/CreateWallet'
import SelectAccountType from '../src/pages/SelectAccountType'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard/:id" element={<Homepage />} />
      <Route path="/send-money" element={<SendMoney />} />
      <Route path="/receive-money" element={<ReceiveMoney />} />
      <Route path="/recipient" element={<Recipient />} />
      <Route path="/accept-payment" element={<AcceptPayment />} />
      <Route path="/add-money" element={<AddMoney />} />
      <Route path="/convert" element={<Convert />} />
      <Route path="/create-wallet" element={<CreateWallet />} />
      <Route path="/select-account-type" element={<SelectAccountType />} />
    </Routes>
  )
}

export default AppRoutes