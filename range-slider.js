const rangeSlider = document.querySelector("#priceFilter")

import {rangeSliderUpdater} from "./renderProducts.js"

let inputMin = document.querySelector("#minPriceInput")
let inputMax = document.querySelector("#maxPriceInput")

let inputs = [inputMin, inputMax]

const filtersBtn = document.querySelector(".filterDiv")
const filterDiv = document.querySelector(".filters")


noUiSlider.create(rangeSlider, {
    start: [30000, 110000],
    connect: true,
    step: 100,
    range: {
        'min': 30000,
        'max': 110000
    }
});


rangeSlider.noUiSlider.on("update", function(values, handle) {
    inputs[handle].value = Math.round(values[handle])
})

rangeSlider.noUiSlider.on("change", function(values, handle) {
    rangeSliderUpdater(inputMin.value, inputMax.value)
})



function setRangeSlider (i, value) {
    let arr = [null, null]
    arr[i] = value

    rangeSlider.noUiSlider.set(arr)
}

inputs.forEach((el, index) => {
    el.addEventListener("change", (e) => {
        setRangeSlider(index, e.currentTarget.value)
    })
})


filtersBtn.addEventListener("click", () => {
    filterDiv.classList.toggle("active")
})