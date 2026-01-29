import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/store';

function ProductCard({ product }) {
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        dispatch(addToCart(product));
    };

    return (
        <div className="product-card">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <div className="price">${product.price}</div>
            <button onClick={handleAddToCart}>
                Добавить в корзину
            </button>
        </div>
    );
}

export default ProductCard;