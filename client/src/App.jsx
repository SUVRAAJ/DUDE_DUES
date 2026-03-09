import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import ProtectedRoutes from './components/ProtectedRoutes'
import CreateGroup from './pages/CreateGroup'
import GroupDetail from './pages/GroupDetail'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/dashboard' element={
          <ProtectedRoutes>
            <Dashboard/>
          </ProtectedRoutes>
        } />
        <Route path='/create-group' element={
          <ProtectedRoutes>
            <CreateGroup/>
          </ProtectedRoutes>
        }/>
        <Route path='group/:id' element={
          <ProtectedRoutes>
            <GroupDetail/>
          </ProtectedRoutes>
        }/>

      </Routes>
    </BrowserRouter>
  )
}

export default App