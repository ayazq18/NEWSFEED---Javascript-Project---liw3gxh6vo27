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
  const getStoredData = getNewsFromLocalStorage();
  data.map((news) => {
    const newDiv = document.createElement("div");
    const { author, category, content, url } = news;
    newDiv.innerHTML += `
              <div cladd="newNews-section">
                <div class = "newNews-content">
                  <div class = "newAuthor-category">
                      <h2 id="new-author"><p>By</p> ${author}</h2>
                      <h2 id="new-author"><p>Category</p> ${category}</h2>
                  </div>
                  <div class = "newNews-content-url">
                      <p id="new-content">${content} <a id="new-url" href="${url}">Read More.</a></p>
                  </div>
                  <i class="fa fav-icon fa-regular fa-heart fa-2xl transparent"></i>
                </div>
              </div>
                `;
    newData.appendChild(newDiv);
    const favIcon = newDiv.querySelector(".fa-heart");

    if (getStoredData.some((savedNews) => savedNews.author === news.author)) {
      favIcon.classList.remove("transparent");
    }

    favIcon.addEventListener("click", () => {
      if (favIcon.classList.contains("transparent")) {
        addNewsToLocalStorage(news);
        favIcon.classList.remove("transparent");
      } else {
        removeNewsFromLocalStorage(news);
        favIcon.classList.add("transparent");
      }
    });
  });
};

const showLoader = () => {
  document.getElementById("loader").style.display = "block";
};

const hideLoader = () => {
  document.getElementById("loader").style.display = "none";
};

document.addEventListener("DOMContentLoaded", () => {
  const loadingData = async () => {
    showLoader();

    try {
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

      document.querySelector(".flop-save").addEventListener("click", () => {
        window.location.href = "../Savednews/savedNews.html";
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    hideLoader();
  };

  loadingData();
});
