import React, {Component} from 'react'
import posed, {PoseGroup} from 'react-pose'
import Grid from '@material-ui/core/Grid'
import styles from './MainPage.module.css'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent'
import pastaImage from '../../assets/pasta-vert-og.jpg'
import { I18n } from 'aws-amplify';

const ListWrapper = posed.div({
	enter: {y: 0, opacity: 1, beforeChildren: true, staggerChildren: 300},
	exit: {y: 50, opacity: 0, beforeChildren: true}
})
const ListItem = posed.div({
	enter: {opacity: 1},
	exit: {opacity: 0},
	pressable: true,
	hoverable: true,
	init: {
		scale: 1,
		zIndex: 0,
		height: '100%',
		width: 'auto',
		filter: 'blur(0px) brightness(100%)',
		backgroundImage: `url(${pastaImage})`
	},
	press: {
		scale: 0.9
	},
	hover: {
		scale: 1,
		zIndex: 0,
		height: '100%',
		width: 'auto',
		backgroundImage: `url(${pastaImage})`,
		filter: 'blur(4px) brightness(50%)'
	}
})
const CardTitle = posed.h3({
	init: {
		color: 'black',
		opacity: 1,
		fontSize: '2rem'
	},
	selected: {
		opacity: 0,
	}
})
const CardContent = posed.div({
	init: {
		color: 'black',
		opacity: 0,
		y: '0px'
	},
	selected: {
		opacity: 1,
		y: '40px'

	}
})

class MainPage extends Component {
	state = {
		list: [{
			key: 1,
			title: I18n.get('MainPage-menu-title'),
			content: I18n.get('MainPage-menu-content'),
			link: '/menu'
		},
			{   key: 2,
				title: 'Title 2',
				content: 'Content2',
				link: '/'
			},
			{   key: 3,
				title: 'Title 3',
				content: 'Content3',
				link: '/'
			}],
		selectedItem: null,
		hoveredItem: null
	}
	
	mouseEnterTileHandler = key => {
		this.setState({hoveredItem: key})
	}
	mouseLeaveTileHandler = () => {
		this.setState({hoveredItem: null})
	}

	selectItem = key => {
		this.setState({
			selectedItem: key,
			hoveredItem: null
		})
	}
	deselectItem = () => {
		this.setState({
			selectedItem: null,
			hoveredItem: null
		})
	}
	navigate = url => {
		if(url === this.props.location.pathname){
			return
		}
		this.props.history.push(url)
	}
	render() {
		return (
			<PoseGroup animateOnMount={true} className={styles.RootContainer}>
				<ListWrapper key={'mainList'}>
					<Grid container spacing={40}>
						{this.state.list.map((item, ix) =>
							<Grid item  xs={12} sm={12} md={4} key={ix} className={styles.Tile}
							      onClick={this.selectItem.bind(this, item.key)}
							>
								<div className={styles.CardWrapper}>
									<ListItem key={ix}
									          className={styles.Card}
									          onMouseEnter={this.mouseEnterTileHandler.bind(this, item.key)}
											  onMouseLeave={this.mouseLeaveTileHandler.bind(this, item.key)}
											  onClick={this.navigate.bind(this, item.link)}

									>
										<CardTitle pose={this.state.hoveredItem === item.key ? 'selected' : 'init'}>{item.title}</CardTitle>

									</ListItem>
									<CardContent
										className={styles.CardContent}
										pose={this.state.hoveredItem === item.key ? 'selected' : 'init'}
									>
										<p>{item.content}</p>

									</CardContent>
								</div>
							</Grid>
						)}
					</Grid>

				</ListWrapper>
				<Dialog onBackdropClick={this.deselectItem}
				        onClose={this.deselectItem} key={'dialog'}
				        open={this.state.selectedItem !== null}
				>
					<DialogContent>
						dupsko
					</DialogContent>
				</Dialog>
			</PoseGroup>


		)
	}
}

export default MainPage