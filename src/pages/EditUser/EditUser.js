import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';

import styles from './EditUser.module.scss';
import * as UserServices from '~/services/UserServices';

let cx = classNames.bind(styles);

function EditUser() {
    const { id } = useParams();
    const [user, setUser] = useState({});
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = await UserServices.getUser(id);
                setUser(user);
                setUsername(user.username);
                setFirstName(user.fullname.split(' ')[0]);
                setLastName(user.fullname.split(' ')[1]);
                setEmail(user.email);
                setPhone(user.phone);
                setAddress(user.address);
            } catch (error) {
                console.log(error);
            }
        };
        fetchUser();
    }, [id]);

    const handleUpdateUser = async (event) => {
        event.preventDefault();
        const params = new URLSearchParams();
        params.append('username', username);
        params.append('fullname', `${firstName} ${lastName}`);
        params.append('email', email);
        params.append('phone', phone);
        params.append('address', address);


        try {
            const result = await UserServices.updateUser(id, params);
            toast.success(`Cập nhật thông tin người dùng ${result.username} thành công`);
        } catch (error) {
            toast.error('Cập nhật thông tin người dùng thất bại');
            console.log(error);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <button className='btn-back' onClick={() => navigate(-1)}>
                Quay lại
            </button>

            <h2>Cập nhật thông tin người dùng</h2>
            <form onSubmit={handleUpdateUser}>
                <div>
                    <label>Username:</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div>
                    <label>First Name:</label>
                    <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </div>
                <div>
                    <label>Last Name:</label>
                    <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label>Phone:</label>
                    <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
                <div>
                    <label>Address:</label>
                    <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
                </div>
                <div className={cx('footer')}>
                    <button className={cx('btn-submit')} type="submit">Cập nhật</button>

                </div>
            </form>
        </div>
    );
}

export default EditUser;
