import logo from './logo.svg';
import './App.css';
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import Home from './Components/Home';
import Login from './Components/Login';
import Profile from './Components/Profile';
import Buy from './Components/Buy';
import Post from './Components/Post';
import ProductViewPage from './Components/ProductViewPage';
import Signup from './Components/Signup';


function App() {

  const route = createBrowserRouter([
   
{
  path:'/',
  element:<Home/>
} ,
{
  path:'/Login',
  element:<Login/>
},
{
  path:'/Signup',
  element:<Signup/>
},
{
  path:'/Profile',
  element:<Profile/>
},
{
  path:'/Post',
  element:<Post/>
},
{
  path:'/Buy',
  element:<Buy/>
},
{
  path:'/product/:id',
  element:<ProductViewPage/>
},
 
    
  ]
  )
  return (
    <div>
      <RouterProvider router={route}/>
    </div>
     
  );
}

export default App;
