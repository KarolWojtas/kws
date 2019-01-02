import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import styles from './Layout.module.css'
import Grid from '@material-ui/core/Grid';
import logoImage from '../../../assets/logo.png'
import Navigation from '../Navigation/Navigation'
import Banner from '../Banner/Banner'
import posed from 'react-pose'

const LogoContainer = posed.div({

	enter: {
		opacity: 1
	},
	exit: {
		opacity: 0
	}
})
const Layout = props => {
	let appBar = (
		<AppBar  style={{position: 'sticky'}}>
			<Toolbar>
				<Navigation></Navigation>
			</Toolbar>
		</AppBar>
	)

	if(window.matchMedia('(min-width: 500px)' ).matches && props.location.pathname === '/'){
		//appBar = null;
	}
	return (
	<div className={styles.RootContainer}>
			<Banner>
				<LogoContainer>
					<img src={logoImage} alt="logo"/>
				</LogoContainer>
			</Banner>
		{appBar}
		<Grid  component={'div'}>
			{props.children}
		</Grid>
		
	</div>
)}
export default Layout