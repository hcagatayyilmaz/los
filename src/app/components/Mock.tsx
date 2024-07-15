import React from "react"

const Mock = () => {
    return (
        <div className='max-w-lg mx-auto p-4'>
            <header className='mb-6'>
                <p className='text-sm text-gray-600'>In 25 days</p>
                <h1 className='text-2xl font-bold'>🇩🇪 Berlin, Germany</h1>
            </header>

            <section className='mb-6'>
                <div className='grid grid-cols-3 gap-4'>
                    <div className='p-4 rounded-lg bg-purple-200'>
                        <h2 className='text-lg font-semibold'>East Side Gallery</h2>
                        <p className='text-gray-500 flex items-center'>
                            <span className='text-red-500 mr-2'>❤️</span> Date
                            <span className='ml-auto'>➡️</span>
                        </p>
                    </div>
                    <div className='p-4 rounded-lg bg-blue-200'>
                        <h2 className='text-lg font-semibold'>Da Giuseppe Pizzeria</h2>
                        <p className='text-gray-500 flex items-center'>
                            <span className='mr-2'>🍕</span> Pizza night
                            <span className='ml-auto'>➡️</span>
                        </p>
                    </div>
                    <div className='p-4 rounded-lg bg-yellow-200'>
                        <h2 className='text-lg font-semibold'>Rex Club Disco</h2>
                        <p className='text-gray-500 flex items-center'>
                            <span className='text-purple-500 mr-2'>🎉</span> Party
                            <span className='ml-auto'>➡️</span>
                        </p>
                    </div>
                </div>
            </section>

            <section className='mb-6'>
                <h2 className='text-xl font-semibold mb-4'>Next trips</h2>
                <div className='flex space-x-2'>
                    <span className='flex items-center px-4 py-2 bg-gray-100 rounded-full'>
                        🇩🇪 Berlin
                    </span>
                    <span className='flex items-center px-4 py-2 bg-gray-100 rounded-full'>
                        🇨🇭 Geneve
                    </span>
                    <span className='flex items-center px-4 py-2 bg-gray-100 rounded-full'>
                        🇧🇪 Bruges
                    </span>
                    <span className='flex items-center px-4 py-2 bg-gray-100 rounded-full'>
                        🇳🇱 Amsterdam
                    </span>
                </div>
            </section>

            <section>
                <h2 className='text-xl font-semibold mb-4'>Top-rated experiences</h2>
                <div className='grid grid-cols-4 gap-4'>
                    <div className='flex flex-col items-center p-4 bg-gray-100 rounded-lg'>
                        <span className='text-yellow-500 text-2xl'>🍔</span>
                        <span className='mt-2'>Food</span>
                        <span className='mt-2 text-gray-500'>+154</span>
                    </div>
                    <div className='flex flex-col items-center p-4 bg-gray-100 rounded-lg'>
                        <span className='text-yellow-300 text-2xl'>📚</span>
                        <span className='mt-2'>Culture</span>
                        <span className='mt-2 text-gray-500'>+154</span>
                    </div>
                    <div className='flex flex-col items-center p-4 bg-gray-100 rounded-lg'>
                        <span className='text-green-500 text-2xl'>🌲</span>
                        <span className='mt-2'>Nature</span>
                        <span className='mt-2 text-gray-500'>+320</span>
                    </div>
                    <div className='flex flex-col items-center p-4 bg-gray-100 rounded-lg'>
                        <span className='text-green-300 text-2xl'>🎉</span>
                        <span className='mt-2'>Party</span>
                        <span className='mt-2 text-gray-500'>+320</span>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Mock
