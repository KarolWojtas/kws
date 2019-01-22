import React from 'react'
import Typography from '@material-ui/core/Typography';
import posed, {PoseGroup} from 'react-pose'
import styles from './InfoPane.module.css'
import RootRef from '@material-ui/core/RootRef'
import SwipeableViews from 'react-swipeable-views';
import waveDivider from '../../../assets/wave-divider.svg'
import spaghetImg from '../../../assets/spaghet.svg'
import cardboardImg from '../../../assets/cardboard.svg'

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
    document.documentElement.style.setProperty('--bg-img', `url(${spaghetImg})`)
    let footerImg
    switch(props.activeStep){
        case 1: footerImg = cardboardImg; break;
        default: footerImg = spaghetImg;
    }
    const items = props.stepList.map(item => (
        <PosedRootDiv
        key={item.id}
        className={styles.InfoContainer}
        >
            <div className={styles.HeaderContainer}>
                <PosedTypography
                    key={'header'+item.id}
                    variant='h4'
                    align='center'
                    color='textPrimary'   
                    className={styles.Header}
                    >{item.header}
                </PosedTypography>
                <img src={waveDivider} className={styles.WaveDivider}/> 
            </div>
            
            
            <PosedTextDiv className={styles.TextContainer}
                key={'textDiv'+item.id}
                pose={props.activeStep === item.id ? 'selected': 'deselected'}
            >
                {item.text.map((paragraph, ix) => (
                    <Typography
                    key={'p'+ix}
                    variant='body1'
                    className={styles.Text}
                    >
                        {paragraph}
                    </Typography> 
                ))}
                {item.extra || null}
                <img src={waveDivider} className={styles.WaveDivider}/> 
            </PosedTextDiv>
            
            <div className={styles.FooterContainer}>
                {<img src={footerImg} height={100}/>}
            </div> 
        </PosedRootDiv>
    ))
    return (
                <SwipeableViews
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
