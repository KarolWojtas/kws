import {createMuiTheme} from "@material-ui/core/styles";
import amber from '@material-ui/core/colors/amber'

const darkTheme = createMuiTheme({
	palette: {
		type:'light',
		primary: amber
	},
	typography: {
		useNextVariants: true,
	}
})
export default darkTheme

