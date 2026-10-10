import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const NavBar = () => {
    return (
        <header>
            <nav>
                <Link href="/" >
                    <Image src="/icons/logo.png" alt="logo" width={24} height={24}/>
                    
                    
                    <p>DevEvent</p>
                </Link>
                <ul>
                    <Link href="/home">Home</Link>
                    <Link href="/about">Events</Link>
                    <Link href="/create">Create Event</Link>
                </ul>
            </nav>
        </header>
    )
}     
export default NavBar   
