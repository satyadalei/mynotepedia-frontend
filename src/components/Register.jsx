import React, { useContext, useState } from 'react'
import UserContext from '../context/user/userContext'
import { useNavigate } from 'react-router-dom';
import LoginContext from '../context/loginstatus/loginContext';

const Register = () => {
  const loginContext = useContext(LoginContext);
  const {setLogedInStatus} = loginContext;
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    cpassword: "",
    password: ""
  });
  const userConetx = useContext(UserContext);
  const { fetchUser } = userConetx;
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credentials;
    if (credentials.password === credentials.cpassword) {
      const host = process.env.REACT_APP_HOST_URL;
      const url = `${host}/api/auth/createuser`;
      const creatUser = await fetch(url, {
        method: "POST",
        credentials: 'include',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
      });
      const response = await creatUser.json();
      console.log(response);
      if (response.msg === 'userCreated' && response.success === true) {
        //set local storage status loged in
        localStorage.setItem("logInStatus", true);
        //set loginStatus true in app
        setLogedInStatus(true)
        // make all registration field to normal
        setCredentials({ name: "", email: "", cpassword: "", password: "" });
        //fetch user 
        fetchUser();
        //redirect to home page
        navigate("/")
        //show related notes
      } else {
        console.log("some error occured");
      }
    } else {
      console.log("Please enter correct same password");
    }
  }

  return (
    <>
      <div className='container my-3' >
        <form>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input name='name' onChange={handleChange} value={credentials.name} type="name" className="form-control" aria-describedby="emailHelp" />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input name='email' onChange={handleChange} value={credentials.email} type="email" className="form-control" aria-describedby="emailHelp" />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input name='password' onChange={handleChange} value={credentials.password} type="password" className="form-control" />
          </div>
          <div className="mb-3">
            <label htmlFor="cpassword" className="form-label">Confirm Password</label>
            <input name='cpassword' onChange={handleChange} value={credentials.cpassword} type="password" className="form-control" />
          </div>
          <button onClick={handleSubmit} className="btn btn-primary">Register</button>
        </form>
      </div>
    </>
  )
}

export default Register