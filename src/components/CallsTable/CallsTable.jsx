import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import NavigationMenu from '../NavigationMenu/NavigationMenu';
import CallMadeIcon from '@mui/icons-material/CallMade';
import CallReceivedIcon from '@mui/icons-material/CallReceived';
import { getCallsFetchAC } from '../../redux/actionCreators/callsAC';
import { paramsInitAC } from '../../redux/actionCreators/paramsAC';
import DateComponent from '../DateComponent/DateComponent';
import './CallsTable.css'

function CallsTable(props) {
  const dispatch = useDispatch()
  const calls = useSelector((state) => state.callsReducer.calls)
  const params = useSelector((state) => state.paramsReducer?.params)
  useEffect(() => {
    dispatch(paramsInitAC(''))
  }, [dispatch])

  useEffect(() => {
    dispatch(getCallsFetchAC(params))
  }, [params, dispatch])

  return (
    <>
      <DateComponent />
      <TableContainer sx={{
        marginTop: '42px',
        width: '1440px',
        heigth: '1985px',
        display: 'block',
        marginLeft: '15%',
        boxShadow: '0px 4px 5px #E9EDF3',
        borderRadius: '8px',
        '& .MuiTableCell-root': {
          textAlign: 'left',
          padding: '0',
          fontFamily: 'SF Pro Display',
          fontWeight: '400',
          fontSize: '15px',
          lineHeight: '21px',
          height: '65px',
          borderBottom: '1px solid rgba(234, 240, 250, 1)'
        },
        '& .MuiTableRow-root': {
          display: 'inline'
        }
      }}
        component={Paper}>
        <NavigationMenu calls={calls} />
        <Table sx={{
          minWidth: 650,
        }}
          aria-label="simple table">
          <TableHead>
            <TableRow sx={{ '& .MuiTableCell-root': { height: '50px', fontSize: '14px', color: 'rgba(137, 156, 177, 1)' } }}>
              <TableCell sx={{ height: '61px !important', width: '40px', borderBottom: '0px !important' }}></TableCell>
              <TableCell sx={{ height: '61px !important', width: '53px' }}>Тип</TableCell>
              <TableCell sx={{ height: '61px !important', width: '89px', textIndent: '0' }} align="right">Время</TableCell>
              <TableCell sx={{ height: '61px !important', width: '128px', textIndent: '0' }} align="right">Сотрудник</TableCell>
              <TableCell sx={{ height: '61px !important', width: '326px', textIndent: '0' }} align="right">Звонок</TableCell>
              <TableCell sx={{ height: '61px !important', width: '214px', textIndent: '0' }} align="right">Источник</TableCell>
              <TableCell sx={{ height: '61px !important', width: '461px', textIndent: '0' }} align="right">Оценка</TableCell>
              <TableCell sx={{ height: '61px !important', width: '129px', textIndent: '0' }} align="right">Длительность</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {calls.length ? calls.map((call) => (
              <TableRow
                key={uuidv4()}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                }}
              >
                <TableCell sx={{ width: '46px', borderBottom: '0px !important' }}></TableCell>
                <TableCell component="th" scope="row">{call.in_out === 1 ? <CallReceivedIcon sx={{ color: 'rgba(40, 168, 121, 1)', height: '12.52px', width: '12.52px', marginRight: '37.48px' }} /> : <CallMadeIcon sx={{ color: 'rgba(0, 95, 248, 1)', height: '12.52px', width: '12.52px', marginRight: '37.48px' }} />}</TableCell>
                <TableCell align="right">{((new Date(call.date).getHours()).toString().length === 1) ? `0${new Date(call.date).getHours()}` : new Date(call.date).getHours()}:
                  {((new Date(call.date).getMinutes()).toString().length === 1) ? `0${new Date(call.date).getMinutes()}` : new Date(call.date).getMinutes()}</TableCell>
                <TableCell align="right"><img className="cell1" alt="" src={`${call.person_avatar}`}></img></TableCell>
                <TableCell sx={{ width: '326px' }} align="right">+{call.from_number}</TableCell>
                <TableCell sx={{ width: '214px' }}>{call.from_site}</TableCell>
                <TableCell sx={{ width: '510px' }} align="right">Оценка</TableCell>
                <TableCell sx={{ width: '78px' }} align="right">{(call.time / 60).toFixed(2)}</TableCell>
              </TableRow>
            )) : <TableRow><TableCell>no calls</TableCell></TableRow>}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default CallsTable;
