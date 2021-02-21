import Vue from "vue"

let obj = {}

for( let key in obj ) {
  Vue.component( key, obj[key] )
}