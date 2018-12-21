import React from 'react'
import Typography from '@material-ui/core/Typography'
import styles from '../MenuItem/MenuItem.module.css'
const menuItem = props => {
    return (
        <div className={styles.Container}>
            <div className={styles.HeaderContainer}>
                <h4 className={styles.HeaderTitle}>{`${props.title} ${props.price} zł`}</h4>
                <p className={styles.HeaderSubtitle}>{props.subtitle}</p>
            </div>
            <div>
                {props.children}
            </div>
        </div>
    )
}
export default menuItem