import classNames from 'classnames/bind';
import styles from './ProductSearchItem.module.scss';
import { Link } from "react-router-dom";
import clsx from 'clsx';

const cx = classNames.bind(styles);

function ProductSearchItem({ data, notShowInformation = false }) {
    return (
        <>
            {(data && (
                <Link className={cx('wrapper')} to={`/proudcts/${data._id}`}>
                    <img
                        className={cx('avatar')}
                        src={data.image[0]}
                        alt="Proudct Image"
                    />

                    <div className={clsx(cx('info'), notShowInformation === true ? cx('hide') : cx(''))}>
                        <h4 className={cx('name')}>
                            <span>{data.name}</span>
                        </h4>
                    </div>

                </Link>
            ))}
        </>
    );
}

export default ProductSearchItem;