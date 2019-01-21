import React from 'react'
import SwipeableViews from 'react-swipeable-views';
import styles from './ImagePane.module.css'
import floorImg from '../../../assets/main_floor.jpg'

const ImagePane = props => {
    document.documentElement.style.setProperty('--image', floorImg)
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