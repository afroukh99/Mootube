import React, { useState } from 'react'
import styled from 'styled-components'
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import VideoCallOutlinedIcon from '@mui/icons-material/VideoCallOutlined';
import SearchIcon from '@mui/icons-material/Search';
import motube from '../img/motube.png'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Upload from './Upload';



const Container = styled.div`
height: 50px;
background-color:${({ theme }) => theme.bgLighter};
color:${({ theme }) => theme.text};
position: sticky;
top: 0;
`
const Wrapper = styled.div`
height: 100%;
display: flex;
align-items: center;
justify-content: space-between;
padding:10px;
`

const Logo = styled.div`
  display:flex;
  gap:3px;
  align-items:center;
  margin-left: 15px;
`

const Image = styled.img`
  height:25px
`
const Title = styled.h2`

`


const Search = styled.div`
display: flex;
border: 1px solid #ccc;
width: 40%;
padding: 5px 10px;
border-radius: 3px;
display: flex;
align-items: center;
justify-content: space-between;
color: ${({ theme }) => theme.text}
`
const Input = styled.input`
background-color: transparent;
color: ${({ theme }) => theme.text};
border: none;
&:focus{
      outline: none;
}
;
    
`

const Login = styled.div`
display: flex;
flex-direction: column;
gap: 5px;
margin-right: 10px;
`
const Button = styled.button`
padding: 5px 10px;
border: 1px solid #3ea6ff ;
background-color: transparent;
color: #3ea6ff;
cursor: pointer;
display: flex;
align-items: center;
gap: 0.3rem;
`
const User = styled.div`
display: flex;
align-items: center;
gap: 15px;
margin-right: 15px;
color: ${({ theme }) => theme.text};
`
const Avatar = styled.img`
cursor: pointer;
width: 36px;
height: 36px;
background-color: #999;
object-fit: cover;
border-radius: 50%;`

const channelName = styled.h2`
`

const Profile = styled.span`
cursor: pointer;
width: 35px;
height: 35px;
display: flex;
justify-content: center;
align-items: center;
border-radius: 50%;
background-color: #55ac7788;
font-size: 14px;
font-weight: 500;
`




const NavBar = () => {
  const { currentUser } = useSelector((state) => state.user)
  const [open, setOpen] = useState(false)
  return (
    <>
      <Container>
        <Wrapper>
          <Link to={'/random'} style={{ textDecoration: 'none', color: 'inherit' }}>
            <Logo>
              <Image src={motube} />
              <Title>MoTube</Title>
            </Logo>
          </Link>
          <Search>
            <Input placeholder='Search..' />
            <SearchIcon />
          </Search>
          {currentUser ?
            <User>
              <VideoCallOutlinedIcon onClick={() => { setOpen(true) }} style={{cursor:'pointer'}} />
              {currentUser.img ?
                <>
                  <Avatar src={currentUser.img} />
                  <channelName>{currentUser.name}</channelName>
                </>
                :
                <Profile>{currentUser.name.toUpperCase()[0]}</Profile>}
            </User>
            :
            <Link to={'/login'} style={{ textDecoration: 'none', color: 'inherit' }}>
              <Login>
                <Button><AccountCircleOutlinedIcon />SIGN IN</Button>
              </Login>
            </Link>}
        </Wrapper>
      </Container>
      {open && <Upload setOpen={setOpen} />}
    </>
  )
}

export default NavBar