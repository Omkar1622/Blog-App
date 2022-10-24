import './App.css';
import {BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import Login from './pages/Login';
import { useState } from 'react';
import { signOut } from 'firebase/auth';
import {auth} from "./firebase-config";

function App() {
// don't set the value of isAuth to false initially because when we are logged in and we refresh the page, 
// we get the login page and it did not show that we are logged in, but we are actually logged in.
  // const [isAuth, setIsAuth] = useState(false);  // whenever we refresh, it is set false even when we are logged in.

  // so instead get it from localeStorage as we added it in localeStorage. if it is present, it is true. if not present, then false.
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  const signUserOut = () => {
      signOut(auth).then(() => {
        localStorage.clear();  // Clear the locale storage which contained the info about the isAuth
        setIsAuth(false);  // set isAuth to false, as we logged out.

        // As we logged out, now Redirect the user to login page so that he can login again with any account
        // we cannot use useNavigate Function here because , we are currently outside of the component, and not inside of the Router.
        //  we cannot use useNavigate function outside of the Router, as it is a function of react-router-dom.
        // Login Page was inside of the router, soo we were able to use it there.
        window.location.pathname = "/login";
      })
  };

  return (
    <>
    <Router>
      <nav>
        <Link to="/"> Home </Link>

        {/* If isAuth is not true, then show the Login Page. If isAuth is true, then show the Logout button and Create Post Page.  */}
        {!isAuth ? (
           <Link to="/login"> Login </Link>
        ) : (
            <>
             <Link to="/createpost"> Create Post </Link>
             <button onClick={signUserOut}> Log Out </button> 
            </>
        )}
      </nav>
      <Routes>
          <Route path="/" element={<Home isAuth={isAuth}/>} />
          <Route path="/createpost" element={<CreatePost isAuth={isAuth} />} />
          <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
