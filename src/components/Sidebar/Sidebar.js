import { Link } from "react-router-dom";
import classNames from "classnames/bind";

import logo from '~/assets/camping_gear.svg'
import styles from "./Sidebar.module.scss";

let cx = classNames.bind(styles);

function Sidebar() {
    return (<>
        <div className={cx('wrapper')}>
            <div className={cx('logo-container')}>
                <center>
                    <img src={logo} alt="logo" className={cx('logo')} />
                    <p className={cx('logo-name')}>Camping Gear</p>
                </center>
            </div>
            <div className={cx('sidebar-content')}>
                <Link to='/user-manager' className={cx('sidebar-item')}>
                    Quản lý tài khoản
                </Link>
                <Link to='/product-manager' className={cx('sidebar-item')}>
                    Quản lý sản phẩm
                </Link>
                <Link to='/order-manager' className={cx('sidebar-item')}>
                    Quản lý đơn hàng
                </Link>
            </div>
        </div>
    </>);
}

export default Sidebar;