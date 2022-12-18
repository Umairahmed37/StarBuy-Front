import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { loadUser } from './Components/Actions/UserActions';
import Home from './Components/Home';
import Cart from './Components/Layouts/Cart';
import ChangePass from './Components/Layouts/ChangePass';
import ConfirmOrder from './Components/Layouts/ConfirmOrder';
import Footer from './Components/Layouts/Footer';
import ForgotPassword from './Components/Layouts/ForgotPassword';
import Header from './Components/Layouts/Header';
import OrderSuccess from './Components/Layouts/OrderSuccess';
import Profile from './Components/Layouts/Profile';
import SetNewPass from './Components/Layouts/SetNewPass';
import Shipping from './Components/Layouts/Shipping';
import UpdateProfile from './Components/Layouts/UpdateProfile';
import UserOrders from './Components/Layouts/Orders/UserOrders';
import PrivateCart from './Components/PrivateRoutes/PrivateCart';
import PrivateLogin from './Components/PrivateRoutes/PrivateLogin';
import PrivateRoutes from './Components/PrivateRoutes/PrivateRoutes';
import ProductDetails from './Components/Product/ProductDetails';
import './Components/StyleSheets/Sidebar.css';
import Login from './Components/User/Login';
import Register from './Components/User/Register';
import store from './Store';
import SingleOrder from './Components/Layouts/Orders/SingleOrder';

function App() {
  useEffect(() => {
    store.dispatch(loadUser())
  }, [])


  return (
    <Router>

      <div>
        <Header />
        <div>
          <Routes>
            
            <Route path="/" exact element={<Home />} />
            <Route path="/search/:keyword" element={<Home />} />
            <Route path="/Product/:id" exact element={<ProductDetails />} />
            <Route path="/Register" exact element={<Register />} />
            <Route path="/Forgot/Password" exact element={<ForgotPassword />} />

            {/* //ONLY LOGGED IN CAN ACCESS */}
            <Route element={<PrivateRoutes />}>
              <Route path="/me" exact element={<Profile />} />
              <Route path="/me/update" exact element={<UpdateProfile />} />
              <Route path="/Password/update" exact element={<ChangePass />} />
              <Route path="/Shipping" exact element={<Shipping />} />
              <Route path="/ConfirmOrder" exact element={<ConfirmOrder />} />
              <Route path="/OrderSuccess" exact element={<OrderSuccess />} />
              <Route path="/Orders/me" exact element={<UserOrders />} />
              <Route path="/Order/:id" exact element={<SingleOrder />} />
            </Route>

            <Route element={<PrivateCart />}>
              <Route path="/cart" exact element={<Cart />} />
            </Route>

            <Route element={<PrivateLogin />}>
              <Route path="/Login" exact element={<Login />} />
              <Route path="/password/reset/:token" exact element={<SetNewPass />} />
            </Route>

          </Routes>
        </div>

        <Footer />

      </div>

    </Router>
  );
}

export default App;
