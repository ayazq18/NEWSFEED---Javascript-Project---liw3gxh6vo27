const fetchData = async () => {
  const result = await fetch(
    "https://content.newtonschool.co/v1/pr/64e3d1b73321338e9f18e1a1/inshortsnews"
  );
  return await result.json();
};

function getNewsFromLocalStorage() {
  const savedNews = JSON.parse(localStorage.getItem("savedNews"));
  return savedNews === null ? [] : savedNews;
}

function addNewsToLocalStorage(newsName) {
  let savedNewsName = [];
  savedNewsName = localStorage.getItem("savedNews");
  savedNewsName = savedNewsName ? JSON.parse(savedNewsName) : [];
  savedNewsName.push(newsName);
  const updatedStorage = JSON.stringify(savedNewsName);
  localStorage.setItem("savedNews", updatedStorage);
}

function removeNewsFromLocalStorage(newsName) {
  const savedNewsName = getNewsFromLocalStorage();
  localStorage.setItem(
    "savedNews",
    JSON.stringify(
      savedNewsName.filter((newsNam) => newsNam.author !== newsName.author)
    )
  );
}
// savedNews

const showNotification = (message) => {
  const alertMessage = document.createElement("h1");
  alertMessage.classList.add("alertMessage");
  alertMessage.innerText = message;
  alertMessage.style.display = "block";

  document.body.appendChild(alertMessage);

  setTimeout(() => {
    alertMessage.style.display = "none";
  }, 2000);
};

//saveNews
const savedNewsList = getNewsFromLocalStorage();
const savedNews = document.getElementById("savedNews");
savedNews.innerHTML = "";
if(savedNewsList !== null && savedNewsList.length>0){
savedNewsList.map((news) => {
  const { author, category, content, url } = news;
  const newDiv = document.createElement("div");
  newDiv.innerHTML = `
          <div class="savedNews-content">
            <div class="savedAuthor-category">
              <h2 id="saved-author"><p>By</p> ${author}</h2>
              <h2 id="saved-author"><p>Category</p> ${category}</h2>
            </div>
            <div class="savedNews-content-url">
              <p id="saved-content">${content} <a id="saved-url" href="${url}">Read More.</a></p>
             
            </div>
            <i class="fas fa-times-circle xmark"></i>
          </div>
        `;
  savedNews.appendChild(newDiv);
  const favIcon = newDiv.querySelector(".xmark");
  favIcon.addEventListener("click", () => {
    removeNewsFromLocalStorage(news);
    newDiv.remove();
    showNotification("1 Saved News item removed");
  });
});
}else {
  const emptyElement = document.getElementById("empty");

  if (emptyElement) {
    emptyElement.innerText = "No News Item Saved 🗑️";
    emptyElement.style.display = "block"
  }
}
document.querySelector(".new-icon").addEventListener("click", () => {
  window.location.href = "../Newnews/newNews.html";
});
