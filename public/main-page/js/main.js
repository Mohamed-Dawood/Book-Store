/*=============== SWIPER JS ===============*/
let swiperCards = new Swiper(".newRelease__content", {
  loop: true,
  spaceBetween: 32,
  grabCursor: true,

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  breakpoints: {
    600: {
      slidesPerView: 2,
    },
    968: {
      slidesPerView: 3,
    },
  },
});

// start countDown
let countDownDate = new Date("Dec 31, 2025 23:59:59").getTime();

let counter = setInterval(() => {
  let dateNow = new Date().getTime();

  let dateDiff = countDownDate - dateNow;

  if (dateDiff <= 0) {
    clearInterval(counter);
    let countDownDiv = document.querySelector(".countDown");
    countDownDiv.style.display = "none";
    document.getElementById("countdownMessage").innerText =
      "Countdown finished!";
    return;
  }

  let days = Math.floor(dateDiff / (1000 * 60 * 60 * 24));
  let hours = Math.floor((dateDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((dateDiff % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((dateDiff % (1000 * 60)) / 1000);

  document.getElementById("day").innerHTML = days;
  document.getElementById("hours").innerHTML = hours;
  document.getElementById("minutes").innerHTML =
    minutes < 10 ? `0${minutes}` : minutes;
  document.getElementById("seconds").innerHTML =
    seconds < 10 ? `0${seconds}` : seconds;

  if (dateDiff < 0) {
    clearInterval(counter);
  }
}, 1000);

// end countDown

// start copy right date
const copyRight_date = document.querySelector(".copyRight_date");
const currentYear = new Date().getFullYear();
copyRight_date.textContent = currentYear;
// end copy right date

// start scrollTo

let scrollTop = document.getElementById("scrollTop");
window.onscroll = function () {
  if (scrollY >= 400) {
    scrollTop.style.display = `block`;
  } else {
    scrollTop.style.display = `none`;
  }
};

scrollTop.onclick = function () {
  scroll({
    left: 0,
    top: 0,
    behavior: "smooth",
  });
};
// end scrollTo

document.querySelector(".animated-button").onclick = function () {
  window.open("http://127.0.0.1:5500/public/Product-page/index.html", "_blank");
};
