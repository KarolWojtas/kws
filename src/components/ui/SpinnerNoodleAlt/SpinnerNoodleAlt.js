import React from 'react'
import styles from './SpinnerNoodleAlt.module.css'

const SpinnerNoodleAlt = props => {
    const path = //'m -5 50'+'c -5 -40, 20 -40, 15 0'+'s 20, 40, 15 0'+'s 20, -40, 15 0'+'s 20, 40, 15 0'+'s 20, -40, 15 0'+'s 20, 40, 15 0'+'s 20, -40, 15 0'
                   'm 50 0'+'c -40 -5, -40 20, 0 15'+'s 40 20, 0 15'+'s -40 20, 0 15'+ 's 40 20, 0 15'+'s -40 20, 0 15'+'s 40 20, 0 15'
    return <svg width={100} height={100}
                className={styles.Root}>
                <path 
                className={styles.MainLine}
                d={generatePathString(50, 0)}
                strokeLinecap={'round'}
                fill="transparent" stroke="#FFC107" strokeWidth={3}/>
                <path 
                className={styles.MainLine}
                d={generatePathString(20, 10)}
                strokeLinecap={'round'}
                fill="transparent" stroke="#FF8F00" strokeWidth={3}/>
                <path 
                className={styles.MainLine}
                d={generatePathString(70, -10)}
                strokeLinecap={'round'}
                fill="transparent" stroke="#FFECB3" strokeWidth={3}/>
            </svg>
}
function generatePathString(xStart, yStart){
    return  `m ${xStart} ${yStart}`+' c -40 -5, -40 20, 0 15'+'s 40 20, 0 15'+'s -40 20, 0 15'+ 's 40 20, 0 15'+'s -40 20, 0 15'+'s 40 20, 0 15'
}
export default SpinnerNoodleAlt