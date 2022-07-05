"use strict";
const elTemplate = document.querySelector(".template").content;
const elList = document.querySelector(".list");
const elInput = document.querySelector(".input");

const API_KEY = "b1566df1";
let search = "wolves";
let page = 1;

const renderMovies = function (arr, htmlElement) {
  const moviesFragment = document.createDocumentFragment();

  elList.innerHTML = null;

  arr.forEach((item) => {
    const clonedFilmTemplate = elTemplate.cloneNode(true);

    clonedFilmTemplate.querySelector(".film__img").src = item.Poster;
    clonedFilmTemplate.querySelector(".film__title").textContent = item.Title;
    clonedFilmTemplate.querySelector(".film__year").textContent = item.Year;
    clonedFilmTemplate.querySelector(".film__category").textContent = item.Type;

    moviesFragment.appendChild(clonedFilmTemplate);
  });

  htmlElement.appendChild(moviesFragment);
};

const getMovies = async function () {
  const request = await fetch(
    `https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}&page=${page}`
  );

  const data = await request.json();

  if ((data.Response = "True" && data.Search.length > 0)) {
    renderMovies(data.Search, elList);
  }
};

getMovies();

elInput.addEventListener("change", function () {
  const inputValue = elInput.value;

  search = inputValue;

  getMovies();
});

prevBtn.addEventListener("click", function () {
  page--;
  getMovies();
});

nextBtn.addEventListener("click", function () {
  page++;
  getMovies();
});
