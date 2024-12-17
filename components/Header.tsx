import Image from 'next/image'
import Link from 'next/link'
import React, { Children } from 'react'

const Header = ({ children }: { HeaderProps }) => {
  return (
    <div className="header">
      {/* bigger Logo with name */}
      <Link href='/' className="md:flex-1">
        <Image 
          src="/assets/icons/logo.svg"
          alt="Logo with name"
          height={34}
          width={120}
          className="hidden md:block"
        />
      </Link>

      {/* smaller icon */}
      <Link href='/' className="md:flex-1">
        <Image 
          src="/assets/icons/logo-icon.svg"
          alt="Logo"
          height={32}
          width={32}
          className="mr-2 md:hidden"
        />
      </Link>

      {
        Children
      }
    </div>
  )
}

export default Header