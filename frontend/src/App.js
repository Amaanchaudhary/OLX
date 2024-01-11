import './App.css';
import { Routes, Route } from 'react-router-dom';
import PageNotFound from './Components/PageNotFound';
import Homepage from './Components/Homepage';
import Login from './Components/Login';
import Register from './Components/Register';
import YourProducts from './Components/YourProducts';
import AddProduct from './Components/AddProducts';
import UpdateProduct from './Components/UpdateProduct';
import Navbar from './Components/Navbar';
import Profile from './Components/Profile';
import Cart from './Components/Cart';
import SingleProduct from './Components/SingleProduct';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route exact path='*' element={<PageNotFound />} />
        <Route exact path='/' element={<Homepage />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/register' element={<Register />} />
        <Route exact path='/addproduct' element={<AddProduct/>}/>
        <Route exact path='/yourproducts' element={<YourProducts/>}/>
        <Route exact path='/profile' element={<Profile/>}/>
        <Route exact path='/cart' element={<Cart/>}/>
        <Route exact path='/updateproduct/:id' element={<UpdateProduct />}/>
        <Route exact path='/single-product/:id' element={<SingleProduct />}/>
        <Route exact path='/navbar' element={<Navbar/>}/>
      </Routes>
    </div>
  );
}

export default App;
