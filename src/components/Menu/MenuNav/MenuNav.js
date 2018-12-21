import React, {Component} from 'react'
import {I18n} from 'aws-amplify'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import styles from './MenuNav.module.css'

class MenuNav extends Component{
    state = {
        menuButtonTarget: null
    }
    handleOpenMenu = event => {
        this.setState({menuButtonTarget: event.currentTarget})
    }
    handleCloseMenu = () => {
        this.setState({menuButtonTarget: null})
    }
    handleSwitchMenuTabWithKey = key => {
        console.log(key)
        this.handleCloseMenu()
        this.props.handleSwitchTabWithKey(key)
    }
    render(){
        let tabNames = null 
		let menuComponent = null;
		if(window.matchMedia('(min-width: 800px)' ).matches){
            tabNames = Object.keys(this.props.menu).map(key => <Tab key={key} label={I18n.get(this.props.menu[key].categoryTitle)} />)
			menuComponent = (<div >
				<Tabs
			value={this.props.tabNumber}
			onChange={this.props.handleSwitchTabWithValue}
			indicatorColor={'primary'}
		>
			{tabNames}
		</Tabs>
			</div>
				
			)
		} else {
            tabNames = Object.keys(this.props.menu).map(key => 
            <MenuItem 
            onClick={()=>this.handleSwitchMenuTabWithKey(key)}
                key={key} >{I18n.get(this.props.menu[key].categoryTitle)}</MenuItem>)

			menuComponent = (
                <div className={styles.RootContainer}>
                    <Button
                    size='large'
                    variant={'contained'}
                    onClick={this.handleOpenMenu}
                >{I18n.get('MenuNav-menu-button-title')}</Button>
                
                <Menu
                    id={'menu-category'}
                    anchorEl={this.state.menuButtonTarget}
                    open={this.state.menuButtonTarget !== null}
                    onClose={this.handleCloseMenu}
                >   
                    <ClickAwayListener onClickAway={this.handleCloseMenu}>
                        <>
                        {tabNames}
                        </>
                    </ClickAwayListener>
                </Menu>
                
                </div>
			)
        }
        return menuComponent
    }
    
}
export default MenuNav