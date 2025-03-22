"use client"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
const Header = () => {
  const pathname = usePathname()
  const router = useRouter()

  const handleLink = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === '/') {
      e.preventDefault()
      router.refresh()
    }
  }
  
  return (
    <header className="w-screen h-[60px] pl-1/3 fixed top-0 bg-white border border-slate-200 flex justify-center">
      <div className="max-w-[1200px] w-full px-5 h-full items-center hidden xs:flex">
        <Link href={'/'} onClick={handleLink}>
          <Image src="/images/logo_large.png" width={150} height={40} alt="header-logo" priority />
        </Link>
      </div>
      <div className="max-w-[1200px] w-full px-3 h-full flex items-center xs:hidden flex">
        <Link href={'/'} onClick={handleLink}>
          <Image src="/images/logo_small.png" width={70} height={40} alt="header-mobile-logo" priority />
        </Link>
      </div>
    </header>
  )
}
export default Header