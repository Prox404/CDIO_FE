import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

import * as ProductServices from "~/services/ProductServices";
import styles from "./Product.module.scss";

let cx = classNames.bind(styles);

function Product() {
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const product = await ProductServices.getProductById(id);
                setProduct(product);
                console.log(product);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };

        fetchProduct();
    }, [id]);
    return (<>
        <div className={cx('wrapper')}>
            <div className={cx('product-overview')}>
                <div className={cx('product-image-container')}>
                    <Carousel>
                        {
                            product.image && product.image.map((item, index) => {
                                return <div key={index}><img src={item} className={cx('product-image')} alt='product' /></div>
                            })
                        }
                    </Carousel>
                </div>
                <div className={cx('product-information-container')}>
                    <div className={cx('product-name')}>
                        {product.name}
                    </div>
                    <div className={cx('product-sold')}>
                        {product.sold + '/' + product.quantity} Đã bán
                    </div>
                    <div className={cx('product-price')}>
                        {
                            product.discount > 0 && <p className={cx('old-price')}>{product.price}</p>
                        }
                        <p className={cx('current-price')}>{product.price + product.discount * product.price}</p>
                    </div>
                    <div className={cx('product-category')}>
                        {product.category && product.category.map((item, index) => {
                            return <span className={cx('category-itemw')} key={index}>{item}</span>
                        })}
                    </div>
                    <div className={cx('product-action')}>
                        <div className={cx('product-quantity')}>
                            <button className={cx('quantity-button')}>-</button>
                            <input className={cx('quantity-input')} type="number" value="1" />
                            <button className={cx('quantity-button')}>+</button>
                        </div>
                        <button className={cx('add-to-cart')}>Thêm vào giỏ hàng</button>
                        <button className={cx('buy-now')}>Mua ngay</button>
                    </div>
                </div>
            </div>
            <div className={cx('product-description')}>
                <h3>Mô tả sản phẩm</h3>
                <p>{product.description}</p>
            </div>
        </div>
    </>);
}

export default Product;