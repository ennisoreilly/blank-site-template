import React, { useEffect, useState } from "react";
import { useSpring, animated } from "react-spring";
import styles from "./right-slide-bar.module.css";
import Link from "next/link";

function Navbar() {

  //showing and hiding nav on mobile based on button click
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  const menuAnimation = useSpring({
    opacity: isMenuOpen ? 1 : 1,
    transform: isMenuOpen ? "translateX(0)" : "translateX(100%)",
  });

  //adjusting nav based on screen width
  const [screenWidth, setScreenWidth] = useState(true);

  useEffect(() => {
    const handleResize = () => {
        setScreenWidth(window.innerWidth);
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, {});

  return (
    <div>
      <div className={styles.nav}>
        {screenWidth  && screenWidth < 1024 ? (
        <div className={styles.mobileNav}>
          {isMenuOpen ? (
          <animated.div className={styles.menu} style={menuAnimation}>
            <span className="material-symbols-outlined" style={{ color: "white", cursor: "pointer"}} onClick={toggleMenu}>
              Close
            </span>
            <Link className={styles.menuLink} onClick={handleLinkClick} href="/">Home</Link>
            <Link className={styles.menuLink} onClick={handleLinkClick} href="/about">About</Link>
            <Link className={styles.menuLink} onClick={handleLinkClick} href="/gallery">Gallery</Link>
            <Link className={styles.menuLink} onClick={handleLinkClick} href="/contact">Contact</Link>
          </animated.div>):(<></>)}
          <h3 className={styles.clearText}>
            Business Name
          </h3>
          <img/>
          <span className="material-symbols-outlined" style={{ color: "white", cursor: "pointer"}} onClick={toggleMenu}>
            Menu
          </span>
        </div>
        ) : (
        <div className={styles.desktopNav}>
          <Link className={styles.navLink} href="/">Home</Link>
          <Link className={styles.navLink} href="/about">About</Link>
          <Link className={styles.navLink} href="/gallery">Gallery</Link>
          <Link className={styles.navLink} href="/contact">Contact</Link>
        </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
