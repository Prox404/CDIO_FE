import classNames from "classnames/bind";
import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux';

import * as AuthServices from "~/services/AuthServices";
import styles from "./Auth.module.scss";
import './Auth.css'
import leonui from '~/assets/leonui.png'
import logo from '~/assets/camping_gear.svg'
import data from "./data.json";
import { setUser } from '~/action/action';

const cx = classNames.bind(styles);

function Auth() {
    const [login, setLogin] = useState(true);
    const navigate = useNavigate();
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerUserName, setRegisterUserName] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');
    const [registerFirstName, setRegisterFirstName] = useState('');
    const [registerLastName, setRegisterLastName] = useState('');
    const [registerPhone, setRegisterPhone] = useState('');

    const [selectedProvince, setSelectedProvince] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [district, setDistrict] = useState([]);
    const [selectedWard, setSelectedWard] = useState("");
    const [ward, setWard] = useState([]);
    const dispatch = useDispatch();

    const user = useSelector((state) => state.user);
    console.log('user', user);

    const handleSetUser = (user__) => {
        dispatch(setUser(user__));
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
        setLoginEmail("");
        setLoginPassword("");
        setRegisterEmail("");
        setRegisterUserName("");
        setRegisterPassword("");
        setRegisterConfirmPassword("");
        setRegisterFirstName("");
        setRegisterLastName("");
        setRegisterPhone("");
    }, [login]);

    const handleLoginEmail = useCallback((e) => {
        setLoginEmail(e.target.value);
    }, []);

    const handleLoginPassword = useCallback((e) => {
        setLoginPassword(e.target.value);
    }, []);

    const handleRegisterEmail = useCallback((e) => {
        setRegisterEmail(e.target.value);
    }, []);

    const handleRegisterPassword = useCallback((e) => {
        setRegisterPassword(e.target.value);
    }, []);

    const handleRegisterConfirmPassword = useCallback((e) => {
        setRegisterConfirmPassword(e.target.value);
    }, []);

    const handleRegisterFirstName = useCallback((e) => {
        setRegisterFirstName(e.target.value);
    }, []);

    const handleRegisterLastName = useCallback((e) => {
        setRegisterLastName(e.target.value);
    }, []);

    const handleRegisterPhone = useCallback((e) => {
        setRegisterPhone(e.target.value);
    }, []);

    const handleRegisterUserName = useCallback((e) => {
        setRegisterUserName(e.target.value);
    }, []);

    const handleLoginSubmit = useCallback(async () => {
        if (!loginEmail || !loginPassword) {
            toast.error('Vui lòng nhập đủ thông tin');
            return;
        }

        const params = new URLSearchParams();
        params.append('email', loginEmail);
        params.append('password', loginPassword);

        const res = await AuthServices.login({ params });
        if (res) {
            localStorage.setItem('user', JSON.stringify(res));
            handleSetUser(res);
            toast.success('Đăng nhập thành công');
            setTimeout(() => {
                if (res.role == 'admin') {
                    window.open('/dashboard', '_self');
                } else {
                    window.open('/', '_self');
                }
            }, 4000);
        } else {
            toast.error('Đăng nhập thất bại');
        }
    }, [loginEmail, loginPassword, navigate]);

    const handleLogin = useCallback(() => {
        setLogin(true);
    }, []);

    const handleRegister = useCallback(() => {
        setLogin(false);
    }, []);

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

    useEffect(() => {
        setDistrict(getDistricts(selectedProvince));
    }, [selectedProvince, getDistricts]);

    useEffect(() => {
        setWard(getWards(selectedProvince, selectedDistrict));
    }, [selectedProvince, selectedDistrict, getWards]);

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

    const handleRegisterSubmit = useCallback(async () => {
        if (
            !registerEmail ||
            !registerUserName ||
            !registerPassword ||
            !registerConfirmPassword ||
            !registerFirstName ||
            !registerLastName ||
            !registerPhone ||
            !selectedProvince ||
            !selectedDistrict ||
            !selectedWard
        ) {
            toast.error('Vui lòng nhập đủ thông tin');
            return;
        }

        let usernameError = '';
        let firstNameError = '';
        let lastNameError = '';
        let phoneError = '';
        let passwordError = '';

        if (registerUserName.length < 2) {
            usernameError = 'Username phải có ít nhất 2 kí tự';
            toast.error(usernameError);
            return;
        }
        if (registerFirstName.length > 30) {
            firstNameError = 'Họ không được vượt quá 30 kí tự';
            toast.error(firstNameError);
            return;
        }
        if (registerLastName.length > 30) {
            lastNameError = 'Tên không được vượt quá 30 kí tự';
            toast.error(lastNameError);
            return;

        }
        if (registerPhone.length < 5 || registerPhone.length > 12) {
            phoneError = 'Số điện thoại phải có từ 5 đến 12 kí tự';
            toast.error(phoneError);
            return;
        }
        if (!/[A-Z]/.test(registerPassword) || !/\d/.test(registerPassword) || !/[^A-Za-z0-9]/.test(registerPassword)) {
            passwordError = 'Mật khẩu phải chứa ít nhất 1 kí tự in hoa, 1 số và một kí tự đặc biệt';
            toast.error(passwordError);
            return;
        }


        if (registerPassword.trim() !== registerConfirmPassword.trim()) {
            toast.error('Mật khẩu không khớp');
            return;
        }

        const params = new URLSearchParams();
        params.append('email', registerEmail);
        params.append('username', registerUserName);
        params.append('password', registerPassword);
        const fullname = registerLastName + ' ' + registerFirstName;
        params.append('fullname', fullname);
        params.append('phone', registerPhone);
        params.append('address', formattedValues);

        const res = await AuthServices.register({ params });
        if (res) {
            toast.success('Đăng ký thành công');
            setTimeout(() => {
                setLogin(true);
            }, 3000);
        } else {
            toast.error('Đăng ký thất bại');
        }
    }, [
        registerEmail,
        registerUserName,
        registerPassword,
        registerConfirmPassword,
        registerFirstName,
        registerLastName,
        registerPhone,
        selectedProvince,
        selectedDistrict,
        selectedWard,
        formattedValues
    ]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('auth-container')}>
                <div className={`${cx('main-container')}`}>
                    <div className={`container ${login ? '' : 'right-panel-active'}`} id="container">
                        <div className="form-container sign-up-container">
                            <div className="form">
                                <h1>Tạo tài khoản</h1>

                                <input onChange={handleRegisterUserName} type="text" placeholder="Username" />
                                <div className="full-name">
                                    <input onChange={handleRegisterLastName} type="text" placeholder="Họ" />
                                    <input onChange={handleRegisterFirstName} type="text" placeholder="Tên" />
                                </div>
                                <input onChange={handleRegisterEmail} type="email" placeholder="Email" />
                                <input onChange={handleRegisterPhone} type="text" placeholder="Số điện thoại" />

                                <div className="full-name">
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
                                </div>
                                <input onChange={handleRegisterPassword} type="password" placeholder="Mật khẩu" />
                                <input onChange={handleRegisterConfirmPassword} type="password" placeholder="Nhập lại mật khẩu" />
                                <button onClick={handleRegisterSubmit}>Đăng ký</button>
                            </div>
                        </div>
                        <div className="form-container sign-in-container">
                            <div className="form">
                                <h1>Đăng nhập</h1>

                                <input onChange={handleLoginEmail} value={loginEmail} type="email" placeholder="Email" />
                                <input onChange={handleLoginPassword} value={loginPassword} type="password" placeholder="Mật khẩu" />
                                <button onClick={handleLoginSubmit}>Đăng nhập</button>
                                <a className="forgot-password" href="#">Quên mật khẩu?</a>
                            </div>
                        </div>
                        <div className="overlay-container">
                            <div className="overlay">
                                <div className="overlay-panel overlay-left">
                                    <img className="bg-img" src={leonui} alt="leonui" />
                                    <img className="logo-img" src={logo} alt="logo" />
                                    <h1>Xin chào, Nhà lữ hành!</h1>
                                    <p>Nhập thông tin cá nhân của bạn và bắt đầu cuộc hành trình cùng chúng tôi!</p>
                                    <button className="ghost" id="signIn" onClick={handleLogin}>Đăng nhập</button>
                                </div>
                                <div className="overlay-panel overlay-right">
                                    <img className="bg-img" src={leonui} alt="leonui" />
                                    <img className="logo-img" src={logo} alt="logo" />
                                    <h1>Chào bạn!</h1>
                                    <p>Nhập thông tin cá nhân của bạn và bắt đầu cuộc hành trình cùng chúng tôi!</p>
                                    <button className="ghost" id="signUp" onClick={handleRegister}>Đăng ký</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Auth;
