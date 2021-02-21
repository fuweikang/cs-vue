import Vue from "vue"
import {filterPrice} from "./filterPrice.js"

let obj = {
  filterPrice
}

for( let key in obj ) {
  Vue.filter(key,obj[key])
}