import { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import {Link} from 'react-router-dom';

export default function Users() {
    const [users,setUsers] = useState([]);
    const [loading,setLoading] = useState(false);

    const getUsers = () => {
        setLoading(true);
        axiosClient.get('/users')
        .then(({data})=>{
            setLoading(false);
            setUsers(data.data);
            console.log(data);
        }).catch(() => {
            setLoading(false);
        });
    };


    useEffect(()=>{
        getUsers();
    },[]);

    const deleteUserHandler = (user) => {
        if (!window.confirm("Are you sure ?")){
            return;
        }

        axiosClient.delete('/users/'+user.id)
            .then(()=>{
                //show notification
                getUsers();
            });

    };


    return (
       <div >
           <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
               <h1>Users</h1>
               <Link to="/users/new" className="btn-add">Add User</Link>
           </div>
           <div className="card animated fadeInDown">
               <table>
                   <thead >
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Create Date</th>
                        <th>Actions</th>
                    </tr>
                   </thead>
                   <tbody>
                        <td colSpan="5" className="text-center">
                                Loading .... ...
                        </td>
                   </tbody>
                   <tbody>
                        {users.map(u=>{return (
                            <tr>
                                <td>{u.id}</td>
                                <td>{u.name}</td>
                                <td>{u.email}</td>
                                <td>{u.created_at}</td>
                                <td>
                                    <Link to={'/users/'+u.id} className="btn-edit"> Edit </Link>
                                    &nbsp;
                                    <button onClick={ev => deleteUserHandler(u)} className="btn-delete">Delete</button>
                                </td>
                            </tr>
                        )})}
                   </tbody>
               </table>
           </div>
       </div>
    );
};