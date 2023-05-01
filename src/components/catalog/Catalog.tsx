import { ChangeEvent, useEffect, useState } from 'react'
import { mobileFilters } from '../../utils/mobile-filters'
import json from '../../data/items.json'
import './catalog.scss'
import '../listItems/listitems.scss'
import { ItemsJson } from '../../data/ItemJson'
import ListItems from '../listItems/ListItems'

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

    let setBrands = new Set<string>()

    mobileFilters()

    const [lowerPriceLimit, setLowerPriceLimit] = useState('0')
    const [upperPriceLimit, setUpperPriceLimit] = useState('100000')
    const [items, setItems] = useState<ItemsJson[]>(json)
    const [currPage, setCurrPage] = useState(1)
    const [selectedSort, setSelectedSort] = useState('default')
    const [countPages, setCountPages] = useState(getAmountPage(jsonData, 8))
    const [listBrands, setListBrands] = useState<string[]>([])

    useEffect(() => {

        jsonData.forEach(val => {
            setBrands.add(val.manufacturer)
        })
        Array(setBrands)
        setListBrands([...Array.from(setBrands)])
    }, [])





    useEffect(() => {
        function sortedItems(): ItemsJson[] {
            const sorted: ItemsJson[] = jsonData;
            filterBySelectSort(sorted)
            let val = filterBySelectedFilters(sorted)
            setCountPages(getAmountPage(val, 8))
            //console.log(countPages)
            return val.filter((value, index) => (index + 1 > (currPage - 1) * 8) && (index + 1 <= currPage * 8))
        }
        setItems(sortedItems())
    }, [currPage, selectedSort, lowerPriceLimit, upperPriceLimit])

    

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
                                               
                                                listBrands.map((val, index, arr) =>
                                                    <div className="checkbox" key={index}>
                                                        <label className='checkboxText'>{val}</label>
                                                        <input value={val} type="checkbox" />
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
                                            <ListItems 
                                                id={item.id}
                                                url={item.url}
                                                name={item.name}
                                                name_desc={item.name_desc}
                                                type_size={item.type_size}
                                                size={item.size}
                                                barcode={item.barcode}
                                                manufacturer={item.manufacturer}
                                                brand={item.brand}
                                                description={item.description}
                                                price={item.price}
                                                bodyCare={item.bodyCare}
                                                handCare={item.handCare}
                                                faceCare={item.faceCare}
                                                key={item.barcode}
                                            />
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