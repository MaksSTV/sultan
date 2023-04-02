export function mobileMenu(){
    const open = document.querySelector(".navbar-top");
    const burger__wrapper = document.querySelector(".burger__wrapper");
    const lock = document.body;
    burger__wrapper?.addEventListener('click', () => {
        burger__wrapper.classList.toggle("active");
        open?.classList.toggle("open")
        lock.classList.toggle("lock")
    });
}