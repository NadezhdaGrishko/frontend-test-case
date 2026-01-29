import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../../store/store';

function CartItem({ item }) {
    const dispatch = useDispatch();

    const handleRemoveItem = useCallback(() => {
        dispatch(removeFromCart(item.id));
    }, [dispatch, item.id]);

    const handleDecrement = useCallback(() => {
        if (item.quantity <= 1) {
            handleRemoveItem();
        } else {
            dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
        }
    }, [dispatch, item.id, item.quantity, handleRemoveItem]);

    const handleIncrement = useCallback(() => {
        dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
    }, [dispatch, item.id, item.quantity]);


    // const handleUpdateQuantity = (id, quantity) => {
    //     if (quantity <= 0) {
    //         handleRemoveItem(id);
    //         return;
    //     }
    //     dispatch(updateQuantity({ id, quantity }));  // ← Теперь используем action creator  1
    // };

    return (
        <div className="cart-item">
            <img src={item.image} alt={item.name} />
            <div className="item-details">
                <h4>{item.name}</h4>
                <p>${item.price}</p>
                <div className="quantity-controls">
                    <button onClick={handleDecrement}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={handleIncrement}>+</button>
                </div>
            </div>
            <button
                className="remove-btn"
                onClick={handleRemoveItem}
            >
                Удалить
            </button>
        </div>
    );
}

export default CartItem;