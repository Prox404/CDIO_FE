import React, { useState, useRef, useEffect } from "react";
import styles from "./Menu.module.scss";
import classNames from "classnames/bind";
import Button from "../Button/Button";

const cx = classNames.bind(styles);

const Menu = ({ menuItems, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const handleOutsideClick = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleMenuToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={cx('menu-container')} ref={menuRef}>
      <button className={cx('user-button')} onClick={handleMenuToggle}>
        {children}
      </button>
      {isOpen && (
        <div className={cx('menu')}>
          {menuItems?.map((item, index) => (
            <Button to={item.to} onClick={item.onClick} className={cx('menu-item')} key={index}>
              {item.icon}
              <span>{item.title}</span>
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Menu;
