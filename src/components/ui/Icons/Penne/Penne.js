import React from 'react'
import styles from './Penne.module.css'

const Penne = props => {
    const stripesPattern = (
    <pattern id="stripesPattern"
    width="8" height="8"
    patternUnits="userSpaceOnUse"
    patternTransform="rotate(45 50 50)"
    >
        <line stroke={props.inner} strokeWidth="8" x1="0" y2="20" x2="0" y2="80"/>
    </pattern>)
    return (<svg viewBox='0 0 100 100' width='100' height='100' className={styles.Root} background={'transparent'}>
        <defs>
            {stripesPattern}
        </defs>
        <path 
        d='M 5 75 L 65 25 h 30 L 35 75'
        stroke={props.outer}
        strokeWidth={2}
        fill={props.outer}
        />
        <ellipse cx='20' cy='75' rx='15' ry='5' fill={props.inner}/>
        <ellipse cx='80' cy='25' rx='15' ry='5'fill={props.outer}/>
        <path 
        d="M 17 70 L 72 25"
        stroke={props.inner}
        strokeWidth="2"
        strokeLinecap="round"
        transform="translate(0, -1  )"
        />
        <path 
        d="M 17 70 L 72 25"
        stroke={props.inner}
        strokeWidth="2"
        strokeLinecap="round"
        transform="translate(10, -2)"
        />
        <path 
        d="M 17 70 L 72 25"
        stroke={props.inner}
        strokeWidth="2"
        strokeLinecap="round"
        transform="translate(16)"
        />
    </svg>)
}
export default Penne