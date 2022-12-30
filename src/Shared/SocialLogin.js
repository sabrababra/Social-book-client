import React, { useContext } from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import { GoogleAuthProvider } from 'firebase/auth';
import { AuthContext } from '../Contexts/AuthProvider';
import { Navigate, useNavigate } from 'react-router-dom';



const SocialLogin = ({ from }) => {
    const { googleSignIn } = useContext(AuthContext);
    const navigate = useNavigate();

    const googleProvider = new GoogleAuthProvider();


    const handleGoogle = () => {
        googleSignIn(googleProvider)
            .then(result => {
                const user = result.user;
                console.log(user);
                navigate(from, { replace: true });
            })
            .catch(err => console.error(err));
    }

    return (
        <div className='flex justify-evenly'>
            <FacebookIcon
                fontSize='large'
                className='text-[#1976d2] hover:text-red-500'
                onClick={() => { }}

            />

            <GoogleIcon
                fontSize='large'
                className='text-[#1976d2] hover:text-red-500'
                onClick={() => handleGoogle()}
            />
        </div>
    );
};

export default SocialLogin;