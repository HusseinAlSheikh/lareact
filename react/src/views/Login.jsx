import {Link} from 'react-router-dom';
export default function Login() {
    const onSubmitHandler = (event) =>{
        event.preventDefault();
    };
    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <form onSubmit={onSubmitHandler}>
                    <h1 className="title">
                        Login into laravel react
                    </h1>
                    <input type="email" placeholder="Email"/>
                    <input type="password" placeholder="Password"/>
                    <button className="btn btn-block">Login</button>
                    <p className="message">
                        Not Registered <Link to="/signup">Create an account </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};