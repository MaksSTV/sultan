import React from 'react';
import './app.scss'
//import './burger.scss'
import Footer from './components/footer/Footer';
import ListItems from './components/listItems/ListItems';
import NavBar from './components/navbar/NavBar';

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
  const body = document.body

  const burger__wrapper = document.querySelector('.burger__wrapper');
  burger__wrapper?.addEventListener('click', function () {
    burger__wrapper?.classList.toggle('active')
    document.querySelector('.navbar-top')?.classList.toggle('open')
  })

  
  return (
    <div className="App">
      <NavBar />
      <Footer />
    </div>
  );
}

export default App;


