import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Tile from '../Tile/Tile';

const TILE_NUMBERS = [
    [0,  1,  2,  3,  4,  5,  6,  7,  8],
    [49, 48, 47, 46, 45, 44, 43, -1,  9],
    [36, 37, 38, 39, 40, 41, 42, -1, 10],
    [35, 34, 33, 32, 31, 30, 29, -1, 11],
    [22, 23, 24, 25, 26, 27, 28, -1, 12],
    [21, 20, 19, 18, 17, 16, 15, 14, 13]
];

const Root = styled.div`
    background-color: rgb(222, 202, 185)}
    margin: 20px;
`;

const TilesRow = styled.span`
        display: flex;
        flex-direction: row;
        flex-shrink: 0;
`;

function makeRow(numbers) {
    return (
        <TilesRow>
            {numbers.map((num, i) => <Tile number={num} key={i} />)}
        </TilesRow>
    );
}

export default function Scoreboard({
    meeple,
    messengers,
    robbers,
}) {
    // TODO: Add these to each tile
    console.log({meeple, messengers, robbers});

    const rows = TILE_NUMBERS.map((numbers, i) => makeRow(TILE_NUMBERS[i]));
    
    return (
        <Root>
            {rows}
        </Root>
    );
}

Scoreboard.propTypes = {
    meeple: PropTypes.array,
    messengers: PropTypes.array,
    robbers: PropTypes.array
};
