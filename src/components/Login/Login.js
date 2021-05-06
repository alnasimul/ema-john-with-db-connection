import React, { useContext } from 'react';
import { useState } from "react";
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import { createUserWithEmailAndPassword,handleGoogleSignIn,handleFbSignIn, handleSignOut, initializeLoginFramework, signInWithEmailAndPassword } from './loginManager';





function Login() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    photo: '',
    error: '',
    success: false
  })

  initializeLoginFramework();

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  const history = useHistory();
  const location = useLocation();

  console.log(history);
  console.log(location);
  console.log(location.state);

  let { from } = location.state || { from: { pathname: "/" } };

  const googleSignIn = () => {
    handleGoogleSignIn()
      .then(res => {
        handelResponse(res, true);
      })
  }

  const fbSignIn = () => {
    handleFbSignIn()
      .then(res => {
        console.log(res);
        handelResponse(res, true);
      })
  }

  const signOut = () => {
    handleSignOut();
    const signedOutUser = {
      isSignedIn: false,
      name: '',
      email: '',
      photo: '',
      error: '',
      success: false
  }
  handelResponse(signedOutUser, false)
  console.log("logged out successfully")
  }

  const handelBlur = (e) => {
    let isFieldValid = true;
    if (e.target.name === "email") {
      const re = /\S+@\S+\.\S+/;
      isFieldValid = re.test(e.target.value);
      console.log(isFieldValid);
    } else if (e.target.name === "password") {
      const isPasswordValid = e.target.value.length > 6;
      const re = /\d{1}/;
      const passwordHasNumber = re.test(e.target.value);
      isFieldValid = isPasswordValid && passwordHasNumber;
      console.log(isFieldValid);
    }
    if (isFieldValid) {
      const newUserInfo = { ...user }
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
      // console.log(user);

    }
  }

  const handelSubmit = (e) => {
    // console.log(user.email,user.password);
    if (newUser && user.email && user.password) {
      createUserWithEmailAndPassword(user.name, user.email, user.password)
        .then(res => {
          handelResponse(res, true);
        })
    }
    if (!newUser && user.email && user.password) {
      signInWithEmailAndPassword(user.email, user.password)
        .then(res => {
          handelResponse(res, true);
        })
    }
    e.preventDefault();
  }

  const handelResponse = (res, redirect) => {
    setUser(res);
    setLoggedInUser(res);

    if (redirect) {
      history.replace(from)
    }
  }

  return (
    <div className="App">
    
      <button onClick={googleSignIn}>Sign In</button>
      {/* { user.isSignedIn ? <button onClick={signOut}>Sign Out</button> :
        <button onClick={googleSignIn}>Sign In</button>
      } */}
      
      <br />
      {/* { user.isSignedIn ? <button onClick={signOut}>Sign Out</button> :
        <button onClick={fbSignIn}>Sign in using Facebook</button>
      } */}
      {/* {
        user.isSignedIn && <div>
          <p>Welcome, {user.name}!</p>
          <p>Your email: {user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      } */}

      <h1>Our own Authentication</h1>
      {/* <p>Name: {user.name}</p>
      <p>Email : {user.email}</p>
      <p>Password : {user.password}</p> */}
      <br/>
      <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
      <label htmlFor="newUser">New User Sign up</label>
      <form onSubmit={handelSubmit}>
        {newUser && <input type="text" name="name" placeholder="Your Name" onBlur={handelBlur} required />}
        <br />
        <input type="text" name="email" placeholder="Your Email Address" required onBlur={handelBlur} />
        <br />
        <input type="password" name="password" id="" placeholder="Your Password" required onBlur={handelBlur} />
        <br />
        <input type="submit" value={newUser ? 'Sign up' : 'Sign in'} />
      </form>
       {/* <p style={{ color: 'red' }}>{user.error}</p>  */}
       {/* {user.success && <p style={{ color: 'green' }}>User {newUser ? 'Created' : 'Logged in'} Successfully</p>} */}
    </div>
  );
}

export default Login;
