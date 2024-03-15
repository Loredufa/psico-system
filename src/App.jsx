import { BrowserRouter, Route, Routes } from 'react-router-dom'
import GastoForm from './components/GastoForm'
import GastoList from './components/GastoList'

function App() {


  return (
      <div className='bg-zinc-900 h-screen text-white'>
        <div className='flex items-center justify-center h-full'>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<GastoList />} />
              <Route path='/create-bills' element={<GastoForm />} />
              <Route path='/edit-bills/:id' element={<GastoForm />} />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
  )
}

export default App
