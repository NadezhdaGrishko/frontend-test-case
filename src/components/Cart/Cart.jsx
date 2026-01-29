import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../../store/store';
import { selectCartItems, selectCartCount, selectTotalPrice } from '../../store/selectors';
import CartItem from './CartItem';

function Cart() {
    const dispatch = useDispatch();
    const cart = useSelector(selectCartItems);
    const cartCount = useSelector(selectCartCount);
    const totalPrice = useSelector(selectTotalPrice);

    const [isOpen, setIsOpen] = useState(false);
    const [showCheckout, setShowCheckout] = useState(false);

    const toggleCart = useCallback(() => {
        setIsOpen(prev => !prev);
    }, []);

    const handleCheckout = useCallback(() => {
        setShowCheckout(true);
        setTimeout(() => {
            alert('Заказ оформлен!');
            dispatch(clearCart());
            setShowCheckout(false);
            setIsOpen(false);
        }, 1000);
    }, [dispatch]);

    const closeCart = useCallback(() => {
        setIsOpen(false);
    }, []);

    return (
        <div className="cart">
            <button
                className="cart-toggle"
                onClick={toggleCart}
            >
                Корзина ({cartCount})
            </button>

            {isOpen && (
                <div className="cart-dropdown">
                    <div className="cart-header">
                        <h3>Корзина</h3>
                        <button onClick={closeCart}>×</button>
                    </div>

                    <div className="cart-items">
                        {cart.length === 0 ? (
                            <p>Корзина пуста</p>
                        ) : (
                            cart.map(item => (
                                <CartItem
                                    key={item.id}
                                    item={item}
                                />
                            ))
                        )}
                    </div>

                    <div className="cart-footer">
                        <div className="total">Итого: ${totalPrice}</div>
                        <button
                            className="checkout-btn"
                            onClick={handleCheckout}
                            disabled={cart.length === 0 || showCheckout}
                        >
                            {showCheckout ? 'Оформляем...' : 'Оформить заказ'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Cart;