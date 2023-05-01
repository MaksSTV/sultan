import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCurrentItem } from "../../components/action/getItem";
import { ItemsJson } from "../../data/ItemJson";
import NavBar from "../../components/navbar/NavBar";
import Footer from "../../components/footer/Footer";
import '../Card/card.scss'


function Card() {
  const navigate = useNavigate()

  const { barcode } = useParams()
  const [item, setItem] = useState<ItemsJson>({
    "id": 0,
    "url": "0",
    "name": "0",
    "name_desc": "0",
    "type_size": "0",
    "size": "0",
    "barcode": 0,
    "manufacturer": "0",
    "brand": "0",
    "description": "0",
    "price": 0,
    "bodyCare": false,
    "handCare": false,
    "faceCare": false
  })

  useEffect(() => {
    window.scrollTo(0, 0)
    console.log(item)
    getCurrentItem(Number(barcode), setItem)
    console.log(item)
  }, [])

  /**<button onClick={() => navigate(-1)} className="back-btn">
          BACK
      </button> */


  return (
    <div className="card">
      <div className="container">
        <button onClick={() => navigate(-1)} className="back-btn">
          BACK
        </button>
        <div className="card__wrapper">
          <div>hlebnye kroshki</div>
          <div className="card__content">
            <div className="card__image-wrapper">
              <img className='card__image' src={item.url} alt="" />
            </div>

            <div className="card__content-text">
              <div className="card__isAvailable">В наличии</div>
              <div className="card__title"><b>{item.name}</b> {item.name_desc}</div>
              <div className="card__size">{item.size}</div>
              <div className="card__grid-price-btns">
                <div className="card__grid-price">{item.price} ₸</div>
              </div>
              <div className="card__miniDesc">
                <ul className="miniDesc__list">
                  <li className="miniDesc__item">Производитель: <b>{item.manufacturer}</b></li>
                  <li className="miniDesc__item">Бренд: <b>{item.brand}</b></li>
                  <li className="miniDesc__item">Артикул: </li>
                  <li className="miniDesc__item">Штрихкод: <b>{item.barcode}</b></li>
                </ul>
              </div>
              <div className="card__description-slider">Описание</div>
              <div className="card__dashed-line"></div>
              <div className="card__specifications-slider">Характеристики</div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Card;