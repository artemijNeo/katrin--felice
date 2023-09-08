let PRODUCTS = []
let filteredProducts = []
let filterType

let firstTime = true

const categoriesArray = [
    "животные",
    "пейзажи",
    "растения"
]

const requestURL = "http://localhost:5500/database"

const searchBtn = document.getElementById("searchBtn")

import {sendRequest} from "./fetch.js"
import { setListeners } from "./productPage.js"

// if (filterType === "name") {
//     if (product.name.toLowerCase().replace(" ", "").includes(value)) {
//         return product
//     }
// } else if (filterType === "price") {
//     if (parseInt(product.price.toLowerCase().replace("₽", "").replace(" ", "")) > minPrice && parseInt(product.price.toLowerCase().replace("₽", "").replace(" ", "")) < maxPrice){
//         return product
//     }
// }

let minPrice
let maxPrice
let minMax


let hasPriceFilter = false
let hasNameFilter = false
let hasSizeFilter = false

const input0 = document.querySelector("#minPriceInput")
const input1 = document.querySelector("#maxPriceInput")

const list = document.querySelector(".product")
const input = document.getElementById("paintingsFilter")


function filter (str) {
    console.log(requestURL  + "?" + str)
    sendRequest("GET", encodeURI(requestURL  + "?" + str)).then(data => {
        console.log(data)
        render(data)
    })
}


input0.addEventListener("change", (event) => {
    minPrice = event.target.value
    maxPrice = input1.value
    let str = "price=price <= " + maxPrice + " and price >= " + minPrice
    filter(str)
})

input1.addEventListener("change", (event) => {
    minPrice = input0.value
    maxPrice = event.target.value
    let str = "price=price <= " + maxPrice + " and price >= " + minPrice
    filter(str)
})


export function rangeSliderUpdater(min, max) {
    minPrice = min
    maxPrice = max
    let str = "price=price <= " + maxPrice + " and price >= " + minPrice
    filter(str)
}


searchBtn.addEventListener("click", (event) => {
    const value = input.value.replace(" ", "").toLowerCase()
    let str = ""
    if (value.length > 0) {
        str = "name=name ilike '%" + value + "%'"
        filter(str)
    } else {
        str = "name=%%%%all%%%"
        filter(str)
    }
})

export function render(products = [], fromFilter = false) {
    if (products.length === 0) {
        list.innerHTML = "No matched paintings"
    } else {
        const html = products.map(toHTML).join("")
        list.innerHTML = html
        setListeners()
    }
    PRODUCTS = products
}


function toHTML(product) {
    return `<li class="product-item" id="${product.url}">
    <div>
        <img src=${product.img} alt="">
    </div>
    <div class="product-info">
        <p class="product-title">${product.name}</p>
        <p class="product-size">${product.size}</p>
        <p class="product-price">${product.priceText}</p>
        <span class="orderBtn">Заказать</span>
    </div>
</li>`
}

export function fetchError (err) {
    filter
    console.log("error: " + err.message)
}
