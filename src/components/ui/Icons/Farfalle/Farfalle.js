import React from 'react'
import styles from './Farfalle.module.css'
const Farfalle = props => {
    const verticalLeft = Array(5).fill('l 5 5 l -5 5').join(' ')
    const verticalRight = Array(5).fill('l -5 -5 l 5 -5').join(' ')
    return (
        <svg viewBox='0 0 100 100' width='100' height='100' className={styles.Root} 
        className={styles.Root}
        background={'transparent'}>
            <path
            stroke={props.inner}
            strokeWidth={2}
            fill={props.outer}
            d={`m 10 25 h 20 q 10 0, 10 10 t 10 10 t 10 -10 t 10 -10 h 20 ${verticalLeft} h -20 q -10 0, -10 -10 t -10 -10 t -10 10 t -10 10 h -20 ${verticalRight}`}
            />
            <path
            stroke={props.inner}
            fill={'transparent'}
            d={`M 30 40 Q 50 55, 70 40`}
            />
            <path
            stroke={props.inner}
            fill={'transparent'}
            d={`M 30 60 Q 50 45, 70 60`}
            />
           
        </svg>
    )
}
export default Farfalle