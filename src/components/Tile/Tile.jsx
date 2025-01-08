// import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Meeple from '../Meeple/Meeple';

const TILE_WIDTH = 150;
const BORDER_WIDTH = 4;

const hasTopBorder = (number) => {
    return ( 0 <= number && number <=  8)
        || (14 <= number && number <= 20)
        || (22 <= number && number <= 27)
        || (29 <= number && number <= 34)
        || (36 <= number && number <= 41)
        || (43 <= number && number <= 48);
}

const hasRightBorder = (number) => {
    return (8 <= number && number <= 13)
        || [28, 29, 42, 43].includes(number);
}

const hasBottomBorder = (number) => {
    return ( 1 <= number && number <=  7)
        || (13 <= number && number <= 21)
        || (23 <= number && number <= 28)
        || (30 <= number && number <= 35)
        || (37 <= number && number <= 42)
        || (44 <= number && number <= 49);
}

const hasLeftBorder = (number) => {
    return ( 9 <= number && number <= 12)
        || [0, 21, 22, 35, 36, 49].includes(number);
}

const Root = styled.div`
    width: ${TILE_WIDTH + BORDER_WIDTH * 2}px;
    height: ${TILE_WIDTH + BORDER_WIDTH * 2}px;
    border: ${BORDER_WIDTH}px solid;
    box-sizing: border-box;
    background-color: ${({ number }) =>
        number === -1
            ? `rgb(32, 32, 32)`
            : number % 5 === 0 ? `rgb(160, 160, 160)` : 'transparent'
    };

    border-top-color:    ${({ borders }) => borders.top    ? `black` : 'transparent'};
    border-right-color:  ${({ borders }) => borders.right  ? `black` : 'transparent'};
    border-bottom-color: ${({ borders }) => borders.bottom ? `black` : 'transparent'};
    border-left-color:   ${({ borders }) => borders.left   ? `black` : 'transparent'};
`;

const Number = styled.span`
    color: black;
    font-size: 20px;
    font-weight: bold;
`;

const MeepleRow = styled.div`
    display: inline-block;

    width: ${TILE_WIDTH};
    height: ${TILE_WIDTH / 4}px;
`;

const makeMeepleRow = (meeple) => {
    return (
        <MeepleRow>
            {meeple.map((merson, i) => { <Meeple name={merson.name} type={merson.type} key={i} /> })}
        </MeepleRow>
    );
};

export default function Tile({
    number,
    meeple = [],
    messengers = [],
    robbers = [],
}) {
    if (number === -1) {
        return (
            <Root borders={{top: true, right: true, bottom: true, left: true}} number={-1}/>
        );
    }

    console.log(makeMeepleRow(meeple));

    const borders = {
        top: hasTopBorder(number),
        right: hasRightBorder(number),
        bottom: hasBottomBorder(number),
        left: hasLeftBorder(number),
    };
    
    return (
        <Root borders={borders} number={number}>
            <MeepleRow>
                <Meeple name='joe' type='merson' />
                <Meeple name='jake' type='merson' />
                <Meeple name='jon' type='merson' />
                <Meeple name='dan' type='merson' />
                <Meeple name='catlet' type='merson' />
            </MeepleRow>
            <MeepleRow>
                <Meeple name='joe' type='messenger' />
                <Meeple name='jake' type='messenger' />
                <Meeple name='jon' type='messenger' />
                <Meeple name='dan' type='messenger' />
                <Meeple name='catlet' type='messenger' />
            </MeepleRow>
            <MeepleRow>
                <Meeple name='joe' type='robber' />
                <Meeple name='jake' type='robber' />
                <Meeple name='jon' type='robber' />
                <Meeple name='dan' type='robber' />
                <Meeple name='catlet' type='robber' />
            </MeepleRow>
            <Number>{number}</Number>

        </Root>
    );
}

Tile.propTypes = {
    number: PropTypes.number.isRequired,
    meeple: PropTypes.array,
    messengers: PropTypes.array,
    robbers: PropTypes.array,
};
