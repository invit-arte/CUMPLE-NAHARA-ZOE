const sealButton = document.getElementById("sealButton");
const envelopeScreen = document.getElementById("envelopeScreen");
const mainPage = document.getElementById("mainPage");
const magicFlash = document.getElementById("magicFlash");

let opened = false;

sealButton.addEventListener("click", () => {
  if (opened) return;
  opened = true;

  sealButton.classList.add("opening");

  createMagicParticles();

  setTimeout(() => {
    magicFlash.classList.add("active");
  }, 900);

  setTimeout(() => {
    envelopeScreen.classList.add("hide");
    mainPage.classList.add("show");
  }, 1250);

  setTimeout(() => {
    envelopeScreen.style.display = "none";
    document.body.style.overflow = "auto";
  }, 2600);
});

function createMagicParticles() {
  createSparks();
  createStars();
  createLineSparks();
}

function createSparks() {
  const total = 30;

  for (let i = 0; i < total; i++) {
    const spark = document.createElement("span");
    spark.classList.add("spark");

    const angle = i * (360 / total);
    const distance = Math.random() * 120 + 70;

    spark.style.setProperty("--angle", `${angle}deg`);
    spark.style.setProperty("--distance", `${distance}px`);
    spark.style.animationDelay = `${Math.random() * .25}s`;

    envelopeScreen.appendChild(spark);

    setTimeout(() => spark.remove(), 1300);
  }
}

function createStars() {
  const total = 12;

  for (let i = 0; i < total; i++) {
    const star = document.createElement("span");
    star.classList.add("star");

    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 150 + 70;

    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;

    star.style.setProperty("--x", `${x}px`);
    star.style.setProperty("--y", `${y}px`);
    star.style.animationDelay = `${Math.random() * .25}s`;

    envelopeScreen.appendChild(star);

    setTimeout(() => star.remove(), 1400);
  }
}

function createLineSparks() {
  const total = 10;

  for (let i = 0; i < total; i++) {
    const line = document.createElement("span");
    line.classList.add("line-spark");

    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 130 + 60;

    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;

    line.style.setProperty("--x", `${x}px`);
    line.style.setProperty("--y", `${y}px`);
    line.style.setProperty("--rotate", `${Math.random() * 180}deg`);
    line.style.animationDelay = `${Math.random() * .2}s`;

    envelopeScreen.appendChild(line);

    setTimeout(() => line.remove(), 1300);
  }
}

/*  MUSICA  */
const musicButton = document.getElementById("musicButton");
const bgMusic = document.getElementById("bgMusic");

let isPlaying = false;

musicButton.addEventListener("click", () => {
  if (!isPlaying) {
    bgMusic.play();
    musicButton.classList.add("playing");
    musicButton.querySelector(".music-icon").textContent = "❚❚";
    musicButton.querySelector(".music-text").textContent = "PAUSA";
    isPlaying = true;
  } else {
    bgMusic.pause();
    musicButton.classList.remove("playing");
    musicButton.querySelector(".music-icon").textContent = "▶";
    musicButton.querySelector(".music-text").textContent = "PLAY";
    isPlaying = false;
  }
});

const eventDate = new Date("2026-07-18T15:00:00").getTime(); /*CAMBIAR FECHA AAAA-MM-DDTHH:MM:SS */ 

function updateCountdown() {
  const now = new Date().getTime();
  const distance = eventDate - now;

  if (distance <= 0) {
    document.getElementById("days").textContent = "00";
    document.getElementById("hours").textContent = "00";
    document.getElementById("minutes").textContent = "00";
    document.getElementById("seconds").textContent = "00";
    return;
  }

  document.getElementById("days").textContent = Math.floor(distance / (1000 * 60 * 60 * 24));
  document.getElementById("hours").textContent = Math.floor((distance / (1000 * 60 * 60)) % 24).toString().padStart(2, "0");
  document.getElementById("minutes").textContent = Math.floor((distance / (1000 * 60)) % 60).toString().padStart(2, "0");
  document.getElementById("seconds").textContent = Math.floor((distance / 1000) % 60).toString().padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);
/* GALERIA DE FOTOS */
const galleryPhotos = [
  "images/GALERIA1.png",
  "images/GALERIA2.png",
  "images/GALERIA3.png",
  "images/GALERIA4.png",
  "images/GALERIA5.png"
];

const galleryImage = document.getElementById("galleryImage");
const prevPhoto = document.getElementById("prevPhoto");
const nextPhoto = document.getElementById("nextPhoto");
const galleryDots = document.getElementById("galleryDots");

let currentPhoto = 0;

function createGalleryDots() {
  galleryPhotos.forEach((_, index) => {
    const dot = document.createElement("span");
    if (index === 0) dot.classList.add("active");

    dot.addEventListener("click", () => {
      currentPhoto = index;
      changePhoto();
    });

    galleryDots.appendChild(dot);
  });
}

function changePhoto() {
  galleryImage.classList.add("changing");

  setTimeout(() => {
    galleryImage.src = galleryPhotos[currentPhoto];
    galleryImage.classList.remove("changing");

    document.querySelectorAll(".gallery-dots span").forEach((dot, index) => {
      dot.classList.toggle("active", index === currentPhoto);
    });
  }, 250);
}

nextPhoto.addEventListener("click", () => {
  currentPhoto = (currentPhoto + 1) % galleryPhotos.length;
  changePhoto();
});

prevPhoto.addEventListener("click", () => {
  currentPhoto = (currentPhoto - 1 + galleryPhotos.length) % galleryPhotos.length;
  changePhoto();
});

createGalleryDots();

/*CONFIRMAR ASISTENCIA */
const openRsvpModal = document.getElementById("openRsvpModal");
const closeRsvpModal = document.getElementById("closeRsvpModal");
const rsvpModal = document.getElementById("rsvpModal");
const rsvpForm = document.getElementById("rsvpForm");

const whatsappNumber = "5215643598933"; // cambia este número

openRsvpModal.addEventListener("click", () => {
  rsvpModal.classList.add("active");
});

closeRsvpModal.addEventListener("click", () => {
  rsvpModal.classList.remove("active");
});

rsvpModal.addEventListener("click", (e) => {
  if (e.target === rsvpModal) {
    rsvpModal.classList.remove("active");
  }
});

rsvpForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const attendance = document.getElementById("attendance").value;
  const guestCount = document.getElementById("guestCount").value;

  const message = `Hola, quiero confirmar mi asistencia al cumple de Nahara Zoé.%0A%0AAsistencia: ${attendance}%0ACantidad de personas: ${guestCount}`;

  const whatsappURL = `https://wa.me/${whatsappNumber}?text=${message}`;

  window.open(whatsappURL, "_blank");
});