import React from 'react'
import styles from './Ravioli.module.css'

const Ravioli = props => {
    const repeats = 7
    const down = Array(repeats).fill('l 5 5 l -5 5').join(' ')
    const right = Array(repeats).fill('l 5 5 l 5 -5').join(' ')
    const left = Array(repeats).fill('l -5 -5 l -5 5').join(' ')
    const up = Array(repeats).fill('l -5 -5 l 5 -5').join(' ')
    return (
        <svg viewBox='0 0 100 100' width='100' height='100' className={styles.Root} {...props.style}>
            <path
            stroke={props.inner}
            strokeWidth={2}
            fill={props.outer}
            d={`m 15 15 ${right} ${down} ${left} ${up}`}
            />
            <circle cx="50" cy="50" r="20" stroke={props.inner} fill="transparent"/>
        </svg>
    )
    
}
export default Ravioli