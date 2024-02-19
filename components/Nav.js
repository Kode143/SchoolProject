import Link from "next/link";
import { AdminIcon, ArticleIcon, DashboardIcon, EventIcon, MessageInIcon, NoticeIcon, PhotoIcon, SettingIcon, SliderIcon,} from "./Icons";
import { useRouter } from "next/router";

export default function Nav(){
    const inactiveLink= 'flex gap-1 p-1 ';
    const activeLink = inactiveLink+' bg-white text-dark rounded-l-lg';
    const router = useRouter();
    const {pathname}= router
    return(
        <aside className="p-4  pr-0 mb-10 ms-2 me-0 ">
            <Link href={'/'} className="flex gap-1 mb-8 mt-4 mr-6">
                <AdminIcon className='h-8 w-8' />
                <span>
                    School Admin
                </span>
            </Link>


            <nav className="flex flex-col gap-8">
            <Link href={'/'} className={pathname=== '/' ? activeLink : inactiveLink }>
                <DashboardIcon className='h-8 w-8' />
                <span>
                    Dashboard
                </span>
            </Link>

            <Link href={'/gallery'} className={pathname.includes('/gallery') ? activeLink : inactiveLink }>
                <PhotoIcon className='h-8 w-8' />
                <span>
                    Gallery
                </span>
            </Link>

            <Link href={'/events'} className={pathname.includes('/events') ? activeLink : inactiveLink }>
                <EventIcon className='h-8 w-8' />
                <span>
                    Events
                </span>
            </Link>

            <Link href={'/notice'} className={pathname.includes('/notice') ? activeLink : inactiveLink }>
                <NoticeIcon className='h-8 w-8' />
                <span>
                   Notice
                </span>
            </Link>


            <Link href={'/contactForm'} className={pathname.includes('/contactForm') ? activeLink : inactiveLink }>
                <MessageInIcon className='h-8 w-8' />
                <span>
                Contact Forms
                </span>
            </Link>

            <Link href={'/slider'} className={pathname.includes('/slider') ? activeLink : inactiveLink }>
                <SliderIcon className='h-8 w-8' />
                <span>
                    Slider Images
                </span>
            </Link>

            <Link href={'/articles'} className={pathname.includes('/articles') ? activeLink : inactiveLink }>
                <ArticleIcon className='h-8 w-8' />
                <span>
                    Aricles
                </span>
            </Link>



            <Link href={'/settings'} className={pathname.includes('/settings') ? activeLink : inactiveLink }>
                <SettingIcon className='h-8 w-8' />
                <span>
                    Settings
                </span>
            </Link>


            </nav>
        </aside>
    )
}