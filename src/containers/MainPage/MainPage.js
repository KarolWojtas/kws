import React, {Component} from 'react'
import posed, {PoseGroup} from 'react-pose'
import Grid from '@material-ui/core/Grid'
import styles from './MainPage.module.css'
import { I18n } from 'aws-amplify';

class MainPage extends Component {
	
	render() {
		return (
			<PoseGroup animateOnMount={true} className={styles.RootContainer}>
				
			</PoseGroup>


		)
	}
}

export default MainPage