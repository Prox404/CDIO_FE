import classNames from "classnames/bind";
import styles from "./NotFound.module.scss";
import { Link } from "react-router-dom";

let cx = classNames.bind(styles);

function NotFound() {
    return ( <>
       <div className={cx('wrapper')}>
            <div className={cx('not-found')}>
                404
            </div>
            <div className={cx('not-found-title')}>Opps. Bạn lạc vào tim tôi rồi ❤️</div>
            <Link to='/' className={cx('go-home-btn')}>Trở về trang chủ</Link>
        </div>
    </> );
}

export default NotFound;