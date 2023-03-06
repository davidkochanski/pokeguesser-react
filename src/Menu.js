import React from "react"

export default function Menu(props) {
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

            <button onClick={(event) => props.showLeaderboards(event)}>
                Leaderboards
            </button>
        </div>
    )
}
