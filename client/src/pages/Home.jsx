import React, { useEffect, useState } from 'react'
import Card from '../component/Card'
import styled from 'styled-components'
import { makeRequest } from '../axios'

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  `

const Home = ({type}) => {
  const [data, setData] = useState([])

  useEffect(() => {
    try {
      const fetchData = async () => {
        const result = await makeRequest.get(`/video/${type}`)
        setData(result.data)
      }
      fetchData()
    } catch (error) {
      console.log(error)
    }
  }, [type])

  console.log(data)
  return (
    <Container>
      {data.map((video) =>
      (
        <Card key={video._id} video={video} />
      )
      )}
    </Container>
  )
}

export default Home