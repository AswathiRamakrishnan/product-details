import React, { useState, useEffect, useRef } from 'react';
import { FaHeart, FaAngleDoubleDown, FaAngleDoubleUp, FaDotCircle, FaCarrot, FaCartPlus } from 'react-icons/fa';
import { IoCart } from 'react-icons/io5';

// Function to categorize products
const getCategory = (productName) => {
  if (['Spinach', 'Lettuce'].includes(productName)) return 'Leafy';
  if (['Carrot', 'Potato', 'Beetroot'].includes(productName)) return 'Root';
  if (['Cauliflower', 'Broccoli'].includes(productName)) return 'Flower';
  if (['Celery', 'Asparagus'].includes(productName)) return 'Stem';
  return 'Other';
};

// Array of vegetable product names
const productNames = [
  'Onion', 'Bitter gourd', 'Ladyfinger', 'Potato', 'Cabbage', 'Cauliflower', 'Carrot',
  'Cucumber', 'Pumpkin', 'Taro root', 'Red chili', 'Coriander leaves', 'Beetroot', 'Capsicum',
  'Spinach', 'Lettuce', 'Broccoli', 'Celery', 'Asparagus'
];

// Function to determine the correct image extension
const getImageUrl = (index) => {
  const jpegImages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
  const extension = jpegImages.includes(index) ? 'jpeg' : 'jpg';
  return `/picture/product${index}.${extension}`;
};

// Define your product details dynamically
const initialProducts = Array.from({ length: productNames.length }, (_, i) => ({
  id: i + 1,
  name: productNames[i],
  price: (Math.floor(Math.random() * 14) + 1) * 100,
  image: getImageUrl(i + 1),
  offer: '60% Off',
  category: getCategory(productNames[i]),
}));

const styles = {
  app: {
    backgroundColor: 'white',
    fontFamily: 'Arial, sans-serif',
    margin: '20px',
  },
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px',
    backgroundColor: 'green',
    color: 'white',
  },
  navButton: {
    backgroundColor: 'white',
    color: 'black',
    border: 'none',
    padding: '10px 20px',
    cursor: 'pointer',
    borderRadius: '5px',
    marginLeft: '10px',
  },
  section: {
    marginBottom: '20px',
  },
  productGrid: {
    padding: '30px',
    borderRadius: '20px',
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '20px',
  },
  item: {
    border: '1px solid #ddd',
    padding: '10px',
    boxSizing: 'border-box',
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    gap: '10px',
  },
  button: {
    backgroundColor: 'green',
    color: 'white',
    border: 'none',
    padding: '5px 10px',
    cursor: 'pointer',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
  },
  buyNowButton: {
    backgroundColor: 'blue',
    color: 'white',
    border: 'none',
    padding: '5px 10px',
    cursor: 'pointer',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
  },
  filterContainer: {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    top: '40px',
    left: 0,
    backgroundColor: 'white',
    color: 'black',
    boxShadow: '0px 0px 10px rgba(0,0,0,0.1)',
    zIndex: 1,
  },
  filterMenuButton: {
    backgroundColor: 'white',
    color: 'black',
    border: 'none',
    padding: '10px',
    cursor: 'pointer',
    borderRadius: '5px',
    width: '150px',
    textAlign: 'center',
  },
  sortMenu: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    position: 'absolute',
    top: '40px',
    right: 0,
    backgroundColor: 'white',
    color: 'black',
    boxShadow: '0px 0px 10px rgba(0,0,0,0.1)',
    zIndex: 1,
  },
  sortMenuButton: {
    backgroundColor: 'white',
    color: 'black',
    border: 'none',
    padding: '10px',
    cursor: 'pointer',
    borderRadius: '5px',
    width: '150px',
    textAlign: 'center',
  },
  scrollButton: {
    position: 'fixed',
    backgroundColor: '',
    color: 'black',
    border: 'none',
    padding: '5px',
    borderRadius: '100%',
    cursor: 'pointer',
    fontSize: '18px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  scrollButtonUp: {
    bottom: '80px',
    right: '20px',
  },
  scrollButtonDown: {
    bottom: '20px',
    right: '20px',
  },
  offerIcon: {
    position: 'absolute',
    top: '10px',
    left: '10px',
    backgroundColor: 'red',
    color: 'white',
    padding: '5px',
    borderRadius: '5px',
    fontSize: '12px',
  },
};

function VegProductDetails() {
  const [products] = useState(initialProducts);
  const [filteredProducts, setFilteredProducts] = useState(initialProducts);
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const [sortMenuOpen, setSortMenuOpen] = useState(false);
  const [showScrollButtons, setShowScrollButtons] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSort, setSelectedSort] = useState(null);
  const filterMenuRef = useRef(null);
  const sortMenuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButtons(true);
    };

    const handleClickOutside = (event) => {
      if (filterMenuRef.current && !filterMenuRef.current.contains(event.target)) {
        setFilterMenuOpen(false);
      }
      if (sortMenuRef.current && !sortMenuRef.current.contains(event.target)) {
        setSortMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(product => product.category === selectedCategory));
    }
  }, [selectedCategory, products]);

  const sortProducts = (order) => {
    const sortedProducts = [...filteredProducts].sort((a, b) => order === 'lowToHigh' ? a.price - b.price : b.price - a.price);
    setFilteredProducts(sortedProducts);
    setSelectedSort(order);
  };

  const sortByArrival = () => {
    const recentlyArrived = initialProducts.slice(-10);
    setFilteredProducts(recentlyArrived);
    setSelectedSort('recent');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToBottom = () => {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
  };

  return (
    <div style={styles.app}>
      <nav style={styles.navbar}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <FaCarrot style={{ marginRight: '10px' }} />
          <span>Vegetables</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
            <button style={styles.navButton} onClick={() => setFilterMenuOpen(!filterMenuOpen)}>Filter</button>
            {filterMenuOpen && (
              <div ref={filterMenuRef} style={styles.filterContainer}>
                <button style={styles.filterMenuButton} onClick={() => setSelectedCategory('All')}>All Products</button>
                <button style={styles.filterMenuButton} onClick={() => setSelectedCategory('Leafy')}>Leafy</button>
                <button style={styles.filterMenuButton} onClick={() => setSelectedCategory('Root')}>Root</button>
                <button style={styles.filterMenuButton} onClick={() => setSelectedCategory('Flower')}>Flower</button>
                <button style={styles.filterMenuButton} onClick={() => setSelectedCategory('Stem')}>Stem</button>
              </div>
            )}
          </div>
          <div style={{ position: 'relative', marginLeft: '10px' }}>
            <button style={styles.navButton} onClick={() => setSortMenuOpen(!sortMenuOpen)}>Sort</button>
            {sortMenuOpen && (
              <div ref={sortMenuRef} style={styles.sortMenu}>
                <button style={styles.sortMenuButton} onClick={() => sortProducts('lowToHigh')}>
                  {selectedSort === 'lowToHigh' && <FaDotCircle style={{ marginRight: '5px' }} />} Price: Low to High
                </button>
                <button style={styles.sortMenuButton} onClick={() => sortProducts('highToLow')}>
                  {selectedSort === 'highToLow' && <FaDotCircle style={{ marginRight: '5px' }} />} Price: High to Low
                </button>
                <button style={styles.sortMenuButton} onClick={sortByArrival}>
                  {selectedSort === 'recent' && <FaDotCircle style={{ marginRight: '5px' }} />} Recently Added
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
      <div style={styles.productGrid}>
        {filteredProducts.map((product, index) => (
          <div key={product.id} style={styles.item}>
            <img
              src={product.image}
              alt={product.name}
              style={{ width: index === 0 ? '80%' : '60%', borderRadius: '10px' }}
            />
            <div>{product.name}</div>
            <div>₹{product.price}</div>
            <div style={styles.offerIcon}>{product.offer}</div>
            <div style={styles.buttonContainer}>
              <button style={styles.button}>
                <IoCart style={{ marginRight: '5px' }} /> Add to Cart
              </button>
              <button style={styles.buyNowButton}>
                <FaCartPlus style={{ marginRight: '5px' }} /> Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>
      {showScrollButtons && (
        <>
          <button style={{ ...styles.scrollButton, ...styles.scrollButtonUp }} onClick={scrollToTop}>
            <FaAngleDoubleUp />
          </button>
          <button style={{ ...styles.scrollButton, ...styles.scrollButtonDown }} onClick={scrollToBottom}>
            <FaAngleDoubleDown />
          </button>
        </>
      )}
    </div>
  );
}

export default VegProductDetails;
