import React, {PureComponent} from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import styles from './Layout.module.css'
import Grid from '@material-ui/core/Grid';
import logoImage from '../../../assets/logo.svg'
import neonLogoImage from '../../../assets/neon-logo.svg'
import Navigation from '../Navigation/Navigation'
import Banner from '../Banner/Banner'
import posed from 'react-pose'
import RootRef from '@material-ui/core/RootRef'
import {fromEvent} from 'rxjs'
import {map} from 'rxjs/operators'
import Copyright from '@material-ui/icons/Copyright'
import Typography from '@material-ui/core/Typography'
import waveBgLg from '../../../assets/wave-bg-lg.svg'
import waveBgSm from '../../../assets/wave-bg-sm.svg'


const LogoContainer = posed.div({

	enter: {
		opacity: 1
	},
	exit: {
		opacity: 0
	}
})

class Layout extends PureComponent {
	toolbar = React.createRef();
	state = {
		isSticky: false
	}
	componentDidMount(){
		document.documentElement.style.setProperty('--wave-bg-lg', `url(${waveBgLg})`)
		document.documentElement.style.setProperty('--wave-bg-sm', `url(${waveBgSm})`)

		let offset = this.toolbar.current.offsetTop < 250 ? 300 : this.toolbar.current.offsetTop;
		console.log(offset)
		this.scroll$ = fromEvent(document, 'scroll').pipe(
			map(e => e.target.scrollingElement.scrollTop)
		).subscribe(e => {
			this.setState({isSticky: e > offset})

		})

	}
	componentWillUnmount(){
		this.scroll$.unsubscribe()
	}
	render(){
		const appBar = (
			<RootRef rootRef={this.toolbar}>
			<AppBar position={'static'} className={this.state.isSticky ? styles.Sticky : null}>
				<Toolbar>
					<Navigation></Navigation>
				</Toolbar>
			</AppBar>
			</RootRef>
	)
	const rootClasses = [styles.RootContainer]
	if(this.state.isSticky) rootClasses.push(styles.AddPadding)
	return (
	<div className={rootClasses.join(' ')}>
		<Banner>
			
			<LogoContainer>
				<img src={neonLogoImage} alt="logo" className={styles.BrandImage}/>
			</LogoContainer>
		</Banner>
		{appBar}
		<Grid  component={'div'} className={styles.Content}>
			{this.props.children}
		</Grid>
		<div className={styles.Footer}>
			<Copyright/> <Typography >Kluska Gdynia</Typography>
		</div>
	</div>
)
	}
	}
export default Layout