import { Auth } from 'components/pages/Auth'
import { DetailPost } from 'components/pages/DetailPost'
import { Route, Routes } from 'react-router'
import { Main } from './components/pages/Main'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="/main" element={<Main />} />
      <Route path="/main/:id" element={<DetailPost />} />
    </Routes>
  )
}

export default App
