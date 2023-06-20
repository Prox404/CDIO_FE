import { useState, useEffect } from 'react';
import * as UserServices from '~/services/UserServices';
import styles from './UserManager.module.scss';
import classNames from 'classnames/bind';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

let cx = classNames.bind(styles);

function UserManager() {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRole, setSelectedRole] = useState('');

    let user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {};

    useEffect(() => {
        const fetchUsers = async () => {
            const result = await UserServices.getAllUserByRole(user?._id);
            if (result) {
                setUsers(result);
                setFilteredUsers(result);
            }
        };
        fetchUsers();
    }, []);

    useEffect(() => {
        const filteredByRole = users.filter((user) => {
            return user.role.toLowerCase().includes(selectedRole.toLowerCase());
        });

        const filteredBySearchTerm = filteredByRole.filter((user) => {
            const { fullname, username, email, phone } = user;
            return (
                fullname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                phone?.toString().includes(searchTerm)
            );
        });

        setFilteredUsers(filteredBySearchTerm);
    }, [users, searchTerm, selectedRole]);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleDeleteUser = async (userId) => {
        if (confirm('Bạn có chắc chắn muốn xoá người dùng này?')) {
            let data = await UserServices.deleteUser(userId);
            if (data) {
                setUsers(users.filter((user) => user._id !== userId));
                toast.success(`Xoá người dùng ${data?.username} thành công`);
            } else {
                toast.error('Xoá người dùng thất bại');
            }
        }
        console.log(`Deleting user with ID: ${userId}`);
    };

    const handleEditUser = (userId) => {
        console.log(`Editing user with ID: ${userId}`);
    };

    return (
        <div className={cx('wrapper')}>
            <h2>Quản lý người dùng</h2>
            <div className={cx('header')}>
                <div className={cx('search-control')}>
                    <input
                        type="text"
                        placeholder="Tìm kiếm theo tên, email, số điện thoại"
                        value={searchTerm}
                        onChange={(e) => handleSearch(e)}
                    />

                    {
                        user?.role == 'admin' && <select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}>
                            <option value="">Tất cả vai trò</option>
                            <option value="user">Người dùng</option>
                            <option value="employee">Nhân viên</option>
                        </select>
                    }

                </div>

                {
                    user?.role == 'admin' && <Link to='/users/add-employee' className={cx('add-btn')}>Thêm nhân viên</Link>
                }

            </div>
            <table className={cx('table')}>
                <thead className={cx('table-header')}>
                    <tr className={cx('table-row')}>
                        <th>Họ tên</th>
                        <th>Tên người dùng</th>
                        <th>Email</th>
                        <th>Số điện thoại</th>
                        <th>Vai trò</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.map((user) => (
                        <tr key={user._id}>
                            <td>{user.fullname}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>{user.role}</td>
                            <td>
                                {user.role && user.role == 'employee' && (
                                    <button className={cx('edit-btn')} onClick={() => handleEditUser(user._id)}>
                                        Edit
                                    </button>

                                )}
                                <button className={cx('delete-btn')} onClick={() => handleDeleteUser(user._id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UserManager;
