import { Avatar, Button } from '@mui/material';
import React from 'react';

const RightSideNav = () => {
    return (
        <div className='w-11/12 mx-auto my-5'>
            {/* active friend  */}
            <div className='bg-white p-3 rounded-xl'>
                <h1 className='my-2'>Active Friend</h1>
                <div className='grid grid-cols-1 gap-3'>
                    {
                        [1, 2, 3, 4].map((item, index) => <div key={index} className='flex items-center gap-3' >
                            <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                            <div>
                                <h1 className='font-semibold'>Dan Walker</h1>
                                <p>1h ago</p>
                            </div>
                        </div>
                        )
                    }
                </div>
            </div>

            {/* birthday  */}
            <div className='my-5 rounded-xl py-3 px-4 bg-cyan-300 flex flex-col justify-center items-center text-center'>

                <Avatar className='mt-5' alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                <p className='my-5'>Send him your best wishes by leaving something on his wall.</p>
                <Button variant='outlined' >
                    Write Message
                </Button>
            </div>


            
        </div >
    );
};

export default RightSideNav;