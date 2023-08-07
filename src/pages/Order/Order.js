import { useState, useEffect, useCallback } from 'react';
import classNames from 'classnames/bind';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { BsCheckLg } from 'react-icons/bs';

import * as OrderServices from '~/services/OrderServices';
import data from "./data.json";
import styles from './Order.module.scss';
import { setCart } from "~/action/action";

let cx = classNames.bind(styles);
function Order() {
    const dispatch = useDispatch();
    const orderDetails = localStorage.getItem('orderDetails') ? JSON.parse(localStorage.getItem('orderDetails')) : [];
    const [step, setStep] = useState(1);
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [note, setNote] = useState('');
    const [totalPrice, setTotalPrice] = useState(0);
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {};

    const [selectedProvince, setSelectedProvince] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [district, setDistrict] = useState([]);
    const [selectedWard, setSelectedWard] = useState("");
    const [ward, setWard] = useState([]);
    const navigator = useNavigate();


    const provinces = data.map((province) => ({
        name: province.name,
        code: province.code
    }));

    const getDistricts = useCallback((provinceCode) => {
        const selectedProvince = data.find((p) => p.code == provinceCode);
        return selectedProvince ? selectedProvince.districts : [];
    }, []);

    const getWards = useCallback((provinceCode, districtCode) => {
        const selectedProvince = data.find((p) => p.code == provinceCode);
        const selectedDistrict = selectedProvince?.districts.find(
            (d) => d.code == districtCode
        );
        return selectedDistrict ? selectedDistrict.wards : [];
    }, []);



    const handleProvinceChange = useCallback((e) => {
        const provinceCode = e.target.value;
        setSelectedProvince(provinceCode);
        setSelectedDistrict("");
        setSelectedWard("");
    }, []);

    const handleDistrictChange = useCallback((e) => {
        const districtCode = e.target.value;
        setSelectedDistrict(districtCode);
        setSelectedWard("");
    }, []);

    const handleWardChange = useCallback((e) => {
        setSelectedWard(e.target.value);
    }, []);

    const getFullName = useCallback((code, list) => {
        const selectedItem = list.find((item) => item.code == code);
        return selectedItem ? selectedItem.name : "";
    }, []);

    const selectedProvinceName = getFullName(selectedProvince, provinces);
    const selectedDistrictName = getFullName(selectedDistrict, district);
    const selectedWardName = getFullName(selectedWard, ward);


    const formattedValues = [
        selectedProvinceName,
        selectedDistrictName,
        selectedWardName
    ]
        .filter(Boolean)
        .join(", ");
    // Function to calculate total price based on orderDetails
    const calculateTotalPrice = () => {
        let total = 0;
        orderDetails.forEach((order) => {
            total += order.quantity * order.product.price - order.quantity * order.product.price * order.product.discount;
        });
        return total;
    };

    // Function to handle form submission in Step 1
    const handleStep1Submit = (e) => {
        e.preventDefault();

        // Validate form data
        if (selectedProvinceName &&
            selectedDistrictName &&
            selectedWardName && phone) {
            setStep(2);
        } else {
            // Display error message or handle validation errors
        }
    };

    useEffect(() => {
        const provinces = data.map((province) => ({
            name: province.name,
            code: province.code
        }));
        setDistrict([]);
        setWard([]);
        setSelectedProvince("");
        setSelectedDistrict("");
        setSelectedWard("");
    }, []);
    useEffect(() => {
        setDistrict(getDistricts(selectedProvince));
    }, [selectedProvince, getDistricts]);

    useEffect(() => {
        setWard(getWards(selectedProvince, selectedDistrict));
    }, [selectedProvince, selectedDistrict, getWards]);

    // Function to handle form submission in Step 2
    const handleStep2Submit = async (e) => {
        e.preventDefault();

        const formattedOrderDetails = orderDetails.map(orderDetail => ({
            productId: orderDetail.product._id,
            quantity: orderDetail.quantity
        }));

        const params = new URLSearchParams();
        params.append('address', formattedValues);
        params.append('phone', phone);
        params.append('note', note);
        params.append('userId', user._id);
        console.log(formattedOrderDetails);
        formattedOrderDetails.forEach((orderDetail, index) => {
            console.log(orderDetail.productId);
            params.append(`products[${index}][productId]`, orderDetail.productId);
            params.append(`products[${index}][quantity]`, orderDetail.quantity);
        });

        let data = await OrderServices.addOrder(params);

        if (data) {
            dispatch(setCart(data.cart));
            localStorage.setItem('cart', JSON.stringify(data.cart));
            localStorage.setItem('orderDetails', JSON.stringify([]));

            setStep(3);
        } else {
            toast.error("Đặt hàng thất bại");
        }

        // Reset form fields and step
        // setAddress('');
        // setPhone('');
        // setNote('');
        // setStep(1);



        // Show success message or redirect to a success page
    };

    const handlePreviousStep = () => {
        setStep(step - 1);
    };

    const handleNextStep = () => {
        console.log('calll');
        if (step == 1) {
            if (selectedProvinceName && selectedDistrictName && selectedWardName && phone) {
                setStep(step + 1);
            } else {
                alert("Hãy điền đầy đủ thông tin !");
            }
        } else {
            setStep(step + 1);
        }
    };

    const handleBackToHome = () => {
        navigator('/');
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('navigation')}>
                <div className={cx('control')}>
                    {
                        step > 1 && <button onClick={handlePreviousStep}>Previous</button>
                    }
                </div>
                <div className={cx('progress')}>
                    <div className={`${cx('step-item')} ${cx('active')} `}>
                        <div className={cx('step-counter')}>1</div>
                        <div className={cx('step-name')}>Fill Information</div>
                    </div>
                    <div className={`${cx('step-item')} ${step >= 2 && cx('active')} `}>
                        <div className={cx('step-counter')}>2</div>
                        <div className={cx('step-name')}>Confirm</div>
                    </div>
                    <div className={`${cx('step-item')} ${step >= 3 && cx('active')} `}>
                        <div className={cx('step-counter')}>3</div>
                        <div className={cx('step-name')}>End</div>
                    </div>

                </div>
                <div className={cx('control')}>
                    {
                        step < 3 && <button onClick={handleNextStep}>Next</button>
                    }
                </div>
            </div>
            {step === 1 && (
                <div>
                    <h2>Step 1: Personal Information</h2>
                    <form className={cx('form')} onSubmit={handleStep1Submit}>
                        <label className={cx('select-group')}>
                            <select value={selectedProvince} onChange={handleProvinceChange}>
                                <option value="">Chọn tỉnh</option>
                                {provinces.map((province) => (
                                    <option key={province.code} value={province.code}>
                                        {province.name}
                                    </option>
                                ))}
                            </select>

                            <select
                                value={selectedDistrict}
                                onChange={handleDistrictChange}
                                disabled={!selectedProvince}
                            >
                                <option value="">Chọn huyện</option>
                                {district.map((district) => (
                                    <option key={district.code} value={district.code}>
                                        {district.name}
                                    </option>
                                ))}
                            </select>

                            <select
                                value={selectedWard}
                                onChange={handleWardChange}
                                disabled={!selectedDistrict}
                            >
                                <option value="">Chọn xã</option>
                                {ward.map((ward) => (
                                    <option key={ward.code} value={ward.code}>
                                        {ward.name}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <label>
                            <input
                                type="text"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder='Phone number'
                            />
                        </label>
                        <label>
                            <textarea
                                type="text"
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                placeholder='Note'
                            />
                        </label>

                    </form>
                </div>
            )}

            {step === 2 && (
                <div>
                    <h2>Step 2: Order Confirmation</h2>
                    <div>
                        {/* Display product information from orderDetails */}
                        {orderDetails.map((order) => (
                            <div className={cx('cart-item')} key={order._id}>
                                <div className={cx('cart-item-image')}>
                                    <img src={order.product.image[0]} alt={order.product.name} />
                                </div>
                                <div className={cx('cart-item-info')}>
                                    <div className={cx('cart-description')}>
                                        <h3>{order.product.name}</h3>
                                        <p className={cx('info')}>
                                            <p>Số lượng:</p>
                                            <p >{order.quantity}</p>
                                        </p>


                                        <p className={cx('info')}>
                                            <p>Giá:</p>
                                            <span className={cx('price')}>
                                                {order.product.price * order.product.discount}
                                            </span>
                                        </p>
                                        <p className={cx('info')}>
                                            <p>Tổng cộng:</p>
                                            <span className={cx('price')}>
                                                {order.quantity * order.product.price * order.product.discount}
                                            </span>
                                        </p>
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>
                    <div>

                        <h3>Personal Information:</h3>
                        <p>Họ và tên: {user?.fullname}</p>
                        <p>Địa chỉ: {formattedValues}</p>
                        <p>Số điện thoại: {phone}</p>
                        <p>Ghi chú: {note}</p>
                    </div>
                    <p>Tổng cộng: {calculateTotalPrice()}</p>

                    <button className={cx('btn-order')} onClick={handleStep2Submit}>Confirm Order</button>
                </div>
            )}

            {step === 3 && (
                <div className={cx('success-page')}>
                    <div className={cx('success')}>
                        <BsCheckLg />
                    </div>
                    <h2 style={{ textAlign: 'center', marginTop: '10px'}}>Order Success</h2>
                    <p>Thank you for your order!</p>
                    <button style={{ marginTop: '20px'}} onClick={handleBackToHome} className={cx('btn-order')} >Back to Home</button>
                </div>
            )}
        </div>
    );
}

export default Order;