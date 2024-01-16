import {createContext,useState,useContext} from 'react';
const StateContext = createContext({
    user  : {} ,
    token : null,
    setToken : ()=>{},
    setUser  : ()=>{}
});

export const ContextProvider = (props) =>{
    const [user,setUser] = useState();
    const [token,setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));

    function setTokenHandler(t) {
        setToken(t);
        if (t){
            localStorage.setItem('ACCESS_TOKEN',t);
        }else{
            localStorage.removeItem('ACCESS_TOKEN')
        }
    }

    return (
        <StateContext.Provider value={{
            user,
            token,
            setToken:setTokenHandler,
            setUser
        }}>
            {props.children}
        </StateContext.Provider>
    );
};


export const useStateContext = ()=>useContext(StateContext);