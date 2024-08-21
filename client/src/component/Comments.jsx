import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import Comment from './Comment'
import { useSelector } from 'react-redux'
import { makeRequest } from '../axios'



const Container = styled.div`

    `
const Image = styled.img`
width: 36px;
height: 36px;
background-color: #999;
object-fit: cover;
border-radius: 50%;
`

const Write = styled.div`
display: flex;
gap: 10px;
margin-top: 20px;
`

const Input = styled.input`
background-color: transparent;
color: ${({ theme }) => theme.textSoft};
border: none;
width: 100%;
&:focus{
      outline: none;
}
`
const Comments = ({ videoId }) => {
  const { currentUser } = useSelector((state) => state.user)
  const [comments, setComments] = useState([])

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await makeRequest.get(`/comments/${videoId}`)
        setComments(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchComments()
  }, [videoId])

  return (
    <Container>
      <Write>
        <Image src={currentUser.img} />
        <Input type='text' placeholder='Add a comment..' />
      </Write>
      {comments.map(comment => (
        <Comment key={comment._id} comment={comment} />
      ))}
    </Container>
  )
}

export default Comments