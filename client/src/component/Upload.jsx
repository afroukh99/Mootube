import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from '../firebase'
import { makeRequest } from '../axios';
import { useNavigate } from 'react-router-dom';


const Container = styled.div`
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100%;
background-color: #00000077;
display: flex;
justify-content: center;
align-items: center;
z-index: 2313;
`

const Wrapper = styled.div`
width: 500px;
height: 550px;
background-color:${({ theme }) => theme.bgLighter};
border-radius: 3px;
padding: 20px;
display: flex;
flex-direction: column;
gap: 20px;
position: relative;
`

const Close = styled.span`
position: absolute;
right: 10px;
top: 5px;
font-weight: bolder;
color:${({ theme }) => theme.text};
cursor: pointer;
`


const Title = styled.h1`
color:${({ theme }) => theme.text};
text-align: center;
`

const Label = styled.label`
font-size: 14px;
color: ${({ theme }) => theme.text};
`
const Input = styled.input`
border: 1px solid ${({ theme }) => theme.soft};
color: ${({ theme }) => theme.text};
border-radius: 3px;
padding: 10px;
background-color: transparent;
`

const Desc = styled.textarea`
border: 1px solid ${({ theme }) => theme.soft};
color: ${({ theme }) => theme.text};
background-color: transparent;
border-radius: 3px;
padding: 5px;
`
const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`;


const Upload = ({ setOpen }) => {
    const [video, setVideo] = useState(null)
    const [image, setImage] = useState(null)
    const [videoPerc, setVideoPerc] = useState(0)
    const [imgPerc, setImgPerc] = useState(0)
    const [values, setValues] = useState({})
    const [tags, setTags] = useState([])
    const navigate = useNavigate()

    const uploadFile = (file, urlType) => {
        const storage = getStorage(app);
        const fileName = new Date().getDate() + file.name
        const storageRef = ref(storage, fileName);

        const uploadTask = uploadBytesResumable(storageRef, file);


        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                urlType === 'imgUrl' ? setImgPerc(progress) : setVideoPerc(progress)
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                // Handle unsuccessful uploads
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setValues((prev) => ({ ...prev, [urlType]: downloadURL }))
                });
            }
        );
    }

    const handleChange = (e) => {
        setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleTags = (e) => {
        setTags(e.target.value.slice(','))
    }

    useEffect(() => {
        video && uploadFile(video, 'videoUrl')
    }, [video])


    useEffect(() => {
        image && uploadFile(image, 'imgUrl')
    }, [image])

    const handleUpload = async (e) => {
        e.preventDefault()
        const res = await makeRequest.post("/video", { ...values, tags })
        setOpen(false)
        res.status === 200 && navigate(`/video/${res.data._id}`)
    }

    return (
        <Container>
            <Wrapper>
                <Close onClick={() => { setOpen(false) }}>X</Close>
                <Title>Upload a New Video</Title>
                <Label>Video :</Label>
                {videoPerc > 0 ?
                    <Label>Uploading .. {Math.trunc(videoPerc)} %</Label> :
                    <Input name='video' type='file' accept='video/*' onChange={(e) => { setVideo(e.target.files[0]) }} />}
                <Input name='title' type='text' placeholder='Title' onChange={handleChange} />
                <Desc name='desc' rows={4} placeholder='Description' onChange={handleChange} />
                <Input name='tag' type='text' placeholder='Separate the tags with commas.' onChange={handleTags} />
                <Label>Image :</Label>
                {imgPerc > 0 ?
                    <Label>Uploading .. {Math.trunc(imgPerc)} %</Label> :
                    <Input name='img' type='file' accept='image/*' onChange={(e) => { setImage(e.target.files[0]) }} />}
                <Button onClick={handleUpload}>Upload</Button>
            </Wrapper>
        </Container>
    )
}

export default Upload