import styles from "./DefaultLayout.module.scss";
import classNames from "classnames/bind";
import PropTypes from "prop-types";

import Header from "~/components/core/Header";

let cx = classNames.bind(styles);
// eslint-disable-next-line react/prop-types
function DefaultLayout({ children }) {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('header')}>
        <Header />
      </div>
      <div className={cx('container')}>
        {/* <Sidebar /> */}
        {/* <div className={cx('sidebar')}></div> */}
        <div className={cx('content')}>{children}</div>
      </div>
    </div>
  );
}

DefaultLayout.prototype = {
  children: PropTypes.node.isRequired,
};

export default DefaultLayout;
