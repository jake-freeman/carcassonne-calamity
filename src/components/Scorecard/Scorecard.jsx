/* eslint-disable react/prop-types */

import { useCallback } from "react";
import Meeple from "../Meeple/Meeple";
import styled from 'styled-components';

const MeepleButton = styled.div`
    display: inline-block;
    font-size: 30px;
    font-weight: bold;
    padding-left: 10px;
    padding-right: 10px;
`;

const HistoryTextarea = styled.textarea`
    min-height: 1000px;
    min-width: 400px;
`;

const HistoryContainer = styled.div`
    display: inline-block;
    padding-left: 50px;
    padding-right: 50px;
`;

const HistoryTitle = styled.h1`
    margin: 0;
    margin-bottom: 20px;
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
    }, [onAddScoreSubmit, onForceScoreSubmit, player, currentState.scores]);

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

    const onUndoClick = useCallback(() => {
        const confirm = window.confirm('Are you FOR REAL rn?');

        if (confirm) {
            undoLast();
        }
    }, [undoLast]);

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
            <div>
                <br />
                <button onClick={onUndoClick}>Undo</button>
            </div>
            <div>
                <HistoryContainer>
                    <HistoryTitle>State History</HistoryTitle>
                    <HistoryTextarea readOnly value={
                        stateHistory.map((state) =>
                            JSON.stringify(state, null, 4)
                        )
                    }/>
                </HistoryContainer>
                <HistoryContainer>
                    <HistoryTitle>Undo History</HistoryTitle>
                    <HistoryTextarea readOnly value={
                        undoHistory.map((state) =>
                            JSON.stringify(state, null, 4)
                        )
                    }/>
                </HistoryContainer>
            </div>
        </div>
    );
}
