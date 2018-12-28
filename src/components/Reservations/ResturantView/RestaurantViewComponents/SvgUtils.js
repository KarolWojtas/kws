import React from 'react'
import posed from 'react-pose'

export const Chair = props => (
    <g transform={`rotate(${props.rotate})`}>
        <path d={`m ${props.x} ${props.y} h 40 q 10 0, 10 10 v 40 q 0 10, -10 10 h -40 q -10 0, -10 -10 v -40 q 0 -10, 10 -10 `} 
            fill={seatColor}/>
        <path d={`m ${props.x + 35} ${props.y} h 10 q 5 0, 5 5 v 50 q 0 5, -5 5 h -10 q -5 0, -5 -5 v -50 q 0 -5, 5 -5 `} 
            fill={backrestColor} />
    </g>
)
export const stripesPattern = (
<pattern id="stripesPattern"
       width="8" height="10"
       patternUnits="userSpaceOnUse"
       patternTransform="rotate(45 50 50)">
            <line stroke="#a6a6a6" strokeWidth="7px" y2="10"/>
        </pattern>
)
const SelectedStyle = React.forwardRef((props, ref) => (
<g ref={ref}>
    <path d={`m 0 0 h ${props.width} v ${props.height} h -${props.width} v -${props.height}`}fill={'transparent'} stroke={selectedColor} strokeWidth={4}/>
    <svg viewBox={'0 0 24 24'} x={5} y={5} width={20} height={20} >
        <circle cx={12} cy={12} r={10} fill={seatColor} stroke={selectedColor} strokeWidth={2}/>
        <path d={'m 5 13 l 6 5 l 7 -11'} stroke={'black'} strokeWidth={2} fill={'transparent'}/>
    </svg>
</g>
)) 
export const PosedSelectedStyle = posed(SelectedStyle)({

selected: {
    opacity: 1,
    transition: {
        duration: 500
    }
},
deselected: {
    opacity: 0,
    transition: {
        duration: 500
    }
}
})
export const seatColor = '#FFC107'

export const backrestColor = '#FF8F00'

const selectedColor = '#FFECB3'

Chair.defaultProps = {
rotate: '0'
}