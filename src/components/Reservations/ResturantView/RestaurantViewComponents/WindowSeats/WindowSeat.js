import React from 'react'
import styles from './WindowSeat.module.css'
import { Chair, stripesPattern, PosedSelectedStyle } from '../SvgUtils'
import {PoseGroup} from 'react-pose'

const windowSeat = props => {
    let table;
    let stylesApplied = styles.RootContainer
    if(props.left){
        table = <path d={`m 0 0 h 100 v 25 h -95 q -5 0, -5 -5 h -20`} fill={'black'}/>
    } else if (props.right){
        table = <path d={`m 0 0 h 100 v 20 q 0 5, -5 5 h -100 h -25`} fill={'black'}/>
    } else {
        table = <path d={`m 0 0 h 100 v 25 h -100 v -25`} fill={'black'}/> 
    }
    let addStripes = null;
    if(props.disabled){
        addStripes = (<rect x="0" y="0"
            width="100" height="100"
            fill= "url(#stripesPattern)" />)
    }
    const selected = (<PoseGroup>
        <PosedSelectedStyle 
            width={100} height={100}
            key={'selectedStyle'} pose={ props.selected ? 'selected' : 'deselected'}/></PoseGroup>);

    return <svg viewBox={'0 0 100 100'} className={stylesApplied} style={{filter: props.selected ? 'grayscale(0%)' : 'grayscale(50%)'}}>
        <defs>
            {stripesPattern}
        </defs>
        {table}
        <Chair x={30} y={40} rotate={'90 50 70'}/>
        {addStripes} {selected}
    </svg>
}
export default windowSeat