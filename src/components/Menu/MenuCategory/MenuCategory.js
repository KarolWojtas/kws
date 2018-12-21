import React from 'react'
import Grid from '@material-ui/core/Grid'
import styles from './MenuCategory.module.css'
import {I18n} from 'aws-amplify'
import MenuItem from '../MenuItem/MenuItem'

const menuCategory = React.forwardRef((props, ref) => {
    let items = null
    const {category} = props
        if(category === 'breakfast'){
            items = props.data.items.map((item, ix) => 
                <Grid item key={ix} md={6}>
                    <MenuItem title={I18n.get(item.title)} subtitle={I18n.get(item.description)} price={item.price}>
                    {item.list.map((subitem, sIx) => <p key={sIx}>{`${sIx+1}. ${I18n.get(subitem)}`}</p>)}
                    </MenuItem>
                </Grid>
                )
        } else if(category == 'soupSalad' || category == 'drinks'){
            const numberRows = 12/props.data.subCategories.length;
            items = props.data.subCategories.map(cat => 
            <Grid  item md={numberRows} key={cat.key} className={styles.SubcategoryContainer}>
                
                <h3 className={styles.SubcategoryHeader}>{I18n.get(cat.title)}</h3>
                {cat.items.map((item, ix) => 
                <MenuItem
                    title={I18n.get(item.title)} subtitle={I18n.get(item.description)} price={item.price} key={ix}
                ></MenuItem>)}
                
            </Grid>)
        }else if(category == 'season'){

        } else {
            items = props.data.items.map((item, ix) => 
                <Grid md={12} key={ix} item>
                    <MenuItem title={I18n.get(item.title)} price={item.price} subtitle={I18n.get(item.description)}></MenuItem>
                </Grid>
                )
        }

    return (
        <div className={styles.RootContainer} ref={ref}>
            <h3>{I18n.get(props.data.categoryTitle)}</h3>
            <h5>{I18n.get(props.data.categorySubtitle)}</h5>
            
            <Grid container direction={window.matchMedia('(max-width: 800px)').matches ? 'column' : 'row'} alignContent='center'>
                    {items}
            </Grid>
        </div>
        
    )
})
export default menuCategory