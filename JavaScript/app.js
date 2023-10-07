const wrapper = document.querySelector(".wrapper");
const menuBtn = document.querySelector(".menu-btn");
const backBtn = document.querySelector(".back-btn");


const toggleScreen = () => {
    wrapper.classList.toggle("show-category");
};
backBtn.addEventListener("click", toggleScreen)
menuBtn.addEventListener("click", toggleScreen);