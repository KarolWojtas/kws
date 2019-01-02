import React, {Component} from 'react'
import posed, {PoseGroup} from "react-pose";
import styles from './Banner.module.css'	
import {fromEvent, merge} from "rxjs";
import {map, tap, debounceTime, switchMap} from "rxjs/operators";

const BannerContainer = posed.div({
	init: {
		//backgroundImage: `url(${cityImage})`,
		backgroundPosition: 'center',
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover'
	},
	enter: {
		opacity: 1,
		beforeChildren: true,
		staggerChildren: 300,
		transition: {
			duration: 1000
		}
	},
	exit: {
		opacity: 0
	}
})
class Banner extends Component {

	bannerRef = React.createRef();
	componentDidMount() {

		const {clientWidth, clientHeight} = document.documentElement;

		this.touchMove$ =  fromEvent(this.bannerRef.current, 'touchmove', {passive: true}).pipe(
			map(e => {
				return {
					x: e.touches[0].clientX,
					y: e.touches[0].clientY
				}
			})
		)
		this.mouseMove$ = fromEvent(this.bannerRef.current, 'mousemove').pipe(
			map(event => {return {x: event.clientX, y: event.clientY}})
		)
		this.allMove$ = merge(this.mouseMove$, this.touchMove$).pipe(
			tap(pos => {
				styleVar('--image-rot-x', `${(pos.y / clientHeight * -50) + 35}deg`)
				styleVar('--image-rot-y', `${(pos.x / clientWidth * 50) - 35}deg`)
			}),
			switchMap(pos => merge(fromEvent(this.bannerRef.current, 'mouseleave'), fromEvent(this.bannerRef.current, 'touchend')).pipe(

				debounceTime(500),
				tap(_ => {
					styleVar('--image-rot-x', '0deg')
					styleVar('--image-rot-y', '0deg')
				})
			))

		).subscribe()
	}

	render(){
		return (
			<PoseGroup animateOnMount={true}>
				<BannerContainer className={styles.BannerContainer}
				                 ref={this.bannerRef}
				                 key={'banner'}
				>
					<div className={styles.BannerContent}>
						{this.props.children}
					</div>
				</BannerContainer>
			</PoseGroup>
		)
	}
	componentWillUnmount() {
		this.allMove$.unsubscribe()
	}
}
const styleVar = (propName, propValue) => {
	document.documentElement.style.setProperty(propName, propValue)
}
export default Banner