import classNames from 'classnames/bind';
import { AiOutlineSearch, AiOutlineShoppingCart, AiOutlineUser } from 'react-icons/ai';
import { FaAngleDown } from 'react-icons/fa';
import { useState, useCallback, useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import {MdOutlineShoppingBag} from 'react-icons/md'


import styles from './Header.module.scss';
import logo from '~/assets/camping_gear.svg'
import Search from '~/components/Search/Search';
import { Link } from 'react-router-dom';
import * as CartServices from '~/services/CartServices'
import { setCart } from "~/action/action";
import Menu from '~/components/Menu'

let cx = classNames.bind(styles);



function Header() {
    console.log('Header render');
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
    const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : null;
    const [subHeader, setSubHeader] = useState(false);
    const cart__ = useSelector((state) => {
        console.log('state__', state);
        return state.cart;
    });
    console.log('cart__', cart__);
    const dispatch = useDispatch();

    const handleSubHeader = useCallback(() => {
        setSubHeader(!subHeader);
    }, [subHeader]);

    if (user && !cart) {
        CartServices.getCart(user._id).then((res) => {
            localStorage.setItem('cart', JSON.stringify(res));
            if (!cart__) {
                dispatch(setCart(res));
            }
        })
    }
   

    const userMenu = [
        {
            icon: <svg width="1em" height="1em" className={cx('left-icon')} viewBox="0 0 48 48" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M24.0003 7C20.1343 7 17.0003 10.134 17.0003 14C17.0003 17.866 20.1343 21 24.0003 21C27.8663 21 31.0003 17.866 31.0003 14C31.0003 10.134 27.8663 7 24.0003 7ZM13.0003 14C13.0003 7.92487 17.9252 3 24.0003 3C30.0755 3 35.0003 7.92487 35.0003 14C35.0003 20.0751 30.0755 25 24.0003 25C17.9252 25 13.0003 20.0751 13.0003 14ZM24.0003 33C18.0615 33 13.0493 36.9841 11.4972 42.4262C11.3457 42.9573 10.8217 43.3088 10.2804 43.1989L8.32038 42.8011C7.77914 42.6912 7.4266 42.1618 7.5683 41.628C9.49821 34.358 16.1215 29 24.0003 29C31.8792 29 38.5025 34.358 40.4324 41.628C40.5741 42.1618 40.2215 42.6912 39.6803 42.8011L37.7203 43.1989C37.179 43.3088 36.6549 42.9573 36.5035 42.4262C34.9514 36.9841 29.9391 33 24.0003 33Z"></path></svg>,
            title: 'View profile',
            to: `/me/${user?._id}`,
        },
        {
            icon: <MdOutlineShoppingBag/>,
            title: 'Đơn hàng của tôi',
            to: `/my-order`,
        },
        {
            icon: <svg width="1em" height="1em" className={cx('left-icon')} viewBox="0 0 48 48" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M24.1716 26L7 26C6.44771 26 6 25.5523 6 25L6 23C6 22.4477 6.44771 22 7 22L24.1716 22L20.2929 18.1213C19.9024 17.7308 19.9024 17.0976 20.2929 16.7071L21.7071 15.2929C22.0976 14.9024 22.7308 14.9024 23.1213 15.2929L30.4142 22.5858C31.1953 23.3668 31.1953 24.6332 30.4142 25.4142L23.1213 32.7071C22.7308 33.0976 22.0976 33.0976 21.7071 32.7071L20.2929 31.2929C19.9024 30.9024 19.9024 30.2692 20.2929 29.8787L24.1716 26ZM36 43L27 43C26.4477 43 26 42.5523 26 42L26 40C26 39.4477 26.4477 39 27 39L36 39C37.1046 39 38 38.1046 38 37L38 11C38 9.89543 37.1046 9 36 9L27 9C26.4477 9 26 8.55228 26 8L26 6C26 5.44771 26.4477 5 27 5L36 5C39.3137 5 42 7.68629 42 11L42 37C42 40.3137 39.3137 43 36 43Z"></path></svg>,
            title: 'Log out',
            logout: true,
            separate: true,
        }
    ];

    // const handleMenuChange = (menuItem) => {
    //     // console.log('menuItem__', menuItem);
    // };
    
    return (<>
        {
            subHeader && <div className={cx('sub-header-wrapper')}>
                Ehee
            </div>
        }

        <div className={cx('wrapper')}>
            <Link to='/' className={cx('logo-container')}>
                <img className={`${cx('logo-image')}`} src={logo} alt="logo" />
                {/* <p className={`${cx('logo-text')}`}>Camping Gear</p> */}
            </Link>
            <div className={cx('search-container')}>
                <div className={cx('link-container')}>
                    <div className={cx('link-item')} onClick={handleSubHeader}>Categories <FaAngleDown /></div>
                    <div className={cx('link-item')}>Blogs</div>
                </div>
                {/* <div className={cx('search-item')}>
                    <input id="search" className={cx('search-input')} type="text" placeholder="Search something..." />
                    <button className={cx('search-button')} ><AiOutlineSearch /></button>
                </div> */
                }
                <Search />
            </div>
            <div className={cx('action-container')}>
                <div className={cx('action-item')}><AiOutlineUser />
                {
                    user ? <>
                    <Menu className={cx('menu')} menuItems={user ? userMenu : MENU_ITEMS} >
                        {<>
                            {user?.username}
                        </>}
                    </Menu>
                    </> : <>
                    
                        <Link className={cx('action-link')} to="/auth">Login</Link>
                   
                    </>
                }</div>
                {
                    user && <Link to={`/cart/${user?._id}`} className={cx('action-item')}><AiOutlineShoppingCart />
                        <div className={cx('badge')}>
                            {
                                cart__?.products.length >99 ? '99+' :  cart__?.products.length || '0'
                            }
                        </div>
                    </Link>
                }

            </div>
        </div>
    </>);
}

export default Header;