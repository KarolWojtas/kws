import React from 'react'
import Typography from '@material-ui/core/Typography';
import posed, {PoseGroup} from 'react-pose'
import styles from './InfoPane.module.css'
import RootRef from '@material-ui/core/RootRef'
import borderImg from '../../../assets/main_info_border.svg'
import SwipeableViews from 'react-swipeable-views';

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
        x: ({prevBigger}) =>  prevBigger ? '-50%' : '50%',
        transition: {
            type: 'tween',
            duration: 100
        }
    }
})
const PosedTextDiv = posed.div({
    enter: {
        opacity:1 
    },
    exit: {
        opacity: 0
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
    
    const items = props.stepList.map(item => (
        <PosedTextDiv
        key={item.id}
        className={styles.TextContainer}
        >
            <PosedTypography
                key={'header'+item.id}
                variant='h4'
                align='center'
                color='secondary'   
                className={styles.Header}
                >{item.header}
                </PosedTypography>
                
            <PosedTextDiv className={styles.TextContainer}>
                {item.text.map((paragraph, ix) => (
                    <PosedTypography
                    key={'p'+ix}
                    variant='body1'
                    className={styles.Text}
                    >
                        {paragraph}
                    </PosedTypography>  
                ))}   
            </PosedTextDiv>       
        </PosedTextDiv>
    ))
    return (
                <SwipeableViews
                key={'views'}
                index={props.activeStep}
                enableMouseEvents
                onChangeIndex={props.handleChangeIndex}
                className={styles.RootContainer}
                >
                    {items}
                </SwipeableViews>
    )
}
export default InfoPane
