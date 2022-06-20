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
import { Drawer, Toolbar, List, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText, Box } from '@mui/material';
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
          // height: '963px',
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            color: 'rgba(255, 255, 255, 0.6)',
            background: 'rgba(9, 19, 54, 1)',
          }
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar sx={{ color: 'rgba(255, 213, 0, 1)', fontSize: '26px', fontWeight: '900',
      marginLeft: '-10px'}}>Skilla lS</Toolbar>
        <Divider />
        <List sx={{
          '& .MuiListItem-root': {
            height: '52px'
          }
        }}>
          {items.map((text, index) => (
            <ListItem key={text[0]} disablePadding>
              <ListItemButton onClick={handleOpen}>
                <ListItemIcon sx={{
                  '& .MuiSvgIcon-root:hover': { color: 'white' },
                  color: 'rgba(255, 255, 255, 0.6)',
                  '& .MuiSvgIcon-root': {
                    width: '18px',
                    height: '18px',
                    top: '4px',
                  }
                }}>
                  {text[1]}
                </ListItemIcon>
                <ListItemText primary={text[0]}
                  sx={{
                    '& .MuiTypography-root:hover': {
                      color: 'white'
                    },
                    '& .MuiTypography-root': {
                      fontFamily: 'SF Pro Display',
                      fontStyle: 'normal',
                      fontWeight: '500',
                      fontSize: '16px',
                      lineHeight: '24px',
                      marginLeft: '-22px'
                    }
                  }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box sx={{background: 'white', height: '64px', width: '1920px', boxShadow: '0px 4px 5px #E9EDF3'
}}></Box>
      {openModal && <CallsTable />}
    </>
  );
}

export default App;
