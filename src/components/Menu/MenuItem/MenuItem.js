import React from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import styles from './MenuItem.module.css'
import PriceChip from '../../ui/PriceChip/PriceChip'

const menuItem = props => {
    let classes = styles.RootContainer
    if(props.price && props.price !== 0){
        return (
            <Grid container className={classes}>
                <Grid item xs={10}>
                <Typography {...props.primaryProps}>{props.primary}</Typography>
                <Typography color={'textSecondary'} {...props.secondaryProps}>{props.secondary}</Typography>
                </Grid>
                <Grid item xs={2} className={styles.PriceContainer}>
                    <PriceChip>{`${props.price} zł`}</PriceChip>        
                </Grid>
            </Grid>)
    } else {
        if(props.header){
            classes = styles.Header
        }
        return (
            <Grid container className={classes}>
                <Grid item xs={12}>
                <Typography {...props.primaryProps}>{props.primary}</Typography>
                <Typography color={'textSecondary'} {...props.secondaryProps}>{props.secondary}</Typography>
                </Grid>
            </Grid>)
    }
    
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