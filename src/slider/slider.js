
// init Swiper:
const swiper = new Swiper('.swiper', {
    // configure Swiper to use modules
    slidesPerView: 3,
    spaceBetween: 20,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});

console.log("slider -- lancement")