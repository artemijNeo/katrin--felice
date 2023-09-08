const menu = document.querySelector(".nav-body")
const menuBtn = document.querySelector(".menu-burger")

const body = document.body


if (menu && menuBtn) {
    menuBtn.addEventListener("click", () => {
        menu.classList.toggle("open")
        menuBtn.classList.toggle("open")
        body.classList.toggle("lock")
    })
}