import styles from './Loader.module.scss';
import logo from '~/assets/camping_gear.svg'

import classNames from 'classnames/bind';

let cx = classNames.bind(styles);

function Loader() {
    return (<>
        <div className={cx('wrapper')}>
            <div className={cx('logo-container')}>
                <svg version="1.0" className={cx('logo-image')} xmlns="http://www.w3.org/2000/svg"
                    width="277.000000pt" height="272.000000pt" viewBox="0 0 277.000000 272.000000"
                    preserveAspectRatio="xMidYMid meet">
                    <g transform="translate(0.000000,272.000000) scale(0.100000,-0.100000)"
                        stroke="none">
                        <path fill="#000000" d="M0 1360 l0 -1360 1385 0 1385 0 0 1360 0 1360 -1385 0 -1385 0 0
-1360z m1507 1238 c28 -13 70 -51 122 -112 44 -50 100 -107 126 -126 25 -18
45 -38 45 -43 0 -20 -98 5 -195 49 -179 82 -175 81 -191 59 -10 -14 -14 -55
-14 -156 l0 -138 93 -173 c365 -678 802 -1323 1195 -1765 l73 -83 -99 0 c-211
0 -699 45 -817 75 -89 23 -160 61 -201 108 -68 79 -160 289 -219 500 -15 53
-31 97 -36 97 -4 0 -22 -46 -39 -102 -100 -332 -197 -511 -304 -562 -125 -59
-408 -95 -939 -120 l-97 -4 27 32 c255 300 377 455 555 706 272 386 563 861
722 1177 l56 113 0 250 0 251 48 -6 c26 -4 66 -16 89 -27z"/>
                    </g>
                </svg>
                <div className={`${cx('fill')}`}></div>
            </div>
        </div>
    </>);
}

export default Loader;