import { Button, Divider, TextField } from '@mui/material';
import React, { useContext, useState } from 'react';
import loginImg from '../../asset/login.png'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider';
import { GoogleAuthProvider } from 'firebase/auth';
import SocialLogin from '../../Shared/SocialLogin';

const Signin = () => {
    const { signIn } = useContext(AuthContext);

    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const [loginError, setLoginError] = useState('');
    const [loading, setLoading] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || "/";

    const onSubmit = (e) => {
        setLoading(true);
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        if (email) {
            if (password) {
                setPasswordError(false);
                setEmailError(false);

                console.log(email, password);
                signIn(email, password)
                    .then(result => {
                        const user = result.user;
                        console.log(user);
                        setLoading(false);
                        navigate(from, { replace: true });
                    })
                    .catch(error => {
                        setLoading(false);
                        console.log(error.message)
                        setLoginError(error.message);
                    });



            } else {
                setPasswordError(true);
            }
        } else {
            setEmailError(true);
        }

    }



    return (
        <div className='min-h-screen flex justify-center items-center'>
            <div className='flex flex-col lg:flex-row gap-2 items-center bg-white p-3 rounded-xl'>
                {/* img  */}
                <div>
                    <img className='' src={loginImg} alt="" />
                </div>

                {/* login  */}
                <div>
                    {/* login by email  */}
                    <form onSubmit={onSubmit} className=' flex flex-col gap-3 p-5'>
                        <h1 className='text-center text-[#1976d2] text-2xl font-semibold'>Sign In</h1>
                        <TextField
                            error={emailError}
                            type='email'
                            id="standard-error"
                            label="Email"
                            variant="standard"
                            placeholder='Your Email'
                            name='email'
                        />

                        <TextField
                            error={passwordError}
                            id="standard-error"
                            label="Password"
                            variant="standard"
                            placeholder='Your password'
                            type='password'
                            name='password'
                        />

                        <p className='my-3'>Create an account <Link to='/signup' className='text-[#1976d2] font-semibold'>Sign up</Link></p>

                        {loading && <p>Loading...</p>}
                        
                        {loginError && <p className='my-2 text-red-500'>{loginError}</p>}

                        <Button type='submit' variant="contained">Sign in</Button>
                    </form>

                    <div className='my-3'>
                        <Divider >Or</Divider>
                    </div>

                    {/* social login  */}
                    <SocialLogin from={from} />

                </div>

            </div>
        </div>
    );
};

export default Signin;