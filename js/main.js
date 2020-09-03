"use strict";
import images from "./gallery-items.js";

const refs = {
  gallaryList: document.querySelector(".js-gallery"),
  modal: document.querySelector(".js-lightbox"),
  largeImg: document.querySelector(".lightbox__image"),
  closeModalBtn: document.querySelector('button[data-action="close-lightbox"]'),
  overlay: document.querySelector(".lightbox__content"),
};
// let index = 0;
createGallery();

refs.gallaryList.addEventListener("click", onGalleryItemClick);
refs.closeModalBtn.addEventListener("click", onCloseModal);
refs.overlay.addEventListener("click", onOverlayClick);

function createGallery() {
  const makeTree = images.map((image, index) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.classList.add("gallery__link");
    a.setAttribute("href", image.original);

    const img = document.createElement("img");
    img.classList.add("gallery__image");
    img.setAttribute("src", image.preview);
    img.setAttribute("data-source", image.original);
    img.setAttribute("alt", image.description);
    img.setAttribute("data-index", index);

    a.appendChild(img);
    li.appendChild(a);
    // index += 1;

    return li;
  });

  refs.gallaryList.append(...makeTree);
}

function onGalleryItemClick(event) {
  event.preventDefault();

  if (event.target.nodeName !== "IMG") {
    return;
  }

  openModal();

  const imageRef = event.target;
  const largeImageURL = imageRef.dataset.source;
  const largeImageAlt = imageRef.alt;

  setLargeImageSrc(largeImageURL);
  setLargeImageAlt(largeImageAlt);
}

function setLargeImageSrc(url) {
  refs.largeImg.src = url;
}

function setLargeImageAlt(alt) {
  refs.largeImg.alt = alt;
}

function openModal() {
  window.addEventListener("keydown", onPressHandler);
  refs.modal.classList.add("is-open");
}

function onCloseModal() {
  window.removeEventListener("keydown", onPressHandler);
  refs.modal.classList.remove("is-open");
  deleteLargeImageSrc();
}

function deleteLargeImageSrc() {
  refs.largeImg.src = "";
}

function onOverlayClick(event) {
  if (event.target === event.currentTarget) {
    onCloseModal();
  }
}

// function onNextClick() {
//   if (index > images.length - 2) {
//     index = -1;
//   }
//   ++index;
//   refs.largeImg.src = images[index].original;
// }

// function onPrevClick() {
//   if (index < 1) {
//     index = images.length;
//   }
//   --index;
//   refs.largeImg.src = images[index].original;
// }

function onNextClick() {
  const image = document.querySelector(".gallery__image");
  let index = +image.getAttribute("data-index");
  if (index < images.length - 1) {
    index += 1;
    refs.largeImg.src = images[index].original;
    console.log(index);
  }
}

function onPrevClick() {
  const image = document.querySelector(".gallery__image");
  let index = +image.getAttribute("data-index");
  if (index > 0) {
    index -= 1;
    refs.largeImg.src = images[index].original;
    console.log(index);
  }
}

function onPressHandler(event) {
  if (event.code === "Escape") {
    onCloseModal();
  }
  if (event.code === "ArrowLeft") {
    onPrevClick();
  }
  if (event.code === "ArrowRight") {
    onNextClick();
  }
}
