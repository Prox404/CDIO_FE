import { useState, useEffect } from 'react';
import * as ProductServices from '~/services/ProductServices';
import classNames from "classnames/bind";
import styles from './ProductManager.module.scss';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

function ProductManager() {

    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        // Lấy dữ liệu sản phẩm từ API hoặc sử dụng dữ liệu mẫu bạn đã cung cấp
        const fetchData = async () => {
            // Thực hiện lấy dữ liệu sản phẩm từ API hoặc sử dụng dữ liệu mẫu
            const data = await ProductServices.getAllProducts(); // Thay yourFetchFunction bằng hàm lấy dữ liệu từ API của bạn hoặc sử dụng dữ liệu mẫu
            setProducts(data);
            setFilteredProducts(data);
        };

        fetchData();
    }, []);

    useEffect(() => {
        // Tìm kiếm sản phẩm dựa trên từ khóa tìm kiếm
        const searchProducts = () => {
            const filtered = products.filter((product) =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredProducts(filtered);
        };

        searchProducts();
    }, [searchTerm, products]);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    // const handleEdit = (productId) => {
    //     // Xử lý chức năng chỉnh sửa sản phẩm
    // };

    const handleDelete = async (productId) => {
        // Xử lý chức năng xoá sản phẩm
        if (confirm('Bạn có chắc chắn muốn xoá sản phẩm này?')) {
            let data = await ProductServices.deleteProduct(productId);
            console.log(data);
            if (data) {
                setProducts(products.filter((product) => product._id !== productId));
                toast.success(`Xoá sản phẩm ${data?.name} thành công`);
            } else {
                toast.error('Xoá sản phẩm thất bại');
            }
        }
    };

    return (<>
        <div className={cx('wrapper')}>
            <h2>Quản lý sản phẩm</h2>
            <div className={cx('search-control')}>
                <input type="text" placeholder="Tìm kiếm theo tên" value={searchTerm} onChange={handleSearch} />
                <Link to='/products/add-product' className={cx('add-btn')}>Thêm sản phẩm</Link>
            </div>
            <table className={cx('table')}>
                <thead>
                    <tr>
                        <th>Hình ảnh</th>
                        <th>Tên sản phẩm</th>
                        <th>Đã bán/SL</th>
                        <th>Thể loại</th>
                        <th>Giảm giá</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {filteredProducts.map((product) => (
                        <tr key={product._id}>
                            <td>
                                <img src={product.image[0]} alt={product.name} width="50" height="50" />
                            </td>
                            <td>{product.name}</td>
                            <td>{`${product.sold}/${product.quantity}`}</td>
                            <td>{product.category.join(', ')}</td>
                            <td>{product.discount}</td>
                            <td>
                                <Link to={`/products/edit/${product._id}`} className={cx('edit-btn')}>Chỉnh sửa</Link>
                                <button className={cx('delete-btn')} onClick={() => handleDelete(product._id)}>Xoá</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </>);
}

export default ProductManager;