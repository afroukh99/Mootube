import moment from 'moment'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { makeRequest } from '../axios'


const Container = styled.div`
  display: flex;
  gap: 10px;
  margin: 30px 0px;
`

const Image = styled.img`
      width: 36px;
      height: 36px;
      background-color: #999;
      object-fit: cover;
      border-radius: 50%;
   `

const Details = styled.div`
display: flex;
flex-direction: column;
gap: 5px;
flex:5;
    `

const Name = styled.h1`
 font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`

const Date = styled.span`
font-size: 12px;
font-weight: 400;
color: ${({ theme }) => theme.textSoft};
margin-left: 5px;
`

const Text = styled.p`
font-size: 12px;
`



const Comment = ({ comment }) => {
  const [user, setUser] = useState([])

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await makeRequest.get(`/user/find/${comment.userId}`)
        setUser(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchUser()
  }, [comment.userId])
  return (
    <Container>
      <Image src={user.img} />
      <Details>
        <Name>{user.name} <Date> {moment(comment.createdAt).fromNow()}</Date></Name>
        <Text>{comment.desc}</Text>
      </Details>
    </Container>

  )
}

export default Comment