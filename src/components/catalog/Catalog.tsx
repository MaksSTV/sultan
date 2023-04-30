import { ChangeEvent, useEffect, useState } from 'react'
import { mobileFilters } from '../../utils/mobile-filters'
import json from '../../data/items.json'
import './catalog.scss'
import '../listItems/listitems.scss'
import { ItemsJson } from '../../data/ItemJson'

/*interface ItemsJson {
    id: number,
    url: string,
    name: string,
    name_desc: string,
    type_size: string,
    size: string,
    barcode: number,
    manufacturer: string,
    brand: string,
    description: string,
    price: number,
    bodyCare: boolean,
    handCare: boolean,
    faceCare: boolean
}*/

function getAmountPage(items: ItemsJson[], limit: number): number[] {
    let length = Math.ceil(items.length / limit);
    const pages: number[] = [];
    for (let i = 1; i <= length; i++) {
        pages.push(i);
    }
    return pages
}

const Catalog = () => {

    const jsonData: ItemsJson[] = json;


    mobileFilters()

    const [lowerPriceLimit, setLowerPriceLimit] = useState('0')
    const [upperPriceLimit, setUpperPriceLimit] = useState('100000')
    const [items, setItems] = useState<ItemsJson[]>(json)
    const [currPage, setCurrPage] = useState(1)
    const [selectedSort, setSelectedSort] = useState('default')
    const [countPages, setCountPages] = useState(getAmountPage(jsonData, 8))

    /*useEffect(() => {
        pages = getAmountPage(jsonData, 8)
    }, [])*/


    useEffect(() => {
        setItems(sortedItems())
    }, [currPage, selectedSort, lowerPriceLimit, upperPriceLimit])



    function sortedItems(): ItemsJson[] {
        const sorted: ItemsJson[] = jsonData;
        filterBySelectSort(sorted)
        let val = filterBySelectedFilters(sorted)
        setCountPages(getAmountPage(val, 8))
        console.log(countPages)
        return val.filter((value, index) => (index + 1 > (currPage - 1) * 8) && (index + 1 <= currPage * 8))
    }

    function handleSetCurrPage(page: number) {
        window.scrollTo(0, 200);
        setCurrPage(page)
    }
    function selectSort(event: ChangeEvent<HTMLSelectElement>) {
        setSelectedSort(event.target.value)
    }

    function filterBySelectSort(data: ItemsJson[]): ItemsJson[] {
        if (selectedSort === 'nameASC') {
            //const sort = data.sort((a,b) => a.name.localeCompare(b.name))
            return data.sort((a, b) => a.name.localeCompare(b.name))
        }
        else if (selectedSort === 'nameDESC') {
            //const sort = data.sort((a,b) => a.name.localeCompare(b.name)).reverse()
            return data.sort((a, b) => a.name.localeCompare(b.name)).reverse()
        }
        else if (selectedSort === 'priceASC') {
            return data.sort((a, b) => a.price - b.price)
        }
        else if (selectedSort === 'priceDESC') {
            return data.sort((a, b) => a.price - b.price).reverse()
        }
        else {
            //const sort = data.sort((a,b) => a.id - b.id)
            return data.sort((a, b) => a.id - b.id)
        }

    }

    function filterBySelectedFilters(data: ItemsJson[]): ItemsJson[] {
        let sortData = data.filter(value => (value.price >= Number(lowerPriceLimit) && value.price <= Number(upperPriceLimit)))
        return sortData
    }

    function handleSetUpperPriceLimit(event: ChangeEvent<HTMLInputElement>){
        /*if(Number(event.target.value) < Number(lowerPriceLimit)){
            setUpperPriceLimit(lowerPriceLimit)
        }*/
        //else{
            setUpperPriceLimit(event.target.value)
        //}
    }

    function handleSetLowerPriceLimit(event: ChangeEvent<HTMLInputElement>){
        if(Number(event.target.value) < 0){
            setUpperPriceLimit('0')
        }
        else{
            setLowerPriceLimit(event.target.value)
        }
    }


    /*
        const setFilters = (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
        
            console.log(event.target.);
          };*/



    function resetFilters(){
        setLowerPriceLimit('0')
        setUpperPriceLimit('100000')
    }

    return (
        <div className='catalog-items'>
            <div className="container">
                <div className="header__catalog">
                    <ul className="crumbs">
                        <li className="crumbs_item">Главная</li>
                        <li className="crumbs_item">Косметика и гигиена</li>
                    </ul>
                    <div className="catalog-items__title-and-sort">
                        <div className="catalog-items__title">КОСМЕТИКА И ГИГИЕНА</div>
                        <div className="catalog-items__sort">
                            <div className="catalog-items__sort-text">Сортировка:</div>
                            <select
                                onChange={selectSort}
                                className="catalog-items__sort-select"
                            >
                                <option value='default'>По умолчанию</option>
                                <option value='nameASC'>Названия по возрастанию</option>
                                <option value='nameDESC'>Названия по убыванию</option>
                                <option value='priceASC'>Цена по возрастанию</option>
                                <option value='priceDESC'>Цена по убыванию</option>
                            </select>
                        </div>
                    </div>
                    <div className="careOf">
                        <div className="careOfBody">Уход<br /> за телом</div>
                        <div className="careOfHand">Уход <br /> за руками</div>
                        <div className="careOfFace">Уход<br />  за лицом</div>
                    </div>
                </div>
                <div className="content__catalog">
                    <div className="filters">
                        <form className="filters-form">
                            {/*onSubmit={console.log('click')/*setFilters}*/}
                            <div className="filters__title">
                                <div className="filters__title-text">ПОДБОР ПО ПАРАМЕТРАМ</div>
                                <div className="filters__spoiler--mobile">
                                    <span></span>
                                </div>
                            </div>
                            <div className="hide">
                                <div className="filters__price">
                                    <div className="filters__price-title">Цена <b>₸</b></div>

                                    <div className="filters__price-inputs">
                                        <input
                                            type="number"
                                            className="filters__price-input"
                                            value={lowerPriceLimit}
                                            onChange={handleSetLowerPriceLimit}
                                        />
                                        -
                                        <input
                                            type="number"
                                            className="filters__price-input"
                                            value={upperPriceLimit}
                                            onChange={handleSetUpperPriceLimit}
                                        />
                                    </div>
                                </div>
                                <div className="filters__manufacturer">
                                    <div className="filters__manufacturer-title">Производитель</div>
                                    <div className="filters__manufacturer-block-input">
                                        <div className="filters__manufacturer-block">
                                            <input type="text" className="filters__manufacturer-input" placeholder='Поиск...' />
                                            <div className="manufacturer__svg">
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M15.5294 15.5294L12.0989 12.0928L15.5294 15.5294ZM14 7.5C14 9.22391 13.3152 10.8772 12.0962 12.0962C10.8772 13.3152 9.22391 14 7.5 14C5.77609 14 4.12279 13.3152 2.90381 12.0962C1.68482 10.8772 1 9.22391 1 7.5C1 5.77609 1.68482 4.12279 2.90381 2.90381C4.12279 1.68482 5.77609 1 7.5 1C9.22391 1 10.8772 1.68482 12.0962 2.90381C13.3152 4.12279 14 5.77609 14 7.5V7.5Z" stroke="white" strokeWidth="1.3" strokeLinecap="round" />
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="filters__manufacturer-checkbox-lists">
                                            {
                                                items.map((val, index, arr) =>
                                                    <div className="checkbox">
                                                        <label className='checkboxText'>{val.manufacturer}</label>
                                                        <input value={val.manufacturer} type="checkbox" />
                                                    </div>
                                                )
                                            }


                                            <div className="seeAll">
                                                <div className="seeAllText">Показать все</div>
                                            </div>
                                        </div>
                                        <div className="filters__manufacturer-submit">
                                            <button
                                                type='submit'
                                                className='filters__manufacturer-button'

                                            >Показать</button>
                                            <input type="reset" value="" className='filters__manufacturer-reset' onClick={resetFilters}></input>
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </form>
                        <div className="careOfAside">
                            <div className="careOfBodyAside">Уход за телом</div>
                            <div className="careOfHandAside">Уход за руками</div>
                            <div className="careOfFaceAside">Уход за лицом</div>
                        </div>
                        <div className="catalog-items__sort--mobile">
                            <div className="catalog-items__sort-text">Сортировка:</div>
                            <select className="catalog-items__sort-select">
                                <option>По умолчанию</option>
                                <option>Названия по возрастанию</option>
                                <option>Названия по убыванию</option>
                                <option>Цена по возрастанию</option>
                                <option>Цена по убыванию</option>
                            </select>
                        </div>
                    </div>

                    <div className="items__catalog">
                        {items.length === 0 ?
                            <div>Ничего не найдено</div>
                            : <div>
                                <div className="items">
                                    {
                                        items.map(item =>
                                            <div className='item' key={item.barcode}>
                                                <img className='item__img' src={item.url} alt="" />
                                                <div className="item__text">
                                                    <div className="item__size">{item.size}</div>
                                                    <div className="item__title">
                                                        <b>{item.name}</b> {item.name_desc}
                                                    </div>
                                                    <div className="item__info">
                                                        <div className="item__barcode">Штрихкод: <b>{item.barcode}</b></div>
                                                        <div className="item__manufacturer">Производитель: <b>{item.manufacturer}</b></div>
                                                        <div className="item__brand">Бренд: <b>{item.brand}</b></div>
                                                    </div>
                                                    <div className="item__price-btn">
                                                        <div className="item__price">{item.price} ₸</div>
                                                        <button className='item__btn'>
                                                            <div className="item__btn-text">В КОРЗИНУ</div>
                                                            <div className="item__btn-svg"><svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M24.448 8.09209C24.2955 7.87908 24.0909 7.77258 23.8341 7.77258H7.48756L7.0439 6.61757C6.93156 6.23889 6.77908 5.91543 6.58649 5.6472C6.39389 5.37897 6.18926 5.18963 5.97259 5.07918C5.75592 4.96873 5.56734 4.89378 5.40684 4.85434C5.24635 4.81489 5.08585 4.79517 4.92536 4.79517H1.62717C1.41852 4.79517 1.24198 4.86617 1.09753 5.00817C0.953083 5.15018 0.880859 5.33163 0.880859 5.55253C0.880859 5.67876 0.912959 5.80104 0.977157 5.91938C1.04136 6.03772 1.13364 6.12844 1.25401 6.19155C1.37438 6.25467 1.49877 6.28622 1.62717 6.28622H4.92536C4.98955 6.28622 5.04974 6.29411 5.10591 6.30989C5.16209 6.32567 5.23832 6.39273 5.33462 6.51107C5.43092 6.62941 5.51117 6.80691 5.57537 7.04359L9.02832 16.5248C9.06042 16.6195 9.11258 16.7102 9.1848 16.797C9.25703 16.8838 9.34129 16.9508 9.43758 16.9982C9.53388 17.0455 9.6382 17.0692 9.75055 17.0692H20.1507C20.3112 17.0692 20.4596 17.0218 20.5961 16.9272C20.7325 16.8325 20.8248 16.7142 20.8729 16.5722L24.5563 8.79029C24.6365 8.53783 24.6004 8.3051 24.448 8.09209ZM19.621 15.5545H10.3524L7.89682 9.2873H22.7266L19.621 15.5545ZM18.2328 17.8905C17.7031 17.8905 17.2497 18.0759 16.8726 18.4467C16.4954 18.8175 16.3068 19.2633 16.3068 19.784C16.3068 20.3047 16.4954 20.7504 16.8726 21.1212C17.2497 21.492 17.7031 21.6774 18.2328 21.6774C18.7624 21.6774 19.2158 21.492 19.593 21.1212C19.9701 20.7504 20.1587 20.3047 20.1587 19.784C20.1587 19.2633 19.9701 18.8175 19.593 18.4467C19.2158 18.0759 18.7624 17.8905 18.2328 17.8905ZM11.2993 17.8905C10.9462 17.8905 10.6212 17.9773 10.3243 18.1509C10.0274 18.3245 9.79469 18.5532 9.62617 18.8373C9.45765 19.1213 9.37339 19.4368 9.37339 19.784C9.37339 20.3047 9.56197 20.7504 9.93913 21.1212C10.3163 21.492 10.7697 21.6774 11.2993 21.6774C11.829 21.6774 12.2824 21.492 12.6595 21.1212C13.0367 20.7504 13.2253 20.3047 13.2253 19.784C13.2253 19.6577 13.2133 19.5315 13.1892 19.4053C13.1651 19.2791 13.129 19.1607 13.0808 19.0503C13.0327 18.9398 12.9725 18.8333 12.9003 18.7308C12.8281 18.6282 12.7478 18.5335 12.6595 18.4467C12.5713 18.36 12.475 18.2811 12.3706 18.2101C12.2663 18.1391 12.158 18.0799 12.0456 18.0326C11.9333 17.9852 11.8129 17.9497 11.6845 17.9261C11.5561 17.9024 11.4277 17.8905 11.2993 17.8905Z" fill="white" />
                                                            </svg>
                                                            </div>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>
                                <div className='pages'>
                                    {countPages.map(p =>
                                        <div
                                            key={p}
                                            onClick={() => handleSetCurrPage(p)}
                                            className='pages__item'
                                            style={
                                                { background: p === currPage ? 'linear-gradient(90deg, rgba(255, 198, 80, 0.3) 0%, rgba(254, 202, 110, 0.3) 97.25%)' : 'none' }
                                            }
                                        >
                                            {p}
                                        </div>
                                    )}
                                </div>
                            </div>
                        }

                    </div>

                </div>

            </div>


        </div>
    )

}

export default Catalog