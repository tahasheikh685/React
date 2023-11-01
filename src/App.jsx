import { useState } from 'react'
import productData from './Components/ProductData';

function App() {
  const categories = [new Set(productData.map(item => item.category))];
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showSubcategories, setShowSubcategories] = useState(false);

  const subcategories = productData
    .filter(product => product.category === selectedCategory)
    .map(product => product.productName);

  const handleMouseEnter = (category) => {
    setSelectedCategory(category);
    setShowSubcategories(true);
  };

  const handleMouseLeave = () => {
    setSelectedCategory(null);
    setShowSubcategories(false);
  };

  const filteredProducts = productData.filter(product => {
    return (
      (!selectedCategory || product.category === selectedCategory) &&
      (!selectedProduct || product.productName === selectedProduct)
    );
  });

  return (
    <div className="App">
      <header>
        <nav className="flex justify-between items-center p-4 bg-gray-500 text-white h-9">
          <div className="logo">Your Logo</div>
          <ul className="categories flex space-x-4">
            {categories.map(category => (
              <li
                key={category}
                onMouseEnter={() => handleMouseEnter(category)}
                onMouseLeave={handleMouseLeave}
                className={`cursor-pointer ${selectedCategory === category ? 'bg-blue-500' : ''}`}
              >
                {category}
                {showSubcategories && selectedCategory === category && (
                  <ul className="subcategories space-y-2">
                    {subcategories.map(subcategory => (
                      <li
                        key={subcategory}
                        onClick={() => setSelectedProduct(subcategory)}
                        className="cursor-pointer"
                      >
                        {subcategory}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <main>
        <div className="product-list">
          {filteredProducts.map(product => (
            <div key={product.productName} className="product-card border p-4">
              <img src={product.imageUrl} alt={product.productName} className="max-w-xs mx-auto" />
              <h3
                onClick={() => setSelectedProduct(product.productName)}
                className="cursor-pointer text-xl font-bold mt-2"
              >
                {product.productName}
              </h3>
              <p>Brand: {product.brand}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;