import React from "react";

const CategoryGrid = () => {
    return (
        <div className='grid gap-4 grid-rows-12 grid-cols-12 lg:h-[600px] px-10 lg:px-20'>
            <div className='col-span-3 row-span-12 text-white '>
                <img 
                className='w-full h-full object-cover object-top rounded-md'
                src="photo/sariphoto.jpg" alt="" />

            </div>
            <div className='col-span-2 row-span-6 text-white '>
                <img
                className='w-full h-full object-cover object-top rounded-md'
                 src="photo/image.png" alt="" />

            </div>
            <div className='col-span-4 row-span-6 text-white '>
                <img
                className='w-full h-full object-cover object-top rounded-md' 
                src="photo/SECONDPHOTO.jpg" alt="" />

            </div>
             <div className='col-span-3 row-span-6 text-white '>
                <img
                className='w-full h-full object-cover object-top rounded-md' 
                src="photo/Jodpuri.jpg" alt="" />

            </div>
            <div className='col-span-3 row-span-6 text-white '>
                <img
                className='w-full h-full object-cover object-top rounded-md'
                 src="photo/jwa2.jpg" alt="" />

            </div>
            <div className='col-span-2 row-span-6 text-white '>
                <img
                className='w-full h-full object-cover object-top rounded-md'
                 src="photo/shoes123.jpg" alt="" />

            </div>
            <div className='col-span-2 row-span-6 text-white '>
                <img
                className='w-full h-full object-cover object-top rounded-md'
                 src="photo/shoes123.jpg" alt="" />

            </div>
            <div className='col-span-2 row-span-6 text-white '>
                <img
                className='w-full h-full object-cover object-top rounded-md'
                 src="photo/shoes123.jpg" alt="" />

            </div>
        </div>

        
        
    );
};

export default CategoryGrid;