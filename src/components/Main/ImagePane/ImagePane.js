import React from 'react'
import SwipeableViews from 'react-swipeable-views';
import styles from './ImagePane.module.css'

const ImagePane = props => {
    const items = props.items.map((item) => (
        <div key={item.id} className={styles.RootContainer}
        >
            <img src={item.image} alt={item.id} className={styles.Image}/>
        </div>
    ))
    return (
        <SwipeableViews
        index={props.index}
        enableMouseEvents
        onChangeIndex={props.handleChangeIndex}
        >
            {items}
        </SwipeableViews>
    )
}
export default ImagePane