import { sendRequest } from "./fetch.js";

const requestURL = "http://localhost:5500/index2page.html"

const closeBtn = document.getElementById("productPageCloseBtn")
const productPageHandler = document.querySelector(".productPageHandler")
const productPage = document.querySelector(".productPage")

const productPagePrice = document.querySelector("#productPagePrice")
const productPageName = document.querySelector("#productPageName")
const productPageSize = document.querySelector("#productPageSize")
const productPageCategory = document.querySelector("#productPageCategory")
const productPageTechnique = document.querySelector("#productPageTechnique")
const productPageDesc = document.querySelector("#productPageDesc")
const productPageImg = document.querySelector("#productPageImg")

const orderBtn = document.querySelector("#productPageOrderBtn")

export function setListeners() {
    const products = document.querySelectorAll(".product-item")

    let url
    
    for (let i = 0; i < products.length; i++) {
        products[i].addEventListener("click", (event) => {
            url = event.target.getAttribute("id")
            let target = event.target
            while (!url) {
                target = target.parentNode
                url = target.getAttribute("id")
            }
            sendRequest("/GET", requestURL + "?search=" + url).then(data => productPageFormer(data))
            console.log(requestURL + "?search=" + url)
            window.history.replaceState(null, null, "?search=" + url)
        }) 
    }
    
    closeBtn.onclick = function () {
        productPageHandler.style.display = "none"
        window.history.replaceState(null, null, "?")
    }
}

orderBtn.onclick = function() {
    if (window.location.search.replace("?", "").replace("search", "").replace("=", "").replace(/"%20"/g, "")) {
        window.location.href = "orderPage.html?" + window.location.search.replace("?", "").replace("search", "").replace("=", "").replace(/"%20"/g, "")
    }
}



export function productPageFormer(data) {
    try {

        productPagePrice.innerHTML = data[0].priceText
        productPageName.innerHTML = data[0].name
        productPageDesc.innerHTML = data[0].description
        productPageSize.innerHTML = data[0].size
        productPageCategory.innerHTML = "Категория: " + data[0].category
        productPageImg.src = data[0].img
        productPageHandler.style.display = "block"      

    } catch (err) {

    }   
}