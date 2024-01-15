import { useContext, useEffect, useState } from "react";
import './Navbar.css'
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

    const [isActive, setIsActive] = useState(false);

    const rout = useNavigate();

    const { state, Logout } = useContext(AuthContext)

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

        closeMenu.addEventListener('click', () => {
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
                <h1><a href="/">OLx.<sub className="maker">by Amaan</sub></a></h1>
            </div>
            <div className='burger'>
                <button onClick={handleToggle} ><i class="fa-solid fa-bars fa-xl"></i></button>
            </div>

            <div className='right-navi'>
                <ul>
                    {state?.user?.id ?
                        <>
                            <li><a onClick={() => rout("/yourproducts")}>Your Products</a></li>
                            <li><a onClick={() => rout("/addproduct")}>Add Products</a></li>
                            <li><a onClick={() => rout("/profile")}><i class="fa-solid fa-user"></i></a></li>
                            <li><a onClick={() => rout("/cart")}><i class="fa-solid fa-cart-shopping"></i></a></li>
                            <li onClick={Logout}><a>LOGOUT</a></li>
                        </>
                        :
                        <li><a onClick={() => rout("/login")}>LOGIN</a></li>
                    }
                    {/* <li><a>CONTACT</a></li> */}
                </ul>
            </div>
        </div>
    )
}

export default Navbar