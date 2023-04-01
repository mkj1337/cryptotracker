import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import { useRef, useEffect, useState } from 'react';

// styles
import './Navbar.scss';

// icons
import { GrTwitter } from 'react-icons/gr';
import { FaDiscord } from 'react-icons/fa';

export const Navbar = () => {
  const navRef = useRef<any>(null);
  const menuRef = useRef<any>(null);
  const socialRef = useRef<any>(null);
  const [activeMenu, setActiveMenu] = useState<boolean>(false);

  const handleScroll = () => {
    if (navRef.current) {
      document.documentElement.scrollTop > 50
        ? navRef.current.classList.add('active')
        : navRef.current.classList.remove('active');
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    setActiveMenu(!activeMenu);
    if (menuRef.current && socialRef.current) {
      menuRef.current.classList.toggle('active');
      socialRef.current.classList.toggle('active');
    }
  };

  const scrollToTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  return (
    <nav className="navbar" ref={navRef}>
      <div>
        <NavLink to="/" onClick={scrollToTop}>
          <h1 className="navbar__title">CryptoTracker</h1>
        </NavLink>
      </div>

      <ul className="navbar__menu" ref={menuRef}>
        <li className="navbar__item">
          <NavLink to="/" onClick={scrollToTop}>
            Home
          </NavLink>
        </li>
        <li className="navbar__item">
          <a href="#market">Market</a>
        </li>
        <li className="navbar__item">
          <a href="#" id="aboutus">
            About Us
          </a>
        </li>
        <li className="navbar__item">
          <a href="#" id="join">
            Join
          </a>
        </li>
      </ul>
      <div className="navbar__socialmedia" ref={socialRef}>
        <a href="#">
          <i class="fa-brands fa-twitter"></i>
        </a>
        <a href="#">
          <i class="fa-brands fa-discord"></i>
        </a>
      </div>
      <div className="navbar__btn">
        {!activeMenu ? (
          <i class="fa-solid fa-bars" onClick={handleClick}></i>
        ) : (
          <i class="fa-solid fa-xmark" onClick={handleClick}></i>
        )}
      </div>
    </nav>
  );
};
