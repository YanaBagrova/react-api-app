import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AppBar, Toolbar, IconButton, Typography, Stack, Button } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import { v4 as uuidv4 } from 'uuid';
import { getCallsFetchAC } from '../../redux/actionCreators/callsAC';
import { paramsInitAC } from '../../redux/actionCreators/paramsAC';
import { dropInitAC } from '../../redux/actionCreators/dropAC';
import SelectComponent from '../SelectComponent/SelectComponent';

function NavigationMenu(props) {
  const [employers, setEmployers] = useState([])
  const [sources, setSources] = useState([])
  const [navBarItems, setNavBarItems] = useState([])
  const dispatch = useDispatch()
  const calls = useSelector(state => state.callsReducer.calls)
  const params = useSelector(state => state.paramsReducer.params)
  const drop = useSelector(state => state.dropReducer.drop)

  useEffect(() => {
    function getSelectValues(arg) {
      let valuesArr = []
      function getValuesFromDataArr() {
        for (let i = 0; i < calls.length; i++) {
          const value = Object.entries(calls[i]).filter((el) => el[0] === arg)[0][1]
          valuesArr.push(value)
        }
        return valuesArr
      }
      const values = getValuesFromDataArr()
      return [...new Set(values)]
    }
    const employers = getSelectValues('person_name')
    const sources = getSelectValues('source')
    setEmployers(employers)
    setSources(sources)
  }, [calls])

  useEffect(() => {
    setNavBarItems([
      ['Все типы', [['Входящие', 'in_out=1'], ['Исходящие', 'in_out=0']]], ['Все сотрудники', employers],
      ['Все звонки', ['Звонки от исполнителей', 'Другие звонки']], ['Все источники', sources],
      ['Все оценки', ['?', '?']], ['Все ошибки', ['?', '?']]])
  }, [employers, sources])

  function clearFilters() {
    dispatch(getCallsFetchAC(''))
    dispatch(paramsInitAC(''))
    dispatch(dropInitAC(!drop))
  }

  return (
    <>
      <AppBar position='static' sx={{ backgroundColor: 'aliceblue' }}>
        <Toolbar>
          <IconButton>
            <SearchIcon></SearchIcon>
          </IconButton>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1, color: 'gray' }}>
            Поиск по звонкам
          </Typography>
          <Stack direction='row' spacing={2}>
            {params && params.length && <Button
              onClick={clearFilters}
              sx={{ marginTop: '17px', color: 'gray', fontSize: '12px', fontWeight: 600, marginLeft: '-15px' }}
            >Сбросить фильтры X</Button>}
            {calls.length && navBarItems.length ? navBarItems.map((navBarItem) => <SelectComponent
              navBarItem={navBarItem}
              sx={{ color: 'gray' }}
              key={uuidv4()}
            />) : 'no calls'}
          </Stack>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default NavigationMenu;
