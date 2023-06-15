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
      <div key={_id} className="product-item">
        <img src={image[0]} alt={name} className="product-image" />
        <div className="product-info">
          <div className="product-name">{name}</div>
          <div className="product-quantity">Quantity: {quantity}</div>
          <div className="product-price">Price: {currentPrice}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="order-detail">
      <div className="order-products">
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
    const { _id, status, address, phone, note, total,orderDate, products } = order;
    const statusText = getStatusText(status);
    const isExpanded = expandedOrders.includes(_id);

    return (
      <div key={_id} className="order-item">
        <div className="order-header">
          <div className="order-id">Order ID: {_id}</div>
          <div className="order-status">Status: {statusText}</div>
          <div className="order-address">Address: {address}</div>
          <div className="order-phone">Phone: {phone}</div>
          <div className="order-note">Note: {note}</div>
          <div className="order-total">Total: {total}</div>
          <div className="order-date">Date: {orderDate}</div>
        </div>
        <button onClick={() => toggleExpand(_id)}>
          {isExpanded ? "Collapse" : "Expand"}
        </button>
        {isExpanded && <OrderDetail order={order} />}
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
    return filteredOrders.map((order) => renderOrderItem(order));
  };

  return (
    <div>
      <h2>Đang đặt:</h2>
      {renderOrderList(0)}
      <h2>Đã đặt:</h2>
      {renderOrderList(4)}
    </div>
  );
}

export default MyOrder;
