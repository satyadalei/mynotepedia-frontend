import LoginContext from "./loginContext";
import { useEffect, useState } from "react";

const LogInState = (props)=>{
  // get user login status from local storage
  const userLogInStatus = localStorage.getItem("logInStatus");
  const [logedInStatus, setLogedInStatus] = useState(null);
  useEffect(() => {
    if(userLogInStatus) {
      setLogedInStatus(true)
   }else{
      setLogedInStatus(false)
   }
  }, [logedInStatus, userLogInStatus])
  
  return (
    <LoginContext.Provider value={{logedInStatus,setLogedInStatus}}>
        {props.children}
    </LoginContext.Provider>
  )
}

export default LogInState;