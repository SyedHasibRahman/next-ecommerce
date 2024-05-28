"use client"
import { navLinks } from '@/lib/constants'
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function LeftSideBar() {
    const pathname = usePathname();
    return (
        <div className='h-screen left-0 top-0 sticky p-10 flex flex-col gap-16 bg-blue-2 shadow-lg max-lg:hidden'>
            <Image src={'/logo.png'} alt='Logo' width={150} height={70} />

            <div className='flex flex-col gap-12'>
                {
                    navLinks.map((link, index) => (
                        <Link href={link.url} key={index}
                            className={`flex gap-4 text-body-medium items-center  ${pathname === link.url ? "text-blue-1" : "text-grey-1"} hover:text-blue-1`}
                        > {link.icon}<p>{link.label}</p></Link>
                    ))
                }
            </div>
            <div className='flex gap-4 text-body-medium items-center'>
                <UserButton />
                <p>Edit Profile</p>
            </div>
        </div>
    )
}
