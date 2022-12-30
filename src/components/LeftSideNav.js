import React from 'react';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const LeftSideNav = () => {
    return (
        <div className='w-11/12 mx-auto'>
            {/* weather  */}
            <div className='my-5 rounded-xl py-3 px-4 bg-indigo-600 flex flex-col justify-center items-center text-center text-white'>
                <p className='text-5xl text-white my-3'>16</p>
                <WbSunnyIcon fontSize='large' />
                <p className='my-3 text-xl'>Sunny</p>
                <div className='text-sm my-3'>
                    <p>Sunday, 18th 2022</p>
                    <div className='flex items-center justify-center'>
                        <LocationOnIcon />
                        <p> Los Angeles, CA</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LeftSideNav;