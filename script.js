const gallery = document.querySelector(".gallery");
const galleryImages = document.querySelectorAll(".gallery img");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxBackground = document.getElementById("lightboxBackground");
let currentImage = 0;

document.getElementById("nextBtn").addEventListener("click", () => {
    gallery.scrollBy({ left: gallery.clientWidth, behavior: "smooth" });
});

document.getElementById("backBtn").addEventListener("click", () => {
    gallery.scrollBy({ left: -gallery.clientWidth, behavior: "smooth" });
});

gallery.addEventListener("wheel", (event) => {
    event.preventDefault();
    gallery.scrollLeft += event.deltaY;
}, { passive: false });

function showImage(index) {
    currentImage = (index + galleryImages.length) % galleryImages.length;
    lightboxImage.src = galleryImages[currentImage].src;
    lightboxBackground.style.backgroundImage = `url("${galleryImages[currentImage].src}")`;
    lightbox.hidden = false;
}

galleryImages.forEach((image, index) => {
    image.addEventListener("click", () => showImage(index));
});

document.getElementById("closeLightbox").addEventListener("click", () => {
    lightbox.hidden = true;
});

document.getElementById("lightboxBack").addEventListener("click", () => {
    showImage(currentImage - 1);
});

document.getElementById("lightboxNext").addEventListener("click", () => {
    showImage(currentImage + 1);
});

lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
        lightbox.hidden = true;
    }
});

document.addEventListener("keydown", (event) => {
    if (lightbox.hidden) {
        return;
    }

    if (event.key === "Escape") {
        lightbox.hidden = true;
    } else if (event.key === "ArrowLeft") {
        showImage(currentImage - 1);
    } else if (event.key === "ArrowRight") {
        showImage(currentImage + 1);
    }
});