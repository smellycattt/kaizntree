// src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';
import { resolvePath } from 'react-router-dom';

function Dashboard() {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [itemName, setItemName] = useState('');
  const [itemSku, setItemSku] = useState('');
  const [itemCategory, setItemCategory] = useState('');
  const [itemInStock, setItemInStock] = useState('');
  const [itemAvailableStock, setItemAvailableStock] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [orderBy, setOrderBy] = useState('');


  useEffect(() => {
    fetchItems();
  }, [orderBy]);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('authToken');
      let url = 'http://localhost:8000/api/items/';
      if (orderBy) {
        url += `?ordering=${orderBy}`;
      }
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setItems(response.data);
    } catch (error) {
      setError('Error fetching items');
    }
    setLoading(false);
  };

  // Function to handle the search
const handleSearchChange = async (value) => {
  setSearchTerm(value)
  try {
    const token = localStorage.getItem('authToken');
    const response = await axios.get(`http://localhost:8000/api/items/?search=${searchTerm}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data)
    // Update your state with the search results
    setItems(response.data);
  } catch (error) {
    console.error('Error searching items:', error);
  }
};

  // Implement the search functionality on the client side
  // For server-side search, you'd make a request to the backend with the search term
  const filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
// Function to handle adding a new item
const handleAddItemModal = async () => {
  try {
    const token = localStorage.getItem('authToken');
    const newItemData = {
      name: itemName,
      sku: itemSku,
      category: itemCategory,
      in_stock: itemInStock,
      available_stock: itemAvailableStock,
      // other fields as necessary
    };
    const response = await axios.post('http://localhost:8000/api/items/create/', newItemData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setItems([...items, response.data]);
    // Close modal and clear fields after adding
    setIsModalVisible(false);
    setItemName('');
    setItemSku('');
    setItemCategory('');
    setItemInStock('');
    setItemAvailableStock('');
  } catch (error) {
    console.error('Error adding item:', error);
  }
};

const showModal = () => setIsModalVisible(true);
const hideModal = () => setIsModalVisible(false);
const handleOrderByChange = (e) => {
  setOrderBy(e.target.value); // Update the order by state
};

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="dashboard">
      <h1>Item Dashboard</h1>
      <input 
        type="text" 
        placeholder="Search items..." 
        onChange={(e) => handleSearchChange(e.target.value)}
        className="button-spacing"
      />
      <select onChange={handleOrderByChange} value={orderBy} className="button-spacing">
        <option value="">Select Order</option>
        <option value="name">Name</option>
        <option value="sku">SKU</option>
        <option value="category">Category</option>
        <option value="in_stock">In Stock</option>
        <option value="available_stock">Available Stock</option>
      </select>
      <button onClick={showModal} className="green-button">New Item</button>
      {isModalVisible && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={hideModal}>&times;</span>
            <h2>Add New Item</h2>
            <input type="text" placeholder="Name" value={itemName} onChange={(e) => setItemName(e.target.value)} />
            <input type="text" placeholder="SKU" value={itemSku} onChange={(e) => setItemSku(e.target.value)} />
            <input type="text" placeholder="Category" value={itemCategory} onChange={(e) => setItemCategory(e.target.value)} />
            <input type="text" placeholder="In Stock" value={itemInStock} onChange={(e) => setItemInStock(e.target.value)} />
            <input type="number" placeholder="Available Stock" value={itemAvailableStock} onChange={(e) => setItemAvailableStock(e.target.value)} />
            <button onClick={handleAddItemModal}>Add Item</button>
          </div>
        </div>
      )}
      <div className="table-spacing"></div>
      <table>
        <thead>
          <tr>
            <th>SKU</th>
            <th>Name</th>
            <th>Category</th>
            {/* <th>Tags</th> */}
            <th>In Stock </th>
            <th>Available Stock</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.map(item => (
            <tr key={item.id}>
              <td>{item.sku}</td>
              <td>{item.name}</td>
              <td>{item.category}</td>
              {/* <td>{item.tags.join(', ')}</td> */}
              <td>
                <span className={`status-dot ${item.in_stock < 50 ? 'red-dot' : 'green-dot'}`}></span>
                {item.in_stock}
              </td>
              <td>
                <span className={`status-dot ${item.available_stock < 50 ? 'red-dot' : 'green-dot'}`}></span>
                {item.available_stock}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
