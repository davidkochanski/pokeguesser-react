import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from 'firebase/auth';
import React from 'react';
import { useState, useEffect } from 'react';

const auth = getAuth();

const provider = new GoogleAuthProvider();

export default function SignInButton() {
    const [user, setUser] = useState(null);
  
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
        <div className="signed-in">
          {/* <button className="signed-out" onClick={handleSignOut}>Sign Out</button> */}
          <img className="signed-in-avatar" onClick={handleSignOut} src={user.photoURL} alt={user.displayName} />
        </div>
      );
    } else {
      return <button className="signed-out" onClick={handleSignIn}>Sign In</button>;
    }
  };