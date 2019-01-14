import React from 'react'
import Typography from '@material-ui/core/Typography';
import posed, {PoseGroup} from 'react-pose'
import styles from './InfoPane.module.css'
import RootRef from '@material-ui/core/RootRef'
import borderImg from '../../../assets/main_info_border.svg'
const PosedDiv = posed.div({
    enter: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 200,
            type: 'spring',
            mass: 0.5,
            stiffness: 50,
        },
        staggerChildren: 500
    },
    exit: {
        opacity: 0,
        x: ({prevBigger}) =>  prevBigger ? '-200%' : '200%',
        transition: {
            type: 'tween',
            duration: 100
        }
    }
})
const typographyTransitions = {
    enter: {
        opacity: 1
    },
    exit: {
        opacity: 0
    }
}
const PosedTypography = posed(React.forwardRef((props, ref) => (
    <RootRef rootRef={ref}>
        <Typography {...props}>{props.children}</Typography>
    </RootRef>
)))(typographyTransitions)
const InfoPane = props => {
    document.documentElement.style.setProperty('--border-image-url', `url(${borderImg})`)
    const info = props.stepList[props.activeStep]
    const tile = (
    <PosedDiv 
    key={info.id} 
    className={styles.RootContainer}
    prevBigger={props.prevStep > props.activeStep}
    >
       <PosedTypography
       key={'header'+info.id}
        variant='h4'
        >{info.header}
        </PosedTypography>
        <PosedTypography
        key={'text'+info.id}
        variant='body1'
        >
            {info.text}
        </PosedTypography>     
        
        
    </PosedDiv>
    )
    return (
        <PoseGroup animateOnMount>
            {tile}
        </PoseGroup>
    )
}
export default InfoPane
