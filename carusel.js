let offset = 0
let counter = 1

const dot1 = document.getElementById("1")
const dot2 = document.getElementById("2")
const dot3 = document.getElementById("3")
const dot4 = document.getElementById("4")
const dot5 = document.getElementById("5")
const dot6 = document.getElementById("6")

const dots = {
    [1]: document.getElementById("1"),
    [2]: document.getElementById("2"),
    [3]: document.getElementById("3"),
    [4]: document.getElementById("4"),
    [5]: document.getElementById("5"),
    [6]: document.getElementById("6")
}

const dotsOffsets1920 = {
    [0]: 1,
    [-1050]: 2,
    [-2100]: 3,
    [-3150]: 4,
    [-4200]: 5,
    [-5250]: 6,
}

const dotsOffsets1380 = {
    [0]: 1,
    [-750]: 2,
    [-1500]: 3,
    [-2250]: 4,
    [-3000]: 5,
    [-3750]: 6,
}


let windowWidth
let canChange = true

const leftArrow = document.getElementById("leftArrow")
const rightArrow = document.getElementById("rightArrow")

const reviews = document.querySelector(".reviews-block")


rightArrow.onclick = function () {
    canChange = false
    rightArrow.style.width = 6 + "%"
    rightArrow.style.height = 6 + "%"

    /*counter = dotsOffsets[offset]
    console.log(counter);*/
    for (i = 1; i <= 6; i++) {
        dots[i].style.width = 17 + "px"
        dots[i].style.height = 17 + "px"
    }

    if (window.innerWidth > 1380) {
        if (offset <= -5250) {
            offset = 0
        } else {
            offset -= 1050
        }
    } else if (window.innerWidth <= 1380) {
        if (offset <= -3750) {
            offset = 0
        } else {
            offset -= 750
        }
    }


    if (window.innerWidth > 1380) {
        counter = Math.floor(-offset / 1050) + 1
    } else if (window.innerWidth <= 1380) {
        counter = Math.floor(-offset / 750) + 1
    }
    dots[counter].style.width = 23 + "px"
    dots[counter].style.height = 23 + "px"

    reviews.style.left = offset + "px"
    setTimeout(() => {
        rightArrow.style.width = 5 + "%"
        rightArrow.style.height = 5 + "%"
    }, 100);

    setTimeout(() => {
        canChange = true
    }, 7500);
}

leftArrow.onclick = function () {
    canChange = false
    leftArrow.style.width = 6 + "%"
    leftArrow.style.height = 6 + "%"

    /*counter = Math.floor(-offset / 1050) + 1*/
    for (i = 1; i <= 6; i++) {
        dots[i].style.width = 17 + "px"
        dots[i].style.height = 17 + "px"
    }

    if (window.innerWidth > 1380) {
        if (offset >= 0) {
            offset = -5250
        } else {
            offset += 1050
        }
    } else if (window.innerWidth <= 1380) {
        if (offset >= 0) {
            offset = -3750
        } else {
            offset += 750
        }
    }

    if (window.innerWidth > 1380) {
        counter = Math.floor(-offset / 1050) + 1
    } else if (window.innerWidth <= 1380) {
        counter = Math.floor(-offset / 750) + 1
    }
    dots[counter].style.width = 23 + "px"
    dots[counter].style.height = 23 + "px"


    reviews.style.left = offset + "px"
    setTimeout(() => {
        leftArrow.style.width = 5 + "%"
        leftArrow.style.height = 5 + "%"
    }, 100);

    setTimeout(() => {
        canChange = true
    }, 7500);
}



setInterval(() => {
    if (canChange === true) {
        counter = Math.floor(-offset / 1050) + 1
        dots[counter].style.width = 17 + "px"
        dots[counter].style.height = 17 + "px"

        if (window.innerWidth > 1380) {
            if (offset <= -5250) {
                offset = 0
            } else {
                offset -= 1050
            }
        } else if (window.innerWidth <= 1380) {
            if (offset <= -3750) {
                offset = 0
            } else {
                offset -= 750
            }
        }

        reviews.style.left = offset + "px"

        if (window.innerWidth > 1380) {
            counter = Math.floor(-offset / 1050) + 1
        } else if (window.innerWidth <= 1380) {
            counter = Math.floor(-offset / 750) + 1
        }

        dots[counter].style.width = 23 + "px"
        dots[counter].style.height = 23 + "px"
    } 
}, 7505);


function dotClick (dotCounter) {
    canChange = false

    for (i = 1; i <= 6; i++) {
        dots[i].style.width = 17 + "px"
        dots[i].style.height = 17 + "px"
    }


    if (window.innerWidth > 1380) {
        offset = ((-dotCounter + 1) * 1050)
    } else if (window.innerWidth <= 1380) {
        offset = ((-dotCounter + 1) * 750)
    }
    
    reviews.style.left = offset + "px"
    counter = dotCounter

    dots[counter].style.width = 23 + "px"
    dots[counter].style.height = 23 + "px"

    setTimeout(() => {
        canChange = true
    }, 7500);
}

dot1.onclick = function () {
    dotClick(1)
}
dot2.onclick = function () {
    dotClick(2)
}
dot3.onclick = function () {
    dotClick(3)
}
dot4.onclick = function () {
    dotClick(4)
}
dot5.onclick = function () {
    dotClick(5)
}
dot6.onclick = function () {
    dotClick(6)
}