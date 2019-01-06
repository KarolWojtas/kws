import {createMuiTheme} from "@material-ui/core/styles";
import amber from '@material-ui/core/colors/amber'
import blueGrey from '@material-ui/core/colors/blueGrey'

const mainTheme = createMuiTheme({
	palette: {
		type:'light',
		primary: amber,
		secondary: blueGrey,
		background: {
			default: '#ccc'
		}
	},
	typography: {
		useNextVariants: true,
		fontFamily: [
			'-apple-system','BlinkMacSystemFont',"Amatic SC", "Oswald", "Roboto", "Oxygen", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "sans-serif"
		].join(','),
		fontSize: 25,
		fontWeightLight: 500,
		fontWeightRegular: 700,
		fontWeightMedium: 900,
		subtitle2:{
			fontFamily: [
				'-apple-system','BlinkMacSystemFont', "Open Sans", "Roboto", "Oxygen", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "sans-serif"
			].join(','),
			fontSize: 20
		}
	}
})
export default mainTheme

