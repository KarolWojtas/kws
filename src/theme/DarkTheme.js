import {createMuiTheme} from "@material-ui/core/styles";
import amber from '@material-ui/core/colors/amber'
import blueGrey from '@material-ui/core/colors/blueGrey'

const darkTheme = createMuiTheme({
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
	}
})
export default darkTheme

