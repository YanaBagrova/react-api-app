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
        width: '1400px',
        display: 'block',
        marginLeft: '15%',
        marginTop: '2%',
      }}
        component={Paper}>
        <NavigationMenu calls={calls} />
        <Table sx={{
          minWidth: 650,
        }}
          aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Тип</TableCell>
              <TableCell align="right">Время</TableCell>
              <TableCell align="right">Сотрудник</TableCell>
              <TableCell align="right">Звонок</TableCell>
              <TableCell align="right">Источник</TableCell>
              <TableCell align="right">Оценка</TableCell>
              <TableCell align="right">Длительность</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {calls.length ? calls.map((call) => (
              <TableRow
                key={uuidv4()}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">{call.in_out === 1 ? <CallReceivedIcon sx={{ color: 'green' }} /> : <CallMadeIcon sx={{ color: 'blue' }} />}</TableCell>
                <TableCell align="right">{((new Date(call.date).getHours()).toString().length === 1) ?`0${new Date(call.date).getHours()}` : new Date(call.date).getHours()}:
                {((new Date(call.date).getMinutes()).toString().length === 1) ?`0${new Date(call.date).getMinutes()}` : new Date(call.date).getMinutes()}</TableCell>
                <TableCell align="right"><img alt="" src={`${call.person_avatar}`}></img></TableCell>
                <TableCell align="right">{call.from_number}</TableCell>
                <TableCell align="right">{call.from_site}</TableCell>
                <TableCell align="right">Оценка</TableCell>
                <TableCell align="right">{(call.time / 60).toFixed(2)}</TableCell>
              </TableRow>
            )) : <TableRow><TableCell>no calls</TableCell></TableRow>}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default CallsTable;
