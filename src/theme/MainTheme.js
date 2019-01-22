import {createMuiTheme} from "@material-ui/core/styles";
import amber from '@material-ui/core/colors/amber'

const mainTheme = createMuiTheme({
	palette: {
		type:'light',
		primary: amber,
		secondary: {
			main: '#f57c00',
			light: '#ffad42',
			dark: '#bb4d00'
		},
		background: {
			default: 'transparent'
		}
	},
	typography: {
		useNextVariants: true,
		fontFamily: [
			"Amatic SC",'-apple-system','BlinkMacSystemFont', "Oswald", "Roboto", "Oxygen", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "sans-serif"
		].join(','),
		fontSize: 25,
		fontWeightLight: 500,
		fontWeightRegular: 700,
		fontWeightMedium: 900,
		subtitle2:{
			fontFamily: [
				 "Open Sans",'-apple-system','BlinkMacSystemFont', "Roboto", "Oxygen", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "sans-serif"
			].join(','),
			fontSize: 20
		},
		body1: {
			fontFamily: [
				"Open Sans",'-apple-system','BlinkMacSystemFont', "Roboto", "Oxygen", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "sans-serif"
		   ].join(','),
		   fontWeight: 500,
		   fontSize: 22
		}
	}
})
export default mainTheme

