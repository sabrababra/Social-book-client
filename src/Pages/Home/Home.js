import { PhotoCamera } from '@mui/icons-material';
import SendIcon from '@mui/icons-material/Send';
import { Avatar, Button, IconButton, TextField } from '@mui/material';
import React, { useContext, useEffect, useRef, useState } from 'react';
import LeftSideNav from '../../components/LeftSideNav';
import PostCard from '../../components/PostCard';
import RightSideNav from '../../components/RightSideNav';
import FileBase64 from 'react-file-base64';
import { AuthContext } from '../../Contexts/AuthProvider';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const { user } = useContext(AuthContext);

    const [text, setText] = useState('');
    const photoRef = useRef();
    const [error, setError] = useState(false);
    const [photoFile, setPhotoFile] = useState('');

    const [topPost, setTopPost] = useState([]);

    const navigate = useNavigate();

    
    useEffect(() => {
        fetch('https://server-ochre-seven.vercel.app/getposts')
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setTopPost(data);
            })
    }, [])



    const getFiles = (files) => {
        setPhotoFile(files[0])
        console.log(files[0]);
    }


    const handlePost = () => {

        if (text) {
            setError(false)

            const addData = {
                userName: user?.displayName,
                userEmail: user?.email,
                userImg: user?.photoURL,
                postText: text,
                postImg: photoFile,
                postTime: new Date().toISOString(),
                comment: [],
                like: [],
            };

            console.log(addData);

            fetch(`https://server-ochre-seven.vercel.app/addpost`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(addData)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);

                    navigate('/media');
                })

        } else {
            setError(true)
        }

    };



    return (
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-4 overflow-hidden'>
            <div className='col-span-3 hidden lg:block'>
                <LeftSideNav />
            </div>
            <div className='col-span-6 w-11/12 mx-auto lg:w-full'>

                {/* post  */}
                <div className='mt-6 bg-white p-3 rounded-xl'>

                    <div className='flex items-center gap-3' >
                        <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                        <h1>Add your post..</h1>
                    </div>
                    <div className='flex gap-2 my-3'>
                        <TextField
                            fullWidth
                            error={error}
                            id="fullWidth"
                            multiline
                            rows={2}
                            onChange={(e) => setText(e.target.value)}
                        />
                        <Button onClick={handlePost} variant="contained" endIcon={<SendIcon />}>
                            Post
                        </Button>
                    </div>
                    <div className='flex gap-3'>
                        <IconButton color="primary" aria-label="upload picture" component="label">
                            <PhotoCamera onChange={() => photoRef.current.focus} />

                            <div className='hidden'>
                                <FileBase64
                                    ref={photoRef}
                                    multiple={true}
                                    onDone={getFiles.bind()}
                                />
                            </div>
                        </IconButton>

                        {
                            photoFile && <Avatar variant="square" alt="Travis Howard" src={photoFile.base64} />
                        }
                    </div>
                </div>

                {/* top post  */}
                <div className=' my-10'>

                    <h1 className='font-semibold my-3'>Top posts</h1>
                    <div className='grid grid-cols-1 gap-5'>
                        {
                            topPost?.map((item, index) => <PostCard key={index} item={item} />)
                        }
                    </div>

                </div>

            </div>
            <div className='col-span-3 hidden lg:block'>
                <RightSideNav />
            </div>
        </div>
    );
};

export default Home;