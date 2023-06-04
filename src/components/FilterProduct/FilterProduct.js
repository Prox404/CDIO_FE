import styles from './FilterProduct.module.scss';
import classNames from 'classnames/bind';

let cx = classNames.bind(styles);

function FilterProduct() {
    return (<>
        <div className={cx('wrapper')}>
            <div className={cx('filter-container')}>
                <div className={cx('category-filter')}>
                    <div className={cx('category-item')}>
                        <input type='checkbox' name='categories' id='all' />
                        <label htmlFor='all'>All</label>
                    </div>
                    <div className={cx('category-item')}>
                        <input type='checkbox' name='categories' id='camtrai' />
                        <label htmlFor='camtrai'>Cắm trại, leo núi</label>
                    </div>
                    <div className={cx('category-item')}>
                        <input type='checkbox' name='categories' id='balo' />
                        <label htmlFor='balo'>Balo & túi du lịch</label>
                    </div>
                    <div className={cx('category-item')}>
                        <input type='checkbox' name='categories' id='giaydep' />
                        <label htmlFor='giaydep'>Giày dép</label>
                    </div>
                    <div className={cx('category-item')}>
                        <input type='checkbox' name='categories' id='dophuot' />
                        <label htmlFor='dophuot'>Đồ phượt xe</label>
                    </div>
                    <div className={cx('category-item')}>
                        <input type='checkbox' name='categories' id='docongnghe' />
                        <label htmlFor='docongnghe'>Đồ điện tử công nghệ</label>
                    </div>
                    <div className={cx('category-item')}>
                        <input type='checkbox' name='categories' id='dao' />
                        <label htmlFor='dao'>Dao và dụng cụ</label>
                    </div>
                </div>
            </div>
            <div className={cx('product-container')}>
                product div
                <input type='text' />
            </div>
        </div>
    </>);
}

export default FilterProduct;