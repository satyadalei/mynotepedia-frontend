import { Link, useLocation, useNavigate } from 'react-router-dom';
import LoginContext from '../context/loginstatus/loginContext';
import { useContext } from 'react';
const Navbar = () => {
    const navigate = useNavigate();
    let location = useLocation();
    const loginContext = useContext(LoginContext);
    const { logedInStatus,setLogedInStatus } = loginContext;
    const handleLogOut = async () => {
        const url = 'http://localhost:7000/api/auth/logout'
        const logOutUser = await fetch(url, {
            method: "GET",
            credentials: 'include',
            headers: {
                "content-Type": "application/json"
            }
        });
        const response = await logOutUser.json();
        console.log(response);
        if (response.success && response.msg === "logedOut") {
            //user loged out successfully
            // logOut locally on local storage
            localStorage.removeItem("logInStatus");
            //set login status to false
            setLogedInStatus(false);
            //navigate to homepage
            navigate('/');
        }else{
            console.log(response);
        }
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Navbar</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/' && 'active'}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/profile" && 'active'}`} to="/profile">Profile</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/about " && 'active'}`} to="/about">About</Link>
                            </li>
                        </ul>
                        <div className="d-flex">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                {logedInStatus ?
                                    <li className="nav-item">
                                        <Link className="nav-link" aria-current="page">
                                            <button onClick={handleLogOut} className="btn btn-primary" type="submit">Log Out</button>
                                        </Link>
                                    </li>
                                    : <>
                                        <li className="nav-item">
                                            <Link className="nav-link" aria-current="page" to="/login">
                                                <button className="btn btn-primary" type="submit">LogIn</button>
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" aria-current="page" to="/register">
                                                <button className="btn btn-primary" type="submit">Register</button>
                                            </Link>
                                        </li>
                                    </>}
                            </ul>
                        </div>


                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar