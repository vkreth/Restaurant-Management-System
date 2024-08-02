import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route, Routes,useLocation} from "react-router-dom";
import Auth from "./pages/auth/auth.jsx";
import HomePage from "./pages/home-page/home-page.jsx";
import AdminPage from "./pages/admin-page/admin-page.jsx";
import CustomNavbar from "./components/navbar/customNavbar.jsx";
import FoodItemPage from "./pages/food-item-page/food-item-page.jsx";
import FoodItemAdd from "./pages/food-item-page/food-item-add/FoodItemAdd.jsx";
import FoodMenu from "./pages/food-menu/food-menu.jsx";
import About from "./pages/about-page/about-page.jsx";
import Contact from "./pages/contact-page/contact-page.jsx";
import NotFound from "./pages/not-found-page/not-found-page.jsx";
import Cart from "./pages/cart-page/cart-page.jsx";
import Orders from "./pages/orders-list/user-orders-list.jsx";
import CreateOrder from "./pages/orders-page/create-order.jsx";
import OrdersList from "./pages/orders-list/orders-list.jsx";
import Verify from "./pages/verification-page/Verify.jsx";

function App() {
  const location = useLocation();
  const path = location.pathname;
  const isAdmin = !(path.includes('/admin')) ;
  // Check if localStorage has userDetails, if not redirect to login
  if (!localStorage.getItem('userDetails') && !(['/', '/login', '/register'].includes(path))) {
    window.location.href = '/login';
  } else if (localStorage.getItem('userDetails') && (['/', '/login', '/register'].includes(path))) {
    window.location.href = '/home';
  }

  return (
    <div className={"bg-body-tertiary"}>
      {!([ '/', '/login', '/register', '/verify'].includes(path)) && <CustomNavbar isAdmin={isAdmin}/>}
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Auth />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/foodMenu" element={<FoodMenu />} />
        <Route path="/admin">
          <Route path="" element={<AdminPage />} />
          <Route path="dashboard" element={<AdminPage />} />
          <Route path="foodItems" element={<FoodItemPage/>} />
          <Route path="foodItems/add" element={<FoodItemAdd/>} />
          <Route path="foodItems/edit/:id" element={<FoodItemAdd/>} />
          <Route path="orders" element={<OrdersList />} />
        </Route>
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path='/order' element={<CreateOrder />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
