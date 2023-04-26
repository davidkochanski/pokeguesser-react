import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from 'firebase/auth';
import React from 'react';
import { useState, useEffect, useRef} from 'react';
import ChangeNameModal from './ChangeName';

const auth = getAuth();

const provider = new GoogleAuthProvider();

export default function SignInButton() {
    const [user, setUser] = useState(null);
    const [showNameChange, setShowNameChange] = useState(false);


    const handleClose = () => {
        setShowNameChange(false);
    }
  
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setUser(user);
      });
  
      return () => unsubscribe();
    }, []);

    const handleSignIn = async () => {
      try {
        const result = await signInWithPopup(auth, provider);
        setUser(result.user);
      } catch (error) {
        console.error(error);
      }
    };
  
    const handleSignOut = async () => {
      try {
        await signOut(auth);
        setUser(null);
      } catch (error) {
        console.error(error);
      }
    };



    if (user) {
      return (
        <div className="signed-in" id="signed-in">
          
          
          <img className="signed-in-avatar" src={auth.currentUser.photoURL} alt={user.displayName} />
          <input type="checkbox" id="dropdown-toggle"/>
          <div className="dropdown glass">
            <p>Signed in with Google as</p>
            <p><a onClick={() => {setShowNameChange(true)}}>{user.displayName} <i className="fas fa-pencil"></i></a></p>
            <button className="signed-out" onClick={handleSignOut}>Sign Out</button>
          </div>
            {showNameChange ? <ChangeNameModal onClose={handleClose}/> : ""}

        </div>

      );
    } else {
      return <button className="signed-out" onClick={handleSignIn}>Sign In</button>;
    }
  };