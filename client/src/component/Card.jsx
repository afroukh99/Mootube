import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { makeRequest } from '../axios'

const Container = styled.div`
width: 290px;
margin-bottom: ${(props) => props.type === 'sm' ? '10px' : '45px'};
display: ${(props) => props.type === 'sm' && 'flex'};
gap: 10px;
`
const Image = styled.img`
flex:1.5;
width: 100%;
height: ${(props) => props.type === 'sm' ? '120px' : '200px'};
background-color: #999;
object-fit: cover;
margin-bottom: ${(props) => props.type !== 'sm' && '10px'};
`
const Details = styled.div`
display: flex;
flex:1;
gap: 12px;
margin-top: ${(props) => props.type === 'sm' && '10px'};
`
const ImageChannel = styled.img`
width: 36px;
height: 36px;
background-color: #999;
object-fit: cover;
border-radius: 50%;
display: ${(props) => props.type === 'sm' && 'none'};
`

const Texts = styled.div`

`
const Title = styled.h1`
font-size: 16px;
font-weight: 500;
color: ${({ theme }) => theme.text};
`
const Channel = styled.h2`
font-size: 14px;
margin: 8px 0px;
font-weight: 400;
color: ${({ theme }) => theme.textSoft}
`
const Views = styled.div`
font-size:14px;
color: ${({ theme }) => theme.textSoft}
`


const Card = ({ type, video }) => {
    const [channel, setChannel] = useState({})
    useEffect(() => {
        try {
            const fetchChannel = async () => {
                const result = await makeRequest.get(`user/find/${video.userId}`)
                setChannel(result.data)
            }
            fetchChannel()
        } catch (error) {
            console.log(error)
        }

    }, [video.userId])
    return (
        <Link to={`/video/${video._id}`} style={{ textDecoration: 'none' }}>
            <Container type={type}>
                <Image type={type} src={video.imgUrl} />
                <Details >
                    <ImageChannel type={type} src='https://images.pexels.com/photos/18169904/pexels-photo-18169904/free-photo-of-nature-oiseau-photographie-animaliere-photographie-de-la-faune.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' />
                    <Texts>
                        <Title>{video.title}</Title>
                        <Channel>{channel.name}</Channel>
                        <Views>{video.views + 'views'}  • {moment(video.createdAt).fromNow()}</Views>
                    </Texts>
                </Details>
            </Container>
        </Link>

    )
}

export default Card