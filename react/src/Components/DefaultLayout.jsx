import { Outlet ,Navigate,Link} from "react-router-dom";
import {useStateContext} from "../contexts/ContextProvider";
import { useEffect } from "react";
import axiosClient from "../axios-client";

export default function DefaultLayout(){
    const {user,token,setUser,setToken} = useStateContext();

    if (!token){
        return <Navigate to="/login"/>
    }


    const logoutHandler = (event) =>{
        event.preventDefault();

        axiosClient.post('/logout')
        .then(()=>{
            setUser({});
            setToken(null);
        });
    }

    useEffect(()=>{

        axiosClient.get('/user')
        .then(({data})=>{
            setUser(data);
        }).catch(err => {
            console.error(err);
        });
        console.log('effect process');
    },[]);


    return (
        <div id="defaultLayout">
            <aside>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/users">Users</Link>
            </aside>
            <div className="content">
                <header>
                    <div>
                        Header
                    </div>
                    <div>
                        {user && user.name}
                        <a className="btn-logout" href='#' onClick={logoutHandler}>Logout</a>
                    </div>
                </header>
                <main>
                    <Outlet/>
                </main>
            </div>
        </div>
    );
};