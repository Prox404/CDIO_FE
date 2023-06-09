import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import classNames from "classnames/bind";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { useDispatch } from 'react-redux';

import * as ProductServices from "~/services/ProductServices";
import * as CartServices from "~/services/CartServices";
import styles from "./Product.module.scss";
import { setCart } from "~/action/action";

let cx = classNames.bind(styles);

function Product() {
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const product = await ProductServices.getProductById(id);
                setProduct(product);
                console.log(product);
                setLoading(false);
            } catch (error) {
                navigate('/404');
            }
        };

        fetchProduct();
    }, [id]);


    const handleQuantityChange = useCallback((event) => {
        setQuantity(event.target.value);
    }, []);

    const handleIncreaseQuantity = useCallback(() => {
        setQuantity(quantity + 1);
    }, [quantity]);

    const handleDecreaseQuantity = useCallback(() => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    }, [quantity]);

    const handleAddToCart = useCallback(async () => {
        const user = localStorage.getItem('user');
        if (!user) {
            // alert('Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng');
            navigate('/auth');
        } else {
            const params = new URLSearchParams();
            params.append('userId', JSON.parse(user)._id);
            params.append('productId', product._id);
            params.append('quantity', quantity);

            console.log(params);
            const cart = await CartServices.addCart(params);
            localStorage.setItem('cart', JSON.stringify(cart));
            dispatch(setCart(cart));
        }
    }, [product, quantity]);

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
                    <div className={cx('product-information-header')}>
                        <div className={cx('product-category')}>
                            {product.category && product.category.map((item, index) => {
                                return <span className={cx('category-item')} key={index}>{item}</span>
                            })}
                        </div>
                        <div className={cx('product-name')}>
                            {product.name}
                        </div>
                        {/* <div className={cx('line')}/> */}
                        <div className={cx('product-sold')}>
                            {product.sold + '/' + product.quantity} Đã bán
                        </div>

                        <div className={cx('product-price')}>
                            {
                                product.discount > 0 && <p className={cx('old-price')}>{product.price}</p>
                            }
                            <p className={cx('current-price')}>{product.price - product.discount * product.price}</p>
                        </div>
                    </div>

                    <div className={cx('product-action')}>
                        <div className={cx('product-quantity')}>
                            <button onClick={handleDecreaseQuantity} className={cx('quantity-button')}>-</button>
                            <input onChange={(e) => handleQuantityChange(e)} className={cx('quantity-input')} type="number" value={quantity} />
                            <button onClick={handleIncreaseQuantity} className={cx('quantity-button')}>+</button>
                        </div>
                        <button onClick={handleAddToCart} className={cx('add-to-cart')}>Thêm vào giỏ hàng</button>
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