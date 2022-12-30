import { useSelect } from '@mui/base';
import React, { useEffect, useState } from 'react';
import PostCard from '../../components/PostCard';

const Media = () => {
    const [posts, setPost] = useState([]);

    const getData = () => {
        fetch('http://localhost:5000/getposts')
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setPost(data);
            })
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <div className=' my-5 w-11/12 lg:w-8/12 mx-auto '>
            <div className='grid grid-cols-1 gap-5'>
                {
                    posts.map((item, index) => <PostCard
                        key={index}
                        item={item}
                        getData={getData}
                    />)
                }
            </div>

        </div>
    );
};

export default Media;