import React from 'react'
import styles from './PriceChip.module.css'
const PriceChip = props => {
    return (
        <svg viewBox={'0 0 100 100'} width={ 70} height={ 50}
            fill={'transparent'}
        >
            <g>
                
                <rect fill={props.color || 'none'} x={10} y={10} rx={20} 
                ry={20} width={80} height={80}
                fill={'rgba(255, 255, 255, 0.6)'}
                stroke={'#eee'} strokeWidth={5}/>
                <text 
                className={styles.Text}
                x={'42%'} y={'82%'} textAnchor={'middle'} fill='#333'>{props.children}</text>
            </g>    
            {props.children}
        </svg>
    )
}
export default PriceChip;