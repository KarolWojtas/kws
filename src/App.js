import React, {PureComponent, Suspense} from 'react';
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
import {connect} from 'react-redux'
import * as settingCreators from './store/actions/settingsActionCreators'
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
const amberColor = '#FFC107'
const lightAmberColor = '#FFECB3'
const darkAmberColor = '#FF8F00'
const MenuPageWrapper = props => (
	<React.Suspense
		fallback={<p>Loading</p>}
	>
		{React.createElement(React.lazy(() => import('./containers/MenuPage/MenuPage')))}
	</React.Suspense>
)

class App extends PureComponent {

	componentWillMount(){
		I18n.setLanguage(this.props.lang)
		I18n.putVocabularies( dict);
	}
	handleChangeLanguage = language =>{
		this.props.setLanguage(language)
		I18n.setLanguage(language)
	} 

	render() {
		return (
		<div>
			<MuiThemeProvider theme={theme} >
                <CssBaseline />
					<Layout handleChangeLanguage={this.handleChangeLanguage} activeLang={this.props.lang}>
						<PoseGroup>
							<RouteContainer key={this.props.location.key ? this.props.location.key : `${Math.ceil(Math.random() * 1000)}`}>
								<Switch>
									<Route component={props => <MenuPageWrapper {...props}/>} path={'/menu'}/>
									<Route component={props => <ReservationsPage {...props}/>} path={'/reservations'}/>
									<Route component={props => <MainPage {...props}/>} exact path={'/'}/>
								</Switch>
							</RouteContainer>
						</PoseGroup>
						
					</Layout>
			</MuiThemeProvider>
		</div>
		);
	}
}
const mapStateToProps = state => ({
	lang: state.settings.lang
})
const mapDispatchToProps = dispatch => {
	return {
		setLanguage: lang => dispatch(settingCreators.setLanguage(lang))
	}
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
