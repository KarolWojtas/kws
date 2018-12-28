import React from 'react'
import styles from './CouchSeat.module.css'
import {Chair, stripesPattern, seatColor, backrestColor, PosedSelectedStyle} from '../SvgUtils'
import {PoseGroup} from 'react-pose'

const couchSeat = props => {
    let couch;
    if(props.top){
        couch = (<g>
            <path d={'m 245 10 h 55 v 90 h -60 v -85 q 0 -5, 5 -5'} fill={seatColor}/>
            <path d={'m 285 10 h 15 v 90 h -20 v -85 q 0 -5, 5 -5'} fill={backrestColor}/>
        </g>)
    } else if (props.bottom){
        couch = (<g>
            <path d={'m 240 0 h 60 v 90 h -55 q -5 0, -5 -5 v -55'} fill={seatColor}/>
            <path d={'m 280 0 h 20 v 90 h -15 q -5 0, -5 -5 v -90'} fill={backrestColor}/>
        </g>)
    } else {
        couch = (
            <g>
                <rect x={240} y={0} width={60} height={100} fill={seatColor}/>
                <rect x={280} y={0} width={20} height={100} fill={backrestColor}/>
            </g>
        ) 
    }
    let addStripes = null
    if(props.disabled){
        addStripes = (<rect x="0" y="0"
            width="300" height="100"
            fill= "url(#stripesPattern)" />)
    }
    const selected = (<PoseGroup>
        <PosedSelectedStyle 
            width={300} height={100}
            key={'selectedStyle'} pose={ props.selected ? 'selected' : 'deselected'}/></PoseGroup>);

    return (<svg viewBox={'0 0 300 100'} className={styles.RootContainer} style={{filter: props.selected ? 'grayscale(0%)' : 'grayscale(50%)'}}>
         <defs>
            {stripesPattern}
        </defs>
        <Chair x={30} y={40} rotate={'180 50 60'}/>
        <Table />
        {couch}
        {addStripes} {selected}
    </svg>)
}
const Table = () => (
    <path d={'m 95 15 h 130 q 5 0, 5 5 v 60 q 0 5, -5 5 h -130 q -5 0, -5 -5 v -60 q 0 -5, 5 -5'}/>
)
export default couchSeat
