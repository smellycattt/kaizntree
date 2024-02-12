// src/components/Item.js
import React from 'react';

function Item({ name, sku, in_stock, available_stock }) {
  return (
    <div className="item">
      <div>{sku}</div>
      <div>{name}</div>
      <div>{in_stock}</div>
      <div>{available_stock}</div>
    </div>
  );
}

export default Item;


