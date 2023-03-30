import React from 'react';
import './app.scss'
import ListItems from './components/ListItems';

interface ItemsJson {
  id: number,
  url: string,
  name: string,
  type_size: string,
  size: string,
  barcode: number,
  manufacturer: string,
  brand: string,
  description: string,
  price: number
}

function App() {

  const items = JSON

  console.log(items)

  return (
    <div className="App">
    </div>
  );
}

export default App;


