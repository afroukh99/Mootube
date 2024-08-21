import React, { useState } from 'react'
import { styled } from 'styled-components'
import { makeRequest } from '../axios'
import { useDispatch } from "react-redux";
import { loginFailure, loginStart, loginSuccess } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom'
import { auth, provider } from '../firebase'
import { signInWithPopup } from 'firebase/auth';
import axios from 'axios';



const Container = styled.div`
display: flex;
flex-direction: column;
gap: 5px;
height: calc(100vh - 50px);
color: ${({ theme }) => theme.text};
display: flex;
justify-content: center;
align-items: center;
`

const Wrapper = styled.div`
display: flex;
align-items: center;
flex-direction: column;
gap: 10px;
padding: 20px 50px;
background-color: ${({ theme }) => theme.bgLighter};
border-radius: 3px;
border:0.5px solid ${({ theme }) => theme.soft};
`

const Title = styled.h1`
font-size: 24px;
`

const SubTitle = styled.h2`
font-size: 18px;
font-weight: 300;
`

const Input = styled.input`
padding: 5px;
background-color: transparent;
border:0.5px solid ${({ theme }) => theme.soft};
color: ${({ theme }) => theme.textSoft};
border-radius: 3px;
`

const SignIn = styled.button`
font-weight: 500;
border: none;
padding: 10px 20px;
background-color: ${({ theme }) => theme.soft};
color:  ${({ theme }) => theme.textSoft};
cursor: pointer;
`

const Or = styled.h1`
font-size: 20px;
`

const Detail = styled.span`
display: flex;
align-items: center;
color: ${({ theme }) => theme.textSoft};
font-size: 13px;
`

const Links = styled.div`
margin-left: 20px;
`

const Link = styled.span`
margin-left: 20px;


`


const Login = () => {
  const [values, setValues] = useState({
    name: "",
    password: ""
  })

  const [error, setError] = useState("")
  const handleChange = (e) => {
    setValues(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleClick = async (e) => {
    e.preventDefault()
    dispatch(loginStart())
    try {
      const res = await makeRequest.post("/auth/login", values)
      dispatch(loginSuccess(res.data))
      navigate('/sub')
    } catch (error) {
      console.log(error)
    }
  }
  const handleSubmit = async () => {
    dispatch(loginStart())
    signInWithPopup(auth, provider)
      .then((result) => {
        makeRequest.post('/auth/google', {
          name: result.user.displayName,
          email: result.user.email,
          img: result.user.photoURL,
        }).then((res) => {
          dispatch(loginSuccess(res.data))
          navigate('/random')
        })
      })
      .catch((error) => { dispatch(loginFailure) })
  }
  return (
    <Container>
      <Wrapper>
        <Title>Sign In</Title>
        <SubTitle>to continue to MoTube</SubTitle>
        <Input type='text' name="name" onChange={handleChange} placeholder='username' />
        <Input type='password' name='password' onChange={handleChange} placeholder='password' />
        <SignIn onClick={handleClick}>Sign In</SignIn>
        {error && <Detail>{error}</Detail>}
        <Or>Or</Or>
        <SignIn onClick={handleSubmit}>Sign in with google</SignIn>
        <Or>Or</Or>
        <Input type='text' placeholder='username' />
        <Input type='email' placeholder='email' />
        <Input type='password' placeholder='password' />
        <SignIn>Sign Up</SignIn>
      </Wrapper>
      <Detail>
        English(USA)
        <Links>
          <Link>Help</Link>
          <Link>Privacy</Link>
          <Link>Terms</Link>
        </Links>
      </Detail>
    </Container>
  )
}

export default Login