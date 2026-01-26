// import { useState } from 'react'
// import greenMessenger from './assets/meeple/green_messenger.png'
// import blueMersen from './assets/meeple/blue_mersen.png'
import './assets/fonts/lindsay-becker.woff';
import './App.css'
import Scoreboard from './components/Scoreboard/Scoreboard';
import useCarcasstate from './data/useCarcasstate';
import Scorecard from './components/Scorecard/Scorecard';
import styled from 'styled-components';

const Title = styled.h1`
    margin-top: 0;
`;

function App() {
    const {
        addToScore,
        setScoreByForce,
        undoLast,
        resetAll,
        setRobberPos,

        currentState,
        stateHistory,
        undoHistory,
    } = useCarcasstate();

    return (
        <div>
            <Title>Carcassonne Calamity</Title>
            <Scoreboard
                currentState={currentState}
                setRobberPos={setRobberPos}
            />
            <Scorecard
                addToScore={addToScore}
                setScoreByForce={setScoreByForce}
                undoLast={undoLast}
                resetAll={resetAll}

                currentState={currentState}
                stateHistory={stateHistory}
                undoHistory={undoHistory}
            />
        </div>
    );
}

export default App
