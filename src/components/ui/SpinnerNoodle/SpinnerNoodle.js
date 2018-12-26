import React from 'react'
import styles from './SpinnerNoodle.module.css'

const SpinnerNoodle = props => {
    const path = 'm50 0 v 30 '+
        'c 0 10, 15 10, 15 10 '+
        'c 20 0, 20 10, 0 10 '+
        'h -30 '+
        'c -20 0, -20 10, 0 10 '+
        'h 35 '+
        'c 20 0, 20 10, 0 10 '+
        'h -55 ' +
        'c -20 0, -20 10, 0 10 '+
        'h 80'
    return <svg width={100} height={100}
                className={styles.Root}>
                <path 
                className={styles.MainLine}
                d={path}
                strokeLinecap={'round'}
                fill="transparent" stroke="#FFC107" strokeWidth={3}/>
                <path d={'m 5 85 h 90'} stroke={'#ccc'} strokeWidth={4}/>
                <path d={'m 20 89 h 60'} stroke={'#aaa'} strokeWidth={4}/>
            </svg>
}
export default SpinnerNoodle