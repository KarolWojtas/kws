import React, {Component} from 'react';
import {Route, Switch, withRouter} from "react-router-dom";
import Layout from './components/ui/Layout/Layout'
import {MuiThemeProvider, CssBaseline} from "@material-ui/core";
import darkTheme from './theme/DarkTheme'
import MainPage from './containers/MainPage/MainPage'
import MenuPage from './containers/MenuPage/MenuPage'
import posed, {PoseGroup} from 'react-pose'
import {I18n} from 'aws-amplify'
import {dict} from './assets/i18n/i18n'

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
class App extends Component {

	componentWillMount(){
		I18n.setLanguage('pl')
		I18n.putVocabularies( dict);
	}
	render() {
		return (

			<MuiThemeProvider theme={darkTheme}>
                <CssBaseline />
				<Layout location={this.props.location}>

					<PoseGroup>
						<RouteContainer key={this.props.location.key ? this.props.location.key : `${Math.ceil(Math.random() * 1000)}`}>
							<Switch>
								<Route component={MenuPage} path={'/menu'}/>
								<Route component={MainPage} exact path={'/'}/>
							</Switch>
						</RouteContainer>
					</PoseGroup>


				</Layout>
			</MuiThemeProvider>
		);
	}
}

export default withRouter(App);
