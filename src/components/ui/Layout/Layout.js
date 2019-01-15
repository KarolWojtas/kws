import React, {PureComponent} from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import styles from './Layout.module.css'
import Grid from '@material-ui/core/Grid';
import logoImage from '../../../assets/logo.png'
import Navigation from '../Navigation/Navigation'
import Banner from '../Banner/Banner'
import posed from 'react-pose'
import RootRef from '@material-ui/core/RootRef'
import {fromEvent} from 'rxjs'
import {map} from 'rxjs/operators'
import Copyright from '@material-ui/icons/Copyright'
import Typography from '@material-ui/core/Typography'
import Penne from '../Icons/Penne/Penne'
import Farfalle from '../Icons/Farfalle/Farfalle'
import Ravioli from '../Icons/Ravioli/Ravioli'

const LogoContainer = posed.div({

	enter: {
		opacity: 1
	},
	exit: {
		opacity: 0
	}
})
const amberColor = '#FFC107'
const lightAmberColor = '#FFECB3'
const darkAmberColor = '#FF8F00'
class Layout extends PureComponent {
	toolbar = React.createRef();
	state = {
		isSticky: false
	}
	componentDidMount(){
		let offset = this.toolbar.current.offsetTop < 250 ? 294 : this.toolbar.current.offsetTop;
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
			<Penne inner={darkAmberColor} outer={amberColor}/>
			<Farfalle inner={darkAmberColor} outer={amberColor}/>
			<Ravioli inner={darkAmberColor} outer={amberColor}/>
			<LogoContainer>
				<img src={logoImage} alt="logo" className={styles.BrandImage}/>
			</LogoContainer>
		</Banner>
		{appBar}
		<Grid  component={'div'} className={styles.Content}>
			{this.props.children}
		</Grid>
		<div className={styles.Footer}>
			<Copyright/> <Typography >Karol Wojtas</Typography>
		</div>
	</div>
)
	}
	}
export default Layout