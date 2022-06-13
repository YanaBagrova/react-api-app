import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'
import { Box, InputLabel, MenuItem, FormControl, Select } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { v4 as uuidv4 } from 'uuid';
import { paramsAddAC } from '../../redux/actionCreators/paramsAC';

function SelectComponent(props) {
  const [selectValue, setSelectValue] = useState('')
  const [selectFillings, setSelectFillings] = useState([])
  const navBarItem = props.navBarItem
  const dispatch = useDispatch()

  useEffect(() => { setSelectFillings([...navBarItem[1].map((el) => {
    return Array.isArray(el) ? el[0] : el
  })]) }, [navBarItem])

  const handleChange = (event) => {
    setSelectValue(event.target.value)
    const optionValueArr = navBarItem[1].filter((el) => el[0] === event.target.value)
    dispatch(paramsAddAC(optionValueArr[0][1]))
  }

  return (
    <Box sx={navBarItem[0].length > 12 ? { width: 140 } : { width: 110 }}>
      <FormControl variant="standard" fullWidth>
        <InputLabel sx={{
          '& .MuiInputLabel-root:hover': {
            color: 'blue'
          }
        }} id="demo-simple-select-standard-label">{navBarItem[0]}</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={selectValue}
          label="Проверка"
          onChange={handleChange}
          disableUnderline
          IconComponent={() => <ExpandMoreIcon />}
        >
          {selectFillings ? selectFillings.map((selectFilling) => <MenuItem
            value={selectFilling}
            key={uuidv4()}
          >
            <em>{selectFilling}</em>
          </MenuItem>) : 'no options'}
        </Select>
      </FormControl>
    </Box>
  );
}

export default SelectComponent;
