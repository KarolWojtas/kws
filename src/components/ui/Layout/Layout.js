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
import { ro } from 'date-fns/esm/locale';

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
		let offset = this.toolbar.current.offsetTop < 250 ? 294 : this.toolbar.current.offsetTop;
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
				<img src={logoImage} alt="logo" className={styles.BrandImage}/>
			</LogoContainer>
		</Banner>
		{appBar}
		<Grid  component={'div'} className={styles.Content}>
			{this.props.children}
		</Grid>
		
	</div>
)
	}
	}
export default Layout