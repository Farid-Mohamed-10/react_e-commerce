import { Route, Routes } from 'react-router-dom';
import HomePage from './Pages/Website/HomePage/HomePage';
import Login from './Pages/Auth/AuthOperations/Login';
import Register  from './Pages/Auth/AuthOperations/Register';
import Users from './Pages/Dashboard/Users/Users';
import GoogleCallback from './Pages/Auth/AuthOperations/GoogleCallback';
import Dashboard from './Pages/Dashboard/Dashboard';
import RequireAuth from './Pages/Auth/Protecting/RequireAuth';
import User from './Pages/Dashboard/Users/User';
import AddUser from './Pages/Dashboard/Users/AddUser';
import Error404 from './Pages/Auth/Errors/404';
import RequireBack from './Pages/Auth/Protecting/RequireBack';
import Categories from './Pages/Dashboard/Categories/Categories';
import AddCategory from './Pages/Dashboard/Categories/AddCategory';
import UpdateCategory from './Pages/Dashboard/Categories/UpdateCategory';
import Products from './Pages/Dashboard/Products/Products';
import AddProduct from './Pages/Dashboard/Products/AddProduct';
import UpdateProduct from './Pages/Dashboard/Products/UpdateProduct';
import WebsiteCategories from './Pages/Website/Categories/Categories';
import Website from './Pages/Website/Website';
import SingleProduct from './Pages/Website/SingleProduct/SingleProduct';
import Checkout from './Pages/Checkout/Checkout';

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Public Routes */}
        <Route element={<Website />}>
          <Route path='/' element={<HomePage />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path="/categories" element={<WebsiteCategories />} />
          <Route path="/product/:id" element={<SingleProduct />} />
        </Route>
        <Route element={<RequireBack />}>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Route>
        <Route path='/auth/google/callback' element={<GoogleCallback />} />
        <Route path='/*' element={<Error404 />} />

        {/* Protected Routes */}
        <Route element={<RequireAuth allowedRole={["1996", "1995", "1999"]} />}>
          <Route path='/dashboard' element={<Dashboard />}>
            <Route element={<RequireAuth allowedRole={["1995"]} />}>
              <Route path='users' element={<Users />} />
              <Route path='users/:id' element={<User />} />
              <Route path='user/add' element={<AddUser />} />
            </Route>
            <Route element={<RequireAuth allowedRole={["1999", "1995"]} />}>
              {/* Categories */}
              <Route path='categories' element={<Categories />} />
              <Route path='categories/:id' element={<UpdateCategory />} />
              <Route path='category/add' element={<AddCategory />} />
              {/* Products */}
              <Route path='products' element={<Products />} />
              <Route path='product/add' element={<AddProduct />} />
              <Route path='products/:id' element={<UpdateProduct />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
