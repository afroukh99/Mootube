import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import styled from 'styled-components'
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import Comment from '../component/Comments'
import Card from '../component/Card'
import { makeRequest } from '../axios';
import { useLocation } from 'react-router-dom';
import { dislikeAction, fetchFailure, fetchStart, fetchSuccess, likeAction } from '../redux/videoSlice';
import moment from 'moment';
import { sub } from '../redux/userSlice';
import Comments from '../component/Comments';



const Container = styled.div`
display: flex;
gap: 25px;
`

const Content = styled.div`
flex: 5;
display: flex;
flex-direction: column;
gap: 15px;
`
const VideoWrapper = styled.div`

`
const Title = styled.h2`
font-size: 16px;
font-weight: 400;
color: ${({ theme }) => theme.text};
`
const Detail = styled.div`
display: flex;
justify-content: space-between;
font-size: 14px;
`
const Views = styled.span`
color: ${({ theme }) => theme.textSoft}
`
const Buttons = styled.div`
display: flex;
gap: 10px;
color: ${({ theme }) => theme.text}
`
const Button = styled.div`
display: flex;
align-items: center;
gap: 5px;
cursor: pointer;
color: ${({ theme }) => theme.text}

`
const ChannelInfo = styled.div`
display: flex;
gap: 10px;
`

const Image = styled.img`
  width: 36px;
  height: 36px;
  background-color: #999;
  object-fit: cover;
  border-radius: 50%;
`

const Hr = styled.hr`
margin: 10px 0px;
border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Infos = styled.div`
flex: 5;
display: flex;
flex-direction: column;
gap: 5px;
`

const ChannelName = styled.h1`
font-size: 16px;
font-weight: 500;
color: ${({ theme }) => theme.text};

`
const Subscriber = styled.span`
font-size: 12px;
color: ${({ theme }) => theme.textSoft};

`

const Bio = styled.p`
font-size: 14px;
`

const Subscribe = styled.button`
height: max-content;
padding: 8px 20px;
border: none;
background-color: #cc1a00;
color: white;
border-radius: 3px;
cursor: pointer;
`



const Recomendation = styled.div`
flex: 2;
`

const VideoFrame = styled.video`
  max-height: 500px;
  width: 100%;
  object-fit: cover;
`;



const Video = () => {
  const [user, setUser] = useState({})
  const { currentUser } = useSelector((state) => state.user)
  const { currentVideo } = useSelector((state) => state.video)
  const videoId = useLocation().pathname.split('/')[2]
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchStart())
      try {
        const fetchedVideo = await makeRequest.get(`/video/${videoId}`)
        const fetchedUser = await makeRequest.get(`/user/find/${fetchedVideo.data.userId}`)
        setUser(fetchedUser.data)
        dispatch(fetchSuccess(fetchedVideo.data))
      } catch (error) {
        dispatch(fetchFailure())
      }
    }
    fetchData()
  }, [videoId, dispatch])


  const handleLike = async () => {
    await makeRequest.put(`/video/like/${videoId}`)
    dispatch(likeAction(currentUser?._id))
  }

  const handleDislike = async () => {
    await makeRequest.put(`/video/dislike/${videoId}`)
    dispatch(dislikeAction(currentUser?._id))
  }
  const handleSub = async () => {
    if (!currentUser?.subscribedUsers.includes(user._id)) {
      await makeRequest.put(`/user/sub/${user._id}`)
    } else {
      await makeRequest.put(`/user/unsub/${user._id}`)
    }
    dispatch(sub(user._id))
  }
  return (

    <Container>
      <Content>
        <VideoWrapper>
        <VideoFrame src={currentVideo?.videoUrl} controls/>
        </VideoWrapper>
        <Title>{currentVideo?.title}</Title>
        <Detail>
          <Views>{currentVideo?.views} views • {moment(currentVideo?.createdAt).fromNow()}</Views>
          <Buttons>
            <Button onClick={handleLike}>
              {currentVideo?.like?.includes(currentUser?._id) ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />}
              {currentVideo?.like?.length}
            </Button>
            <Button onClick={handleDislike}>
              {currentVideo?.dislike?.includes(currentUser?._id) ? <ThumbDownIcon /> : <ThumbDownOffAltOutlinedIcon />}
              Dislike
            </Button>
            <Button>
              <ReplyOutlinedIcon />
              Share
            </Button>
            <Button>
              <AddTaskOutlinedIcon />
              Save
            </Button>
          </Buttons>
        </Detail>
        <ChannelInfo>
          <Image src={user.img} />
          <Infos>
            <ChannelName>{user.name}</ChannelName>
            <Subscriber>{user.subscribers} subscribers</Subscriber>
            <Bio>{currentVideo?.desc}</Bio>
          </Infos>
          <Subscribe onClick={handleSub}>{currentUser?.subscribedUsers?.includes(user._id) ? 'Subscribed' : 'Subscribe'}</Subscribe>
        </ChannelInfo>
        <Hr />
    
        <Comments videoId={currentVideo?._id} />
      </Content>
      <Recomendation>
      </Recomendation>
    </Container>
  )
}

export default Video