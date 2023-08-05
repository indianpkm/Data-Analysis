import React, { useState } from 'react'
import DropDownMenu from '../dropDownMenu/DropDownMenu'
import './header.css'
import MenuIcon from '@mui/icons-material/Menu';
import { Box, Drawer, styled } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RightDrawer from './RightDrawer';

const Menu = styled(MenuIcon)(({ theme }) => (({
  display: 'none',
  marginLeft: 30,
  color: '#fff',
  [theme.breakpoints.down('lg')]: {
    display: 'block'
  },
})))

const DrawerHeader = styled(Box)`
display:flex;
background-color:red;
padding:10px  0 10px 20px;
align-items:center
`

const Header = () => {
  const [open, setOpen] = useState(false)
  const [openRightDrawer,setOpenRightDrawer]=useState(false)

  const isPcView = window.innerWidth >= 1000;

  const drawarStyle = {
  left: 0,
  top: 0,
  height: '100%',
  width:isPcView? '50%':'65%',
  boxShadow: 'none',
}

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div className='navbar'>
      <DropDownMenu />
      {
        open &&
        <Drawer
          open={open}
          onClose={handleClose}
          PaperProps={{ sx: drawarStyle }}
          style={{ zIndex: 1500, overflow: 'hidden' }}
        >
          <DrawerHeader>
            <ArrowBackIcon style={{ cursor: 'pointer',color:'#fff' }} onClick={() => setOpen(false)} />
            <div className='profile'>
              <img src={'images/bk.png'} alt='profile' />
            </div>
          </DrawerHeader>
          <DropDownMenu open={open} setOpen={setOpen}/>
          <section style={{padding:'20px 5px 0 10px',textAlign:'center'}}>
            <b>Hint :  </b><br/>
            click ▼ for open dropdown<br/> and again click for close <br/> 
            click clear for clear filter
          </section>
        </Drawer>
      }
      <Menu onClick={() => setOpen(!open)} />
      <div className='profile'>
        <img src={'images/bk.png'} alt='profile' onClick={()=>setOpenRightDrawer(true)} />
      </div>
      <RightDrawer openRightDrawer={openRightDrawer} setOpenRightDrawer={setOpenRightDrawer}/>
    </div>
  )
}

export default Header