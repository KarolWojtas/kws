import React, {Component} from 'react'
import Grid from '@material-ui/core/Grid'
import styles from './MainPage.module.css'
import { I18n } from 'aws-amplify';
import InfoPane from '../../components/Main/InfoPane/InfoPane'
import ImagePane from '../../components/Main/ImagePane/ImagePane'
import MobileStepper from '@material-ui/core/MobileStepper';
import pastaImg from '../../assets/main_floor.jpg'
import floorImg from '../../assets/main_pasta.jpg'
import NavigateNext from '@material-ui/icons/NavigateNext'
import NavigateBefore from '@material-ui/icons/NavigateBefore'
import IconButton from '@material-ui/core/IconButton'
import borderImg from '../../assets/main_info_border.svg'
import Penne from '../../components/ui/Icons/Penne/Penne'
import Farfalle from '../../components/ui/Icons/Farfalle/Farfalle'
import Ravioli from '../../components/ui/Icons/Ravioli/Ravioli'

const amberColor = '#FFC107'
const lightAmberColor = '#FFECB3'
const darkAmberColor = '#FF8F00'

class MainPage extends Component {
	state ={
		maxSteps: 3,
		activeStep: 0,
		prevStep: 0,
		stepList: [
			{id: 0, image: floorImg, text: 'info1' , header: 'O nas'},
			{id: 1, image: pastaImg, text: 'info2', header: 'Kontakt'},
			{id: 2, image: pastaImg, text: 'info3', header: 'Other'}
		]
	}
	componentDidMount(){
		document.documentElement.style.setProperty('--border-image-url', `url(${borderImg})`)
	}
	handleClickNext = () => {
		this.setState((prevState) => 
		({
			activeStep: prevState.activeStep === prevState.maxSteps - 1 ? 0 : prevState.activeStep + 1,
			prevStep: prevState.activeStep
		}))
	}
	handleClickPrev = () => {
		this.setState((prevState) => ({
			activeStep: prevState.activeStep === 0 ? prevState.maxSteps -1 : prevState.activeStep - 1,
			prevStep: prevState.activeStep
		}))
	}
	handleChangeIndex= activeStep => {
		this.setState((prevState) => ({
			activeStep: activeStep,
			prevStep: prevState.activeStep
		}))
	}
	render() {
		const {maxSteps, activeStep, stepList, prevStep} = this.state
		return (
			<Grid container className={styles.RootContainer}>
				<Grid item md={6} className={styles.ImagePaneContainer} >
				<ImagePane
					index={activeStep}
					items={stepList}
					handleChangeIndex={this.handleChangeIndex}
					/>
					<MobileStepper 
					steps={maxSteps}
					activeStep={activeStep} 
					position={'static'}
					nextButton={
						<IconButton onClick={this.handleClickNext}>
							<NavigateNext fontSize='large'/>
						</IconButton>
					}
					backButton = {
						<IconButton onClick={this.handleClickPrev}>
							<NavigateBefore fontSize='large'/>
						</IconButton>
					}
					/>			
				</Grid>
				<Grid item md={6} className={styles.InfoPaneContainer}>
					<div className={styles.IconContainer}>
						<Penne inner={darkAmberColor} outer={amberColor} className={styles.Icon}/>
						<Farfalle inner={darkAmberColor} outer={amberColor} className={styles.Icon}/>
						<Ravioli inner={darkAmberColor} outer={amberColor} className={styles.Icon}/>
					</div>
					<InfoPane 
					prevStep={prevStep}
					activeStep={activeStep} 
					stepList={stepList}/>
				</Grid>		
			</Grid>
		)
	}
}

export default MainPage
