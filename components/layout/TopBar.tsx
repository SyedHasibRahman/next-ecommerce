
"use client"
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Menu } from 'lucide-react'

import { navLinks } from '@/lib/constants'

export default function TopBar() {
    const [dropDownMenu, setDropDownMenu] = useState(false)
    const pathname = usePathname();
    return (
        <div className='sticky top-0 z-20 w-full flex justify-between items-center px-8 py-4 bg-blue-2 shadow-xl lg:hidden '>
            <Image src={'/logo.png'} alt='Logo' width={150} height={70} />

            <div className='flex gap-3 max-md:hidden'>
                {
                    navLinks.map((link, index) => (
                        <Link href={link.url} key={index}
                            className={`flex gap-1 text-base-medium items-center ${pathname === link.url ? "text-blue-1" : "text-grey-1"}`}
                        > {link.icon}<p>{link.label}</p></Link>
                    ))
                }
            </div>
            <div className='relative flex gap-4  items-center'>
                <Menu className='cursor-pointer md:hidden' onClick={() => setDropDownMenu(!dropDownMenu)} />
                {
                    dropDownMenu && (
                        <div className='absolute top-12 right-8 flex flex-col gap-8 bg-white shadow-xl rounded-lg p-5 md:hidden'>
                            {
                                navLinks.map((link, index) => (
                                    <Link href={link.url} key={index}
                                        className='flex gap-4 text-body-medium items-center'
                                    > {link.icon}<p>{link.label}</p></Link>
                                ))
                            }
                        </div>
                    )
                }
                <UserButton />
                <p className='md:hidden'>Edit Profile</p>
            </div>
        </div>
    )
}
