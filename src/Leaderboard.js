// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, get, set, ref, child } from "firebase/database";

import React from "react";
import { useEffect, useState } from "react";

import dotenv from "dotenv";

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

const writeScore = (month, difficulty, user, score) => {
    set(ref(database, `scores/${month}/${difficulty}`), {})
}

const readScore = async (month, difficulty) => {
    const dbRef = ref(getDatabase());
    return get(child(dbRef, `scores/${month}/${difficulty}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          return snapshot.val();
        } else {
          return "No data";
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  
  export default function Leaderboard(props) {
    const [leaderboardCells, setLeaderboardCells] = useState(
      Array(10)
        .fill("")
        .map((_, i) => (
          <div className="leaderboard-row" key={i}>
            <div>{i + 1}</div>
            <div>...</div>
            <div>...</div>
          </div>
        ))
    );
    const [diff, setDiff] = useState("easy");

    useEffect(() => {
      const fetchLeaderboard = async () => {
        const cells = [];
        let data = await readScore(1, diff);
        let dataArray = [];
        
        for(let i = 0; i < data.length; i++) {
            dataArray.push([data[i].name, data[i].score]);
        }
        
        dataArray.sort((a, b) => {return b[1] - a[1]})

        console.log(dataArray);

        while(dataArray.length < 10) {
            dataArray.push(["-", 0]);
        }

        for (let i = 0; i < 10; i++) {
            cells.push(
                <div className="leaderboard-row" key={i}>
                    <div>{i + 1}</div>
                    <div>{dataArray[i][0]}</div>
                    <div>{dataArray[i][1]}</div>
                </div>
            );
        }
        setLeaderboardCells(cells);
      };
  
      fetchLeaderboard();
    }, [diff]);
  
    return (
        <div className="leaderboard">
            <div className="leaderboard-buttons">
                <button className={diff === "easy" ? "tabbed" : ""} onClick={() => { setDiff("easy") }}>Easy</button>
                <button className={diff === "normal" ? "tabbed" : ""} onClick={() => { setDiff("normal") }}>Normal</button>
                <button className={diff === "hard" ? "tabbed" : ""} onClick={() => { setDiff("hard") }}>Hard</button>
            </div>
            <div className="leaderboard-wrapper glass">
                {leaderboardCells}
            </div>
            <div className="leaderboard-bottom">
                <button onClick={(event) => props.returnToMenu(event)}>Return</button>
            </div>
        </div>
    );
  }