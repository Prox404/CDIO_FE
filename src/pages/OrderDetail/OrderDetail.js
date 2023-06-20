import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import classNames from "classnames/bind";

import styles from "./OrderDetail.module.scss";
import * as OrderServices from '~/services/OrderServices';

let cx = classNames.bind(styles);


function OrderDetail() {
    const { id } = useParams();
    const [order, setOrder] = useState({});

    useEffect(() => {
        const fetchApi = async () => {
            const result = await OrderServices.getOrderDetails(id);
            // console.log(result);
            setOrder(result);
        };
        fetchApi();
    }, [id]);

    const handlePrepareOrder = async () => {
        // Xử lý khi nhấn nút "Đang chuẩn bị hàng"
        // setPreparing
        let data = await OrderServices.setPreparing(id);
        if (data) {
            setOrder({ ...order, status: 1 });
            toast.success('Đang chuẩn bị hàng');
        } else {
            toast.error('Xảy ra lỗi !');
        }
    };

    const handleDeliverOrder = async () => {
        // Xử lý khi nhấn nút "Đang giao"
        // setDelivering
        let data = await OrderServices.setDelivering(id);
        if (data) {
            setOrder({ ...order, status: 2 });
            toast.success('Đang giao');
        }else {
            toast.error('Xảy ra lỗi !');
        }
    };

    const handleCompleteOrder = async () => {
        // Xử lý khi nhấn nút "Đã giao thành công"
        // setDelivered
        let data = await OrderServices.setDelivered(id);
        if (data) {
            setOrder({ ...order, status: 3 });
            toast.success('Đã giao thành công');
        }else {
            toast.error('Xảy ra lỗi !');
        }

    };

    return (<>
        <div className={cx('wrapper')}>
            <h2>Chi tiết đơn hàng</h2>
            <div>
                <div className={cx('order-header')}>
                    <h3>Mã đơn hàng: {order?._id}</h3>
                    <p>Trạng thái: {order?.status == 0 ? 'Đang chờ xử lý' : order?.status == 1 ? 'Đang chuẩn bị hàng' : order?.status == 2 ? 'Đang giao' : 'Đã giao thành công'}</p>
                </div>
                <p>Ngày đặt hàng: {order?.orderDate}</p>
                <p>Tên người đặt: {order.user?.fullname}</p>
                <p>Địa chỉ: {order?.address}</p>
                <p>Số điện thoại: {order?.phone}</p>
                <p>Ghi chú: {order?.note}</p>
                <p>Tổng tiền: {order?.total}</p>
            </div>
            <div>
                <h3>Sản phẩm đã đặt hàng:</h3>
                {order.products?.map((product) => (
                    <div className={cx('product-item')} key={product?._id}>
                        <div className={cx('order-left')}>
                            <img src={product.product?.image[0]} alt={product.product?.name} />
                            <p className={cx('product-name')}>{product.product?.name}</p>
                        </div>

                        <div className={cx('order-info')}>
                            <p className={cx('product-price')}>{product?.currentPrice}</p>
                            <p className={cx('product-quantity')}>x{product?.quantity}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div>
                {order?.status == 0 && (
                    <button className={cx('btn')} onClick={handlePrepareOrder}>Đang chuẩn bị hàng</button>
                )}
                {order?.status == 1 && (
                    <button className={cx('btn')} onClick={handleDeliverOrder}>Đang giao</button>
                )}
                {order?.status == 2 && (
                    <button className={cx('btn')} onClick={handleCompleteOrder}>Đã giao thành công</button>
                )}
            </div>
        </div>
    </>);
}

export default OrderDetail;