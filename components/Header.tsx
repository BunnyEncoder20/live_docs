// next imports
import Image from 'next/image'
import Link from 'next/link'

// utils imports
import { cn } from '@/lib/utils'


const Header = ({ children, className }: HeaderProps) => {
  return (
    <div className={cn("header", className)}>
      <Link href='/' className="md:flex-1">
        {/* bigger Logo with name */}
        <Image 
          src="/assets/icons/logo.svg"
          alt="Logo with name"
          width={120}
          height={32}
          className="hidden md:block"
        />

        {/* smaller logo */}
        <Image 
          src="/assets/icons/logo-icon.svg"
          alt="Logo"
          width={32}
          height={32}
          className="mr-2 md:hidden"
        />
      </Link>

      {
        children
      }
    </div>
  )
}

export default Header