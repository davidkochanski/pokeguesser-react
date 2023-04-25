import React from 'react';
import Game from "./Game.js";
import GameOverModal from './GameOverModal.js';
import Menu from './Menu.js';
import Leaderboard from './Leaderboard.js';

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.handleDifficultyChange = this.handleDifficultyChange.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);
        this.handleStartButton = this.handleStartButton.bind(this);
        this.handleLeaderboardButton = this.handleLeaderboardButton.bind(this);
        this.endZenMode = this.endZenMode.bind(this);
        this.startTimer = this.startTimer.bind(this);
        this.countDown = this.countDown.bind(this);

        this.state = {
            difficultyText: "Normal",
            timeText: "100 sec",
            time: 100,
            gameActive: false,
            leaderboardShown: false,
            menuShown: true
        }

        this.gameState = React.createRef();
        this.timer = 0;
    }

    difficultyMap = {
        "25": "Easy",
        "75": "Normal",
        "125": "Hard"
    }

    handleDifficultyChange(event) {
        this.setState({difficultyText: this.difficultyMap[event.target.value]} )
    }

    timeMap = {
        "25": [30, "30 sec"],
        "50": [100, "100 sec"],
        "75": [180, "3 min"],
        "100": [300, "5 min"],
        "125": [-1, "Zen Mode"]
    }

    handleTimeChange(event) {
        this.setState( {
            time: this.timeMap[event.target.value][0],
            timeText: this.timeMap[event.target.value][1]
        })
    }

    handleStartButton(event) {
        this.setState( {gameActive: !this.state.gameActive} )
        if(this.state.time === 0) this.setState( {time: 100, timeText: "100 sec", difficultyText: "Normal" } )
    }

    handleLeaderboardButton(event) {
        this.setState( {leaderboardShown: !this.state.leaderboardShown, menuShown: !this.state.menuShown, time: 100, timeText: "100 sec", difficultyText: "Normal"} );
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
        if(!this.state.gameActive && this.state.menuShown) return (
            <Menu 
                timeChange={this.handleTimeChange}
                timeText={this.state.timeText}
                difficultyChange={this.handleDifficultyChange} 
                difficultyText={this.state.difficultyText}
                startButton={this.handleStartButton}
                showLeaderboards={this.handleLeaderboardButton}
            />
        )
    }

    renderLeaderboard(diff) {
        if(this.state.leaderboardShown) return (
            <Leaderboard
                returnToMenu={this.handleLeaderboardButton}
                leaderboardDifficulty={diff}
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
            return (
                <GameOverModal
                    gameState={this.gameState.current}
                    timeText={this.state.timeText}
                    difficultyText={this.state.difficultyText}
                    handleStartButton={this.handleStartButton}
                    handleShare={this.handleShare}
                />
            )
        }}

    render() {
        return (
            <div>
                {this.renderMenu()}
                {this.renderLeaderboard("easy")}
                {this.renderGame()}
                {this.renderGameOver()}
            </div>
        )
    }
}