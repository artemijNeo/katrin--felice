const requestURL = "http://localhost:5500/"

let productName
let response

async function sendRequest(method, url, body = null) {
    try {
        return response = await fetch(url).then(async response => {
            return await response.json()
        })
    } catch (err) {
        return response = await fetch(url).then(async response => {
            return await response.json()
        })
    }
}

let url

const orderPageName = document.querySelector("#orderPageName")
const orderPageDesc = document.querySelector("#orderPageDesc")
const orderPageSize = document.querySelector("#orderPageSize")
const orderPagePrice = document.querySelector("#orderPagePrice")
const orderPageImg = document.querySelector("#orderPageImg")


if (document.location.search.replace("?", "").replace("search", "").replace("=", "").replace(/"%20"/g, "")) {
    url = document.location.search
    sendRequest("GET", requestURL + "index2page.html?search=" + url.replace("?", "").replace("search", "").replace("=", "").replace(/"%20"/g, "")).then(data => orderPageFormer(data))
} else {
    window.location.href = "index2page.html"
}


function orderPageFormer(data) {
    orderPageName.innerHTML = data[0].name 
    productName = data[0].name
    /*orderPageDesc.innerHTML = data[0].description*/
    orderPageSize.innerHTML = data[0].size 
    orderPagePrice.innerHTML = data[0].priceText
    orderPageImg.src = data[0].img
}


/* ------------------------- Форма -------------------------- */

const form = document.getElementById("orderPageForm")

form.addEventListener("submit", formSend)

async function formSend(e) {
    e.preventDefault()

    let error = formValidate(form)


    let formData = new FormData(form)
    const data = {
        "name": formData.get("name"),
        "email": formData.get("email"),
        "phone": formData.get("phone"),
        "productName": productName,
        "messenger": formData.get("messenger")
    }
    console.log(JSON.stringify(data));

    if (error === 0) {
        console.log(formData.get("email"))
        let response = await fetch("http://localhost:5501/sendmail", {
            method: "POST",
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            mode: "cors"
        })
        if (response.ok) {
            console.log(response)
            form.reset()
        } else {
            alert("error")
        }
    } else {
        alert("Заполните обязательные поля!")
    }
}

function formValidate(form) {
    let error = 0
    let formReq = document.querySelectorAll("._req")


    for (let i = 0; i < formReq.length; i++) {
        const input = formReq[i]
        formRemoveError(input)

        if (input.id === "emailOrderInput") {
            if (emailTest(input)) {
                formAddError(input)
                error++
            }
        } else {
            if (input.value.trim() === "") {
                formAddError(input)
                error++
            }

        }
    }
    return error
}

function formAddError(input) {
    input.classList.add("_error")
}

function formRemoveError(input) {
    input.classList.remove("_error")
}


function emailTest(input) {
    return !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(input.value);
}