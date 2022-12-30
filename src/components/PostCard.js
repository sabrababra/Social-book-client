import { Avatar, Button, TextField } from '@mui/material';
import React, { useContext, useState } from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import SendIcon from '@mui/icons-material/Send';
import { AuthContext } from '../Contexts/AuthProvider';


const PostCard = ({ item, getData }) => {
    const { user } = useContext(AuthContext);


    const { _id, userName, userEmail, userImg, postText, postImg, postTime, comment, like } = item;
    const [isLike, setIsLike] = useState(false);
    const [commentInput, setCommentInput] = useState('');
    const [error, setError] = useState(false);
    const [isComment, setIsComment] = useState(false);


    const handleComment = (e) => {
        e.preventDefault();
        if (commentInput) {
            setError(false);
            console.log(commentInput);

            const commentData = [
                ...comment,
                {
                    commentUserName: user?.displayName,
                    commentUserEmail: user?.email,
                    commentUserImg: user?.photoURL,
                    comment: commentInput,
                    commentTime: new Date().toISOString(),
                }
            ]

            fetch(`https://server-ochre-seven.vercel.app/updatepost/${_id}`, {
                method: 'PATCH',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(commentData)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    getData();
                })
        }
        else {
            setError(true);
        }
    }

    
    return (
        <div className='bg-white p-3 rounded-xl'>

            {/* header  */}
            <div className='flex items-center gap-3' >
                <Avatar alt={userName} src={userImg} />
                <div>
                    <h1 className='font-semibold'>{userName}</h1>
                    <p>{new Date(postTime).toDateString()}, {new Date(postTime).toLocaleTimeString()}</p>
                </div>
            </div>

            {/* post text  */}
            <div className='w-11/12 mx-auto my-3'>
                <p>{postText}</p>
                {postImg && <img className='w-fit rounded-xl mt-3' src={postImg.base64} alt="" />}
            </div>

            <hr />

            {/* like comment  */}
            <div className='ml-2'>
                <div className='flex gap-3 items-center my-2'>

                    {/* like  */}
                    <div className='flex gap-1 items-center'>
                        {
                            !isLike ? <FavoriteBorderIcon className='cursor-pointer'
                            // onClick={() => setLike(!like)} 
                            />
                                :
                                <FavoriteIcon className='text-red-500 cursor-pointer'
                                // onClick={() => setLike(!like)}
                                />
                        }
                        <p>{like?.length}</p>
                    </div>

                    {/* comment */}
                    <div className='flex gap-1 items-center'>
                        <CommentIcon className='cursor-pointer'
                            onClick={() => !isComment ? setIsComment(true) : setIsComment(false)}
                        />
                        <p>{comment?.length}</p>
                    </div>
                </div>
                {
                    isComment && <div >
                        <form className='flex gap-2 w-full items-center'>
                            <TextField
                                fullWidth
                                error={error}
                                id="fullWidth"
                                placeholder='your comment....'
                                onChange={(e) => setCommentInput(e.target.value)}
                                required
                            />

                            <Button
                                type='submit'
                                onClick={handleComment}
                                variant="contained"
                                endIcon={<SendIcon />}
                            >
                                sent
                            </Button>

                        </form>
                    </div>
                }
            </div>
        </div>
    );
};

export default PostCard;