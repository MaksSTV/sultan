import React from 'react'
import JSON from '../data/items.json'
import '../app.scss'

const ListItems = () => {
    const items = JSON

 
    return(
        <div className="items">
        {
          items.map(item =>
            <div className='item' key={item.barcode}>
              <img className='item__img' src={item.url} alt="" />
              <div className="item__text">
                <div className="item__size">{item.size}</div>
                <div className="item__title">
                  <b>{item.name}</b>
                  <p>{item.brand}</p>
                </div>
                <div className="item__info">
                  <div className="item__barcode">Штрихкод: {item.barcode}</div>
                  <div className="item__manufacturer">Производитель: {item.manufacturer}</div>
                  <div className="item__brand">Бренд: {item.brand}</div>
                </div>
                <div className="item__price-btn">
                  <div className="price">{item.price}</div>
                  <button className='item__btn'>В КОРЗИНУ</button>
                </div>
              </div>
            </div>
          )
        }
      </div>
    )
}

export default ListItems