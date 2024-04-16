import { BrowserRouter, Route, Routes } from 'react-router-dom'
import EditBillForm from './components/EditBillForm'
import EditIncomeForm from './components/EditIncomeFrom'
import GastoForm from './components/GastoForm'
import GastoList from './components/GastoList'
import Home from './components/Home'
import IngresoForm from './components/IngresoForm'
import IngresoList from './components/IngresoList'

function App() {
  return (
    <div className='bg-zinc-900 h-screen text-white'>
      <div className='flex items-center justify-center h-full'>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/bill' element={<GastoList />} />
            <Route path='/income' element={<IngresoList />} />
            <Route path='/income/create-incomes' element={<IngresoForm />} />
            <Route path='/bill/create-bills' element={<GastoForm />} />
            <Route path='/edit-bills/:id' element={<EditBillForm />} />
            <Route path='/edit-incomes/:id' element={<EditIncomeForm />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  )
}

export default App
