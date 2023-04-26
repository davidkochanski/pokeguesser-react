import React from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, get, set, ref, child } from "firebase/database";
import { useState } from 'react';
import dotenv from "dotenv";
import { initializeApp } from "firebase/app";

dotenv.config();

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);



export default function GameOverModal(props) {
    const [user, setUser] = useState(null);

    const auth = getAuth();
    onAuthStateChanged(auth, (u) => {
      if (u) {
        setUser(u);
      } else {
        setUser(null);
      }
    });

    const flavourText = () => {
        if(!user) {
            return "You are not signed in!";
        } else if (props.timeText !== "100 sec") {
            return "";
        } else {
            return "Score recorded!";
        }
    }


    const handleShare = (score) => {
        navigator.clipboard.writeText(
            `I got a score of ${score} mons guessed in ${props.timeText} on ${props.difficultyText.toLocaleLowerCase()} mode! https://davidkochanski.dev/pokeguesser/`
        )
        console.log("Copied!");
    }

    const writeScore = (month, difficulty, userName, score) => {
        if(!user || props.timeText !== "100 sec") {
            return;
        }
        
        const dbRef = ref(getDatabase());
        let curr = {};
        get(child(dbRef, `scores/${month}/${difficulty}`))
          .then((snapshot) => {
            if (snapshot.exists()) {
              curr = snapshot.val();

              let nextIndex = curr.length;

              let updated = Object.assign({}, curr, {[nextIndex]: {name: userName, score: score, time: new Date().getTime()}});
    
              set(ref(database, `scores/${month}/${difficulty}`), updated)
            }
          })
          .catch((error) => {
            console.error(error);
            return;
          });
        }

    return (
        <div className="modal">
            <div className="modal-content">
                <i id="close-button" onClick={(event) => props.handleStartButton(event)} className="fa-solid fa-x"></i>
                <h2>{props.timeText === "Zen Mode" ? "Finish" : "Time's Up!"}</h2>
                <h3>{props.timeText} on {props.difficultyText}</h3>
                
                <div className="stats">
                    <div className="stats-section">
                        <p>Score</p> 
                        <svg>
                            <circle cx="50%" cy="50%" r="40%" stroke="#34b233" strokeWidth="5" fill="#34b23333" />
                            <text id="text-1" className="stats-number" x="50%" y="50%" textAnchor="middle" fill="white" stroke="white" strokeWidth="2px" dy=".35em">
                                {props.gameState.state.score}
                            </text>
                        </svg> 
                    </div>

                    <div className="stats-section">
                        <p>Mons Skipped</p>
                        <svg>
                            <circle cx="50%" cy="50%" r="40%" stroke="#ff0033" strokeWidth="5" fill="#ff003333" />
                            <text id="text-2" className="stats-number" x="50%" y="50%" textAnchor="middle" fill="white" stroke="white" strokeWidth="2px" dy=".35em">
                                {props.gameState.state.monsSkipped}
                            </text>
                        </svg> 
                    </div>

                    <div className="stats-section">
                        <p>Hints Used</p>
                        <svg>
                            <circle cx="50%" cy="50%" r="40%" stroke="#1bada6" strokeWidth="5" fill="#1bada633" />
                            <text id="text-3" className="stats-number" x="50%" y="50%" textAnchor="middle" fill="white" stroke="white" strokeWidth="2px" dy=".35em">
                                {props.gameState.state.hintsTaken}
                            </text>
                        </svg> 
                    </div>

                    <div className="stats-section">
                        <p>Best Combo</p>
                        <svg>
                            <circle cx="50%" cy="50%" r="40%" stroke="#dbac16" strokeWidth="5" fill="#dbac1633" />
                            <text id="text-4" className="stats-number" x="50%" y="50%" textAnchor="middle" fill="white" stroke="white" strokeWidth="2px" dy=".35em">
                                {props.gameState.state.maxCombo}
                            </text>

                        </svg> 
                    </div>
                </div>


                <div>
                    {flavourText()}
                </div>

                <button onClick={(event) => props.handleStartButton(event)}>Play Again?</button>

                <i id="share-button" onClick={() => handleShare(props.gameState.state.score)} className="fa-solid fa-share-alt">
                    <span className="tooltip glass">
                        <div className="tooltip-header"><strong>Copied!</strong></div>
                    </span>
                </i>

                {user ? writeScore(1, props.difficultyText.toLowerCase(), user.displayName, props.gameState.state.score) : ""}
            </div>
        </div>
    )
}
