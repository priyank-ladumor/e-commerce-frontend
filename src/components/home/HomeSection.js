import React from 'react'

const HomeSection = ({ product }) => {

    return (
        <div className="flex flex-col items-center cursor-pointer bg-white rounded-lg overflow-hidden w-[15rem] mx-3 border-2 p-2 border-gray-200 mt-5">

            <div className='h-[13rem] w-[10rem]'>
                <img src={product.imageUrl} className="w-full h-full object-cover object-top" alt='' />
            </div>
            <div className="p-4">
                <h3 className="text-lg text-gray-900 font-medium">{product.title}</h3>
                <p className="mt-2 text-sm text-gray-500">{product.brand}</p>
            </div>
        </div>
    )
}

export default HomeSection
