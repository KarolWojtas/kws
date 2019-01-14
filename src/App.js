import React, {PureComponent} from 'react';
import {Route, Switch, withRouter} from "react-router-dom";
import Layout from './components/ui/Layout/Layout'
import {MuiThemeProvider, CssBaseline} from "@material-ui/core";
import theme from './theme/MainTheme'
import MainPage from './containers/MainPage/MainPage'
import MenuPage from './containers/MenuPage/MenuPage'
import ReservationsPage from './containers/ReservationsPage/ReservationsPage'
import posed, {PoseGroup} from 'react-pose'
import {I18n} from 'aws-amplify'
import {dict} from './assets/i18n/i18n'
import styles from './App.module.css'
import asyncComponent from './components/hoc/asyncComponent/AsyncComponent'


const RouteContainer = posed.div({
	init: {
		scale: 1,
		opacity: 1
	},
	enter: {
		opacity: 1,
		x: 0,
		beforeChildren: true,
		delay: 200,
		transition: {
			type: 'tween'
		}
	},
	exit: {
		opacity: 0,
		x: '-100%',
		transition: {
			duration: 0
		}
	}
})
// const asyncMenu = asyncComponent(() => {
// 	return import ('./containers/MenuPage/MenuPage')
// })
// const asyncReservations = asyncComponent(() => {
// 	return import ('./containers/ReservationsPage/ReservationsPage')
// })
class App extends PureComponent {

	componentWillMount(){
		I18n.setLanguage('pl')
		I18n.putVocabularies( dict);
		
	}

	render() {
		return (
		<div>
			<MuiThemeProvider theme={theme} >
                <CssBaseline />
					<Layout>
						<PoseGroup>
							<RouteContainer key={this.props.location.key ? this.props.location.key : `${Math.ceil(Math.random() * 1000)}`}>
								<Switch>
									<Route component={MenuPage} path={'/menu'}/>
									<Route component={ReservationsPage} path={'/reservations'}/>
									<Route component={MainPage} exact path={'/'}/>
								</Switch>
							</RouteContainer>
						</PoseGroup>
						
					</Layout>
			</MuiThemeProvider>
		</div>
		);
	}
}

export default withRouter(App);
