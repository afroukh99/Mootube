import React from 'react'
import styled from 'styled-components'
import HomeIcon from '@mui/icons-material/Home';
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import LibraryMusicOutlinedIcon from "@mui/icons-material/LibraryMusicOutlined";
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined";
import SportsBasketballOutlinedIcon from "@mui/icons-material/SportsBasketballOutlined";
import MovieOutlinedIcon from "@mui/icons-material/MovieOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import LiveTvOutlinedIcon from "@mui/icons-material/LiveTvOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import SettingsBrightnessOutlinedIcon from "@mui/icons-material/SettingsBrightnessOutlined";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Container = styled.div`
flex:1.2;
height: calc(100vh - 50px);
background-color:${({ theme }) => theme.bgLighter};
color:${({ theme }) => theme.text};
font-size:14px;
position: sticky;
top: 50px;
overflow-y: scroll;
scrollbar-width: none;

`

const Wrapper = styled.div`
display:flex;
flex-direction:column;
padding:18px 26px;
`




const Items = styled.div`
display: flex;
flex-direction: column;
gap: 10px;
`
const Item = styled.div`
display: flex;
align-items: center;
gap: 8px;
cursor: pointer;
padding: 3px 5px;
border-radius: 5px;
&:hover {
  background-color: ${({ theme }) => theme.soft};
}
`
const Hr = styled.hr`
  margin: 10px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`
const Login = styled.div`
display: flex;
flex-direction: column;
gap: 5px;
`
const Sign = styled.button`
padding: 5px 10px;
width: 80%;
border: 1px solid #3ea6ff ;
background-color: transparent;
color: #3ea6ff;
cursor: pointer;
display: flex;
align-items: center;
gap: 0.3rem;
`

const Title2 = styled.h2`
font-weight: 600;
font-size: 14px;
color: #aaaaaa;
margin-bottom: 10px;
`

const LeftBar = ({ setDarkMode, darkMode }) => {
  const { currentUser } = useSelector((state) => state.user)
  return (
    <Container>
      <Wrapper>
        <Items>
          <Item>
            <HomeIcon />
            Home
          </Item>
          <Link to={'trend'} style={{ textDecoration: 'none', color: 'inherit' }}>
            <Item>
              <ExploreOutlinedIcon />
              Explore
            </Item>
          </Link>
          <Link to={'sub'} style={{ textDecoration: 'none', color: 'inherit' }}>
            <Item>
              <SubscriptionsOutlinedIcon />
              Subscriptions
            </Item>
          </Link>
          <Hr />
          <Item>
            <VideoLibraryOutlinedIcon />
            Library
          </Item>
          <Item>
            <HistoryOutlinedIcon />
            History
          </Item>
          {!currentUser &&
            <>
              <Hr />
              <Link to={'/login'} style={{ textDecoration: "none", color: "inherit" }}>
                <Login>
                  Sign in to like videos,
                  comment, and subscribe.
                  <Sign><AccountCircleOutlinedIcon />SIGN IN</Sign>
                </Login>
              </Link>
            </>}
          <Hr />
          <Title2>BEST OF MOTUBE</Title2>
          <Item>
            <LibraryMusicOutlinedIcon />
            Music
          </Item>
          <Item>
            <SportsEsportsOutlinedIcon />
            Sports
          </Item>
          <Item>
            <SportsBasketballOutlinedIcon />
            Gaming
          </Item>
          <Item>
            <MovieOutlinedIcon />
            Movies
          </Item>
          <Item>
            <ArticleOutlinedIcon />
            News
          </Item>
          <Item>
            <LiveTvOutlinedIcon />
            Lives
          </Item>
          <Hr />
          <Item>
            <SettingsOutlinedIcon />
            Settings
          </Item>
          <Item>
            <FlagOutlinedIcon />
            Report
          </Item>
          <Item>
            <HelpOutlineOutlinedIcon />
            Help
          </Item>
          <Item onClick={() => setDarkMode(!darkMode)}>
            <SettingsBrightnessOutlinedIcon />
            {darkMode ? "Light" : "Dark"} Mode
          </Item>
        </Items>
      </Wrapper>
    </Container>
  )
}

export default LeftBar