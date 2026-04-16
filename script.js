AOS.init({
  duration: 1000,
  once: true
});

const slider = document.querySelector(".project-grid");

document.querySelectorAll(".item").forEach(item => {
  const video = item.querySelector("video");
  const playBtn = item.querySelector(".play-btn");
  const controlBtn = item.querySelector(".control-btn");

  playBtn.addEventListener("click", () => {
    video.play();
    playBtn.style.display = "none";
    controlBtn.style.display = "block";
    slider.style.animationPlayState = "paused";
  });

  controlBtn.addEventListener("click", () => {
    if (video.paused) {
      video.play();
      controlBtn.textContent = "⏸";
      slider.style.animationPlayState = "paused";
    } else {
      video.pause();
      controlBtn.textContent = "▶";
      slider.style.animationPlayState = "running";
    }
  });
});



// ✅ MOBILE VIDEO CONTROL (CLEAN VERSION)
document.querySelectorAll(".video-box").forEach(box => {
  const video = box.querySelector("video");
  const btn = box.querySelector(".play-btn");

  // PLAY BUTTON
  btn.addEventListener("click", () => {

    // 🔥 Reset ALL videos (fix thumbnail issue)
    document.querySelectorAll(".video-box").forEach(otherBox => {
      const otherVideo = otherBox.querySelector("video");
      const otherBtn = otherBox.querySelector(".play-btn");

      if (otherVideo !== video) {
        otherVideo.pause();
        otherVideo.currentTime = 0;
        otherVideo.load(); // ✅ restore thumbnail
        otherBtn.style.display = "flex";
      }
    });

    video.play();
    btn.style.display = "none";

    swiper.autoplay.stop();
  });

  // CLICK VIDEO → TOGGLE
  video.addEventListener("click", () => {

    if (!video.paused) {
      video.pause();

      // ✅ restore thumbnail
      video.currentTime = 0;
      video.load();

      btn.style.display = "flex";
      swiper.autoplay.start();

    } else {
      video.play();
      btn.style.display = "none";
      swiper.autoplay.stop();
    }

  });
});


const swiper = new Swiper(".mySwiper", {
  slidesPerView: "auto",
  spaceBetween: 15,
  loop: true,
  speed: 4000, // smooth continuous

  autoplay: {
    delay: 0, // IMPORTANT for continuous
    disableOnInteraction: false,
  },
});

const swiperContainer = document.querySelector(".mySwiper");

swiperContainer.addEventListener("mouseenter", () => {
  swiper.autoplay.stop();
});

swiperContainer.addEventListener("mouseleave", () => {
  swiper.autoplay.start();
});

swiperContainer.addEventListener("touchstart", () => {
  swiper.autoplay.stop();
});

swiperContainer.addEventListener("touchend", () => {
  swiper.autoplay.start();
});

document.querySelectorAll(".video-box").forEach(box => {
  const video = box.querySelector("video");
  const btn = box.querySelector(".play-btn");

  btn.addEventListener("click", () => {
    video.play();
    btn.style.display = "none";

    // STOP SLIDER
    swiper.autoplay.stop();
  });

  video.addEventListener("click", () => {
    if (!video.paused) {
      video.pause();
      btn.style.display = "flex";

      // RESUME SLIDER
      swiper.autoplay.start();
    }
  });
});


// Thumbnail Card Scroll Effect

const { ScrollObserver, valueAtPercentage } = aat

const cardsContainer = document.querySelector('.cards')
const cards = document.querySelectorAll('.card')
cardsContainer.style.setProperty('--cards-count', cards.length)
cardsContainer.style.setProperty(
  '--card-height',
  `${cards[0].clientHeight}px`
)
Array.from(cards).forEach((card, index) => {
  const offsetTop = 20 + index * 20
  card.style.paddingTop = `${offsetTop}px`
  if (index === cards.length - 1) {
    return
  }
  const toScale = 1 - (cards.length - 1 - index) * 0.1
  const nextCard = cards[index + 1]
  const cardInner = card.querySelector('.card__inner')
  ScrollObserver.Element(nextCard, {
    offsetTop,
    offsetBottom: window.innerHeight - card.clientHeight
  }).onScroll(({ percentageY }) => {
    cardInner.style.scale = valueAtPercentage({
      from: 1,
      to: toScale,
      percentage: percentageY
    })
    cardInner.style.filter = `brightness(${valueAtPercentage({
      from: 1,
      to: 0.6,
      percentage: percentageY
    })})`
  })
})