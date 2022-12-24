import Provider from './context/AuthContext'
import NavBar from './components/NavBar/NavBar';
import Home from './components/Home/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import AvailableUserDetail from './components/AvailableUsersDetail/AvailableUserDetail';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

function App() {
  return (
    <div className="App">
      <Provider>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/:id' element={<AvailableUserDetail />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  )
}

export default App
