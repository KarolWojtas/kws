import React, {Component} from 'react'
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import styles from './Navigation.module.css'
import Menu from '@material-ui/icons/Menu'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Home from '@material-ui/icons/Home'
import RestaurantMenu from '@material-ui/icons/RestaurantMenu'
import {withRouter} from 'react-router-dom'
import Button from '@material-ui/core/Button'
import {I18n} from 'aws-amplify'

class Navigation extends Component {
	state = {
		dialogOpened: false,
		links: [
			{key: 'home', url: '/', text: I18n.get('Navigation-home-btn'), exact: true},
			{key: 'menu', url: '/menu', text: I18n.get('Navigation-menu-btn'), exact: false},
			{key: 'reservations',url: '/reservations', text: I18n.get('Navigation-reservations-btn'), exact: false}
		]
	}
	openDialog = () => {
		this.setState({
			dialogOpened: true
		})
	}
	closeDialog = () => {
		this.setState({
			dialogOpened: false
		})
	}
	navigateMobile = url => {
		this.closeDialog()
		if(url === this.props.location.pathname){
			return
		}
		this.props.history.push(url)
	}
	navigateLarge = url => {
		if(url === this.props.location.pathname){
			return
		}
		this.props.history.push(url)
	}
	chooseMenuIcon = key => {
		switch (key) {
			case 'home': return <Home/>;
			case 'menu': return <RestaurantMenu/>;
			default: return <Home/>;
		}
	}
	render() {
		return (
			<>
				<div className={styles.Toolbar}>
					{this.state.links.map(item => (
						/* <NavLink className={styles.Link} activeClassName={styles.active}
						         exact={item.exact} to={item.url}
						         key={item.key}
						>
							{item.text}
						</NavLink> */
						<Button
							size='large'
							variant={item.url === this.props.location.pathname ? 'outlined' : 'text'}
							key={item.key}
							onClick={() => this.navigateLarge(item.url)}
						>{item.text}</Button>
					))}
				</div>
				
				<IconButton className={styles.Menu} onClick={this.openDialog}>
					<Menu/>
				</IconButton>
				<Dialog onBackdropClick={this.closeDialog}
				        onClose={this.closeDialog} key={'dialog'}
				        open={this.state.dialogOpened}
				>
					<DialogContent>
						<List>
							{this.state.links.map(item => (
								<ListItem button onClick={this.navigateMobile.bind(this, item.url)}
									key={item.key}
								>
									<ListItemIcon>
										{this.chooseMenuIcon(item.key)}
									</ListItemIcon>
									<ListItemText>{item.text}</ListItemText>
								</ListItem>
							))}
						</List>
					</DialogContent>
				</Dialog>
			</>
		)
	}
}

export default withRouter(Navigation)