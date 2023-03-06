import React from 'react';


export default function GameOverModal(props) {
    const handleShare = (score) => {
        navigator.clipboard.writeText(
            `I got a score of ${score} mons guessed in ${props.timeText} on ${props.difficultyText.toLocaleLowerCase()} mode! https://www.pokeguesser.io/`
        )
        console.log("Copied!");
    }

    const writeToLocal = () => {
        window.sessionStorage.setItem("david", {"score": props.gameState.score, "monsSkipped": props.gameState.monsSkipped,
                                              "hintsTaken": props.gameState.hintsTaken, "maxCombo": props.gameState.maxCombo})

        console.log(window.localStorage);
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


                <button onClick={(event) => props.handleStartButton(event)}>Play Again?</button>

                <i id="share-button" onClick={() => handleShare(props.gameState.state.score)} className="fa-solid fa-share-alt">
                    <span className="tooltip glass">
                        <div className="tooltip-header"><strong>Copied!</strong></div>
                    </span>
                </i>

                {writeToLocal()}
            </div>
        </div>
    )
}
