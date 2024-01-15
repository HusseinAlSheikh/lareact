import {Navigate, createBrowserRouter} from 'react-router-dom';
import Login from './views/login';
import Signup from './views/signup';
import Users from './views/users';
import NotFound from './views/NotFound';
import DefaultLayout from './Components/DefaultLayout';
import GuestLayout from './Components/GuestLayout';
import Dashboard from './views/Dashboard';


const router = createBrowserRouter([
    {
        path:'/' , 
        element:<DefaultLayout/>,
        children:[
            {
                path:'/',
                element:<Navigate to="/users"/>
            },
            {
                path:'/users',
                element:<Users/>
            },{
                path:'/dashboard',
                element:<Dashboard/>
            }
        ]
    },
    {
        path:'/' , 
        element:<GuestLayout/>,
        children:[
            {
                path:'/login',
                element:<Login/>
            },
            {
                path:'/signup',
                element:<Signup/>
            }
        ]
    },
   
    {
        path:'*',
        element:<NotFound/>
    },
]);


export default router;