import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {I18n} from 'aws-amplify'
import styles from './OpenHoursTable.module.css'

const OpenHoursTable = props => {
    const {openHours} = props

    return (
        <Table className={styles.Table} padding='dense'>
            <TableHead>
                <TableRow>
                    <TableCell>{I18n.get('MainPage-table-head-day')}</TableCell>
                    <TableCell>{I18n.get('MainPage-table-head-open')}</TableCell>
                    <TableCell>{I18n.get('MainPage-table-head-close')}</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {openHours.map((item, ix) => (
                    <TableRow key={ix}>
                        <TableCell>{I18n.get(`MainPage-table-day-${item.key.toLowerCase()}`)}</TableCell>
                        <TableCell>{item.open}</TableCell>
                        <TableCell>{item.close}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
export default OpenHoursTable