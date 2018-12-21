import React, {Component} from 'react'
import styles from './MenuPage.module.css'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import posed, {PoseGroup} from 'react-pose'
import {I18n} from 'aws-amplify'
import MenuCategory from '../../components/Menu/MenuCategory/MenuCategory'
import MenuNav from '../../components/Menu/MenuNav/MenuNav'

const PosedMenuCategory = posed(MenuCategory)({
	init: {
		opacity: 1,
	},
	enter: {
		opacity: 1,
		transition: {duration: 400 }
	},
	exit: {
		opacity: 0,
		transition: {duration: 400, type: 'decay'}
	}
})
class MenuPage extends Component{
	state = {
		selectedTab: {
			tabNumber: 0,
			tabKey: Object.keys(menu)[0]
		}
	}
	handleSwitchTabWithValue = (event, value) => {
		this.setState({
			selectedTab: {
				tabNumber: value,
				tabKey: Object.keys(menu)[value]
			}
		})
	}
	arrayWithPrefix = prefix => {
		return 
	}
	handleSwitchTabWithKey = (key) => {

		this.setState({
			selectedTab: {
				tabNumber: Object.keys(menu).findIndex(itemKey => itemKey === key),
				tabKey: key
			}
		})
	}
	render(){
		const tabContents = Object.keys(menu).filter((key, ix) => ix === this.state.selectedTab.tabNumber).map(key => 
							
								<PosedMenuCategory 
								key={key} 
								category={key}
								data={menu[key]} 
							/>
							
							)
	
		return (
			<div className={styles.RootContainer} >
				<Grid container>
					<Grid item xs={12} className={styles.CenterContent}>
						<MenuNav
							menu={menu}
							handleSwitchTabWithValue={this.handleSwitchTabWithValue}
							handleSwitchTabWithKey={this.handleSwitchTabWithKey}
							tabNumber={this.state.selectedTab.tabNumber}
						/>
						<PoseGroup>
						{tabContents}
						</PoseGroup>
					</Grid>
				</Grid>
			</div>
		)
	}
}
export default MenuPage

const menu = {
	breakfast: {
		categoryTitle: 'MenuPage-breakfast-category-title', 
		categorySubtitle: 'MenuPage-breakfast-category-subtitle',
		items: [
			{
				key: 'omlet',
				title: 'MenuPage-breakfast-omlet-title',
				description: 'MenuPage-breakfast-omlet-description',
				price: 15,
				list: Array(5).fill(0).map((item, ix) => 'MenuPage-breakfast-omlet-'+(ix+1))
			},
			{	
				key: 'bagel',
				title: 'MenuPage-breakfast-bagel-title',
				description: 'MenuPage-breakfast-bagel-description',
				price: 15,
				list: Array(6).fill(0).map((item, ix) => 'MenuPage-breakfast-bagel-'+(ix+1))
			}
		]
			
	},
	pasta: {
		categoryTitle: 'MenuPage-pasta-category-title',
		items: generateMenuItems('pasta',[15, 25, 35, 30, 25, 17, 16, 18, 12, 16])
	},
	soupSalad: {
		categoryTitle: 'MenuPage-soupsalads-category-title',
		subCategories: [
			{
				key: 'soup',
				title: 'MenuPage-soup-category-title',
				items: generateMenuItems('soup', [8])
			},
			{
				key: 'salads',
				title: 'MenuPage-salads-category-title',
				items: generateMenuItems('salads', [16, ' '])
			}
		]
	},
	kids: {
		categoryTitle: 'MenuPage-kids-category-title',
		items: generateMenuItems('kids', [12, 13])
	},
	drinks: {
		categoryTitle: 'MenuPage-drinks-category-title',
		subCategories: [
			{
				key: 'tea',
				title: 'MenuPage-tea-category-title',
				items: generateMenuItems('tea', [5])
			},
			{
				key: 'coffe',
				title: 'MenuPage-coffee-category-title',
				items: generateMenuItems('coffee', [6,8,8,8,8])
			},
			{
				key: 'cold',
				title: 'MenuPage-cold-category-title',
				items: generateMenuItems('cold', [5,5,5,5,5,5,4,12,12])
			}
		]
	},
	season: {
		categoryTitle: 'MenuPage-season-category-title'
	}
}
function generateMenuItems(key, array){
	return array.map((price, ix) => {
		return {
			title: `MenuPage-${key}-${ix+1}-title`,
			description: `MenuPage-${key}-${ix+1}-description`,
			price: price
		}
	})
}