import classNames from 'classnames/bind';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FaTrash } from "react-icons/fa";

import styles from './Cart.module.scss';

let cx = classNames.bind(styles);
function Cart() {
    const [selectedItems, setSelectedItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
    const [cartItems, setCartItems] = useState(cart?.products || []);

    const calculateTotalPrice = () => {
        let total = 0;
        for (const item of cartItems) {
            if (selectedItems.includes(item._id)) {
                total += item.product.price * item.quantity - item.product.price * item.quantity * item.product.discount;
            }
        }
        setTotalPrice(total);
    };

    useEffect(() => {
        calculateTotalPrice();
    }, [selectedItems]);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify({ products: cartItems }));
        calculateTotalPrice();
    }, [cartItems]);

    const handleItemSelect = (event, itemId) => {
        console.log('call-checked');
        if (event.target.checked) {
            setSelectedItems([...selectedItems, itemId]);
        } else {
            setSelectedItems(selectedItems.filter((id) => id !== itemId));
        }

        calculateTotalPrice();
    };

    const handleRemoveItem = (itemId) => {
        setSelectedItems(selectedItems.filter((id) => id !== itemId));
        setCartItems(cartItems.filter((item) => item._id !== itemId));
        calculateTotalPrice();
    };

    const handleIncreaseQuantity = (itemId) => {
        const newCartItems = [...cartItems];
        const itemIndex = newCartItems.findIndex((item) => item._id === itemId);
        if (itemIndex !== -1) {
            newCartItems[itemIndex].quantity += 1;
            setCartItems(newCartItems);
        }
    };

    const handleDecreaseQuantity = (itemId) => {
        const newCartItems = [...cartItems];
        const itemIndex = newCartItems.findIndex((item) => item._id === itemId);
        if (itemIndex !== -1 && newCartItems[itemIndex].quantity > 1) {
            newCartItems[itemIndex].quantity -= 1;
            setCartItems(newCartItems);
        }
    };

    const handlePlaceOrder = () => {
        const selectedProducts = cartItems.filter((item) => selectedItems.includes(item._id));
        const orderDetails = selectedProducts.map((product) => ({
            id: product._id,
            quantity: product.quantity
        }));
        console.log(orderDetails);
    };

    return (<>
        <div className={cx('wrapper')}>
            <div className={cx('cart-products-container')}>
                <h2>Shopping Cart</h2>
                {cartItems.map((item) => (
                    <div className={cx('cart-item')} key={item._id}>
                        <div className={cx('cart-item-image')}>
                            <input
                                type="checkbox"
                                onChange={(event) => handleItemSelect(event, item._id)}
                            />
                            <img src={item.product.image[0]} alt={item.product.name} />
                        </div>
                        <div className={cx('cart-item-info')}>
                            <div className={cx('cart-description')}>
                                <h3>{item.product.name}</h3>
                                <p>
                                    
                                    Quantity: 
                                    <button onClick={() => handleDecreaseQuantity(item._id)}>-</button> 
                                    {item.quantity}
                                    <button onClick={() => handleIncreaseQuantity(item._id)}>+</button> 
                                </p>
                                <p>
                                    Price: {item.product.price - item.product.price * item.product.discount}
                                    {item.product.discount > 0 && (
                                        <span className={cx('badge')}>{item.product.discount * 100}%</span>
                                    )}
                                </p>
                                <p>Total Price: {item.product.price * item.quantity - item.product.price * item.quantity * item.product.discount}</p>
                            </div>
                            <div className={cx('cart-item-action')}>
                                <button className={cx('remove-btn')} onClick={() => handleRemoveItem(item._id)}>
                                    <FaTrash />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className={cx('total-container')}>
                <div className={cx('total-sub')}>
                    <p className={cx('total-price-text')}>
                        <p className={cx('total-title')}>Tổng tiền:</p>
                        <p className={cx('total-price')}>{totalPrice}</p>
                    </p>
                    <button className={cx('order-button')} onClick={handlePlaceOrder}>Đặt hàng</button>
                </div>
            </div>
        </div>
    </>
    )
}

export default Cart;
