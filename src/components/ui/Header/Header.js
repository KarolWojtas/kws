import React from 'react'
import styles from './Header.module.css'
const Header = React.forwardRef((props, ref) => {
    return (
        <div className={styles.RootContainer} ref={ref}>
        {props.children}
        </div>
    )
})
export default Header 