import { useState, useEffect } from 'react';
import * as OrderServices from '~/services/OrderServices';
import styles from './OrderManager.module.scss';
import classNames from 'classnames/bind';
import { AiFillEye } from 'react-icons/ai';
// import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

let cx = classNames.bind(styles);

function OrderManager() {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchOrders = async () => {
            const result = await OrderServices.getAllOrders();
            if (result) {
                setOrders(result);
                setFilteredOrders(result);
            }
        };
        fetchOrders();
    }, []);

    useEffect(() => {
        const filtered = orders.filter((order) => {
            const { _id, user, phone } = order;
            const { fullname } = user;
            return (
                _id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
                phone.toString().includes(searchTerm)
            );
        });
        setFilteredOrders(filtered);
    }, [orders, searchTerm]);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div className={cx('wrapper')}>
            <h2>Quản lý đơn hàng</h2>
            <div className={cx('search-control')}>
                <input
                    type="text"
                    placeholder="Tìm kiếm theo mã đơn hàng, tên khách hàng, số điện thoại"
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </div>

            <div className={cx('order-list')}>
                <div className={cx('order-status')}>
                    <h3>Đang chờ xử lý</h3>
                    <table className={cx('table')}>
                        <thead className={cx('table-header')}>
                            <tr className={cx('table-row')}>
                                <th>Mã đơn hàng</th>
                                <th>Tên khách hàng</th>
                                <th>Địa chỉ</th>
                                <th>Số điện thoại</th>
                                <th>Tổng tiền</th>
                                <th>Ngày đặt hàng</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrders
                                .filter((order) => order.status === 0)
                                .map((order) => (
                                    <tr key={order._id}>
                                        <td>{order._id}</td>
                                        <td>{order.user.fullname}</td>
                                        <td>{order.address}</td>
                                        <td>{order.phone}</td>
                                        <td>{order.total}</td>
                                        <td>{order.orderDate}</td>
                                        <td>
                                            <Link
                                                className={cx('view-btn')}
                                                to={`/order-detail/${order._id}`}
                                            >
                                                <AiFillEye />
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>

                <div className={cx('order-status')}>
                    <h3>Đang chuẩn bị hàng</h3>
                    <table className={cx('table')}>
                        <thead className={cx('table-header')}>
                            <tr className={cx('table-row')}>
                                <th>Mã đơn hàng</th>
                                <th>Tên khách hàng</th>
                                <th>Địa chỉ</th>
                                <th>Số điện thoại</th>
                                <th>Tổng tiền</th>
                                <th>Ngày đặt hàng</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrders
                                .filter((order) => order.status === 1)
                                .map((order) => (
                                    <tr key={order._id}>
                                        <td>{order._id}</td>
                                        <td>{order.user.fullname}</td>
                                        <td>{order.address}</td>
                                        <td>{order.phone}</td>
                                        <td>{order.total}</td>
                                        <td>{order.orderDate}</td>
                                        <td>
                                            <Link
                                                className={cx('view-btn')}
                                                to={`/order-detail/${order._id}`}
                                            >
                                                <AiFillEye />
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>

                <div className={cx('order-status')}>
                    <h3>Đang giao</h3>
                    <table className={cx('table')}>
                        <thead className={cx('table-header')}>
                            <tr className={cx('table-row')}>
                                <th>Mã đơn hàng</th>
                                <th>Tên khách hàng</th>
                                <th>Địa chỉ</th>
                                <th>Số điện thoại</th>
                                <th>Tổng tiền</th>
                                <th>Ngày đặt hàng</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrders
                                .filter((order) => order.status === 2)
                                .map((order) => (
                                    <tr key={order._id}>
                                        <td>{order._id}</td>
                                        <td>{order.user.fullname}</td>
                                        <td>{order.address}</td>
                                        <td>{order.phone}</td>
                                        <td>{order.total}</td>
                                        <td>{order.orderDate}</td>
                                        <td>
                                            <Link
                                                className={cx('view-btn')}
                                                to={`/order-detail/${order._id}`}
                                            >
                                                <AiFillEye />
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>

                <div className={cx('order-status')}>
                    <h3>Đã giao thành công</h3>
                    <table className={cx('table')}>
                        <thead className={cx('table-header')}>
                            <tr className={cx('table-row')}>
                                <th>Mã đơn hàng</th>
                                <th>Tên khách hàng</th>
                                <th>Địa chỉ</th>
                                <th>Số điện thoại</th>
                                <th>Tổng tiền</th>
                                <th>Ngày đặt hàng</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrders
                                .filter((order) => order.status === 3)
                                .map((order) => (
                                    <tr key={order._id}>
                                        <td>{order._id}</td>
                                        <td>{order.user.fullname}</td>
                                        <td>{order.address}</td>
                                        <td>{order.phone}</td>
                                        <td>{order.total}</td>
                                        <td>{order.orderDate}</td>
                                        <td>
                                            <Link
                                                className={cx('view-btn')}
                                                to={`/order-detail/${order._id}`}
                                            >
                                                <AiFillEye />
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default OrderManager;
