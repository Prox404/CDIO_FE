import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {MdAdd} from 'react-icons/md';

import styles from './EditProduct.module.scss';
import classNames from 'classnames/bind';
import * as ProductServices from '~/services/ProductServices';
import error_image from '~/assets/image_erorr.jpg';

const cx = classNames.bind(styles);
function EditProduct() {
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [description, setDescription] = useState('');
    const [images, setImages] = useState([]);
    const [category, setCategory] = useState([]);
    const [discount, setDiscount] = useState(0);
    const [product, setProduct] = useState({});
    const { id } = useParams();

    useEffect(() => {
        const fetchApi = async () => {
            const result = await ProductServices.getProductById(id);
            setProduct(result);
            setName(result.name);
            setPrice(result.price);
            setQuantity(result.quantity);
            setDescription(result.description);
            setImages(result.image);
            setCategory(result.category);
            setDiscount(result.discount);
        };
        fetchApi();
    }, [id]);

    const handleSave = async () => {
        const updatedProduct = {
            ...product,
            name,
            price,
            quantity,
            description,
            image: images,
            category,
            discount,
        };

        console.log(updatedProduct);

        let params = new URLSearchParams();
        params.append('name', name);
        params.append('price', price);
        params.append('quantity', quantity);
        params.append('description', description);
        images.forEach((image, index) => {
            params.append(`image[${index}]`, image);
        });

        category.forEach((cat, index) => {
            params.append(`category[${index}]`, cat);
        });

        params.append('discount', discount);

        // console.log(images);

        let newProduct = await ProductServices.updateProduct(id, params);
        console.log(newProduct);
        if (newProduct) {
            toast.success('Cập nhật sản phẩm thành công');
            setProduct(newProduct);
        } else {
            toast.error('Cập nhật sản phẩm thất bại');
        }
        // onSave(updatedProduct);
    };

    const handleImageAdd = () => {
        setImages([...images, '']);
    };

    const handleImageInputChange = (index, e) => {
        const updatedImages = [...images];
        updatedImages[index] = e.target.value;
        setImages(updatedImages);
    };

    const handleImageDelete = (index) => {
        const updatedImages = [...images];
        updatedImages.splice(index, 1);
        setImages(updatedImages);
    };

    const handleCategoryAdd = () => {
        setCategory([...category, '']);
    };

    const handleCategorySelectChange = (index, e) => {
        const updatedCategory = [...category];
        updatedCategory[index] = e.target.value;
        setCategory(updatedCategory);
    };

    const handleCategoryDelete = (index) => {
        const updatedCategory = [...category];
        updatedCategory.splice(index, 1);
        setCategory(updatedCategory);
    };

    const handleImageError = (e) => {
        e.target.src = error_image;
    };

    return (
        <div className={cx('wrapper')}>
            <h2>Chỉnh sửa sản phẩm</h2>
            <div className={cx('main-container')}>
                <div className={cx('left-container')}>
                    <label className={cx('form-control')}>
                        Tên sản phẩm:
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    </label>
                    <label className={cx('form-control')}>
                        Giá:
                        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
                    </label>
                    <label className={cx('form-control')}>
                        Số lượng:
                        <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                    </label>
                    <label className={cx('form-control')}>
                        Mô tả:
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                    </label>
                </div>
                <div className={cx('right-container')}>
                    
                        Ảnh:
                        <div className={cx('add-image-wrapper')}>
                            {images.map((image, index) => (
                                <div className={cx('add-image-item')} key={index} >
                                <label className={cx('form-control')} >
                                    <img src={image} alt={`Product ${index + 1}`} width="50" height="50" onError={(e) => handleImageError(e)} />
                                    <input
                                        type="text"
                                        value={image}
                                        onChange={(e) => handleImageInputChange(index, e)}
                                    />
                                    <button className={cx('remove-btn')} onClick={() => handleImageDelete(index)}>Xoá</button>
                                </label>
                                </div>
                            ))}
                            <button className={cx('btn-add')} onClick={handleImageAdd}><MdAdd/> <p>Thêm</p></button>
                        </div>
                    
                    <label className={cx('form-control')}>
                        Thể loại:
                        <div className={cx('category-container')}>
                            {category.map((cat, index) => (
                                <div className={cx('category-item')} key={index}>
                                    {/* <input
                                    type="text"
                                    value={cat}
                                    onChange={(e) => handleCategoryInputChange(index, e)}
                                /> */}

                                    <select value={cat} onChange={(e) => handleCategorySelectChange(index, e)}>
                                        <option value="">Chọn thể loại</option>
                                        <option value="Cắm trại, leo núi">Cắm trại, leo núi</option>
                                        <option value="Balo & túi du lịch">Balo & túi du lịch</option>
                                        <option value="Giày dép">Giày dép</option>
                                        <option value="Đồ phượt xe">Đồ phượt xe</option>
                                        <option value="Đồ điện tử công nghệ">Đồ điện tử công nghệ</option>
                                        <option value="Dao và dụng cụ">Dao và dụng cụ</option>
                                    </select>
                                    <button className={cx('remove-btn')} onClick={() => handleCategoryDelete(index)}>Xoá</button>
                                </div>
                            ))}
                            <button className={cx('btn-add')} onClick={handleCategoryAdd}><MdAdd/> <p>Thêm</p> </button>
                        </div>
                    </label>
                    <label className={cx('form-control')}>
                        Giảm giá (từ 0 - 1):
                        <input type="number" value={discount} onChange={(e) => setDiscount(e.target.value)} />
                    </label>
                </div>
            </div>

            <div className={cx('footer-container')}>
            <button className={cx('save-btn')} onClick={handleSave}>Lưu</button>
            </div>
        </div>
    );
}

export default EditProduct;
