import React from 'react'
import styles from './WallSeat.module.css'
import {PoseGroup} from 'react-pose'
import {Chair, stripesPattern, seatColor, backrestColor, PosedSelectedStyle} from '../SvgUtils'
const wallSeat = props => {
    let table;
    if(props.top){
        table = <path d={'m 0 0 h 20 q 5 0, 5 5 v 95 h -25 v -100'} fill={'black'}/>
    } else if(props.bottom){
        table = <path d={'m 0 0 h 25 v 95 q 0 5, -5 5 h -20 v -100'}/>
    } else {
        table = <rect width={25} height={100}/>
    }
    let disabled = null;
    if(props.disabled){
        disabled = (<rect x="0" y="0"
            width="100" height="100"
            fill= "url(#stripesPattern)" />)
    }
    const selected = (<PoseGroup>
        <PosedSelectedStyle 
            width={100} height={100}
            key={'selectedStyle'} pose={ props.selected ? 'selected' : 'deselected'}/></PoseGroup>);

    return (
        <svg viewBox={'0 0 100 100'} className={styles.RootContainer} style={{filter: props.selected ? 'grayscale(0%)' : 'grayscale(50%)'}}>
         <defs>
            {stripesPattern}
        </defs>
        {table}
        <Chair x={50} y={20}/>
        {disabled} {selected}
        
        </svg>
    )
}

export default wallSeat