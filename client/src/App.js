import './App.css';
import styled, { ThemeProvider } from 'styled-components';
import LeftBar from './component/LeftBar'
import NavBar from './component/NavBar'
import { darkTheme, lightTheme } from './utils/Theme';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home'
import Video from './pages/Video'
import Login from './pages/Login'





const MainContainer = styled.div`
display:flex;
flex-direction: column;

`

const Main = styled.div`
  display:flex;
`

const Wrapper = styled.div`
background-color:${({ theme }) => theme.bg};
flex: 6;
color: ${({ theme }) => theme.text};
padding: 20px 80px;
`

function App() {
  const [darkMode, setDarkMode] = useState(true)

  return (
    <Router>
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <MainContainer>
          <NavBar />
          <Main>
            <LeftBar setDarkMode={setDarkMode} darkMode={darkMode} />
            <Wrapper>
              <Routes>
                <Route path="/random" element={<Home type='random' />}   />
                <Route path="/trend" element={<Home type='trend'/>} />
                <Route path="/sub" element={<Home type='sub'/>} />
                <Route path="/video/:id" element={<Video />} />
                <Route path="/login" element={<Login />} />
              </Routes>
            </Wrapper>
          </Main>
        </MainContainer>
      </ThemeProvider>
    </Router>
  );
}

export default App;





