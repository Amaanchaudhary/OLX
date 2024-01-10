import { useEffect, useState } from "react";
import './Navbar.css'

const Navbar = () => {

    const [isActive, setIsActive] = useState(false);

    const handleToggle = () => {
        setIsActive(prevState => !prevState);
    }

    useEffect(() => {
        var burger = document.querySelector('.burger')
        var navbar = document.querySelector('.right-navi')


        var closeMenu = document.querySelector('.right-navi')

        // var closeMenu2 = document.querySelector('.home')
        // var closeMenu2 = document.querySelector('.about')
        // var closeMenu2 = document.querySelector('.skills')
        // var closeMenu2 = document.querySelector('.project')
        // var closeMenu2 = document.querySelector('.services')
        // var closeMenu2 = document.querySelector('.contact')
        
        closeMenu.addEventListener('click' , () => {
            navbar.classList.remove('active')
        })

        // closeMenu2.addEventListener('click' , () => {
        //     navbar.classList.add('active')
        // })


        if (burger) {
            if (isActive) {
                navbar.classList.add('active')
            }
            else {
                navbar.classList.remove('active')
            }
        }
    }, [isActive])

    return (
        <div className='navbar'>
            <div className="left-navi">
                <h1><a>HOME.</a></h1>
            </div>
            <div className='burger'>
                <button onClick={handleToggle} ><i class="fa-solid fa-bars fa-xl"></i></button> 
            </div>

            <div className='right-navi'>
                <ul>
                    <li><a>Your Products</a></li>
                    <li><a>Add Products</a></li>
                    <li><a>SKILLS</a></li>
                    <li><a>PROJECTS</a></li>
                    <li><a>SERVICES</a></li>
                    <li><a>CONTACT</a></li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar