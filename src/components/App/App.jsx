import React, { useState } from 'react'
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import CallIcon from '@mui/icons-material/Call';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import PeopleIcon from '@mui/icons-material/People';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import SettingsIcon from '@mui/icons-material/Settings';
import TimelineIcon from '@mui/icons-material/Timeline';
import FeedIcon from '@mui/icons-material/Feed';
import { Drawer, Toolbar, List, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import CallsTable from '../CallsTable/CallsTable'

function App() {
  const [openModal, setOpenModal] = useState(false)
  const items = [
    ['Итоги', <TimelineIcon />],
    ['Заказы', <DoneAllIcon />],
    ['Сообщения', <MailOutlineIcon />],
    ['Звонки', <CallIcon />],
    ['Контрагенты', <PeopleIcon />],
    ['Документы', <FeedIcon />],
    ['Исполнители', <PersonOutlineIcon />],
    ['Отчёты', <WorkOutlineIcon />],
    ['База знаний', <LocalLibraryIcon />],
    ['Настройки', <SettingsIcon />]
  ]
  const drawerWidth = 240

  const handleOpen = (event) => {
    if (event.target.innerText === 'Звонки') {
      setOpenModal(!openModal)
    }
  }

  return (
    <>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            color: 'gray',
            background: 'black'
          }
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar sx={{ color: 'yellow', fontSize: '26px', fontWeight: '900' }}>Skilla ls</Toolbar>
        <Divider />
        <List>
          {items.map((text, index) => (
            <ListItem key={text[0]} disablePadding>
              <ListItemButton onClick={handleOpen}>
                <ListItemIcon sx={{ '& .MuiSvgIcon-root:hover': { color: 'white' }, color: 'gray' }}>
                  {text[1]}
                </ListItemIcon>
                <ListItemText primary={text[0]} sx={{ '& .MuiTypography-root:hover': { color: 'white' } }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      {openModal && <CallsTable />}
    </>
  );
}

export default App;
