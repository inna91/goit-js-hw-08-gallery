"use strict";
import images from "./gallery-items.js";

const refs = {
  gallaryList: document.querySelector(".js-gallery"),
  modal: document.querySelector(".js-lightbox"),
  largeImg: document.querySelector(".lightbox__image"),
  closeModalBtn: document.querySelector('button[data-action="close-lightbox"]'),
  overlay: document.querySelector(".lightbox__content"),
};

createGallery();

refs.gallaryList.addEventListener("click", onGalleryItemClick);
refs.closeModalBtn.addEventListener("click", onCloseModal);
refs.overlay.addEventListener("click", onOverlayClick);
refs.modal.addEventListener("keydown", onNextClick);
refs.modal.addEventListener("keydown", onPrevClick);

function createGallery() {
  let index = 0;
  const makeTree = images.map((image) => {
    index += 1;
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
  window.addEventListener("keydown", onPressEscape);
  refs.modal.classList.add("is-open");
}

function onCloseModal() {
  window.removeEventListener("keydown", onPressEscape);
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

function onPressEscape(event) {
  if (event.code === "Escape") {
    onCloseModal();
  }
}

function onNextClick() {}

function onPrevClick() {}
