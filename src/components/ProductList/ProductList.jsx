import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts, setLoading } from '../../store/store';
import { selectProducts, selectProductsLoading } from '../../store/selectors';
import { mockProducts } from '../../data/mockProducts';
import { filterProducts, sortProducts } from '../../utils/filterProducts';
import ProductCard from '../ProductCard/ProductCard';

function ProductList() {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const loading = useSelector(selectProductsLoading);


  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    dispatch(setLoading(true));

    setTimeout(() => {
      dispatch(setProducts(mockProducts));
      dispatch(setLoading(false));
    }, 1000);
  }, [dispatch]);

  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  const handleCategoryChange = useCallback((e) => {
    setSelectedCategory(e.target.value);
  }, []);

  const handleSortChange = useCallback((e) => {
    setSortBy(e.target.value);
  }, []);

  const filteredAndSortedProducts = useMemo(() => {
    const filtered = filterProducts(products, searchTerm, selectedCategory);
    return sortProducts(filtered, sortBy);
  }, [products, searchTerm, selectedCategory, sortBy]);

  if (loading) {
    return <div className="loading">Загрузка товаров...</div>;
  }

  return (
    <div className="product-list">
      <div className="filters">
        <div className="search">
          <input
            type="text"
            placeholder="Поиск товаров..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        <div className="filter-controls">
          <select value={selectedCategory} onChange={handleCategoryChange}>
            <option value="all">Все категории</option>
            <option value="phones">Телефоны</option>
            <option value="laptops">Ноутбуки</option>
            <option value="tablets">Планшеты</option>
          </select>

          <select value={sortBy} onChange={handleSortChange}>
            <option value="name">По названию</option>
            <option value="price">По цене</option>
          </select>

          <button onClick={() => setShowFilters(!showFilters)}>
            {showFilters ? 'Скрыть фильтры' : 'Показать фильтры'}
          </button>
        </div>
      </div>

      <div className="products">
        {filteredAndSortedProducts.map(product => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductList;