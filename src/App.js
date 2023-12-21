import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import { ToastContainer } from 'react-toastify';
import Add from './components/Add';
import Edit from './components/Edit';
import NavBar from './components/NavBar';
import ListProducts from './components/ListProducts';

function App() {
  return (
    <div className="App">

      <ToastContainer theme='colored' />
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/products' element={<ListProducts />} />
          <Route path='/create' element={<Add />} />
          <Route path='/update/:id' element={<Edit />} />
          <Route path='/' element={<Home />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
