/* eslint-disable react/prop-types */

import { useCallback } from "react";
import Meeple from "../Meeple/Meeple";
import styled from 'styled-components';

const MeepleButton = styled.div`
    display: inline-block;
    font-size: 30px;
    font-weight: bold;
`;

function ScoreButton({
    player,
    currentState,
    onAddScoreSubmit,
    onForceScoreSubmit,
}) {
    const triggerScore = useCallback((event) => {
        if (event.ctrlKey || event.metaKey) {
            const scoreStr = window.prompt(`Forcibly change score for ${player}: `, JSON.stringify(currentState.scores[player]));

            const score = JSON.parse(scoreStr);

            if (score) {
                onForceScoreSubmit(player, score);
            }
        }
        else {
            const scoreStr = window.prompt(`Add score for ${player}: `);

            const score = Number.parseInt(scoreStr);

            if (!Number.isNaN(score)) {
                onAddScoreSubmit(player, score);
            }
        }
    }, [onAddScoreSubmit, onForceScoreSubmit, player]);

    return (
        <MeepleButton onClick={triggerScore}>
            <Meeple name={player} width={50} />
            <div>
                {currentState.scores[player].reduce((scoreTotal, score) => scoreTotal + score)}
            </div>
        </MeepleButton>
    );
}

const players = [
    'jake',
    'joe',
    'jon',
    'dan',
    'catlet',
]

export default function Scorecard({
    addToScore,
    setScoreByForce,
    undoLast,
    currentState,
    stateHistory,
    undoHistory
}) {
    const onAddScoreSubmit = useCallback((player, score) => {
        addToScore(player, score);
    }, [addToScore]);

    const onForceScoreSubmit = useCallback((player, score) => {
        setScoreByForce(player, score);
    }, [setScoreByForce]);

    return (
        <div>
            {
                players.map((player, i) => (
                    <ScoreButton
                        key={i}
                        player={player}
                        currentState={currentState}
                        onAddScoreSubmit={onAddScoreSubmit}    
                        onForceScoreSubmit={onForceScoreSubmit}    
                    />
                ))
            }
            <button onClick={() => undoLast()}>Undo</button>
            <div>
                <h3>State History</h3>
                {stateHistory.map((state, i) => (
                    <div key={i}>
                        {JSON.stringify(state)}
                    </div>
                )
                )}
            </div>
            <div>
                <h3>Undo History</h3>
                {undoHistory.map((state, i) => (
                    <div key={i}>
                        {JSON.stringify(state)}
                    </div>
                )
                )}
            </div>
        </div>
    );
}
