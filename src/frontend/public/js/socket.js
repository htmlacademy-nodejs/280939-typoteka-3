'use strict';

const COMMENTS_MAX_LATEST_COUNT = 4;

const updateLastComments = (data) => {
  const lastHTML = data.lastHTML;
  const lastList = document.getElementById(`last-list`);
  const firstComment = lastList.childNodes[0];
  const commentsLength = lastList.childNodes.length;

  firstComment.insertAdjacentHTML(`beforebegin`, lastHTML);

  if (commentsLength === COMMENTS_MAX_LATEST_COUNT) {
    lastList.childNodes[commentsLength - 1].remove();
  }
};

const updateHottestArticles = (data) => {
  const hotHTML = data.hotHTML;
  const hotList = document.getElementById(`hot-list`);
  hotList.innerHTML = hotHTML;
};

document.addEventListener(`DOMContentLoaded`, () => {
  const socket = io();

  socket.on(`NEW_COMMENT`, (data) => {
    updateLastComments(data);
    updateHottestArticles(data);
  });

  socket.on(`MAIN_PAGE_READERS_COUNT`, (data) => {
    const currentReaders = document.querySelectorAll(`.current-page-readers`);
    if (currentReaders.length) {
      currentReaders[0].innerText = `Смотрят эту страницу: ${data}`;
    }
  });
});
