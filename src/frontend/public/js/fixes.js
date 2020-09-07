'use strict';

const getElById = (id) => {
  return document.getElementById(id);
};

function handleInput() {
  this.style.height = `auto`;
  this.style.height = `${this.scrollHeight}px`;
}

const expandTextAreaOnPostArticlePage = () => {
  const pathname = window.location.pathname;
  const addPath = `/articles/add`;
  const editPath = `/articles/article/edit`;

  if (pathname.indexOf(addPath) >= 0 || pathname.indexOf(editPath) >= 0) {
    const textArea = document.querySelectorAll(`textarea`);

    for (const textAreaEl of textArea) {
      textAreaEl.style.height = `${textAreaEl.scrollHeight}px`;
      textAreaEl.style.overflowY = `hidden`;
      textAreaEl.addEventListener(`input`, handleInput, false);
    }
  }
};

const handleDeleteFileOnPostArticlePage = () => {
  if (window.location.pathname.indexOf(`/articles/article/edit/`) >= 0) {
    const articleFormImgDeleteBtn = getElById(`image-file-delete`);

    if (articleFormImgDeleteBtn) {
      articleFormImgDeleteBtn.addEventListener(`click`, (e) => {
        e.preventDefault();

        const articleFormImg = getElById(`image-name-field`);
        const prevArticleFormImg = getElById(`prevImage-name-field`);

        prevArticleFormImg.value = articleFormImg.value;
        articleFormImg.value = ``;
      });
    }
  }
};

document.addEventListener(`DOMContentLoaded`, () => {
  expandTextAreaOnPostArticlePage();
  handleDeleteFileOnPostArticlePage();
});
