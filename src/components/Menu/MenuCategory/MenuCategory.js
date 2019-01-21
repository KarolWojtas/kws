import React from 'react'
import Grid from '@material-ui/core/Grid'
import styles from './MenuCategory.module.css'
import {I18n} from 'aws-amplify'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PropTypes from 'prop-types'
import MenuItem from '../MenuItem/MenuItem'
import ArrowRightSharp from '@material-ui/icons/ArrowRightSharp'
import Header from '../../ui/Header/Header'

const menuCategory = React.forwardRef((props, ref) => {
    let items = null
    const {category} = props
        if(category === 'breakfast'){
            items = (<Grid item md={12}>
                {props.data.items.map((item, ix) => 
                <div key={ix}>
                    <MenuItem
                        primary={I18n.get(item.title)}
                        secondary={I18n.get(item.description)}
                        price={item.price}
                        primaryProps={{variant: 'h5', color: 'secondary'}}
                    />
                    <List>
                        {item.list.map((subitem, sIx) => (
                            <ListItem key={sIx} divider dense>
                                <ListItemIcon>
                                    <ArrowRightSharp 
                                     fontSize={'small'} color={'disabled'}/>
                                </ListItemIcon>
                                <ListItemText
                                inset
                                primary={I18n.get(subitem)}
                                primaryTypographyProps={{variant: 'h6'}}
                                
                                />
                            </ListItem>
                        ))}    
                    </List>
                </div>
                )}
            </Grid>)
        } else if(category === 'drinks'){
            const numberRows = 4;
            items = props.data.subCategories.map((cat, ix) => 
            <Grid  item md={numberRows} key={cat.key} >
                <MenuItem
                    primary={I18n.get(cat.title)}
                    primaryProps={{variant: 'h5', color: 'secondary'}}
                />
                {cat.items.map((item, ix) =>
                        <MenuItem
                            key={ix}
                            primary={I18n.get(item.title)}
                            price={item.price}
                            secondary={I18n.get(item.description)}
                        />)}
            </Grid>)
        }else if(category === 'season'){

        } else if(category === 'soupSalad'){
            items = (<Grid item md={12}>
                {props.data.subCategories.map(cat => 
                    <div key={cat.key}>
                    <MenuItem
                        primary={I18n.get(cat.title)}
                        primaryProps={{variant: 'h5', color: 'secondary'}}
                    />
                    {cat.items.map((item, ix) =>
                            <MenuItem
                                key={ix}
                                primary={I18n.get(item.title)}
                                price={item.price}
                                secondary={I18n.get(item.description)}
                            />)}
                    </div>)}
            </Grid>)
        } else {
            items = (
                <Grid md={12} item>
                    {props.data.items.map((item, ix) =>(
                        <MenuItem
                            key={ix}
                            primary={I18n.get(item.title)}
                            price={item.price}
                            secondary={I18n.get(item.description)}
                        />
                    ) )}
            </Grid>
            )
        }

    return (
        <div className={styles.RootContainer} ref={ref}>
            <Header>
            <MenuItem
                primary={I18n.get(props.data.categoryTitle)}
                secondary={I18n.get(props.data.categorySubtitle)}
                primaryProps={{variant: 'h4', color:'textPrimary'}}
            />
            </Header>  
            <Grid container direction={window.matchMedia('(max-width: 800px)').matches ? 'column' : 'row'} alignContent='center'>
                    {items}
            </Grid>
        </div>
        
    )
})
menuCategory.propTypes = {
    category: PropTypes.string,
    data: PropTypes.object
}
export default menuCategory

