import {Link} from "react-router-dom";
import {useRef, useState} from 'react';
import axiosClient from "../axios-client";
import {useStateContext} from "../contexts/ContextProvider";

export default function Signup() {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();
    const [errors,setErrors] = useState(null);

    const {setUser,setToken} = useStateContext();

    const onSubmitHandler = (event) =>{
        event.preventDefault();
        const payload = {
          name: nameRef.current.value,
          email: emailRef.current.value,
          password: passwordRef.current.value,
          password_confirmation: passwordConfirmationRef.current.value,
        };
        setErrors(null);
        axiosClient.post('/signup',payload).then(({data})=>{
            setUser(data.user);
            setToken(data.token);
        }).catch(err => {
            const response = err.response;
            console.log(err);
            if (response && response.status == 422){
                //--- validation error
                setErrors(response.data.errors);
            }
        });
    };

    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <form onSubmit={onSubmitHandler}>
                    <h1 className="title">
                        SignUp into laravel react
                    </h1>
                    {errors && 
                        <div className="alert">
                            {Object.keys(errors).map(key=>(
                                <p key={key}>{errors[key][0]}</p>
                            ))}
                        </div>
                    }
                    <input type="text" placeholder="Full Name" ref={nameRef}/>
                    <input type="email" placeholder="Email" ref={emailRef}/>
                    <input type="password" placeholder="Password" ref={passwordRef}/>
                    <input type="password" placeholder="Password Confirmation" ref={passwordConfirmationRef}/>
                    <button className="btn btn-block">Create Account</button>
                    <p className="message">
                        has an account ?<Link to="/login"> Login </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};