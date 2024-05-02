import { useEffect, useRef, useState } from 'react';
import NavLogo from '../components/Navbar/NavLogo';
import NavIcons from '../components/Navbar/NavIcons';
import NavLinks from '../components/Navbar/NavLinks';
import NavContacts from '../components/Navbar/NavContacts';
import BookButton from '../components/Navbar/BookButton';
import MenuIcon from '../components/Navbar/MenuIcon';
import { useMenuClick } from '../contexts/MenuClickContext';

const Navbar = () => {
    const [scrolling, setScrolling] = useState(false);
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const { isMenuClicked } = useMenuClick();
    const navRef = useRef(null);
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.scrollY;
            setScrolling(currentScrollPos > 0);
            if (currentScrollPos < prevScrollPos) {
                // Scrolling up
                setScrolling(true);
            } else {
                // Scrolling down
                setScrolling(false);
            }
            setPrevScrollPos(currentScrollPos);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [prevScrollPos]);



    return (
        <nav className={`w-full montserrat-regular bg-white z-50 fixed top-0 flex flex-col xl:flex-row justify-between xl:justify-normal ${scrolling ? 'shadow-lg' : ''}`} ref={navRef}>
            <header className='w-full lg:w-auto px-5 h-[5vh] lg:h-auto flex justify-between items-center'>
                <NavLogo/>
                <div className='flex justify-center items-center lg:hidden'>
                    <MenuIcon /> 
                </div>
            </header>
            <main className={`h-[95vh] lg:h-auto lg:-translate-x-0  w-full absolute lg:relative top-12 lg:top-0 z-20  bg-white transition-all duration-500 ease-in-out ${isMenuClicked ? '-translate-x-0' : '-translate-x-full'}`}>
                <div className='w-full flex flex-col-reverse lg:flex-col lg:px-14'>
                    <section className={`flex flex-col lg:flex-row items-center justify-evenly xl:justify-between lg:py-0 w-full ${scrolling ? '' : 'lg:hidden'}`}>
                        <div className='my-5 lg:w-1/4  px-5 lg:px-0'>
                            <NavIcons/>
                        </div>
                        <div className='mb-5 lg:w-auto lg:py-3 lg:mb-0 px-5'>
                            <NavContacts/>
                        </div>
                        <div>
                            <BookButton/>
                        </div>
                    </section>
                    <section className='border-t-[1px]  montserrat-bold'>
                        <NavLinks/>
                    </section>
                </div>
            </main>
        </nav>
    );
};

export default Navbar;  
