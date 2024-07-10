"use client"
export default function Navbar() {
    return (
        <div className='flex justify-around items-center py-4 bg-white shadow-md'>
            <div className='flex flex-col items-center text-muted-foreground'>
                <HomeIcon className='w-4 h-4' />
                <span>Main</span>
            </div>
            <div className='flex flex-col items-center text-muted-foreground'>
                <MapIcon className='w-4 h-4' />
                <span>Map</span>
            </div>
            <div className='relative flex flex-col items-center text-green-700'>
                <ArrowUpIcon className='w-4 h-4' />
                <span>Day Plans</span>
                <div className='absolute -top-3 -right-3 w-6 h-6 rounded-full bg-pink-500 text-white flex items-center justify-center'>
                    C
                </div>
            </div>
            <div className='flex flex-col items-center text-muted-foreground'>
                <UserIcon className='w-4 h-4' />
                <span>Login</span>
            </div>
        </div>
    )
}

function ArrowUpIcon(props) {
    return (
        <svg
            {...props}
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
        >
            <path d='m5 12 7-7 7 7' />
            <path d='M12 19V5' />
        </svg>
    )
}

function HomeIcon(props) {
    return (
        <svg
            {...props}
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
        >
            <path d='m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' />
            <polyline points='9 22 9 12 15 12 15 22' />
        </svg>
    )
}

function MapIcon(props) {
    return (
        <svg
            {...props}
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
        >
            <path d='M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z' />
            <path d='M15 5.764v15' />
            <path d='M9 3.236v15' />
        </svg>
    )
}

function UserIcon(props) {
    return (
        <svg
            {...props}
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
        >
            <path d='M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2' />
            <circle cx='12' cy='7' r='4' />
        </svg>
    )
}
