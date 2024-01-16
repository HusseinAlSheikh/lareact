import { useEffect, useState } from "react";
import axiosClient from "../axios-client";

export default function Users() {
    const [users,setUsers] = useState([]);
    const [loading,setLoading] = useState(false);

    const getUsers = () => {
        setLoading(true);
        axiosClient.get('/users')
        .then(({data})=>{
            setLoading(false);
            console.log(data);
        }).catch(() => {
            setLoading(false);
        });
    }


    useEffect(()=>{
        getUsers();
    },[]);

 


    return (
            <div>
                Users555
            </div>
        
    );
};