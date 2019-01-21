import React from 'react'
import Typography from '@material-ui/core/Typography';
import posed, {PoseGroup} from 'react-pose'
import styles from './InfoPane.module.css'
import RootRef from '@material-ui/core/RootRef'
import SwipeableViews from 'react-swipeable-views';
import bgImage from '../../../assets/brick.png'

const PosedTextDiv = posed.div({
    selected: {
        opacity: 1
    }, 
    deselected: {
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
const PosedRootDiv = posed.div({
    enter: {
        opacity: 1,
        beforeChildren: true
    },
    exit: {
        opacity: 0
    }
})

const PosedTypography = posed(React.forwardRef((props, ref) => (
    <RootRef rootRef={ref}>
        <Typography {...props}>{props.children}</Typography>
    </RootRef>
)))(typographyTransitions)

const InfoPane = props => {
    document.documentElement.style.setProperty('--bg-image', `url(${bgImage})`)
    const items = props.stepList.map(item => (
        <PosedRootDiv
        key={item.id}
        className={styles.InfoContainer}
        >
            <PosedTypography
                key={'header'+item.id}
                variant='h4'
                align='center'
                color='secondary'   
                className={styles.Header}
                >{item.header}
            </PosedTypography>
                
            <PosedTextDiv className={styles.TextContainer}
                key={'textDiv'+item.id}
                pose={props.activeStep === item.id ? 'selected': 'deselected'}
            >
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
        </PosedRootDiv>
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
