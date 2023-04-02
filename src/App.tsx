import React from 'react';
import './app.scss'
import Catalog from './components/catalog/Catalog';
//import './burger.scss'
import Footer from './components/footer/Footer';
import ListItems from './components/listItems/ListItems';
import NavBar from './components/navbar/NavBar';

/*interface ItemsJson {
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
}*/

function App() {
  
  return (
    <div className="App">
      <NavBar />
      <Catalog />
      <Footer />
    </div>
  );
}

export default App;


