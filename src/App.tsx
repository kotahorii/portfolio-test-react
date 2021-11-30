import { Auth } from 'components/pages/Auth'
import { Route, Routes } from 'react-router'
import { Main } from './components/pages/Main'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="/main" element={<Main />} />
    </Routes>
  )
}

export default App
