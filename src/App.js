import './App.css';
import NavBar from './Components/Navbar';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import { useSelector } from 'react-redux';
import Newproduct from "./Pages/Newproduct"
import Productpage from "./Pages/Productpage"
import Categorypage from './Pages/Categorypage';
import Cart from './Pages/Cart';
import Orders from './Pages/Orders';
import AdminDashboard from './Pages/AdminDashboard';
import EditProduct from './Pages/EditProduct';
import Profile from "./Pages/Profile"

function App() {
  const user = useSelector((state) => state.user)
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        {!user && (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </>
        )
        }
        <Route path='*' element={user ? <Home /> : <Login />} />


        {/* {!user && (
          <>
            <Route path='/login' element={<Login />} />
          </>
        )} */}
        {user && (
          <>
            <Route path='/' element={<Home />} />
            <Route path='/cart' element={<Cart />} />
            <Route path="/orders" element={<Orders />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/product/:id' element={<Productpage />} />
            <Route path='/category/:category' element={<Categorypage />} />
          </>
        )}
        {user && user.isAdmin && (
          <>
            <Route path='/admin' element={<AdminDashboard />} />
            <Route path='/createProduct' element={<Newproduct />} />
            <Route path='product/:id/edit' element={<EditProduct />} />
            <Route path='/product/:id' element={<Productpage />} />
            <Route path='/category/:category' element={<Categorypage />} />
          </>
        )}

      </Routes>
    </BrowserRouter>
  );
}

export default App;
