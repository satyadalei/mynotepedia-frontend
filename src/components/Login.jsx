import React, { useState, useContext  } from 'react'
import UserContext from '../context/user/userContext';
import { useNavigate } from 'react-router-dom';
import LoginContext from '../context/loginstatus/loginContext';

const Login = () => {
    const navigate = useNavigate();
    const userContext = useContext(UserContext);
    const loginContext = useContext(LoginContext);
    const {setLogedInStatus} = loginContext;
    const {fetchUser} = userContext;
    const [credentials, setCredentials] = useState({
        email : "",
        password : ""
    });
    const handleChange = (e)=>{
      setCredentials({...credentials,[e.target.name] : e.target.value})
    }
    const handleSubmit = async(e)=>{
        e.preventDefault();
        const host = process.env.REACT_APP_HOST_URL;
       const url = `${host}/api/auth/login`;
       const loginUser = await fetch(url,{
            method:"POST",
            credentials: 'include',
            headers:{
                "content-Type" : "application/json"
            },
            body: JSON.stringify(credentials)
       });
       const response = await loginUser.json();
       if (response.msg === "userLogedIn") {
         // fetch user
         fetchUser()
         //set login status to true in local storage
         localStorage.setItem("logInStatus", true);
         //set login status true in logincontext as well
         setLogedInStatus(true);
         //redirect to home page
         navigate("/");
       }else{
        // handle error here
        console.log(response);
       }
    }
    return (
        <>
            <div className='container my-3' >
                <form>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input name='email' onChange={handleChange} value={credentials.email} type="email" className="form-control"  aria-describedby="emailHelp"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input name='password' onChange={handleChange} value={credentials.password} type="password" className="form-control" />
                    </div>
                    <button onClick={handleSubmit} className="btn btn-primary">Login</button>
                </form>
            </div>
        </>
    )
}

export default Login