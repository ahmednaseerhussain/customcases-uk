import Link from 'next/link'
import MaxWidthWrapper from './MaxWidthWrapper'
import { buttonVariants } from './ui/button'
import { ArrowRight } from 'lucide-react'
import { getKindeServerSession, LoginLink, LogoutLink, RegisterLink } from '@kinde-oss/kinde-auth-nextjs/server'

const Navbar = async () => {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  const isAdmin = user?.email === process.env.ADMIN_EMAIL

  return (
    <nav className='sticky z-[100] h-14 inset-x-0 top-0 w-full border-b border-blue-200/25 bg-gradient-to-tr  from-blue-300/25 to-pink-300/25 backdrop-blur-lg transition-all shadow-md'>
      <MaxWidthWrapper>
        <div className='flex h-14 items-center justify-between border-b border-blue-200/25'>
          <Link href='/' className='flex z-40 font-semibold'>
            <img src="/custom-1.png" width={75} height={75} alt="logo" />
          </Link>

          <div className='h-full flex items-center space-x-4'>
            {user ? (
              <>
                <LogoutLink
                  href='/api/auth/logout'
                  className={buttonVariants({
                    size: 'sm',
                    variant: 'ghost',
                  })}>
                  Sign out
                </LogoutLink>
                {isAdmin ? (
                  <Link
                    href='/dashboard'
                    className={buttonVariants({
                      size: 'sm',
                      variant: 'ghost',
                    })}>
                    Dashboard ✨
                  </Link>
                ) : null}
                <Link
                  href='/configure/upload'
                  className='hidden sm:flex items-center gap-1 rounded-xl bg-gradient-to-tr from-pink-300 to-blue-300 p-0.5 shadow-lg'>
                  <button className="flex-1  bg-white px-2 py-1 rounded-[11px] text-sm flex items-center gap-1">
                  Create case
                 <ArrowRight className='ml-1.5 h-5 w-5' />
                </button>
                </Link>
              </>
            ) : (
              <>
                <RegisterLink
                  postLoginRedirectURL='/api/auth/register'
                  className={buttonVariants({
                    size: 'sm',
                    variant: 'ghost',
                  })}>
                  Sign up
                </RegisterLink>

                <LoginLink
                  postLoginRedirectURL='/api/auth/login'
                  className={buttonVariants({
                    size: 'sm',
                    variant: 'ghost',
                  })}>
                  Login
                </LoginLink>

                <div className='h-8 w-px bg-zinc-200 hidden sm:block' />

                <Link
                  href='/configure/upload'
                  
                    
                    className='hidden sm:flex items-center gap-1 rounded-lg bg-gradient-to-tr from-pink-300 to-blue-300 p-0.5 shadow-lg'
                    
                  >
                  <button className="flex-1  bg-white px-2 py-1 rounded-lg text-sm flex items-center gap-1">
                  Create case
                 <ArrowRight className='ml-1.5 h-5 w-5' />
                </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  )
}

export default Navbar
