import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Detailspage from './components/Detailspage'
import Homepage from './components/Homepage'

function App() {
  return (
    <>
    <div className= 'w-screen h-full bg-gray-200 dark:bg-darkerBlue'>
    <Header/>
      <BrowserRouter>
        <Routes>
          <Route path="/"element={<Homepage/>}></Route>
          <Route path="/:name" element={<Detailspage/>}></Route>
        </Routes>
      </BrowserRouter>
    
      
    </div>
    </>
  )
}

export default App
