import classNames from 'classnames/bind';
import { AiOutlineSearch, AiOutlineShoppingCart, AiOutlineUser } from 'react-icons/ai';
import { FaAngleDown } from 'react-icons/fa';
import { useState, useCallback, useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';


import styles from './Header.module.scss';
import logo from '~/assets/camping_gear.svg'
import Search from '~/components/Search/Search';
import { Link } from 'react-router-dom';
import * as CartServices from '~/services/CartServices'
import { setCart } from "~/action/action";

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
    
    return (<>
        {
            subHeader && <div className={cx('sub-header-wrapper')}>
                Ehee
            </div>
        }

        <div className={cx('wrapper')}>
            <div className={cx('logo-container')}>
                <img className={`${cx('logo-image')}`} src={logo} alt="logo" />
                {/* <p className={`${cx('logo-text')}`}>Camping Gear</p> */}
            </div>
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
                <div className={cx('action-item')}><AiOutlineUser />{
                    user ? user.username : <Link className={cx('action-link')} to="/auth">Login</Link>
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