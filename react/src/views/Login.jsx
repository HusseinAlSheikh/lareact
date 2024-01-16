import { useRef, useState } from 'react';
import {Link} from 'react-router-dom';
import axiosClient from '../axios-client';
import { useStateContext } from '../contexts/ContextProvider';
export default function Login() {
   
    const emailRef = useRef();
    const passwordRef = useRef();
    const [errors,setErrors] = useState(null);

    const {setUser,setToken} = useStateContext();



    const onSubmitHandler = (event) =>{
        event.preventDefault();
        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
          };
          setErrors(null);
          axiosClient.post('/login',payload).then(({data})=>{
              setUser(data.user);
              setToken(data.token);
          }).catch(err => {
              const response = err.response;
              console.log(err);
              if (response && response.status == 422){
                  //--- validation error
                  if(response.data.errors){
                    setErrors(response.data.errors);
                  }else{
                     setErrors({email:[response.data.message]});
                  }
              }
          });
    };
    return (
        
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <form onSubmit={onSubmitHandler}>
                    <h1 className="title">
                        Login into laravel react
                    </h1>
                    {errors && 
                        <div className="alert">
                            {Object.keys(errors).map(key=>(
                                <p key={key}>{errors[key][0]}</p>
                            ))}
                        </div>
                    }
                    <input type="email" placeholder="Email" ref={emailRef}/>
                    <input type="password" placeholder="Password" ref={passwordRef}/>
                    <button className="btn btn-block">Login</button>
                    <p className="message">
                        Not Registered <Link to="/signup">Create an account </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};