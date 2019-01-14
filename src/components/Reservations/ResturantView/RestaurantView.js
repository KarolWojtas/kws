import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import WindowSeat from './RestaurantViewComponents/WindowSeats/WindowSeat'
import EmptyTile from './RestaurantViewComponents/EmptyTile'
import styles from './RestaurantView.module.css'
import WallSeat from './RestaurantViewComponents/WallSeats/WallSeat'
import CouchSeat from './RestaurantViewComponents/CouchSeats/CouchSeat'
import RootRef from '@material-ui/core/RootRef';

const EMPTY = 'EMPTY'
const TABLE = 'TABLE'
const TABLE_LONG = 'TABLE_LONG'
const WALL_COLOR = '#444'
class RestaurantView extends Component {
    state = {
        tiles: [
            //1
            {type: EMPTY, component: () =><EmptyTile/>},
            {type: EMPTY, component: () =><EmptyTile/>},
            {type: TABLE, component: (props) => <WindowSeat left {...props}/>, tableId: 9},
            {type: TABLE, component: (props) => <WindowSeat {...props}/>, tableId: 10},
            {type: TABLE, component: (props) => <WindowSeat right {...props}/>, tableId: 11},
            {type: EMPTY, component: () =><EmptyTile fill={WALL_COLOR}/>},
            //2
            {type: TABLE, component: (props) => <WallSeat top {...props}/>, tableId: 8},
            {type: EMPTY, component: () =><EmptyTile/>},
            {type: TABLE_LONG, component: (props) => <CouchSeat top {...props}/>, tableId: 1},
            {type: EMPTY, component: () =><EmptyTile fill={WALL_COLOR}/>},
            //3
            {type: TABLE, component: (props) => <WallSeat {...props}/>, tableId: 7},
            {type: EMPTY, component: () =><EmptyTile />},
            {type: TABLE_LONG, component: (props) => <CouchSeat {...props}/>, tableId: 2},
            {type: EMPTY, component: () =><EmptyTile fill={WALL_COLOR}/>},
            //4
            {type: TABLE, component: (props) => <WallSeat {...props}/>, tableId: 6},
            {type: EMPTY, component: () =><EmptyTile />},
            {type: TABLE_LONG, component: (props) => <CouchSeat {...props}/>, tableId: 3},
            {type: EMPTY, component: () =><EmptyTile fill={WALL_COLOR}/>},
            //5
            {type: TABLE, component: (props) => <WallSeat bottom {...props}/>, tableId: 5},
            {type: EMPTY, component: () =><EmptyTile />},
            {type: TABLE_LONG, component: (props) => <CouchSeat bottom {...props}/>, tableId: 4},
            {type: EMPTY, component: () =><EmptyTile fill={WALL_COLOR}/>},
            //6
            {type: EMPTY, component: () => <EmptyTile />},
            {type: EMPTY, component: () => <EmptyTile />},
            {type: EMPTY, component: () =><EmptyTile/>},
            {type: EMPTY, component: () => <EmptyTile />},
            {type: EMPTY, component: () =><EmptyTile/>},
            {type: EMPTY, component: () =><EmptyTile fill={WALL_COLOR}/>},
        ]
    }
    render(){
        const tiles = this.state.tiles.map((tile, ix) => {
            let handleClick = () => this.props.handleSelectTable(tile.tableId)
            let isDisabled = false
            if(this.props.tablesReserved !== undefined){
                if(this.props.tablesReserved.includes(tile.tableId)){
                    handleClick = null
                    isDisabled = true
                }
            }
            switch(tile.type){
                case TABLE: return <Grid key={ix} item xs={2} onClick={handleClick} className={styles.Tile}>
                    {tile.component({
                        disabled: isDisabled,
                        selected: this.props.tablesSelected.includes(tile.tableId) ? true : false
                    })}
                </Grid>
                case TABLE_LONG: return <Grid key={ix} item xs={6} onClick={handleClick} className={styles.Tile}
                    >{tile.component({
                        disabled: isDisabled,
                        selected: this.props.tablesSelected.includes(tile.tableId) ? true : false
                    })}</Grid>
                case EMPTY: return  <Grid key={ix} item xs={2} className={styles.Tile}>{tile.component()}</Grid>
                default: return null 
            }
        })    
    return  ( <RootRef rootRef={this.props.innerRef}>
            <Grid container className={styles.RestaurantView} spacing={0}>
            {tiles}
            </Grid>
        </RootRef>)
    }
}
RestaurantView.propTypes = {
    tablesReserved: PropTypes.array,
    tablesReservedUnconfirmed: PropTypes.array,
    tablesSelected: PropTypes.array,
    allTables: PropTypes.array,
    handleSelectTable: PropTypes.func
}
export default React.forwardRef((props, ref) => <RestaurantView {...props} innerRef={ref}/>)