import { ItemsJson } from "../../data/ItemJson";
import json from '../../data/items.json'

export const getCurrentItem = (barcode: number, setItem: React.Dispatch<React.SetStateAction<ItemsJson>>): void =>{

    let item = json.find(val => val.barcode == barcode)
    if(item !== undefined){
        setItem(item)
        console.log(item)
    }
    else{
        console.log("error in barcode!!!")
    }
}
