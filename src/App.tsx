import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/home/home'
import Main from './components/main/main'
import Transactions from './components/transactions/transactions'

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/main/:address' element={<Main/>} />
          <Route path='/main/transactions/:address' element={<Transactions/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
