import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Contexts/AuthProvider';

const About = () => {
    const { user } = useContext(AuthContext);
    const [userData, setUserData] = useState({});

    useEffect(() => {
        if (user?.email) {
            fetch(`http://localhost:5000/getUser?email=${user?.email}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setUserData(data);
                })
        }
    }, [user])

    return (
        <div className='flex justify-center items-center min-h-screen'>
            <div className='w-11/12 lg:w-8/12 mx-auto bg-white rounded-xl p-3'>
                <p>Name: {userData?.userName}</p>
                <p>email: {userData?.email}</p>
                <p>university: {userData?.university}</p>
                <p>address: {userData?.address}</p>
            </div>
        </div>
    );
};

export default About;