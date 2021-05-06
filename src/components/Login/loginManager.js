import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";

export const initializeLoginFramework = () => {
    if(firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }
}

export const handleGoogleSignIn = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(googleProvider)
    .then(res => {
      const {displayName, photoURL, email} = res.user;
      const signedInUser = {
        isSignedIn: true,
        name: displayName,
        email: email,
        photo: photoURL,
        success: true
      };
      return signedInUser;
    })
    .catch(err => {
      console.log(err);
      console.log(err.message);
    })
}

export const handleFbSignIn = () => {
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(fbProvider).then(function(result) {
      var token = result.credential.accessToken;
      const {displayName, photoURL, email} = result.user;
      const signedInUser = {
        isSignedIn: true,
        name: displayName,
        email: email,
        photo: photoURL,
        success: true
      };
      // console.log(user);
      // debugger;
      // user.isSignedIn = true;
      // user.success = true;
      return signedInUser;
    }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode, errorMessage)
    });
  }


  export const handleSignOut = () => {
    return firebase.auth().signOut()
        .then(()=> {
           
        }).catch(err => {
            // An error happened.
        });
}

export const createUserWithEmailAndPassword = (name,email,password) => {
   return firebase.auth().createUserWithEmailAndPassword(email,password)
    .then((res) => {
      const newUserInfo = res.user;
      newUserInfo.error = '';
      newUserInfo.success = true;
      updateUserName(name);
      return newUserInfo;
      //  setLoggedInUser(newUserInfo);
      //console.log('sign in user info',res.user);
    
    })
    .catch((error) => {
      const newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo;
      // var errorCode = error.code;
      // var errorMessage = error.message;
      // console.log(errorCode,errorMessage);
    });
}

export const signInWithEmailAndPassword = (email,password) => {
   return firebase.auth().signInWithEmailAndPassword(email,password)
    .then(res => {
      const newUserInfo = res.user;
      newUserInfo.error = '';
      newUserInfo.success = true;
      return newUserInfo;
     // updateUserName(name);
    })
    .catch(error => {
      const newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo;
    })
}

const updateUserName = name => {
    const user = firebase.auth().currentUser;
    
    console.log(user);

    user.updateProfile({
      displayName: name,
    }).then(function() {
      console.log('username updated successfully')
    }).catch(function(error) {
      console.log(error)
    });
  }