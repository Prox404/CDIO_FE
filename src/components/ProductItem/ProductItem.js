// import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

import styles from "./ProductItem.module.scss";

let cx = classNames.bind(styles);

function ProductItem({ product }) {
    const { _id,name, price, image } = product;

    

    return (<>
        <Link className={cx('product-item')} to={`/products/${_id && _id}`}>
            <div className={cx('product-item-image')}>
                <Carousel 
                showThumbs={false} 
                autoPlay={true} 
                infiniteLoop={true} 
                stopOnHover={true}
                showIndicators={false}
                showStatus={false}
                showArrows={false}
                >
                {
                    image && image.map((item, index) => {
                        return <div key={index}><img src={item} className={cx('product-image')} alt='product' /></div>
                    })
                }
                </Carousel>
                
            </div>
            <div className={cx('product-item-name')}>{name}</div>
            <div className={cx('product-item-price')}>{price}</div>
        </Link>
    </>);
}

export default ProductItem;