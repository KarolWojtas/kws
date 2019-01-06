import React from 'react'
import Typography from '@material-ui/core/Typography'
import Chip from '@material-ui/core/Chip';
import styles from './MenuItem.module.css'

const menuItem = props => {
    let  priceChip
    const classes = [styles.RootContainer]
    if(props.price && props.price !== 0){
        priceChip = (<span>
            <Chip
            label={`${props.price} zł`}
            color={'secondary'} 
            />
        </span>)
        classes.push(styles.WithPrice)
    } else {
        priceChip = null
    }
    if(props.header){
        classes.push(styles.Header)
    }
    return (<div className={classes.join(' ')}>
        <span>
            <Typography {...props.primaryProps}>{props.primary}</Typography>
            <Typography color={'textSecondary'} {...props.secondaryProps}>{props.secondary}</Typography>
        </span>
        {priceChip}
    </div>)
}
menuItem.defaultProps = {
    primaryProps: {
        variant: 'h6'
    },
    secondaryProps: {
        variant: 'subtitle2'
    }
}
export default menuItem