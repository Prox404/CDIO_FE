import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as ProductServices from '~/services/ProductServices';
import error_image from '~/assets/image_erorr.jpg';

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

    const handleCategoryInputChange = (index, e) => {
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
        <div>
            <h2>Chỉnh sửa sản phẩm</h2>
            <label>
                Tên sản phẩm:
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <label>
                Giá:
                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
            </label>
            <label>
                Số lượng:
                <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
            </label>
            <label>
                Mô tả:
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
            </label>
            <label>
                Ảnh:
                <div>
                    {images.map((image, index) => (
                        <div key={index}>
                            <input
                                type="text"
                                value={image}
                                onChange={(e) => handleImageInputChange(index, e)}
                            />
                            <img src={image} alt={`Product ${index + 1}`} width="50" height="50" onError={(e) => handleImageError(e)} />
                            <button onClick={() => handleImageDelete(index)}>Xoá</button>
                        </div>
                    ))}
                    <button onClick={handleImageAdd}>Thêm ảnh</button>
                </div>
            </label>
            <label>
                Thể loại:
                <div>
                    {category.map((cat, index) => (
                        <div key={index}>
                            <input
                                type="text"
                                value={cat}
                                onChange={(e) => handleCategoryInputChange(index, e)}
                            />
                            <button onClick={() => handleCategoryDelete(index)}>Xoá</button>
                        </div>
                    ))}
                    <button onClick={handleCategoryAdd}>Thêm thể loại</button>
                </div>
            </label>
            <label>
                Giảm giá:
                <input type="number" value={discount} onChange={(e) => setDiscount(e.target.value)} />
            </label>
            <button onClick={handleSave}>Lưu</button>
        </div>
    );
}

export default EditProduct;
