import styles from "./Management.module.scss";
import classNames from "classnames/bind";
import PropTypes from "prop-types";

import Header from "~/components/core/Header";
import Sidebar from "~/components/Sidebar";

let cx = classNames.bind(styles);
// eslint-disable-next-line react/prop-types
function Management({ children }) {
  return (
    <div className={cx('wrapper')}>
      {/* <div className={cx('header')}>
        <Header />
      </div> */}
      <div className={cx('container')}>
        <div className={cx('sidebar')}><Sidebar /></div>
        {/* <div className={cx('sidebar')}></div> */}
        <div className={cx('content')}>{children}</div>
      </div>
    </div>
  );
}

Management.prototype = {
  children: PropTypes.node.isRequired,
};

export default Management;
