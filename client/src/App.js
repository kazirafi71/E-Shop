import './App.css';
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState
} from 'react'

import {BrowserRouter,Route,Switch, useHistory} from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';

import Createpost from './pages/Createpost';
import Profile from './pages/Profile';
import UserDashboard from './pages/UserDashboard';
import { useDispatch } from 'react-redux';
import PrivateRoute from './components/PrivateRoute';
import AdminDashBoard from './pages/AdminDashBoard';
import AdminPrivate from './components/AdminPrivate';
import UserPrivate from './components/UserPrivate';
import NotFound from './pages/NotFound';
import FileUpload from './components/FileUpload';
import AddToCart from './pages/AddToCart'
import ShowOneProduct from './pages/ShowOneProduct';
import AddCategory from './pages/AddCategory';
import ViewOrders from './pages/ViewOrders';
import SidebarAdmin from './components/SidebarAdmin';
import Users from './pages/Users';
import AddProduct from './pages/AddProduct';
import ViewProducts from './pages/ViewProducts';
import EditProduct from './pages/EditProduct'
import Footer from './components/Footer';
import { cartAction } from './redux';
import UpdateUser from './pages/UpdateUser';
import Test from './components/Test';
import Nav from './components/Nav';





const Routing=()=>{
  const history=useHistory()
  const dispatch = useDispatch()
  let userInfo=JSON.parse(localStorage.getItem("user"))
  useEffect(()=>{
    let user=JSON.parse(localStorage.getItem("user"))
    dispatch(cartAction())
    
    //console.log(user)
    
    //  if(!user){
    //   history.push('/login')
      

    // }
    // else{
    //   dispatch({type: 'SET_USER', payload: user})
      
    // }
    if(user){
      dispatch({type: 'SET_USER', payload: user})

    }
    
    
  },[])
   return(
  <Switch>
  <Route path='/' exact>
    <Home/>
    <Footer/>
  </Route>
  <Route path='/login' exact>
    <Login/>
  </Route>
  <Route path='/add-to-cart' exact>
    <AddToCart/>
  </Route>
  <Route path='/register' exact>
    <Register/>
  </Route>
  <PrivateRoute path='/profile' exact>
    <Profile/>
  </PrivateRoute>
  {/* <AdminPrivate path='/product/:postId' exact>
    <UpdateProduct/>
  </AdminPrivate> */}
  <UserPrivate path='/user/dashboard' exact>
    <UserDashboard/>
  </UserPrivate>
  <AdminPrivate path='/admin/dashboard' exact>
    <AdminDashBoard/>
  </AdminPrivate>
  <Route exact path='/product/:postId'>

    <ShowOneProduct/>
    <Footer/>
  </Route>

  <Route exact path='/admin/add-category'>
    <SidebarAdmin/>

                <AddCategory/>
            </Route>
            <Route exact path='/admin/view-orders'>
            <SidebarAdmin/>
                <ViewOrders/>
            </Route>
            <Route exact path='/admin/users'>
            <SidebarAdmin/>
                <Users/>
            </Route>
            <Route exact path='/admin/add-product'>
            <SidebarAdmin/>
                <AddProduct/>
            </Route>
            <Route exact path='/admin/view-products'>
            <SidebarAdmin/>
                <ViewProducts/>
            </Route>
            <Route exact path='/update-product/:postId'>
            <SidebarAdmin/>
                <EditProduct/>
            </Route>
            <Route exact path='/admin/update-user/:userId'>
            <SidebarAdmin/>
                <UpdateUser/>
            </Route>
            <Route exact path='/search'>
              <Test/>
            </Route>

  <Route path='*'>
    <NotFound/>
  </Route>
  
  
</Switch>


  )
 }





function App() {
  let [loading, setLoading] = useState(false);
  let [color, setColor] = useState("orange");

 
  
  return (

   
  <>
      {/* <Navbar/> */}
      <Nav/>
      {/* <FileUpload/> */}
     
     <Routing/>
     
    </>
    
    

   
  );
}

export default App;