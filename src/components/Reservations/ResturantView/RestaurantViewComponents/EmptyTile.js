import React from 'react'

const emptyTile = props => (
    <svg viewBox={'0 0 100 100'}>
        <rect width={100} height={100} x={10} fill={props.fill ? props.fill : 'transparent'}/>
    </svg>
)

export default emptyTile