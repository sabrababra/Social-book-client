import { Button, Divider, TextField } from '@mui/material';
import React, { useContext, useState } from 'react';
import loginImg from '../../asset/login.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SocialLogin from '../../Shared/SocialLogin';
import { AuthContext } from '../../Contexts/AuthProvider';

const SignUp = () => {
    const { createUser, updateUser } = useContext(AuthContext);
    const [emailError, setEmailError] = useState(false);
    const [nameError, setNameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);


    const [loginError, setLoginError] = useState('');
    const [loading, setLoading] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || "/";


    const onSubmit = (e) => {
        e.preventDefault();
        setLoginError('')
        const form = e.target;
        const email = form.email.value;
        const name = form.name.value;
        const password = form.password.value;
        const university = form.university.value;
        const address = form.address.value;

        if (name) {
            if (email) {
                if (password) {
                    setPasswordError(false);
                    setEmailError(false);
                    setNameError(false);

                    console.log(name, email, password);
                    setLoading(true)
                    createUser(email, password)
                        .then(result => {
                            const user = result.user;
                            console.log(user);

                            const userInfo = {
                                displayName: name,
                            }

                            updateUser(userInfo)
                                .then(() => {
                                    setLoading(false);

                                    const loginData = {
                                        userName: user?.displayName,
                                        email: user?.email,
                                        university: university || '',
                                        address: address || '',
                                    };

                                    console.log(loginData);

                                    if (user?.uid) {
                                        fetch(`https://server-ochre-seven.vercel.app/user/${user?.email}`, {
                                            method: 'PUT',
                                            headers: {
                                                'content-type': 'application/json'
                                            },
                                            body: JSON.stringify(loginData)
                                        })
                                            .then(res => res.json())
                                            .then(data => {
                                                console.log(data);
                                                navigate(from, { replace: true });
                                            })
                                    }
                                })
                                .catch(err => { console.log(err) });
                        })
                        .catch(error => {
                            setLoading(false);
                            console.log(error)
                            setLoginError(error.message)
                        });

                } else {
                    setPasswordError(true);
                }
            } else {
                setEmailError(true);
            }
        } else {
            setNameError(true);
        }
    };

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
                        <h1 className='text-center text-[#1976d2] text-2xl font-semibold'>Sign Up</h1>
                        <TextField
                            error={nameError}
                            type='text'
                            id="standard-error"
                            label="Name"
                            variant="standard"
                            placeholder='Your Name'
                            name='name'
                            required
                        />
                        <TextField
                            error={emailError}
                            type='email'
                            id="standard-error"
                            label="Email"
                            variant="standard"
                            placeholder='Your Email'
                            name='email'
                            required
                        />
                        <TextField
                            error={passwordError}
                            id="standard-error"
                            label="Password"
                            variant="standard"
                            placeholder='Your password'
                            type='password'
                            name='password'
                            required
                        />

                        <TextField
                            id="standard-error"
                            label="university"
                            variant="standard"
                            placeholder='Your university'
                            name='university'
                        />
                        <TextField
                            id="standard-error"
                            label="Address"
                            variant="standard"
                            placeholder='Your Address'
                            name='address'
                        />

                        <p className='my-3'>Already have an account <Link to='/signin' className='text-[#1976d2] font-semibold'>Sign In</Link></p>

                        {loading && <p>Loading..</p>}

                        <Button type='submit' variant="contained">Sign Up</Button>
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
export default SignUp;