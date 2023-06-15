import classNames from "classnames/bind";
import { useState, useEffect } from "react";

import styles from './MyOrder.module.scss';
import * as OrderServices from '~/services/OrderServices';

const cx = classNames.bind(styles);

function OrderDetail({ order }) {
    const { _id, address, phone, note, total, products } = order;

    const renderProductItem = (product) => {
        const { _id, currentPrice, product: { name, image }, quantity } = product;
        return (
            <div key={_id} className={cx('product-item')}>
                <div className={cx('product-item-left')}>
                    <img src={image[0]} alt={name} className={cx('product-image')} />
                    <div className={cx('product-name')}>{name}</div>

                </div>
                <div className={cx('product-info')}>
                    <div className={cx('product-price')}>{currentPrice}</div>
                    <div className={cx('product-quantity')}>x{quantity}</div>
                </div>
            </div>
        );
    };

    return (
        <div className={cx('order-detail')}>
            <div className={cx('order-products')}>
                {products.map((product) => renderProductItem(product))}
            </div>
        </div>
    );
}

function MyOrder() {
    const [orders, setOrders] = useState([]);
    const [expandedOrders, setExpandedOrders] = useState([]);
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

    useEffect(() => {
        const fetchApi = async () => {
            const result = await OrderServices.getOrder(user._id);
            setOrders(result);
        };
        fetchApi();
    }, [user._id]);

    const toggleExpand = (orderId) => {
        setExpandedOrders((prevExpandedOrders) => {
            if (prevExpandedOrders.includes(orderId)) {
                return prevExpandedOrders.filter((id) => id !== orderId);
            } else {
                return [...prevExpandedOrders, orderId];
            }
        });
    };

    const renderOrderItem = (order) => {
        const { _id, status, address, phone, note, total, orderDate, products } = order;
        const statusText = getStatusText(status);
        const isExpanded = expandedOrders.includes(_id);

        return (
            <div key={_id} className={cx('order-item')}>
                <div className={cx('order-header')}>
                    <div className={cx('order-id')}>Mã đơn hàng: {_id}</div>
                    <div className={cx('order-status')}>{statusText}</div>
                </div>
                <div className={cx('order-info')}>
                    <div className={cx('order-date')}>Ngày đặt hàng: <span>{orderDate}</span></div>
                    <div className={cx('order-address')}>Address: <span>{address}</span></div>
                    <div className={cx('order-phone')}>Phone: <span>{phone}</span></div>
                    <div className={cx('order-note')}>Note: <span>{note ? note : 'Không có ghi chú'}</span></div>
                    <div className={cx('order-total')}>Total: <span>{total}</span></div>
                </div>
                {isExpanded && <OrderDetail order={order} />}
                <button className={cx('expand-btn')} onClick={() => toggleExpand(_id)}>
                    {isExpanded ? "Thu nhỏ" : "Xem thêm"}
                </button>
            </div>
        );
    };

    const getStatusText = (status) => {
        switch (status) {
            case 0:
                return "Đang xác nhận";
            case 1:
                return "Đang chuẩn bị hàng";
            case 3:
                return "Đang giao";
            case 4:
                return "Giao hàng thành công";
            default:
                return "";
        }
    };

    const renderOrderList = (status) => {
        const filteredOrders = orders.filter((order) => order.status === status);
        return filteredOrders.length > 0 ? filteredOrders.map((order) => renderOrderItem(order)) : <>
            <div className={cx('not-found')}><center>Bạn chưa có đơn đặt hàng nào 👀.</center></div>
        </>
    };

    return (
        <div className={cx('wrapper')}>
            <h2>Đang đặt:</h2>
            {renderOrderList(0)}
            <h2>Đã đặt:</h2>
            {renderOrderList(4)}
        </div>
    );
}

export default MyOrder;
