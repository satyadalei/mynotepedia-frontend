import { useState } from "react";
import userContext from "./userContext";


const UserState = (props) => {
  //gets_api_url from .env file
  const host = process.env.REACT_APP_HOST_URL;
  const [user, setUser] = useState(null);
  const fetchUser = async () => {
    const url = `${host}/api/auth/getuser`;
    const fetchUser = await fetch(url, {
      method: "GET",
      credentials: 'include',
      headers: { "Content-Type": "application/json" }
    });
    const response = await fetchUser.json();
    if (response.success) {
      setUser(response.user);
      //return user like 
      //   {
      //     "_id": "645637e4fc803a32af0c331d",
      //     "name": "harihara kar",
      //     "email": "hari@gmail.com",
      //     "date": "2023-05-06T11:20:04.160Z",
      //     "__v": 0
      // }
      //set localstorage login status = true
      localStorage.setItem("logInStatus", true);
    }else{
       console.log(response);
    }
  }
  return (
    <userContext.Provider value={{ user, fetchUser }} >
      {props.children}
    </userContext.Provider>
  )
}
export default UserState;