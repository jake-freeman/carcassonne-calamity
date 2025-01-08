import PropTypes from 'prop-types';
import styled from 'styled-components';
import Tile from '../Tile/Tile';
import { MERSON_INDEX, MESSENGER_INDEX } from '../../data/useCarcasstate'; 

const TILE_NUMBERS = [
    [ 0,  1,  2,  3,  4,  5,  6,  7,  8],
    [49, 48, 47, 46, 45, 44, 43, -1,  9],
    [36, 37, 38, 39, 40, 41, 42, -1, 10],
    [35, 34, 33, 32, 31, 30, 29, -1, 11],
    [22, 23, 24, 25, 26, 27, 28, -1, 12],
    [21, 20, 19, 18, 17, 16, 15, 14, 13]
];

const ROBBER_INDEX = 2;

const Root = styled.div`
    background-color: rgb(222, 202, 185)}
    margin: 20px;
`;

const TilesRow = styled.span`
    display: flex;
    flex-direction: row;
    flex-shrink: 0;
`;

const getMeepleFromNumber = (number, meeplePositions, type) => {
    return meeplePositions.reduce((acc, currentMerson) => {
        if (currentMerson.position === number) 
        {
            acc.push({ "name": currentMerson.name, "type": type });
        }
        return acc;
    }, []);
};

const makeRow = (numbers, allMeeple, allMessengers, allRobbers, key, setRobberPos) => {    
    return (
        <TilesRow key={key}>
            {numbers.map((num, i) =>
                <Tile
                    number={num}
                    key={i}
                    meeple={getMeepleFromNumber(num, allMeeple, "merson")}
                    messengers={getMeepleFromNumber(num, allMessengers, "messenger")}
                    robbers={getMeepleFromNumber(num, allRobbers, "robber")}
                    setRobberPos={setRobberPos}
                />
            )}
        </TilesRow>
    );
};

const convertPointsToPosition = (points) => {
    // Robber position can be null, so return early here for that case
    if (points === null) {
        return points;
    }

    let position = points % 50;

    while (position < 0) {
        position += 50;
    }

    // -50, -100, etc. can return -0, so we need the absolute value here
    return Math.abs(position);
};

const mapMeepleToPositions = (scores, indexOfMeeple) => {
    return Object.keys(scores).map((person) => {
        return {
            "name": person,
            "position": convertPointsToPosition(scores[person][indexOfMeeple])
        };
    });
};

export default function Scoreboard({
    currentState,
    setRobberPos,
}) {
    const { scores, robbers } = currentState;

    const scoresAndRobbers = Object.keys(scores).reduce((acc, currentPlayer) => {
        const playerMeeple = [...scores[currentPlayer], robbers[currentPlayer] || null];
        acc = { ...acc, [currentPlayer]: playerMeeple };
        return acc;
    }, {});

    const allMeeple = mapMeepleToPositions(scoresAndRobbers, MERSON_INDEX);
    const allMessengers = mapMeepleToPositions(scoresAndRobbers, MESSENGER_INDEX);
    const allRobbers = mapMeepleToPositions(scoresAndRobbers, ROBBER_INDEX);

    const rows = TILE_NUMBERS.map((numbers, i) => makeRow(TILE_NUMBERS[i], allMeeple, allMessengers, allRobbers, i, setRobberPos));
    
    return (
        <Root>
            {rows}
        </Root>
    );
}

Scoreboard.propTypes = {
    currentState: PropTypes.object.isRequired,
    setRobberPos: PropTypes.func.isRequired,
};
