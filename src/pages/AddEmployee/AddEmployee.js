import classNames from "classnames/bind";
import { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";

import * as userServices from "~/services/UserServices";
import styles from "./AddEmployee.module.scss";
import data from "./data.json";

let cx = classNames.bind(styles);
function AddEmployee() {
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
    const navigate = useNavigate();

    const handleRegisterEmail = (e) => {
        setRegisterEmail(e.target.value);
    };

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
        console.log(registerEmail )
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
        }else{
            if (registerPassword.trim() != registerConfirmPassword.trim()) {
                toast.error('Mật khẩu không khớp');
                return;
            }
    
            const params = new URLSearchParams();
            params.append('email', registerEmail);
            params.append('username', registerUserName);
            params.append('password', registerPassword);
            const fullname = registerLastName + ' '  + registerFirstName ;
            params.append('fullname', fullname);
            params.append('phone', registerPhone);
            params.append('address', formattedValues);
    
            const res = await userServices.addEmployee(params);
            if (res) {
                toast.success('Thêm nhân viên thành công');
            } else {
                toast.error('Thêm nhân viên thất bại');
            }
            
        }
    }, []);

    return (<>
        <div className={cx('wrapper')}>
            <div className="form">
                <button className="btn-back" onClick={() => navigate(-1)}><BiArrowBack/> Quay lại</button>
                <h1>Thêm nhân viên</h1>

                <input onChange={handleRegisterUserName} type="text" placeholder="Username" />
                <div className={cx("full-name")}>
                    <input onChange={handleRegisterLastName} type="text" placeholder="Họ" />
                    <input onChange={handleRegisterFirstName} type="text" placeholder="Tên" />
                </div>
                <input onChange={handleRegisterEmail} type="email" placeholder="Email" />
                <input onChange={handleRegisterPhone} type="text" placeholder="Số điện thoại" />

                <div className={cx("full-name")}>
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
                <div className={cx('footer')}><button className={cx('add-btn')} onClick={handleRegisterSubmit}>Thêm nhân viên</button></div>
            </div>
        </div>
    </>);
}

export default AddEmployee;