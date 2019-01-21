import React, {Component} from 'react'
import Grid from '@material-ui/core/Grid'
import styles from './MainPage.module.css'
import { I18n } from 'aws-amplify';
import InfoPane from '../../components/Main/InfoPane/InfoPane'
import ImagePane from '../../components/Main/ImagePane/ImagePane'
import MobileStepper from '@material-ui/core/MobileStepper';
import pastaImg from '../../assets/main_floor.jpg'
import floorImg from '../../assets/main_pasta.jpg'
import neonImg from '../../assets/neon.jpg'
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
			{id: 0, image: floorImg, text: ['Cześć!', 'Kluska pokazuje swój makaronowy pogląd na świat.', 
				'Stawiamy na sezonowość produktów, dzięki której każdego tygodnia spotkacie w naszym menu tygodniową wkładkę z nowymi pozycjami!',
				'Chwalimy siœ świeżymi makaronami z których przygotowywane są nasze dania!'] ,
			 header: 'O nas'},
			{id: 1, image: pastaImg, text: ['Cenimy sobie dobre śniadanka, dlatego teź codziennie rozpieszczamy Was świeżymi bajglami i omletami!',
			'Nie lubimy nudy - chcemy zarażać Was energią, optymizmem i chęcią spędzania wspólnie wolnego czasu',
			'Cenimy szczerość i otwartość - daj nam znać co robimy dobrze, a co warto zmienić. Jeżeli masz pomysł na sezonowy makaron - sprzedaj pomysł kucharzowi, zapewnw chętnie przygotuje coś dla Ciebie!',
			'Dzięki, że jesteś!'],
			 header: 'O nas C.D.'},
			{id: 2, image: neonImg, text: ['Nasz adres:','ul. Abrahama 26 lok. 1 81-366 Gdynia', 'Telefon: 730 059 695'],
			 header: 'Kontakt'}
		]
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
			<div className={styles.RootContainer}>
			<Grid container >
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
					<InfoPane 
					prevStep={prevStep}
					activeStep={activeStep}
					handleChangeIndex={this.handleChangeIndex} 
					stepList={stepList}/>
					
				</Grid>		
			</Grid>
			</div>
		)
	}
}

export default MainPage
