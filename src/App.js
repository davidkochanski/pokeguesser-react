import React from 'react';
import './main.css';
const P = require("./pokemon.js");
const POKEMON = P.POKEMON;

function Pokemon(props) {
    return (
        <img className="mon" src={"" + props.url} alt="" onClick={props.onClick}/>
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
            score: 0,
            timeLeft: this.props.timeLeft,
            combo: 0,
            difficulty: this.props.difficultyText,
            monsSkipped: 0,
            monsGuessed: 0,
            hintsTaken: 0
            
        }
        this.handleImageClick = this.newPokemon.bind(this);
        this.handleHintClick = this.handleHintClick.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.startTimer = this.startTimer.bind(this);
        this.countDown = this.countDown.bind(this);
        this.timer = 0;
        
    }

    // TODO Buffer loading image
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
    };

    // TODO Change setinterval to something more optimal
    handleSubmit(event) {
        event.preventDefault();
        let guess = event.target[0].value.toLowerCase();
        let correct = POKEMON[this.state.dexNumber]


        if (guess === "") {
            this.newPokemon();
            this.setState( {combo: 0, monsSkipped: this.state.monsSkipped + 1} )

        } else if(guess === correct) {
            this.setState( {score: this.state.score + 1, combo: this.state.combo + 1, monsGuessed: this.state.monsGuessed + 1} )
            this.newPokemon(false);

        } else {
            let s = ""
            for(let i = 0; i < correct.length; i++) {
                s += ((guess[i] === correct[i] || this.state.lineText[i*2] !== "_") ? correct[i] + " " : "_ ")
            }
            this.setState( {lineText: s.trim(), combo: 0} ) 
        }

    
    }

    countDown() {
        this.setState( {timeLeft: this.state.timeLeft - 1} );
        
        if (this.state.timeLeft === 1) {
            clearInterval(this.timer);
        }
    }

    startTimer() {
        if (this.timer === 0 && this.state.timeLeft > 0) {
            this.timer = setInterval(this.countDown, 1000);
          }
    }

    render() {
        this.startTimer();

        return (
            <div className="game">
                <div className="text-array">
                    <h2>{"Score: " + this.state.score}</h2>
                    <h2 className={(this.state.timeLeft <= 10 && this.state.timeLeft % 2 === 0) ? "red" : ""}>{this.state.timeLeft}</h2>
                </div>

                <Pokemon url={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/" + (this.state.dexNumber) + ".png"}
                        onClick={() => this.newPokemon(true)}/>
                        
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" value={this.state.guess} onChange={(event) => this.handleInputChange(event)}/>
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
            <h3>{this.state.difficulty}</h3>
            <h3>{this.state.monsGuessed} | {this.state.monsSkipped} | {this.state.hintsTaken}</h3>
            <h3>{this.state.hintMessage}</h3>
            <p className="combo" key={this.state.combo}>{this.state.combo <= 1 ? null : this.state.combo + "x Combo!"}</p>
            </div>
        );
    }

}



class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            active: false,
            difficultyText: "Normal",
            time: 60,
            timeText: "1 min"

        }
    }

    handleStartClick() {
        this.setState( {active: true} );

    }

    handleRangeChange(event) {
        let e = event.target.value
        if(e === "25") {
            this.setState( {difficultyText: "Easy"} )
            
        } else if(e === "75") {
            this.setState( {difficultyText: "Normal"} )
        } else {
            this.setState( {difficultyText: "Hard"} )
        }
    }

    handleTimeChange(event) {
        let e = event.target.value
        if(e === "25") {
            this.setState( {time: 30, timeText: "30 sec."} )

        } else if(e === "50") {
            this.setState( {time: 60, timeText: "1 min"} )

        } else if(e === "75") {
            this.setState( {time: 180, timeText: "3 min"} )

        } else if(e === "100") {
            this.setState( {time: 300, timeText: "5 min"} )

        } else if(e === "125") {
            this.setState( {time: 0, timeText: "Zen Mode"} )
        }

    }


    renderStartPage() {
        if(!this.state.active) {
            return (
                <div className="start">
                    <form>
                        <div className="form-section">
                            <label htmlFor="difficulty">Difficulty</label>
                            <input onChange={(event) => this.handleRangeChange(event)} type="range" id="difficulty" name="difficulty"  min="25" max="125" step="50"/>
                            <h2>{this.state.difficultyText}</h2>
                            <i className="fa-solid fa-circle-info">
                                <span className="tooltip">AOVNJAOWINBAJBNIAWBAWBNIBIAOW</span>
                            </i>


                        </div>


                        <div className="form-section">
                            <label htmlFor="time">Time</label>
                            <input onChange={(event) => this.handleTimeChange(event)} type="range" id="time" name="time"  min="25" max="125" step="25"/>
                            <h2>{this.state.timeText}</h2>
                            <i className="fa-solid fa-circle-info">
                                <span className="tooltip">AOVNJAOWINBAJBNIAWBAWBNIBIAOW</span>
                            </i>

                        </div>

                    </form>

                    <button onClick={() => this.handleStartClick()}>
                        Start
                    </button>


                    
                    

                </div>
            )
        }
    }


    renderGame() {
        return this.state.active ? <Game difficulty={this.state.difficultyText} timeLeft={this.state.time}/> : null
    }
    

    render() {
        return (
            <div>
                {this.renderStartPage()}
                {this.renderGame()}
            </div>
        )
    }
}

export default App;
