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

//newNews
const renderNews = (data) => {
  const newData = document.getElementById("newNews");
  newData.innerHTML = "";

  data.map((news) => {
    const newDiv = document.createElement("div");
    const { author, category, content, url } = news;
    newDiv.innerHTML += `
          <div class = "newNews-content">
            <div class = "newAuthor-category">
                <h2 id="new-author"><p>By</p> ${author}</h2>
                <h2 id="new-author"><p>Category</p> ${category}</h2>
            </div>
            <div class = "newNews-content-url">
                <p id="new-content">${content}</p>
                <a id="new-url" href="${url}">Read More.</a>
            </div>
            <i class="fa fav-icon fa-regular fa-heart fa-2xl transparent"></i>
          </div>
          `;
    newData.appendChild(newDiv);
    const favIcon = newDiv.querySelector(".fa-heart");
    favIcon.addEventListener("click", () => {
      if (favIcon.classList.contains("transparent")) {
        addNewsToLocalStorage(news);
        favIcon.classList.toggle("transparent", false);
      } else {
        removeNewsFromLocalStorage(news);
        favIcon.classList.toggle("transparent", true);
      }
    });
  });
};

document.addEventListener("DOMContentLoaded", async () => {
    const data = await fetchData();
    renderNews(data);
    const filterBtn = document.querySelectorAll(".filterBtn");
    filterBtn.forEach((btn) => {
      btn.addEventListener("click", () => {
        const category = btn.id;
        renderFilteredNews(category);
      });
    });
    const renderFilteredNews = (category) => {
      const filteredNews = data.filter(
        (news) => news.category.toLowerCase() === category.toLowerCase()
      );
      renderNews(filteredNews);
    };

    const filterall = document.getElementById("all");
    filterall.addEventListener("click", () => {
      renderNews(data);
    });

    document.querySelector(".floppy").addEventListener('click', ()=>{
      window.location.href = 'savedNews.html'
    })
});

//saveNews
const savedNews = document.getElementById('savedNews')
const savedNewsList = getNewsFromLocalStorage();
  savedNewsList.map((news) => {
    const newDiv = document.createElement("div");
    newDiv.innerHTML = `
        <div class="newNews-content">
          <div class="newAuthor-category">
            <h2 id="new-author"><p>By</p> ${news.author}</h2>
            <h2 id="new-author"><p>Category</p> ${news.category}</h2>
          </div>
          <div class="newNews-content-url">
            <p id="new-content">${news.content}</p>
            <a id="new-url" href="${news.url}">Read More.</a>
          </div>
          <i class="fas fa-times-circle xmark"></i>
        </div>
      `;
    savedNews.appendChild(newDiv);
    const favIcon = newDiv.querySelector(".xmark");
    favIcon.addEventListener("click", () => {
      removeNewsFromLocalStorage(news);
      newDiv.remove();
    });
  });

  document.querySelector(".new-icon").addEventListener('click', ()=>{
      window.location.href = 'newNews.html'
    })
