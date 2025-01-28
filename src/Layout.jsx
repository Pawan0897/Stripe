
import { Route, Routes } from 'react-router-dom'
import Step2 from './Components/Stripe/Step2'

export default function Layout() {
  return (
   <Routes>
    <Route path='/' element={<Step2 />} />
   </Routes>
  )
}
