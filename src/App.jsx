import { BrowserRouter, Route, Routes } from 'react-router-dom'
import GastoForm from './components/GastoForm'
import GastoList from './components/GastoList'
import IngresoForm from './components/IngresoForm'
import IngresoList from './components/IngresoList'

function App() {
  return (
    <div className='bg-zinc-900 h-screen text-white'>
      <div className='flex items-center justify-center h-full'>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<GastoList />} />
            <Route path='/income' element={<IngresoList />} />
            <Route path='/income/create-incomes' element={<IngresoForm />} />
            <Route path='/create-bills' element={<GastoForm />} />
            <Route path='/edit-bills/:id' element={<GastoForm />} />
            <Route path='/edit-incomes/:id' element={<IngresoForm />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  )
}

export default App
