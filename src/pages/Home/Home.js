import classNames from 'classnames/bind';
import { 
    GiBarracksTent, 
    GiTShirt, 
    GiGymBag, 
    GiConverseShoe, 
    GiFullMotorcycleHelmet,
    GiFlashlight,
    GiBowieKnife
} from "react-icons/gi"

import styles from './Home.module.scss';
import ads_image from '~/assets/ADS.jpg';
let cx = classNames.bind(styles);

function Home() {
    return (<>
        {/* <h1>Home</h1> */}
        <div className={cx('ads-container')}>
            <img className={cx('ads-image')} src={ads_image} alt="ads" />
            <div className={cx('categories-container')}>
                <div className={cx('categories-item')}>
                    <div className={cx('categories-item-image')}>
                        <GiBarracksTent />
                    </div>
                    <div className={cx('categories-item-name')}>
                        Cắm trại, Leo núi
                    </div>
                </div>
                <div className={cx('categories-item')}>
                    <div className={cx('categories-item-image')}>
                        <GiTShirt />
                    </div>
                    <div className={cx('categories-item-name')}>
                        Trang phục dã ngoại
                    </div>
                </div>
                <div className={cx('categories-item')}>
                    <div className={cx('categories-item-image')}>
                        <GiGymBag />
                    </div>
                    <div className={cx('categories-item-name')}>
                        Balo & Túi du lịch
                    </div>
                </div>
                <div className={cx('categories-item')}>
                    <div className={cx('categories-item-image')}>
                        <GiConverseShoe />
                    </div>
                    <div className={cx('categories-item-name')}>
                        Giày dép
                    </div>
                </div>
                <div className={cx('categories-item')}>
                    <div className={cx('categories-item-image')}>
                        <GiFullMotorcycleHelmet />
                    </div>
                    <div className={cx('categories-item-name')}>
                        Đồ phượt xe
                    </div>
                </div>
                <div className={cx('categories-item')}>
                    <div className={cx('categories-item-image')}>
                        <GiFlashlight />
                    </div>
                    <div className={cx('categories-item-name')}>
                        Đồ điện tử, công nghệ
                    </div>
                </div>
                <div className={cx('categories-item')}>
                    <div className={cx('categories-item-image')}>
                        <GiBowieKnife />
                    </div>
                    <div className={cx('categories-item-name')}>
                        Dao và dụng cụ
                    </div>
                </div>
            </div>
        </div>
    </>);
}

export default Home;