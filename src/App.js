import About from "./components/About";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import NoteState from "./context/notes/noteState";
import LogInState from "./context/loginstatus/loginState";
import Login from "./components/Login";
import Register from "./components/Register";
import UserState from "./context/user/userState";

function App() {
  return (
    <>
    <BrowserRouter> 
    {/* keep browsRouter at top */}
    {/* write below all thing  */}
    <LogInState>
    <UserState>
    <NoteState>
      <Navbar/>
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/about" Component={About} />
          <Route path="/profile" Component={Profile} />
          <Route path="/login" Component={Login} />
          <Route path="/register" Component={Register} />
        </Routes>
    </NoteState>
    </UserState>
    </LogInState>
    {/*write above all thing  */}
    </BrowserRouter> 
    </>
  );
}

export default App;
