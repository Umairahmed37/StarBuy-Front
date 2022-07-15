import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { loadUser } from './Components/Actions/UserActions';
import Home from './Components/Home';
import Cart from './Components/Layouts/Cart';
import ChangePass from './Components/Layouts/ChangePass';
import Footer from './Components/Layouts/Footer';
import ForgotPassword from './Components/Layouts/ForgotPassword';
import Header from './Components/Layouts/Header';
import Profile from './Components/Layouts/Profile';
import SetNewPass from './Components/Layouts/SetNewPass';
import UpdateProfile from './Components/Layouts/UpdateProfile';
import PrivateLogin from './Components/PrivateLogin';
import PrivateRoutes from './Components/PrivateRoutes';
import ProductDetails from './Components/Product/ProductDetails';
import './Components/StyleSheets/Sidebar.css';
import Login from './Components/User/Login';
import Register from './Components/User/Register';
import store from './Store';




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


            <Route element={<PrivateRoutes />}>
              <Route path="/me" exact element={<Profile />} />
              <Route path="/cart" exact element={<Cart />} />
              <Route path="/me/update" exact element={<UpdateProfile />} />
              <Route path="/Password/update" exact element={<ChangePass />} />
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
