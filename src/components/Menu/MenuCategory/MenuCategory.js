import React from 'react'
import Grid from '@material-ui/core/Grid'
import styles from './MenuCategory.module.css'
import {I18n} from 'aws-amplify'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import PropTypes from 'prop-types'

const menuCategory = React.forwardRef((props, ref) => {
    let items = null
    const {category} = props
        if(category === 'breakfast'){
            items = props.data.items.map((item, ix) => 
                <Grid item key={ix} md={6}>
                    <List>
                        <ListItem>
                            <ListItemText
                                primary={I18n.get(item.title) + ' '+ item.price+' zł'} 
                                primaryTypographyProps={{variant: 'h6', color: 'secondary'}}
                                secondary={I18n.get(item.description)}
                            ></ListItemText>
                        </ListItem>
                        {item.list.map((subitem, sIx) => 
                            <ListItem key={sIx}>
                                    <ListItemText primary={`${sIx+1}. ${I18n.get(subitem)}`}/>
                            </ListItem>)}
                    </List>
                            
                </Grid>
                )
        } else if(category === 'soupSalad' || category === 'drinks'){
            const numberRows = 12/props.data.subCategories.length;
            items = props.data.subCategories.map(cat => 
            <Grid  item md={numberRows} key={cat.key}  >
                <List>
                    <ListItem>
                        <ListItemText primary={I18n.get(cat.title)}
                            primaryTypographyProps={{variant: 'h6', color: 'secondary'}}
                        />
                    </ListItem>
                    {cat.items.map((item, ix) => 
                        <ListItem key={ix}>
                            <ListItemText primary={I18n.get(item.title)+' '+item.price+'zł'} 
                                secondary={I18n.get(item.description)}/>
                        </ListItem>)}
                </List>
            </Grid>)
        }else if(category === 'season'){

        } else {
            items = (
                <Grid md={12} item>
                <List>
                    {props.data.items.map((item, ix) =>(
                        <ListItem key={ix}>
                            <ListItemText primary={I18n.get(item.title)+' '+item.price+' zł'} secondary={I18n.get(item.description)}/>
                        </ListItem>
                    ) )}
                </List>
            </Grid>
            )
        }

    return (
        <div className={styles.RootContainer} ref={ref}>
            <List>
                <ListItem>
                    <ListItemText primary={I18n.get(props.data.categoryTitle)} 
                        primaryTypographyProps={{variant: 'h4', color:'secondary'}}
                        secondary={I18n.get(props.data.categorySubtitle)}/>
                </ListItem>
            </List>    
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

