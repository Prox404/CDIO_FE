import classNames from "classnames/bind";
import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify'

import * as AuthServices from "~/services/AuthServices";
import styles from "./Auth.module.scss";
import './Auth.css'
import leonui from '~/assets/leonui.png'
import logo from '~/assets/camping_gear.svg'
import data from "./data.json";

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

    console.log('render');

    const handleLoginEmail = useCallback((e) => {
        setLoginEmail(e.target.value);
    }, [])

    const handleLoginPassword = useCallback((e) => {
        setLoginPassword(e.target.value);
    }, [])

    const handleRegisterEmail = useCallback((e) => {
        setRegisterEmail(e.target.value);
    }, [])

    const handleRegisterPassword = useCallback((e) => {
        setRegisterPassword(e.target.value);
    }, [])

    const handleRegisterConfirmPassword = useCallback((e) => {
        setRegisterConfirmPassword(e.target.value);
    }, [])

    const handleRegisterFirstName = useCallback((e) => {
        setRegisterFirstName(e.target.value);
    }, [])

    const handleRegisterLastName = useCallback((e) => {
        setRegisterLastName(e.target.value);
    }, [])

    const handleRegisterPhone = useCallback((e) => {
        setRegisterPhone(e.target.value);
    }, [])

    const handleRegisterUserName = useCallback((e) => {
        setRegisterUserName(e.target.value);
    }, [])


    const handleLoginSubmit = useCallback(async () => {
        const params = new URLSearchParams();
        params.append('email', loginEmail);
        params.append('password', loginPassword);
        const res = await AuthServices.login({ params });
        if (res) {
            localStorage.setItem('user', JSON.stringify(res));
            toast.success('Login success');
            setTimeout(() => {
                navigate('/');
            }, 3000);
        } else {
            toast.error('Login failed');
            return;
        }
    }, [loginEmail, loginPassword])

    const handleLogin = useCallback(() => {
        setLogin(true);
    }, [])

    const handleRegister = useCallback(() => {
        setLogin(false);
    }, [])

    const provinces = data.map((province) => ({
        name: province.name,
        code: province.code
    }));

    const getDistricts = (provinceCode) => {
        const selectedProvince = data.find((p) => p.code == provinceCode);
        return selectedProvince ? selectedProvince.districts : [];
    };

    const getWards = (provinceCode, districtCode) => {
        const selectedProvince = data.find((p) => p.code == provinceCode);
        const selectedDistrict = selectedProvince?.districts.find(
            (d) => d.code == districtCode
        );
        return selectedDistrict ? selectedDistrict.wards : [];
    };

    const handleProvinceChange = (e) => {
        const provinceCode = e.target.value;
        setSelectedProvince(provinceCode);
        setSelectedDistrict("");
        setSelectedWard("");
        setDistrict(getDistricts(provinceCode));
    };

    const handleDistrictChange = (e) => {
        const districtCode = e.target.value;
        setSelectedDistrict(districtCode);
        setSelectedWard("");
        setWard(getWards(selectedProvince, districtCode));
    };

    const handleWardChange = (e) => {
        setSelectedWard(e.target.value);
    };

    const getFullName = (code, list) => {
        const selectedItem = list.find((item) => item.code == code);
        return selectedItem ? selectedItem.name : "";
    };

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
        const params = new URLSearchParams();

        if (registerPassword.trim() !== registerConfirmPassword.trim()) {
            
            toast.error('Password not match');
            console.log(registerPassword, registerConfirmPassword);
            return;
        } else {
            params.append('email', registerEmail);
            params.append('username', registerUserName);
            params.append('password', registerPassword);
            const fullname = registerFirstName + ' ' + registerLastName;
            params.append('fullname', fullname);
            params.append('phone', registerPhone);
            params.append('address', formattedValues);
            const res = await AuthServices.register({ params });
            if (res) {
                toast.success('Register success');
                setTimeout(() => {
                    setLogin(true);
                }, 3000);
            } else {
                toast.error('Register failed');
                return;
            }
        }

    }, [registerEmail, registerUserName, registerPassword, registerConfirmPassword, registerFirstName, registerLastName, registerPhone, selectedProvince, selectedDistrict, selectedWard])


    return (<div className={cx('wrapper')}>
        <div className={cx('auth-container')}>
            <div className={`${cx('main-container')}`}>
                <div>
                    <div className={`container ${login ? '' : 'right-panel-active'}`} id="container">
                        <div className="form-container sign-up-container">
                            <div className="form">
                                <h1>Tạo tài khoản</h1>

                                <input onChange={(e) => handleRegisterUserName(e)} type="text" placeholder="Username" />
                                <div className="full-name">
                                    <input onChange={(e)=> handleRegisterLastName(e)} type="text" placeholder="Họ" />
                                    <input onChange={(e)=> handleRegisterFirstName(e)} type="text" placeholder="Tên" />
                                </div>
                                <input onChange={(e)=> handleRegisterEmail(e)}type="email" placeholder="Email" />
                                <input onChange={(e)=> handleRegisterPhone(e)}type="text" placeholder="Số điện thoại" />

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
                                <input onChange={(e) => handleRegisterPassword(e)} type="password" placeholder="Mật khẩu" />
                                <input onChange={(e) => handleRegisterConfirmPassword(e)} type="password" placeholder="Nhập lại mật khẩu" />
                                <button onClick={handleRegisterSubmit}>Đăng ký</button>
                            </div>
                        </div>
                        <div className="form-container sign-in-container">
                            <div className="form">
                                <h1>Đăng nhập</h1>

                                <input onChange={(e) => handleLoginEmail(e)} value={loginEmail} type="email" placeholder="Email" />
                                <input onChange={(e) => handleLoginPassword(e)} value={loginPassword} type="password" placeholder="Mật khẩu" />
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
                                    <p>Nhập thông tin cá nhân của bạn và bắt đầu cuộc hành trình cùng chúng tôi !</p>
                                    <button className="ghost" onClick={handleLogin} id="signIn">Đăng nhập</button>
                                </div>
                                <div className="overlay-panel overlay-right">
                                    <img className="bg-img" src={leonui} alt="leonui" />
                                    <img className="logo-img" src={logo} alt="logo" />
                                    <h1>
                                        Chào mừng trở lại!</h1>
                                    <p>Để kết nối với chúng tôi, vui lòng đăng nhập bằng thông tin cá nhân của bạn !</p>
                                    <button className="ghost" onClick={handleRegister} id="signUp">Đăng ký</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>);
}

export default Auth;