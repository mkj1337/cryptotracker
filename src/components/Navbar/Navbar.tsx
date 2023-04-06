import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import { useRef, useEffect, useState } from 'react';

// styles
import './Navbar.scss';

// icons
import { FaDiscord, FaTwitter, FaBars } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';

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

    return () => window.removeEventListener('scroll', handleScroll);
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
  };

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
          <FaTwitter />
        </a>
        <a href="#">
          <FaDiscord />
        </a>
      </div>
      <div className="navbar__btn">
        {!activeMenu ? (
          <FaBars onClick={handleClick} />
        ) : (
          <AiOutlineClose onClick={handleClick} />
        )}
      </div>
    </nav>
  );
};
