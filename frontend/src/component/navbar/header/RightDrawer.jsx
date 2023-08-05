import { Box, Drawer, Link, Typography, styled } from '@mui/material'
import React from 'react'

const HeaderStyle=styled(Box)(({theme})=>(({
backgroundColor:'red',
display:'flex',
justifyContent:'center',
alignItems:'center',
flexDirection:'column',
height:'100%',
overflowY:'auto',
'& >h3':{
  marginTop:'.5rem',
},
'&>p':{
  marginTop:'.3rem',
  color:'#fff',
  width:'70%',
  height:'auto',
  textAlign:'center',
},
[theme.breakpoints.down('md')]: {
  '&>p':{
    width:'95%'
  }
},
})))


const isPcView = window.innerWidth >= 1000;

const ImageStyle=styled('img')({
  width:50,
  height:50,
  borderRadius:'50%',
  marginTop:'1rem'
})

const drawarStyle = {
    top: 0,
    height: '100%',
    width:isPcView? '45%': '70%',
    boxShadow: 'none',
    right:0,
  }

const RightDrawer = ({openRightDrawer,setOpenRightDrawer}) => {


    const handleClose = () => {
      setOpenRightDrawer(false)
    }


  return (
    <Drawer
    open={openRightDrawer}
    onClose={handleClose}
    anchor='right'
    PaperProps={{ sx: drawarStyle }}
    style={{ zIndex: 1500, overflow: 'hidden' }}
  >
    <HeaderStyle>
      <ImageStyle src='images/bk.png' />
    <h3>About</h3>
      <Typography>Blackcoffer Typographyrovide advanced analytic <br/> models of business processes to assist <br/> you in making optimal decisions <br/>
      For more detail 👇 <br/>
      Go to website <Link target='_blank' href='https://blackcoffer.com/'>https://blackcoffer.com/</Link>
      </Typography>
      <ImageStyle src='images/pm.jpg' />
    <h3>About Developer</h3>
      <Typography> I'm a full-stack developer specializing in MERN. <br/>I've completed various projects, including a Flipkart clone, WhatsApp clone, social media platforms, quiz website,<br/> a chat website, and a cocktail website.<br/> GitHub <Link target='_blank' href='https://github.com/indianpkm'>https://github.com/indianpkm</Link> <br/> Linkedin <Link target='_blank' href='https://www.linkedin.com/in/pramod-kumar-maurya-35260b1a6'>https://www.linkedin.com/in/pramod-kumar-maurya-35260b1a6</Link>
      </Typography>
    </HeaderStyle>
  </Drawer>
  )
}

export default RightDrawer