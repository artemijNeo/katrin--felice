const requestURL = "http://localhost:5500/"
let url

import {render} from "./renderProducts.js"
import {fetchError} from "./renderProducts.js"
import { productPageFormer } from "./productPage.js"

let response
setTimeout(() => {
    
}, 100);
export async function sendRequest(method, url, body = null) {
    try {
        return response = await fetch(url).then(async response => {
            return await response.json()
        })
    } catch (err) {
        fetchError(err)
        return response = await fetch(url).then(async response => {
            return await response.json()
        })
    }
}

sendRequest("GET", requestURL + "database?all=all")
    .then(data => {
        console.log(data)
        render(data)
    })

    
if (document.location.search) {
    url = document.location.search
    sendRequest("GET", requestURL + "index2page.html?search=" + url.replace("?", "").replace("search", "").replace("=", "").replace(/"%20"/g, "")).then(data => productPageFormer(data))
}