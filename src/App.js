import React from 'react';
import './main.css';
const P = require("./pokemon.js");
const POKEMON = P.POKEMON;

function Pokemon(props) {
    return (
        <img className="mon glass" src={"" + props.url} alt="" onClick={props.onClick}/>
    )
}

const getGeneration = (dexNumber) => {
        if(dexNumber <= 151 && dexNumber > 0) {
            return 1
        } else if(dexNumber <= 251) {
            return 2
        } else if(dexNumber <= 386) {
            return 3
        } else if(dexNumber <= 493) {
            return 4
        } else if(dexNumber <= 649) {
            return 5
        } else if(dexNumber <= 721) {
            return 6
        } else if(dexNumber <= 809) {
            return 7
        } else if(dexNumber <= 906) {
            return 8
        } else if(dexNumber <= 1008) {
            return 9
        } else {
            return -1
        }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        let dex = this.getRandomDexNumber()

        this.state = {
            dexNumber: dex,
            guess: "",
            hintMessage: "",
            hintDisabled: false,
            lineText: this.getInitialLineText(dex),
            initialTime: this.props.initialTime,
            difficulty: this.props.difficultyText,

            score: 0,
            combo: 0,
            maxCombo: 0,
            monsSkipped: 0,
            monsGuessed: 0,
            hintsTaken: 0,
            
        }
        this.handleImageClick = this.newPokemon.bind(this);
        this.handleHintClick = this.handleHintClick.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
    }

    getRandomDexNumber() {
        if (this.props.difficulty === "Easy") {
            return Math.floor(Math.random() * 151) + 1;
        } else {
            return Math.floor(Math.random() * 1008) + 1;
        }
    }

    getInitialLineText(dex) {
        let s = ""
        for(let i = 0; i < POKEMON[dex].length; i++) {
            s += "_ ";
        }
        return s.trim();
    }

    newPokemon(resetCombo) {
        let newDex = this.getRandomDexNumber();
        this.setState( {dexNumber: newDex, 
                        guess:"", 
                        hintMessage: "",
                        lineText: this.getInitialLineText(newDex)} )

        if(resetCombo) this.setState( {combo: 0, monsSkipped: this.state.monsSkipped + 1} ) 
    }

    handleHintClick() {
        this.setState( {hintMessage: "This Pokemon's from Generation " + (getGeneration(this.state.dexNumber))} );

        let mon = POKEMON[this.state.dexNumber]
        let end = mon.length - 1

        let txt = this.state.lineText;

        if(txt[0] === "_" && txt[txt.length-1] === "_") {

            this.setState( {lineText: mon[0] + txt.slice(1, -1) + mon[end], hintsTaken: this.state.hintsTaken + 1} )

        } else {
            let idx = txt.indexOf("_");
            
            if(idx !== -1) {
                this.setState( {lineText: txt.substring(0, idx) + mon[idx/2] + txt.substring(idx + 1, txt.length),
                                combo: 0, 
                                hintsTaken: this.state.hintsTaken + 1})
            }
        }
    }

    handleInputChange(event) {
        this.setState( {guess: event.target.value } );
    }

    handleSubmit(event) {
        event.preventDefault();
        let guess = event.target[0].value.toLowerCase();
        let correct = POKEMON[this.state.dexNumber]


        if (guess === "") {
            this.newPokemon();
            this.setState( {combo: 0, monsSkipped: this.state.monsSkipped + 1} )

        } else if(guess === correct) {
            this.setState( {score: this.state.score + 1, combo: this.state.combo + 1, monsGuessed: this.state.monsGuessed + 1} )
            if(this.state.combo > this.state.maxCombo) this.setState( {maxCombo: this.state.combo + 1} )
            this.newPokemon(false);

        } else {
            let s = ""
            for(let i = 0; i < correct.length; i++) {
                s += ((guess[i] === correct[i] || this.state.lineText[i*2] !== "_") ? correct[i] + " " : "_ ")
            }
            this.setState( {lineText: s.trim(), combo: 0} ) 
        }
    }


    displayTime() {
        if(this.props.initialTime === "Zen Mode") {
            return <i className="fa-solid fa-infinity"></i>
        } else {
            return this.props.currentTime;
        }
    }

    renderZenModeButton() {
        if(this.props.initialTime === "Zen Mode") {
            return (
                <button onClick={this.props.endZenMode}>
                    {"Finish"}
                </button>

            )
        }
    }

    render() {
        return (
                <div ref={this.gameState} className="game">
                    <div className="text-array">
                        <h2>{"Score: " + this.state.score}</h2>
                        <h2 className={(this.props.currentTime <= 10 && this.props.currentTime % 2 === 0 && this.props.initialTime !== "Zen Mode") ? "red" : ""}>
                            {this.displayTime()}
                        </h2>
                    </div>

                    <Pokemon url={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/" + (this.state.dexNumber) + ".png"}
                            onClick={() => this.newPokemon(true)}/>
                            
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <input disabled={this.props.currentTime === 0} type="text" value={this.state.guess} onChange={(event) => this.handleInputChange(event)}/>
                    </form>
                    <p className="linetext">{this.state.lineText}</p>
                </div>
                <div className="button-array">
                    <button onClick={() => this.newPokemon(true)}>
                        {"Pass"}
                    </button>
                    <button onClick={() => this.handleHintClick()}>
                        {"Hint"}
                    </button>
                    
                </div>
                {this.renderZenModeButton()}

                <h3>{this.state.hintMessage}</h3>
                <p className="combo" key={this.state.combo}>{this.state.combo <= 1 ? null : this.state.combo + "x Combo!"}</p>
                </div>

        );
    }
}


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
            this.setState( {time: 999999999, timeText: "Zen Mode"} )
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
                                    <text className="stats-number" x="50%" y="50%" textAnchor="middle" fill="white" stroke="white" strokeWidth="2px" dy=".35em">{gameState.state.score}</text>

                                </svg> 
                            </div>

                            <div className="stats-section">
                                <p>Mons Skipped</p>
                                <svg>
                                    <circle cx="50%" cy="50%" r="40%" stroke="#ff0033" strokeWidth="5" fill="#ff003333" />
                                    <text className="stats-number" x="50%" y="50%" textAnchor="middle" fill="white" stroke="white" strokeWidth="2px" dy=".35em">{gameState.state.monsSkipped}</text>
                                </svg> 
                            </div>

                            <div className="stats-section">
                                <p>Hints Used</p>
                                <svg>
                                    <circle cx="50%" cy="50%" r="40%" stroke="#1bada6" strokeWidth="5" fill="#1bada633" />
                                    <text className="stats-number" x="50%" y="50%" textAnchor="middle" fill="white" stroke="white" strokeWidth="2px" dy=".35em">{gameState.state.hintsTaken}</text>

                                </svg> 
                            </div>

                            <div className="stats-section">
                                <p>Best Combo</p>
                                <svg>
                                    <circle cx="50%" cy="50%" r="40%" stroke="#dbac16" strokeWidth="5" fill="#dbac1633" />
                                    <text className="stats-number" x="50%" y="50%" textAnchor="middle" fill="white" stroke="white" strokeWidth="2px" dy=".35em">{gameState.state.maxCombo}</text>

                                </svg> 
                            </div>
                        </div>


                        <button onClick={(event) => this.handleStartButton(event)}>Play Again?</button>

                        <i id="share-button" onClick={() => navigator.clipboard.writeText(
                            `I got a score of ${gameState.state.score} mons guessed in ${this.state.timeText} on ${this.state.difficultyText} mode! https://www.pokeguesser.io/`
                        )} className="fa-solid fa-share-alt"></i>


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
