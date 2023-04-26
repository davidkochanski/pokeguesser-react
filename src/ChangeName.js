import React from 'react';
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import { useState } from 'react';


export default function ChangeNameModal(props) {
    const [user, setUser] = useState(null);
    const [tempName, setTempName] = useState("");
    const [flavourText, setFlavourText] = useState("");

    const auth = getAuth();
    onAuthStateChanged(auth, (u) => {
      if (u) {
        setUser(u);
      } else {
        setUser(null);
      }
    });



    const renderInput = () => {
        if(user) {
            return (
                <div className="name-input">
                    <input type="text" name="name" id="name" value={tempName} onChange={(event) => {setTempName(event.target.value)}}/>
                </div>

            );
        } else {
            return (
                <p>You are (somehow) not signed in!</p>
            )
        }
    }

    const handleUpdateDisplayName = async () => {
        try {
            if(tempName.length === 0 || tempName.length > 25 || tempName.trim() === "") {
                setFlavourText("Invalid length!");
                return;
            }
            else if (!/^[a-zA-Z0-9\s]+$/.test(tempName)) {
                setFlavourText("Name must be Alphanumeric.");
            }
        
            await updateProfile(auth.currentUser, {
                displayName: tempName
            });
        } catch (error) {
          console.error('Error updating display name:', error);
        }
      }

    return (
        <div className="modal">
            <div className="modal-content">
                <i id="close-button" onClick={props.onClose} className="fa-solid fa-x"></i>
                <h2>Change Name</h2>

                {renderInput()}
            
                <button onClick={handleUpdateDisplayName}>Save</button>

                {flavourText}
            </div>
        </div>
    )
}
