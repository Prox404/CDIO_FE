import classNames from 'classnames/bind';
import { AiOutlineSearch, AiOutlineShoppingCart, AiOutlineUser } from 'react-icons/ai';
import { FaAngleDown } from 'react-icons/fa';
import { useState, useCallback } from 'react';

import styles from './Header.module.scss';
import logo from '~/assets/camping_gear.svg'
import Search from '~/components/Search/Search';

let cx = classNames.bind(styles);

function Header() {
    const [subHeader, setSubHeader] = useState(false);

    const handleSubHeader = useCallback(() => {
        setSubHeader(!subHeader);
    }, [subHeader]);

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
                <div className={cx('action-item')}><AiOutlineUser />Account</div>
                <div className={cx('action-item')}><AiOutlineShoppingCart />Cart</div>
            </div>
        </div>
    </>);
}

export default Header;