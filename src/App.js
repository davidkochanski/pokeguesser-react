import React from 'react';
import Game from "./Game.js";

const P = require("./pokemon.js");

function Menu(props) {
    return (
        <div className="start">
            <form>
                <div className="form-section">
                    <label htmlFor="difficulty">Difficulty</label>
                    <input onChange={(event) => props.difficultyChange(event)} type="range" id="difficulty" name="difficulty"  min="25" max="125" step="50"/>
                    <h2>{props.difficultyText}</h2>
                    <i className="fa-solid fa-circle-info">
                        <span className="tooltip glass">
                            <div className="tooltip-header"><strong>Easy Mode</strong></div>
                            <div className="tooltip-text">Contains only the first 151 Pokemon from Generation 1. Great place to start.</div>

                            <div className="tooltip-header"><strong>Normal Mode</strong></div>
                            <div className="tooltip-text">All 1008 Pokemon are fair game.</div>

                            <div className="tooltip-header"><strong>Hard Mode</strong></div>
                            <div className="tooltip-text">All 1008 Pokemon, AND no letter hints are granted. Only for true Pokemon Masters.</div>
                        </span>
                    </i>
                </div>

                <div className="form-section">
                    <label htmlFor="time">Time</label>
                    <input onChange={(event) => props.timeChange(event)} type="range" id="time" name="time"  min="25" max="125" step="25"/>
                    <h2>{props.timeText}</h2>
                    <i className="fa-solid"></i>
                </div>
            </form>

            <button onClick={(event) => props.startButton(event)}>
                Start
            </button>
        </div>
    )
}



class App extends React.Component {
    constructor(props) {
        super(props);

        this.handleDifficultyChange = this.handleDifficultyChange.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);
        this.handleStartButton = this.handleStartButton.bind(this);
        this.endZenMode = this.endZenMode.bind(this);
        this.startTimer = this.startTimer.bind(this);
        this.countDown = this.countDown.bind(this);

        this.state = {
            difficultyText: "Normal",
            timeText: "1 min",
            time: 1,
            gameActive: false,
            
        }

        this.gameState = React.createRef();
        this.timer = 0;
    }

    handleDifficultyChange(event) {
        let e = event.target.value;
        if(e === "25") {
            this.setState( {difficultyText: "Easy"} )
        } else if(e === "75") {
            this.setState( {difficultyText: "Normal"} )
        } else {
            this.setState( {difficultyText: "Hard"} )
        }
    }

    handleTimeChange(event) {
        let e = event.target.value;
        if(e === "25") {
            this.setState( {time: 30, timeText: "30 sec"} )

        } else if(e === "50") {
            this.setState( {time: 60, timeText: "1 min"} )

        } else if(e === "75") {
            this.setState( {time: 180, timeText: "3 min"} )

        } else if(e === "100") {
            this.setState( {time: 300, timeText: "5 min"} )

        } else if(e === "125") {
            this.setState( {time: -1, timeText: "Zen Mode"} )
        }
    }



    handleStartButton(event) {
        this.setState( {gameActive: !this.state.gameActive} )
        if(this.state.time === 0) this.setState( {time: 60, timeText: "1 min", difficultyText: "Normal" } )
    }


    startTimer() {
        if (this.timer === 0 && this.state.time > 0) {
            this.timer = setInterval(this.countDown, 1000);
        }
    }


    countDown() {
        this.setState( {time: this.state.time - 1} );

        if (this.state.time === 1) {
            clearInterval(this.timer);
            this.timer = 0;
        }
    }

    endZenMode() {
        clearInterval(this.timer);
        this.timer = 0;
        this.setState( {time: 0} )
        
    }

    handleShare(score) {
        navigator.clipboard.writeText(
            `I got a score of ${score} mons guessed in ${this.state.timeText} on ${this.state.difficultyText.toLocaleLowerCase()} mode! https://www.pokeguesser.io/`
        )
        console.log("Copied!");
    }

    renderMenu() {
        if(!this.state.gameActive) return (
            <Menu 
                timeChange={this.handleTimeChange}
                timeText={this.state.timeText}
                difficultyChange={this.handleDifficultyChange} 
                difficultyText={this.state.difficultyText}
                startButton={this.handleStartButton}
            />
        )
    }

    renderGame() {
        if(this.state.gameActive) {
            this.startTimer();
        
                return (
                    <Game
                        ref={this.gameState}
                        difficulty={this.state.difficultyText}
                        currentTime={this.state.time}
                        initialTime={this.state.timeText}
                        endZenMode={this.endZenMode}
                    />
            )
        }
    }


    renderGameOver() {
        if(this.state.time === 0) {

            const gameState = this.gameState.current;
    
            return (
                <div className="modal">
                    <div className="modal-content">
                        <i id="close-button" onClick={(event) => this.handleStartButton(event)} className="fa-solid fa-x"></i>
                        <h2>{this.state.timeText === "Zen Mode" ? "Finish" : "Time's Up!"}</h2>
                        <h3>{this.state.timeText} on {this.state.difficultyText}</h3>
                        
                        <div className="stats">
                            <div className="stats-section">
                                <p>Score</p> 
                                <svg>
                                    <circle cx="50%" cy="50%" r="40%" stroke="#34b233" strokeWidth="5" fill="#34b23333" />
                                    <text id="text-1" className="stats-number" x="50%" y="50%" textAnchor="middle" fill="white" stroke="white" strokeWidth="2px" dy=".35em">
                                        {gameState.state.score}
                                    </text>
                                </svg> 
                            </div>

                            <div className="stats-section">
                                <p>Mons Skipped</p>
                                <svg>
                                    <circle cx="50%" cy="50%" r="40%" stroke="#ff0033" strokeWidth="5" fill="#ff003333" />
                                    <text id="text-2" className="stats-number" x="50%" y="50%" textAnchor="middle" fill="white" stroke="white" strokeWidth="2px" dy=".35em">
                                        {gameState.state.monsSkipped}
                                    </text>
                                </svg> 
                            </div>

                            <div className="stats-section">
                                <p>Hints Used</p>
                                <svg>
                                    <circle cx="50%" cy="50%" r="40%" stroke="#1bada6" strokeWidth="5" fill="#1bada633" />
                                    <text id="text-3" className="stats-number" x="50%" y="50%" textAnchor="middle" fill="white" stroke="white" strokeWidth="2px" dy=".35em">
                                        {gameState.state.hintsTaken}
                                    </text>
                                </svg> 
                            </div>

                            <div className="stats-section">
                                <p>Best Combo</p>
                                <svg>
                                    <circle cx="50%" cy="50%" r="40%" stroke="#dbac16" strokeWidth="5" fill="#dbac1633" />
                                    <text id="text-4" className="stats-number" x="50%" y="50%" textAnchor="middle" fill="white" stroke="white" strokeWidth="2px" dy=".35em">
                                        {gameState.state.maxCombo}
                                    </text>

                                </svg> 
                            </div>
                        </div>


                        <button onClick={(event) => this.handleStartButton(event)}>Play Again?</button>

                        <i id="share-button" onClick={() => this.handleShare(gameState.state.score)} className="fa-solid fa-share-alt">
                            <span className="tooltip glass">
                                <div className="tooltip-header"><strong>Copied!</strong></div>
                            </span>
                        </i>
                    </div>
                </div>
            )
        }
    }
    

    render() {


        return (
            <div>
                {this.renderMenu()}
                {this.renderGame()}
                {this.renderGameOver()}
            </div>
        )
    }
}

export default App;
