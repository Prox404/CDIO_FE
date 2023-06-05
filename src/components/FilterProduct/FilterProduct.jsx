import classNames from 'classnames/bind';
import { useDebounce } from '@uidotdev/usehooks';
import { useState, useEffect } from 'react';

import styles from './FilterProduct.module.scss';
import * as ProductServices from '~/services/ProductServices'

let cx = classNames.bind(styles);

function FilterProduct() {
    const [priceFrom, setPriceFrom] = useState('');
    const [priceTo, setPriceTo] = useState('');
    const [productName, setProductName] = useState('');
    const [discountOnly, setDiscountOnly] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [products, setProducts] = useState([]);

    const priceFromDebouce = useDebounce(priceFrom, 500);
    const priceToDebouce = useDebounce(priceTo, 500);

    const handlePriceFromChange = (event) => {
        setPriceFrom(event.target.value);
    };

    const handlePriceToChange = (event) => {
        setPriceTo(event.target.value);
    };

    const handleProductNameChange = (event) => {
        setProductName(event.target.value);
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const handleDiscountOnlyChange = (event) => {
        setDiscountOnly(event.target.checked);
    };

    useEffect(() => {
        const fetchFilteredProducts = async () => {
            const fetchFilteredProducts = async () => {
                try {
                    const params = {};

                    if (priceFrom) {
                        params.priceFrom = priceFromDebouce;
                    }

                    if (priceTo) {
                        params.priceTo = priceToDebouce;
                    }

                    if (productName) {
                        params.name = productName;
                    }

                    if (discountOnly) {
                        params.discount = discountOnly;
                    }

                    if (selectedCategory) {
                        params.category = selectedCategory;
                    }

                    const response = await ProductServices.filter(params);

                    const data = response;
                    console.log(data);
                    data && setProducts(data);

                } catch (error) {
                    console.log(error);
                }
            };

            fetchFilteredProducts();
        };

        fetchFilteredProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [priceFromDebouce, selectedCategory, priceToDebouce, productName, discountOnly]);

    const handleResetFilters = () => {
        setPriceFrom('');
        setPriceTo('');
        setProductName('');
        setDiscountOnly(false);
    };

    return (<>
        <div className={cx('wrapper')}>
            <div className={cx('filter-container')}>
                <h5>Thể loại</h5>
                <div className={cx('category-filter')}>
                    <div className={cx('category-item')}>
                        <input onChange={(e) => handleCategoryChange(e)} type='checkbox' value="All" name='categories' id='all' />
                        <label htmlFor='all'>All</label>
                    </div>
                    <div className={cx('category-item')}>
                        <input onChange={(e) => handleCategoryChange(e)} type='checkbox' value="trại" name='categories' id='camtrai' />
                        <label htmlFor='camtrai'>Cắm trại, leo núi</label>
                    </div>
                    <div className={cx('category-item')}>
                        <input onChange={(e) => handleCategoryChange(e)} type='checkbox' value="Balo" name='categories' id='balo' />
                        <label htmlFor='balo'>Balo & túi du lịch</label>
                    </div>
                    <div className={cx('category-item')}>
                        <input onChange={(e) => handleCategoryChange(e)} type='checkbox' value="Giày" name='categories' id='giaydep' />
                        <label htmlFor='giaydep'>Giày dép</label>
                    </div>
                    <div className={cx('category-item')}>
                        <input onChange={(e) => handleCategoryChange(e)} type='checkbox' value="Đồ phượt" name='categories' id='dophuot' />
                        <label htmlFor='dophuot'>Đồ phượt xe</label>
                    </div>
                    <div className={cx('category-item')}>
                        <input onChange={(e) => handleCategoryChange(e)} type='checkbox' value="Đồ điện tử" name='categories' id='docongnghe' />
                        <label htmlFor='docongnghe'>Đồ điện tử công nghệ</label>
                    </div>
                    <div className={cx('category-item')}>
                        <input onChange={(e) => handleCategoryChange(e)} type='checkbox' value="Dao" name='categories' id='dao' />
                        <label htmlFor='dao'>Dao và dụng cụ</label>
                    </div>
                </div>
                <h5 style={{ marginTop: '10px' }}>Giá</h5>
                <div className={cx('price-filter')}>
                    <div className={cx('from-price')}>
                        <input onChange={(e) => handlePriceFromChange(e)} type='number' name='fromPrice' id='fromPrice' placeholder="₫ Từ" />
                    </div>
                    -
                    <div className={cx('to-price')}>
                        <input onChange={(e) => handlePriceToChange(e)} type='number' name='toPrice' id='toPrice' placeholder="₫ Đến" />
                    </div>
                </div>
                <h5 style={{ marginTop: '10px' }}>Dịch vụ & khuyến mãi</h5>
                <div className={cx('services-filter')}>
                    <input onChange={(e) => handleDiscountOnlyChange(e)} className={cx('services-filter-check')} type='checkbox' name='services' id='onSale' />
                    <label style={{ marginLeft: '10px' }} htmlFor='onSale'>Đang giảm giá</label>
                </div>

                <button className={cx('cancel-filter-button')} onClick={handleResetFilters}>Xoá tất cả</button>
            </div>

            <div className={cx('product-container')}>

            </div>
        </div>
    </>);
}

export default FilterProduct;