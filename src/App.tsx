import React from 'react';
import './app.scss'
import Catalog from './components/catalog/Catalog';
//import './burger.scss'
import Footer from './components/footer/Footer';
import ListItems from './components/listItems/ListItems';
import NavBar from './components/navbar/NavBar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Catalogs from './pages/Catalogs';
import Card from './pages/Card/Card';

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
    <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={<Catalogs />} />
          <Route path='/card/:barcode' element={<Card />} />
        </Routes>
        <Footer />
    </BrowserRouter>
  );
}

export default App;


